import { useState, useEffect } from 'react';
import Layout from '@/components/layout/Layout';
import ContestCard from '@/components/contest/ContestCard';
import { motion } from 'framer-motion';

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
  const [contests, setContests] = useState([]);
  const [filter, setFilter] = useState('all'); // 'all', 'active', 'upcoming'

  useEffect(() => {
    // Dummy data - in real app this would be an API call
    setContests([
      {
        id: 1,
        title: "CryptoPunks League S1",
        deadline: "2024-04-01",
        entryFee: 0.1,
        prizePool: "10.5 ETH",
        playerCount: "24/32",
        timeLeft: "2d 14h",
        status: "active"
      },
      {
        id: 2,
        title: "BAYC Tournament",
        deadline: "2024-03-28",
        entryFee: 0.2,
        prizePool: "25.0 ETH",
        playerCount: "16/32",
        timeLeft: "5d 8h",
        status: "upcoming"
      }
    ]);
  }, []);

  return (
    <Layout>
      <div className="min-h-screen bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          {/* Header Section */}
          <div className="flex flex-col md:flex-row justify-between items-center mb-12">
            <h1 className="text-2xl font-medium text-black mb-6 md:mb-0">
              Active Contests
            </h1>
            
            <div className="flex gap-4">
              {['all', 'active', 'upcoming'].map((type) => (
                <motion.button
                  key={type}
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.99 }}
                  onClick={() => setFilter(type)}
                  className={`
                    px-4 py-2 rounded-md text-[15px] tracking-wide transition-all duration-300
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

          {/* Contests Grid */}
          <motion.div 
            variants={container}
            initial="hidden"
            animate="show"
            className="grid grid-cols-1 gap-6"
          >
            {contests.map((contest) => (
              <motion.div key={contest.id} variants={item}>
                <ContestCard contest={contest} />
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </Layout>
  );
}
