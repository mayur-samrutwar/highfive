import { motion } from 'framer-motion';
import Layout from '@/components/layout/Layout';
import Link from 'next/link';

export default function Home() {
  const features = [
    {
      title: "Fantasy Contests",
      description: "Create or join NFT fantasy leagues with custom parameters and prize pools",
      icon: "◆"
    },
    {
      title: "Portfolio Building",
      description: "Build strategic NFT portfolios to compete against other players",
      icon: "○"
    },
    {
      title: "Live Rankings",
      description: "Track your performance in real-time with dynamic leaderboards",
      icon: "□"
    }
  ];

  return (
    <Layout>
      <div className="min-h-screen bg-white">
        {/* Hero Section */}
        <div className="pt-32 pb-20 px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center"
            >
              <h1 className="text-4xl md:text-5xl font-medium tracking-tight text-black mb-6">
                NFT Fantasy Gaming
                <span className="block mt-2 text-neutral-400">Reimagined</span>
              </h1>
              <p className="text-lg text-neutral-600 mb-12 max-w-2xl mx-auto leading-relaxed">
                Build your NFT portfolio. Compete in fantasy leagues.
                Rise through the ranks.
              </p>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="flex flex-col sm:flex-row gap-4 justify-center"
              >
                <Link href="/contest">
                  <motion.button
                    whileHover={{ scale: 1.01 }}
                    whileTap={{ scale: 0.99 }}
                    className="px-8 py-3 bg-black text-white rounded-md text-[15px] tracking-wide"
                  >
                    Browse Contests
                  </motion.button>
                </Link>
                <Link href="/contest/create">
                  <motion.button
                    whileHover={{ scale: 1.01 }}
                    whileTap={{ scale: 0.99 }}
                    className="px-8 py-3 bg-neutral-100 text-black rounded-md text-[15px] tracking-wide border border-neutral-200"
                  >
                    Create Contest
                  </motion.button>
                </Link>
              </motion.div>
            </motion.div>
          </div>
        </div>

        {/* Live Contests Preview */}
        <div className="py-20 bg-neutral-50 border-y border-neutral-100">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl font-medium text-black mb-8">Live Contests</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[1, 2].map((_, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 * index }}
                  className="bg-white p-6 rounded-lg border border-neutral-200"
                >
                  <div className="flex justify-between items-center mb-4">
                    <span className="text-sm text-neutral-500">Prize Pool</span>
                    <span className="text-sm font-medium">10 ETH</span>
                  </div>
                  <div className="flex justify-between items-center mb-4">
                    <span className="text-sm text-neutral-500">Players</span>
                    <span className="text-sm font-medium">24/32</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-neutral-500">Ends in</span>
                    <span className="text-sm font-medium">2d 14h</span>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        {/* Features Section */}
        <div className="py-20">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
              {features.map((feature, index) => (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 + index * 0.1 }}
                >
                  <div className="text-2xl mb-4 text-neutral-400">{feature.icon}</div>
                  <h3 className="text-lg font-medium text-black mb-2">{feature.title}</h3>
                  <p className="text-neutral-600 text-[15px] leading-relaxed">{feature.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        {/* Stats Section */}
        <div className="py-20 bg-neutral-50 border-y border-neutral-100">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
              <div className="text-center">
                <div className="text-3xl font-medium text-black">$2.1M</div>
                <p className="text-neutral-600 mt-1">Total Volume</p>
              </div>
              <div className="text-center">
                <div className="text-3xl font-medium text-black">12.4K</div>
                <p className="text-neutral-600 mt-1">Active Players</p>
              </div>
              <div className="text-center">
                <div className="text-3xl font-medium text-black">847</div>
                <p className="text-neutral-600 mt-1">Contests</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
