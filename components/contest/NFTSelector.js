import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function NFTSelector({ contestId, nftCount, budget }) {
  const [selectedNFTs, setSelectedNFTs] = useState([]);
  const [availableNFTs, setAvailableNFTs] = useState([]);
  const [spentBudget, setSpentBudget] = useState(0);

  useEffect(() => {
    // Dummy NFT data - would be API call in real app
    setAvailableNFTs([
      { id: 1, name: "Bored Ape #1234", price: 15000, collection: "BAYC", image: "https://placehold.co/400x400" },
      { id: 2, name: "Crypto Punk #5678", price: 12000, collection: "CryptoPunks", image: "https://placehold.co/400x400" },
      { id: 3, name: "Doodle #9012", price: 8000, collection: "Doodles", image: "https://placehold.co/400x400" },
      { id: 4, name: "Azuki #3456", price: 10000, collection: "Azuki", image: "https://placehold.co/400x400" },
      { id: 5, name: "Clone X #7890", price: 9000, collection: "CloneX", image: "https://placehold.co/400x400" },
      // Add more NFTs as needed
    ]);
  }, []);

  const handleNFTSelect = (nft) => {
    if (selectedNFTs.find(n => n.id === nft.id)) {
      setSelectedNFTs(selectedNFTs.filter(n => n.id !== nft.id));
      setSpentBudget(spentBudget - nft.price);
    } else if (selectedNFTs.length < nftCount && spentBudget + nft.price <= budget) {
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
    alert('Selections submitted successfully!');
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center bg-white/5 rounded-xl p-4 mb-6">
        <div>
          <p className="text-gray-400">Selected</p>
          <p className="text-xl font-bold text-white">{selectedNFTs.length}/{nftCount} NFTs</p>
        </div>
        <div>
          <p className="text-gray-400">Budget Used</p>
          <p className="text-xl font-bold text-white">
            ${spentBudget.toLocaleString()} / ${budget.toLocaleString()}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {availableNFTs.map((nft) => {
          const isSelected = selectedNFTs.find(n => n.id === nft.id);
          const isDisabled = !isSelected && (selectedNFTs.length >= nftCount || spentBudget + nft.price > budget);

          return (
            <motion.div
              key={nft.id}
              whileHover={{ scale: isDisabled ? 1 : 1.02 }}
              className={`
                relative rounded-xl overflow-hidden cursor-pointer
                ${isDisabled ? 'opacity-50' : ''}
                ${isSelected ? 'ring-2 ring-purple-500' : ''}
              `}
              onClick={() => !isDisabled && handleNFTSelect(nft)}
            >
              <div className="bg-white/10 backdrop-blur-lg p-4">
                <img 
                  src={nft.image} 
                  alt={nft.name}
                  className="w-full h-48 object-cover rounded-lg mb-4"
                />
                <div className="space-y-2">
                  <h3 className="text-lg font-semibold text-white">{nft.name}</h3>
                  <p className="text-gray-400">{nft.collection}</p>
                  <p className="text-xl font-bold text-white">${nft.price.toLocaleString()}</p>
                </div>
              </div>
              
              {isSelected && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="absolute top-2 right-2 bg-purple-500 rounded-full p-1"
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
          w-full py-4 rounded-xl font-semibold text-lg mt-8
          ${selectedNFTs.length === nftCount
            ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white hover:opacity-90'
            : 'bg-gray-500 text-gray-300 cursor-not-allowed'
          }
        `}
      >
        Submit Selection
      </motion.button>
    </div>
  );
}
