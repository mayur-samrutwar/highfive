import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const POINTS_LIMIT = 1000; // Maximum points threshold
const WEIGHTS = {
  sales: 0.3,      // 30% weight for sales
  transfers: 0.3,  // 30% weight for transfers
  volume: 0.4      // 40% weight for volume
};

export default function NFTSelector({ contestId, nftCount }) {
  const [selectedNFTs, setSelectedNFTs] = useState([]);
  const [availableNFTs, setAvailableNFTs] = useState([]);
  const [spentPoints, setSpentPoints] = useState(0);

  useEffect(() => {
    const fetchNFTData = async () => {
      try {
        const response = await fetch(
          'https://api.unleashnfts.com/api/v2/nft/marketplace/analytics?' + 
          new URLSearchParams({
            blockchain: 'full',
            time_range: '24h',
            sort_by: 'name',
            sort_order: 'desc',
            offset: '0',
            limit: '100'
          }), {
          method: 'GET',
          headers: {
            'accept': 'application/json',
            'x-api-key': process.env.NEXT_PUBLIC_UNLEASH_API_KEY
          }
        });

        if (!response.ok) {
          throw new Error('Failed to fetch marketplace data');
        }

        const marketplaceData = await response.json();
        console.log('Marketplace Data:', marketplaceData);

        // Find maximum values for normalization
        const maxValues = marketplaceData.data.reduce((acc, item) => ({
          sales: Math.max(acc.sales, item.sales || 0),
          transfers: Math.max(acc.transfers, item.transfers || 0),
          volume: Math.max(acc.volume, item.volume || 0)
        }), { sales: 0, transfers: 0, volume: 0 });

        // Transform the data into NFT format with points calculation
        const nfts = marketplaceData.data.map((item, index) => {
          // Normalize each metric to 0-100 scale
          const normalizedScores = {
            sales: (item.sales / maxValues.sales) * 100,
            transfers: (item.transfers / maxValues.transfers) * 100,
            volume: (item.volume / maxValues.volume) * 100
          };

          // Calculate weighted score (0-200 range)
          const points = Math.round(
            (normalizedScores.sales * WEIGHTS.sales +
             normalizedScores.transfers * WEIGHTS.transfers +
             normalizedScores.volume * WEIGHTS.volume) * 2
          );

          return {
            id: index + 1,
            name: item.name,
            points: points,
            collection: item.name,
            blockchain: item.blockchain,
            image: item.thumbnail_url || "https://placehold.co/400x400",
            // Store raw metrics for display
            metrics: {
              sales: item.sales,
              transfers: item.transfers,
              volume: Math.round(item.volume)
            }
          };
        });

        console.log('Transformed NFTs with points:', nfts);
        setAvailableNFTs(nfts);

      } catch (error) {
        console.error('API Error:', error);
        // Fallback data with points instead of prices
        const fallbackData = [
          { id: 1, name: "OpenSea", points: 180, collection: "OpenSea", blockchain: "ethereum", image: "https://placehold.co/400x400" },
          { id: 2, name: "Blur", points: 150, collection: "Blur", blockchain: "ethereum", image: "https://placehold.co/400x400" },
          { id: 3, name: "X2Y2", points: 120, collection: "X2Y2", blockchain: "ethereum", image: "https://placehold.co/400x400" },
          { id: 4, name: "LooksRare", points: 90, collection: "LooksRare", blockchain: "ethereum", image: "https://placehold.co/400x400" },
          { id: 5, name: "Rarible", points: 60, collection: "Rarible", blockchain: "ethereum", image: "https://placehold.co/400x400" },
        ];
        setAvailableNFTs(fallbackData);
      }
    };

    fetchNFTData();
  }, []);

  const handleNFTSelect = (nft) => {
    if (selectedNFTs.find(n => n.id === nft.id)) {
      setSelectedNFTs(selectedNFTs.filter(n => n.id !== nft.id));
      setSpentPoints(spentPoints - nft.points);
    } else if (selectedNFTs.length < nftCount && spentPoints + nft.points <= POINTS_LIMIT) {
      setSelectedNFTs([...selectedNFTs, nft]);
      setSpentPoints(spentPoints + nft.points);
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
          <p className="text-neutral-500 text-sm">Points Used</p>
          <p className="text-lg font-medium text-black">
            {spentPoints} / {POINTS_LIMIT} pts
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {availableNFTs.map((nft) => {
          const isSelected = selectedNFTs.find(n => n.id === nft.id);
          const isDisabled = !isSelected && (
            selectedNFTs.length >= nftCount || 
            spentPoints + nft.points > POINTS_LIMIT
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
              <div className="absolute top-2 right-2 z-10">
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-neutral-100 text-neutral-800">
                  {nft.blockchain}
                </span>
              </div>
              
              <div className="p-4">
                <img 
                  src={nft.image} 
                  alt={nft.name}
                  className="w-full h-48 object-cover rounded-lg mb-4"
                />
                <div className="space-y-2">
                  <h3 className="text-lg font-medium text-black">{nft.name}</h3>
                  <p className="text-neutral-500">{nft.collection}</p>
                  <p className="text-xl font-medium text-black">{nft.points} pts</p>
                  {nft.metrics && (
                    <div className="text-xs text-neutral-500 space-y-1">
                      <p>Sales: {nft.metrics.sales}</p>
                      <p>Transfers: {nft.metrics.transfers}</p>
                      <p>Volume: ${nft.metrics.volume.toLocaleString()}</p>
                    </div>
                  )}
                </div>
              </div>
              
              {isSelected && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="absolute top-2 left-2 bg-black rounded-full p-1"
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
