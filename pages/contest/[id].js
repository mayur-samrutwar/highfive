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
      <div className="min-h-screen bg-white pt-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-12"
          >
            <div className="flex justify-between items-start">
              <div>
                <h1 className="text-3xl font-medium text-black mb-4">{contest.title}</h1>
                <p className="text-neutral-600 max-w-2xl text-[15px] leading-relaxed">{contest.description}</p>
              </div>
              <div className="bg-neutral-50 rounded-lg p-4 text-center border border-neutral-200">
                <p className="text-sm text-neutral-500 mb-1">Time Remaining</p>
                <p className="text-xl font-medium text-black">3d 12h 45m</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="bg-neutral-50 rounded-lg p-4 border border-neutral-200">
                <p className="text-sm text-neutral-500 mb-1">Entry Fee</p>
                <p className="text-lg font-medium text-black">{contest.entryFee} ETH</p>
              </div>
              <div className="bg-neutral-50 rounded-lg p-4 border border-neutral-200">
                <p className="text-sm text-neutral-500 mb-1">Prize Pool</p>
                <p className="text-lg font-medium text-black">${contest.totalPrize.toLocaleString()}</p>
              </div>
              <div className="bg-neutral-50 rounded-lg p-4 border border-neutral-200">
                <p className="text-sm text-neutral-500 mb-1">NFT Selection</p>
                <p className="text-lg font-medium text-black">{contest.nftCount} NFTs</p>
              </div>
              <div className="bg-neutral-50 rounded-lg p-4 border border-neutral-200">
                <p className="text-sm text-neutral-500 mb-1">Budget</p>
                <p className="text-lg font-medium text-black">${contest.budget.toLocaleString()}</p>
              </div>
            </div>

            {!showNFTSelector ? (
              <motion.button
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.99 }}
                onClick={() => setShowNFTSelector(true)}
                className="w-full bg-black text-white py-4 rounded-lg font-medium text-[15px] tracking-wide transition-all duration-300"
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
