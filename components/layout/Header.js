import { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { useRouter } from 'next/router';
import { useAppKitAccount, useAppKit } from '@reown/appkit/react';

export default function Header() {
  const router = useRouter();
  const { address, isConnected } = useAppKitAccount();
  const { open } = useAppKit();

  const navigation = [
    { name: 'Home', href: '/' },
    { name: 'Contests', href: '/contest' },
    { name: 'Create Contest', href: '/contest/create', adminOnly: true },
  ];

  const formatAddress = (address) => {
    return address ? `${address.slice(0, 6)}...${address.slice(-4)}` : '';
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

          {isConnected ? (
            <motion.button
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.99 }}
              onClick={() => open({ view: 'Account' })}
              className="px-5 py-2 rounded-md text-[15px] tracking-wide transition-all duration-300 bg-neutral-50 text-neutral-900 border border-neutral-200 hover:bg-neutral-100"
            >
              {formatAddress(address)}
            </motion.button>
          ) : (
            <motion.button
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.99 }}
              onClick={() => open()}
              className="px-5 py-2 rounded-md text-[15px] tracking-wide transition-all duration-300 bg-black text-white hover:bg-neutral-900"
            >
              Connect Wallet
            </motion.button>
          )}
        </div>
      </nav>
    </header>
  );
}
