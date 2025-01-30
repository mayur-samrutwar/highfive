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
    <header className="fixed w-full z-50 bg-white/98 backdrop-blur-sm border-b border-neutral-100">
      <nav className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link href="/">
            <motion.div 
              whileHover={{ scale: 1.01 }}
              className="flex items-center"
            >
              <span className="text-xl font-medium tracking-tight text-black">
                High Five
              </span>
            </motion.div>
          </Link>

          <div className="hidden md:flex items-center space-x-10">
            {navigation.map((item) => (
              <Link 
                key={item.name} 
                href={item.href}
                className={`${
                  router.pathname === item.href
                    ? 'text-black font-normal'
                    : 'text-neutral-400 hover:text-neutral-900'
                } text-[15px] tracking-wide transition-colors duration-300`}
              >
                {item.name}
              </Link>
            ))}
          </div>

          <motion.button
            whileHover={{ scale: 1.01 }}
            whileTap={{ scale: 0.99 }}
            onClick={connectWallet}
            className={`
              px-5 py-2 rounded-md text-[15px] tracking-wide transition-all duration-300
              ${isConnected 
                ? 'bg-neutral-50 text-neutral-900 border border-neutral-200 hover:bg-neutral-100'
                : 'bg-neutral-900 text-white hover:bg-black'
              }
            `}
          >
            {isConnected ? '0x1234...5678' : 'Connect wallet'}
          </motion.button>
        </div>
      </nav>
    </header>
  );
}
