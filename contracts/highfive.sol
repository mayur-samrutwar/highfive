// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC721/IERC721.sol";

/**
 * @title HighFive NFT Fantasy Gaming
 * @dev Simple contract for NFT fantasy contests
 */
contract HighFive is Ownable(msg.sender) {
    struct Contest {
        string title;
        uint256 deadline;
        uint256 entryFee;
        uint256 prizePool;
        uint256 nftCount;
        bool active;
        mapping(address => bool) hasParticipated;
        mapping(address => NFTEntry[]) portfolios;
    }

    struct NFTEntry {
        address nftContract;
        uint256 tokenId;
    }

    // State variables
    uint256 public nextContestId;
    mapping(uint256 => Contest) public contests;

    // Events
    event ContestCreated(uint256 contestId, string title, uint256 deadline, uint256 entryFee);
    event PortfolioSubmitted(uint256 contestId, address participant);
    event PrizeAwarded(uint256 contestId, address winner, uint256 amount);

    /**
     * @dev Create a new contest
     */
    function createContest(
        string memory title,
        uint256 deadline,
        uint256 entryFee,
        uint256 nftCount
    ) external {
        require(deadline > block.timestamp, "Invalid deadline");
        require(nftCount > 0, "Need at least 1 NFT");

        nextContestId++;
        Contest storage contest = contests[nextContestId];
        
        contest.title = title;
        contest.deadline = deadline;
        contest.entryFee = entryFee;
        contest.nftCount = nftCount;
        contest.active = true;

        emit ContestCreated(nextContestId, title, deadline, entryFee);
    }

    /**
     * @dev Submit NFTs to a contest
     */
    function submitPortfolio(
        uint256 contestId,
        address[] calldata nftContracts,
        uint256[] calldata tokenIds
    ) external payable {
        Contest storage contest = contests[contestId];
        
        require(contest.active, "Contest not active");
        require(block.timestamp < contest.deadline, "Contest ended");
        require(!contest.hasParticipated[msg.sender], "Already participated");
        require(msg.value == contest.entryFee, "Wrong entry fee");
        require(nftContracts.length == contest.nftCount, "Wrong NFT count");
        require(tokenIds.length == contest.nftCount, "Wrong token count");

        // Verify NFT ownership
        for (uint256 i = 0; i < nftContracts.length; i++) {
            IERC721 nft = IERC721(nftContracts[i]);
            require(nft.ownerOf(tokenIds[i]) == msg.sender, "Not NFT owner");
            
            contest.portfolios[msg.sender].push(NFTEntry({
                nftContract: nftContracts[i],
                tokenId: tokenIds[i]
            }));
        }

        contest.hasParticipated[msg.sender] = true;
        contest.prizePool += msg.value;

        emit PortfolioSubmitted(contestId, msg.sender);
    }

    /**
     * @dev Award prize to winner
     */
    function awardPrize(uint256 contestId, address winner) external onlyOwner {
        Contest storage contest = contests[contestId];
        
        require(block.timestamp >= contest.deadline, "Contest still active");
        require(contest.active, "Contest already finished");
        require(contest.hasParticipated[winner], "Not a participant");

        uint256 prize = contest.prizePool;
        contest.prizePool = 0;
        contest.active = false;

        (bool sent, ) = winner.call{value: prize}("");
        require(sent, "Failed to send prize");

        emit PrizeAwarded(contestId, winner, prize);
    }

    /**
     * @dev Get a participant's portfolio
     */
    function getPortfolio(uint256 contestId, address participant) external view 
        returns (address[] memory nftContracts, uint256[] memory tokenIds) 
    {
        NFTEntry[] storage entries = contests[contestId].portfolios[participant];
        
        nftContracts = new address[](entries.length);
        tokenIds = new uint256[](entries.length);
        
        for (uint256 i = 0; i < entries.length; i++) {
            nftContracts[i] = entries[i].nftContract;
            tokenIds[i] = entries[i].tokenId;
        }
    }
}
