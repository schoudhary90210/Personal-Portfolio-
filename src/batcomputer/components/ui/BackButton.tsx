'use client';

import { motion } from 'framer-motion';
import MagneticWrap from './MagneticWrap';

interface BackButtonProps {
  onClick: () => void;
}

export default function BackButton({ onClick }: BackButtonProps) {
  return (
    <MagneticWrap className="absolute top-6 left-6 z-50 pointer-events-auto">
      <motion.button
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -20 }}
        transition={{ duration: 0.3 }}
        onClick={onClick}
        className="flex items-center gap-2 font-heading text-sm uppercase tracking-widest text-accent/70 hover:text-accent transition-colors duration-200 group py-3 pr-3"
        style={{ minHeight: '44px' }}
      >
        <span className="inline-block transition-transform duration-200 group-hover:-translate-x-1">
          &lt;
        </span>
        <span>MAIN MENU</span>
      </motion.button>
    </MagneticWrap>
  );
}
