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
  hidden: { y: 20, opacity: 0 },
  show: { y: 0, opacity: 1 }
};

export default function Contests() {
  const [contests, setContests] = useState([]);

  useEffect(() => {
    // Dummy data - in real app this would be an API call
    setContests([
      {
        id: 1,
        title: "Crypto Punks Championship",
        deadline: "2024-04-01",
        entryFee: 0.1,
        totalPrize: 100000,
        nftCount: 5,
        participants: 128,
        status: "active"
      },
      {
        id: 2,
        title: "Bored Ape Collection",
        deadline: "2024-03-28",
        entryFee: 0.2,
        totalPrize: 250000,
        nftCount: 3,
        participants: 256,
        status: "upcoming"
      }
    ]);
  }, []);

  return (
    <Layout>
      <div className="min-h-screen bg-gradient-to-b from-background to-purple-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <h1 className="text-4xl md:text-6xl font-bold text-center mb-8 bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-600">
            Active Contests
          </h1>
          
          <motion.div 
            variants={container}
            initial="hidden"
            animate="show"
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
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
