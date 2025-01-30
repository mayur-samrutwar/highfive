import { motion } from 'framer-motion';
import Link from 'next/link';

export default function ContestCard({ contest }) {
  return (
    <Link href={`/contest/${contest.id}`}>
      <motion.div
        whileHover={{ scale: 1.01 }}
        className="bg-white border border-neutral-200 rounded-lg p-6 transition-all duration-300"
      >
        <div className="flex justify-between items-start mb-6">
          <h3 className="text-lg font-medium text-black">{contest.title}</h3>
          <span className={`
            px-3 py-1 rounded-full text-[13px] tracking-wide
            ${contest.status === 'active' 
              ? 'bg-neutral-900 text-white' 
              : 'bg-neutral-100 text-neutral-600'
            }
          `}>
            {contest.status}
          </span>
        </div>

        <div className="grid grid-cols-2 gap-6">
          <div>
            <div className="text-neutral-500 text-[13px] mb-1">Prize Pool</div>
            <div className="font-medium">{contest.prizePool}</div>
          </div>
          <div>
            <div className="text-neutral-500 text-[13px] mb-1">Entry Fee</div>
            <div className="font-medium">{contest.entryFee} ETH</div>
          </div>
          <div>
            <div className="text-neutral-500 text-[13px] mb-1">Players</div>
            <div className="font-medium">{contest.playerCount}</div>
          </div>
          <div>
            <div className="text-neutral-500 text-[13px] mb-1">Time Left</div>
            <div className="font-medium">{contest.timeLeft}</div>
          </div>
        </div>
      </motion.div>
    </Link>
  );
}
