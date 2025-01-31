import { useState } from 'react';
import Layout from '@/components/layout/Layout';
import ContestCard from '@/components/contest/ContestCard';
import { motion } from 'framer-motion';
import { useReadContract, useReadContracts } from 'wagmi';
import { formatEther } from 'viem';

const CONTRACT_ADDRESS = '0xa51084ce30E70F88b9E2C2e5fFF175B94cA909C9';
const CONTRACT_ABI = [
  {
    name: 'nextContestId',
    type: 'function',
    stateMutability: 'view',
    inputs: [],
    outputs: [{ type: 'uint256' }]
  },
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

// Animation variants
const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const item = {
  hidden: { y: 10, opacity: 0 },
  show: { y: 0, opacity: 1 }
};

export default function Contests() {
  const [filter, setFilter] = useState('all'); // 'all', 'active', 'upcoming'

  // Get total number of contests
  const { data: nextContestId } = useReadContract({
    address: CONTRACT_ADDRESS,
    abi: CONTRACT_ABI,
    functionName: 'nextContestId',
  });

  // Prepare contracts config for batch reading
  const contestsConfig = nextContestId ? 
    Array.from({ length: Number(nextContestId) }, (_, i) => ({
      address: CONTRACT_ADDRESS,
      abi: CONTRACT_ABI,
      functionName: 'contests',
      args: [BigInt(i + 1)]
    })) : [];

  // Read all contests in a single hook call
  const { data: contestsData, isLoading } = useReadContracts({
    contracts: contestsConfig
  });

  // Process contest data
  const processedContests = contestsData
    ?.map((result, index) => {
      if (!result?.result) return null;
      const contest = result.result;

      return {
        id: index + 1,
        title: contest[0],
        deadline: Number(contest[1]),
        entryFee: contest[2],
        prizePool: contest[3],
        nftCount: Number(contest[4]),
        active: contest[5]
      };
    })
    .filter(Boolean) ?? [];

  const formatTimeLeft = (deadline) => {
    const now = Math.floor(Date.now() / 1000);
    const timeLeft = deadline - now;
    
    if (timeLeft <= 0) return 'Ended';
    
    const days = Math.floor(timeLeft / 86400);
    const hours = Math.floor((timeLeft % 86400) / 3600);
    
    return `${days}d ${hours}h`;
  };

  const getContestStatus = (deadline, active) => {
    if (!active) return 'ended';
    const now = Math.floor(Date.now() / 1000);
    if (deadline <= now) return 'ended';
    if (deadline - now < 86400) return 'active';
    return 'upcoming';
  };

  const filteredContests = processedContests.filter(contest => {
    if (filter === 'all') return true;
    return getContestStatus(contest.deadline, contest.active) === filter;
  });

  const displayContests = filteredContests.map(contest => ({
    ...contest,
    deadline: new Date(contest.deadline * 1000).toLocaleDateString(),
    entryFee: formatEther(contest.entryFee),
    prizePool: formatEther(contest.prizePool),
    timeLeft: formatTimeLeft(contest.deadline),
    status: getContestStatus(contest.deadline, contest.active)
  }));

  return (
    <Layout>
      <div className="min-h-screen bg-white pt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {/* Header Section */}
          <div className="flex flex-col sm:flex-row justify-between items-center mb-8">
            <h1 className="text-2xl font-medium text-black mb-4 sm:mb-0">
              {filter === 'all' ? 'All Contests' : 
               filter === 'active' ? 'Active Contests' : 
               'Upcoming Contests'}
            </h1>
            
            <div className="flex gap-2">
              {['all', 'active', 'upcoming'].map((type) => (
                <motion.button
                  key={type}
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.99 }}
                  onClick={() => setFilter(type)}
                  className={`
                    px-3 py-1.5 rounded-md text-sm tracking-wide transition-all duration-300
                    ${filter === type 
                      ? 'bg-black text-white' 
                      : 'bg-neutral-100 text-neutral-600 hover:bg-neutral-200'
                    }
                  `}
                >
                  {type.charAt(0).toUpperCase() + type.slice(1)}
                </motion.button>
              ))}
            </div>
          </div>

          {/* Loading State */}
          {isLoading && (
            <div className="text-center py-10">
              <p className="text-neutral-600">Loading contests...</p>
            </div>
          )}

          {/* Error State */}
          {contestsData && contestsData.some(result => result.error) && (
            <div className="text-center py-10">
              <p className="text-red-600">Error loading contests. Please try again.</p>
            </div>
          )}

          {/* Contests Grid */}
          <motion.div 
            variants={container}
            initial="hidden"
            animate="show"
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4"
          >
            {displayContests.map((contest) => (
              <motion.div key={contest.id} variants={item}>
                <ContestCard contest={contest} />
              </motion.div>
            ))}
          </motion.div>

          {/* Empty State */}
          {displayContests.length === 0 && !isLoading && (
            <div className="text-center py-10">
              <p className="text-neutral-600">No contests found.</p>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
}
