import { motion } from 'framer-motion';
import Link from 'next/link';

export default function ContestCard({ contest }) {
  return (
    <Link href={`/contest/${contest.id}`}>
      <motion.div
        whileHover={{ scale: 1.02 }}
        className="bg-white border border-neutral-200 rounded-lg p-4 transition-all duration-300 h-full"
      >
        <div className="flex justify-between items-start mb-4">
          <h3 className="text-base font-medium text-black line-clamp-1">{contest.title}</h3>
          <span className={`
            px-2 py-0.5 rounded-full text-xs tracking-wide ml-2 whitespace-nowrap
            ${contest.status === 'active' 
              ? 'bg-neutral-900 text-white' 
              : 'bg-neutral-100 text-neutral-600'
            }
          `}>
            {contest.status}
          </span>
        </div>

        <div className="grid grid-cols-2 gap-3 text-sm">
          <div>
            <div className="text-neutral-500 text-xs">Prize Pool</div>
            <div className="font-medium">{contest.prizePool} ETH</div>
          </div>
          <div>
            <div className="text-neutral-500 text-xs">Entry Fee</div>
            <div className="font-medium">{contest.entryFee} ETH</div>
          </div>
          <div>
            <div className="text-neutral-500 text-xs">NFTs</div>
            <div className="font-medium">{contest.nftCount}</div>
          </div>
          <div>
            <div className="text-neutral-500 text-xs">Time Left</div>
            <div className="font-medium">{contest.timeLeft}</div>
          </div>
        </div>
      </motion.div>
    </Link>
  );
}
