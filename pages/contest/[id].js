import { useState } from 'react';
import { useRouter } from 'next/router';
import Layout from '@/components/layout/Layout';
import { motion } from 'framer-motion';
import NFTSelector from '@/components/contest/NFTSelector';
import { useReadContract } from 'wagmi';
import { formatEther } from 'viem';

const CONTRACT_ADDRESS = process.env.NEXT_PUBLIC_CONTRACT_ADDRESS;
const CONTRACT_ABI = [
  {
    name: 'contests',
    type: 'function',
    stateMutability: 'view',
    inputs: [{ type: 'uint256' }],
    outputs: [
      { name: 'title', type: 'string' },
      { name: 'deadline', type: 'uint256' },
      { name: 'entryFee', type: 'uint256' },
      { name: 'prizePool', type: 'uint256' },
      { name: 'nftCount', type: 'uint256' },
      { name: 'active', type: 'bool' }
    ]
  }
];

export default function ContestDetail() {
  const router = useRouter();
  const { id } = router.query;
  const [showNFTSelector, setShowNFTSelector] = useState(false);

  const { data: contest, isLoading } = useReadContract({
    address: CONTRACT_ADDRESS,
    abi: CONTRACT_ABI,
    functionName: 'contests',
    args: id ? [BigInt(id)] : undefined,
    enabled: !!id,
  });

  const formatTimeLeft = (deadline) => {
    if (!deadline) return '--';
    const now = Math.floor(Date.now() / 1000);
    const timeLeft = Number(deadline) - now;
    
    if (timeLeft <= 0) return 'Ended';
    
    const days = Math.floor(timeLeft / 86400);
    const hours = Math.floor((timeLeft % 86400) / 3600);
    const minutes = Math.floor((timeLeft % 3600) / 60);
    
    return `${days}d ${hours}h ${minutes}m`;
  };

  if (isLoading) {
    return (
      <Layout>
        <div className="min-h-screen bg-white pt-24">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div className="text-center">
              <p className="text-neutral-600">Loading contest details...</p>
            </div>
          </div>
        </div>
      </Layout>
    );
  }

  if (!contest) return null;

  const processedContest = {
    id: Number(id),
    title: contest[0],
    deadline: Number(contest[1]),
    entryFee: formatEther(contest[2]),
    prizePool: formatEther(contest[3]),
    nftCount: Number(contest[4]),
    active: contest[5]
  };

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
                <h1 className="text-3xl font-medium text-black mb-4">{processedContest.title}</h1>
              </div>
              <div className="bg-neutral-50 rounded-lg p-4 text-center border border-neutral-200">
                <p className="text-sm text-neutral-500 mb-1">Time Remaining</p>
                <p className="text-xl font-medium text-black">
                  {formatTimeLeft(processedContest.deadline)}
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="bg-neutral-50 rounded-lg p-4 border border-neutral-200">
                <p className="text-sm text-neutral-500 mb-1">Entry Fee</p>
                <p className="text-lg font-medium text-black">{processedContest.entryFee} ETH</p>
              </div>
              <div className="bg-neutral-50 rounded-lg p-4 border border-neutral-200">
                <p className="text-sm text-neutral-500 mb-1">Prize Pool</p>
                <p className="text-lg font-medium text-black">{processedContest.prizePool} ETH</p>
              </div>
              <div className="bg-neutral-50 rounded-lg p-4 border border-neutral-200">
                <p className="text-sm text-neutral-500 mb-1">NFT Selection</p>
                <p className="text-lg font-medium text-black">{processedContest.nftCount} NFTs</p>
              </div>
            </div>

            {processedContest.active && !showNFTSelector ? (
              <motion.button
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.99 }}
                onClick={() => setShowNFTSelector(true)}
                className="w-full bg-black text-white py-4 rounded-lg font-medium text-[15px] tracking-wide transition-all duration-300"
              >
                Enter Contest
              </motion.button>
            ) : showNFTSelector ? (
              <NFTSelector 
                contestId={processedContest.id}
                nftCount={processedContest.nftCount}
              />
            ) : (
              <div className="text-center py-4 text-neutral-600">
                This contest has ended
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </Layout>
  );
}
