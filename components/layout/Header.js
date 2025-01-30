import { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { useRouter } from 'next/router';

export default function Header() {
  const [isConnected, setIsConnected] = useState(false);
  const router = useRouter();

  const navigation = [
    { name: 'Home', href: '/' },
    { name: 'Contests', href: '/contest' },
    { name: 'Create Contest', href: '/contest/create', adminOnly: true },
  ];

  const connectWallet = () => {
    setIsConnected(true);
  };

  return (
    <header className="fixed w-full z-50 bg-black/30 backdrop-blur-lg border-b border-white/10">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link href="/">
            <motion.div 
              whileHover={{ scale: 1.05 }}
              className="flex items-center"
            >
              <span className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-600 text-transparent bg-clip-text">
                High Five
              </span>
            </motion.div>
          </Link>

          <div className="hidden md:flex items-center space-x-8">
            {navigation.map((item) => (
              <Link 
                key={item.name} 
                href={item.href}
                className={`${
                  router.pathname === item.href
                    ? 'text-purple-400'
                    : 'text-gray-300 hover:text-white'
                } transition-colors duration-200`}
              >
                {item.name}
              </Link>
            ))}
          </div>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={connectWallet}
            className={`
              px-4 py-2 rounded-xl font-semibold
              ${isConnected 
                ? 'bg-green-500 text-white'
                : 'bg-gradient-to-r from-purple-500 to-pink-500 text-white'
              }
            `}
          >
            {isConnected ? '0x1234...5678' : 'Connect Wallet'}
          </motion.button>
        </div>
      </nav>
    </header>
  );
}
