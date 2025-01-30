import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Layout from '@/components/layout/Layout';
import { motion } from 'framer-motion';
import NFTSelector from '@/components/contest/NFTSelector';

export default function ContestDetail() {
  const router = useRouter();
  const { id } = router.query;
  const [contest, setContest] = useState(null);
  const [showNFTSelector, setShowNFTSelector] = useState(false);

  useEffect(() => {
    if (id) {
      // Dummy data - would be API call in real app
      setContest({
        id: parseInt(id),
        title: "Crypto Punks Championship",
        deadline: "2024-04-01",
        entryFee: 0.1,
        totalPrize: 100000,
        nftCount: 5,
        participants: 128,
        budget: 50000,
        status: "active",
        description: "Select the NFTs you think will appreciate the most in value by the deadline. The player with the highest portfolio value wins!"
      });
    }
  }, [id]);

  if (!contest) return null;

  return (
    <Layout>
      <div className="min-h-screen bg-gradient-to-b from-background to-purple-900 pt-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white/10 backdrop-blur-lg rounded-3xl p-8 border border-white/20"
          >
            <div className="flex justify-between items-start mb-8">
              <div>
                <h1 className="text-4xl font-bold text-white mb-4">{contest.title}</h1>
                <p className="text-gray-300 max-w-2xl">{contest.description}</p>
              </div>
              <div className="bg-purple-500/20 rounded-xl p-4 text-center">
                <p className="text-sm text-purple-300">Time Remaining</p>
                <p className="text-2xl font-bold text-white">3d 12h 45m</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              <div className="bg-white/5 rounded-xl p-4">
                <p className="text-sm text-gray-400">Entry Fee</p>
                <p className="text-xl font-bold text-white">{contest.entryFee} ETH</p>
              </div>
              <div className="bg-white/5 rounded-xl p-4">
                <p className="text-sm text-gray-400">Prize Pool</p>
                <p className="text-xl font-bold text-white">${contest.totalPrize.toLocaleString()}</p>
              </div>
              <div className="bg-white/5 rounded-xl p-4">
                <p className="text-sm text-gray-400">NFT Selection</p>
                <p className="text-xl font-bold text-white">{contest.nftCount} NFTs</p>
              </div>
              <div className="bg-white/5 rounded-xl p-4">
                <p className="text-sm text-gray-400">Budget</p>
                <p className="text-xl font-bold text-white">${contest.budget.toLocaleString()}</p>
              </div>
            </div>

            {!showNFTSelector ? (
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setShowNFTSelector(true)}
                className="w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white py-4 rounded-xl font-semibold text-lg hover:opacity-90 transition-opacity"
              >
                Enter Contest
              </motion.button>
            ) : (
              <NFTSelector 
                contestId={contest.id}
                nftCount={contest.nftCount}
                budget={contest.budget}
              />
            )}
          </motion.div>
        </div>
      </div>
    </Layout>
  );
}
