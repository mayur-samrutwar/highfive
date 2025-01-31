import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const BUDGET_LIMIT = 10000; // $10,000 USD budget limit

export default function NFTSelector({ contestId, nftCount }) {
  const [selectedNFTs, setSelectedNFTs] = useState([]);
  const [availableNFTs, setAvailableNFTs] = useState([]);
  const [spentBudget, setSpentBudget] = useState(0);

  useEffect(() => {
    // Dummy NFT data - would be API call in real app
    setAvailableNFTs([
      { id: 1, name: "Bored Ape #1234", price: 4500, collection: "BAYC", image: "https://placehold.co/400x400" },
      { id: 2, name: "Crypto Punk #5678", price: 3800, collection: "CryptoPunks", image: "https://placehold.co/400x400" },
      { id: 3, name: "Doodle #9012", price: 2200, collection: "Doodles", image: "https://placehold.co/400x400" },
      { id: 4, name: "Azuki #3456", price: 2800, collection: "Azuki", image: "https://placehold.co/400x400" },
      { id: 5, name: "Clone X #7890", price: 2100, collection: "CloneX", image: "https://placehold.co/400x400" },
    ]);
  }, []);

  const handleNFTSelect = (nft) => {
    if (selectedNFTs.find(n => n.id === nft.id)) {
      setSelectedNFTs(selectedNFTs.filter(n => n.id !== nft.id));
      setSpentBudget(spentBudget - nft.price);
    } else if (selectedNFTs.length < nftCount && spentBudget + nft.price <= BUDGET_LIMIT) {
      setSelectedNFTs([...selectedNFTs, nft]);
      setSpentBudget(spentBudget + nft.price);
    }
  };

  const handleSubmit = async () => {
    if (selectedNFTs.length !== nftCount) {
      alert(`Please select exactly ${nftCount} NFTs`);
      return;
    }
    // Submit selection logic here
    console.log('Selected NFTs:', selectedNFTs);
    alert('Selections submitted successfully!');
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center bg-neutral-50 rounded-lg p-4 border border-neutral-200">
        <div>
          <p className="text-neutral-500 text-sm">Selected</p>
          <p className="text-lg font-medium text-black">{selectedNFTs.length}/{nftCount} NFTs</p>
        </div>
        <div>
          <p className="text-neutral-500 text-sm">Budget Used</p>
          <p className="text-lg font-medium text-black">
            ${spentBudget.toLocaleString()} / ${BUDGET_LIMIT.toLocaleString()}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {availableNFTs.map((nft) => {
          const isSelected = selectedNFTs.find(n => n.id === nft.id);
          const isDisabled = !isSelected && (
            selectedNFTs.length >= nftCount || 
            spentBudget + nft.price > BUDGET_LIMIT
          );

          return (
            <motion.div
              key={nft.id}
              whileHover={{ scale: isDisabled ? 1 : 1.02 }}
              className={`
                relative bg-white rounded-lg overflow-hidden cursor-pointer border border-neutral-200
                ${isDisabled ? 'opacity-50' : ''}
                ${isSelected ? 'ring-2 ring-black' : ''}
              `}
              onClick={() => !isDisabled && handleNFTSelect(nft)}
            >
              <div className="p-4">
                <img 
                  src={nft.image} 
                  alt={nft.name}
                  className="w-full h-48 object-cover rounded-lg mb-4"
                />
                <div className="space-y-2">
                  <h3 className="text-lg font-medium text-black">{nft.name}</h3>
                  <p className="text-neutral-500">{nft.collection}</p>
                  <p className="text-xl font-medium text-black">${nft.price.toLocaleString()}</p>
                </div>
              </div>
              
              {isSelected && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="absolute top-2 right-2 bg-black rounded-full p-1"
                >
                  <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </motion.div>
              )}
            </motion.div>
          );
        })}
      </div>

      <motion.button
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        onClick={handleSubmit}
        disabled={selectedNFTs.length !== nftCount}
        className={`
          w-full py-4 rounded-lg font-medium text-[15px] tracking-wide transition-all duration-300
          ${selectedNFTs.length === nftCount
            ? 'bg-black text-white hover:bg-black/90'
            : 'bg-neutral-200 text-neutral-500 cursor-not-allowed'
          }
        `}
      >
        Submit Selection
      </motion.button>
    </div>
  );
}
