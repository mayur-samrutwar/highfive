import { motion } from 'framer-motion';

export default function Card({ children, className = '', hover = true }) {
  return (
    <motion.div
      whileHover={hover ? { scale: 1.02 } : {}}
      className={`
        bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20
        ${className}
      `}
    >
      {children}
    </motion.div>
  );
}
