import { motion } from 'framer-motion';
import Link from 'next/link';

export default function ContestCard({ contest }) {
  const {
    id,
    title,
    deadline,
    entryFee,
    totalPrize,
    nftCount,
    participants,
    status
  } = contest;

  const statusColors = {
    active: 'bg-green-500',
    upcoming: 'bg-blue-500',
    ended: 'bg-gray-500'
  };

  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20 shadow-xl"
    >
      <div className="flex justify-between items-start mb-4">
        <h3 className="text-xl font-bold text-white">{title}</h3>
        <span className={`px-3 py-1 rounded-full text-sm ${statusColors[status]} text-white`}>
          {status}
        </span>
      </div>

      <div className="space-y-3 text-gray-300">
        <div className="flex justify-between">
          <span>Entry Fee:</span>
          <span className="font-mono">{entryFee} ETH</span>
        </div>
        <div className="flex justify-between">
          <span>Prize Pool:</span>
          <span className="font-mono">${totalPrize.toLocaleString()}</span>
        </div>
        <div className="flex justify-between">
          <span>NFT Selection:</span>
          <span>{nftCount} NFTs</span>
        </div>
        <div className="flex justify-between">
          <span>Participants:</span>
          <span>{participants}</span>
        </div>
        <div className="flex justify-between">
          <span>Deadline:</span>
          <span>{new Date(deadline).toLocaleDateString()}</span>
        </div>
      </div>

      <Link href={`/contest/${id}`}>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="w-full mt-6 bg-gradient-to-r from-purple-500 to-pink-500 text-white py-3 rounded-xl font-semibold hover:opacity-90 transition-opacity"
        >
          View Contest
        </motion.button>
      </Link>
    </motion.div>
  );
}
