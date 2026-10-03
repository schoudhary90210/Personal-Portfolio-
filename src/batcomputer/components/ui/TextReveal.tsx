'use client';

import { motion } from 'framer-motion';

interface TextRevealProps {
  text: string;
  className?: string;
  stagger?: number;
  duration?: number;
  delay?: number;
}

export default function TextReveal({
  text,
  className,
  stagger = 0.035,
  duration = 0.5,
  delay = 0,
}: TextRevealProps) {
  return (
    <span className={className} aria-label={text}>
      {text.split('').map((char, i) => (
        <span
          key={i}
          style={{ display: 'inline-block', overflow: 'hidden', verticalAlign: 'top' }}
        >
          <motion.span
            style={{ display: 'inline-block' }}
            initial={{ y: '100%', opacity: 0 }}
            animate={{ y: '0%', opacity: 1 }}
            transition={{
              duration,
              delay: delay + i * stagger,
              ease: [0.23, 1, 0.32, 1],
            }}
          >
            {char === ' ' ? '\u00A0' : char}
          </motion.span>
        </span>
      ))}
    </span>
  );
}
