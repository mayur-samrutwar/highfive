import { motion } from 'framer-motion';

export default function LeaderBoard({ contestId }) {
  const leaderboardData = [
    { rank: 1, address: "0x1234...5678", portfolio: 125000, profit: "+25%" },
    { rank: 2, address: "0x8765...4321", portfolio: 120000, profit: "+20%" },
    { rank: 3, address: "0x9876...1234", portfolio: 115000, profit: "+15%" },
    { rank: 4, address: "0x4321...8765", portfolio: 110000, profit: "+10%" },
    { rank: 5, address: "0x5678...9012", portfolio: 105000, profit: "+5%" },
  ];

  return (
    <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20">
      <h2 className="text-2xl font-bold text-white mb-6">Leaderboard</h2>
      
      <div className="space-y-4">
        {leaderboardData.map((player, index) => (
          <motion.div
            key={player.address}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            className={`
              flex items-center justify-between p-4 rounded-lg
              ${index === 0 ? 'bg-gradient-to-r from-yellow-500/20 to-yellow-600/20 border border-yellow-500/30' : 'bg-white/5'}
            `}
          >
            <div className="flex items-center space-x-4">
              <span className={`
                w-8 h-8 rounded-full flex items-center justify-center font-bold
                ${index === 0 ? 'bg-yellow-500 text-black' : 'bg-white/10 text-white'}
              `}>
                {player.rank}
              </span>
              <span className="text-white">{player.address}</span>
            </div>
            <div className="flex items-center space-x-6">
              <span className="text-white">${player.portfolio.toLocaleString()}</span>
              <span className="text-green-400">{player.profit}</span>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
