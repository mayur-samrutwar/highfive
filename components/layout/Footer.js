import Link from 'next/link';
import { motion } from 'framer-motion';

export default function Footer() {
  const links = [
    { name: 'Contests', href: '/contest' },
    { name: 'Leaderboard', href: '/leaderboard' },
    { name: 'Twitter', href: 'https://twitter.com', external: true },
    { name: 'Discord', href: 'https://discord.com', external: true },
  ];

  return (
    <footer className="bg-white border-t border-neutral-100">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex flex-col items-center space-y-8">
          <Link href="/">
            <span className="text-lg font-medium tracking-tight text-black">
              High Five
            </span>
          </Link>
          
          <nav className="flex flex-wrap justify-center gap-x-8 gap-y-4">
            {links.map((link) => (
              <motion.div
                key={link.name}
                whileHover={{ scale: 1.01 }}
              >
                {link.external ? (
                  <a
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[15px] text-neutral-500 hover:text-black transition-colors duration-300"
                  >
                    {link.name}
                  </a>
                ) : (
                  <Link
                    href={link.href}
                    className="text-[15px] text-neutral-500 hover:text-black transition-colors duration-300"
                  >
                    {link.name}
                  </Link>
                )}
              </motion.div>
            ))}
          </nav>

          <div className="text-[15px] text-neutral-400">
            © {new Date().getFullYear()} High Five
          </div>
        </div>
      </div>
    </footer>
  );
}
