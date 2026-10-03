'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { ReactNode, useState, useEffect } from 'react';
import GlitchOverlay from './GlitchOverlay';

interface PanelTransitionProps {
  children: ReactNode;
  transitionKey: string;
}

export default function PanelTransition({ children, transitionKey }: PanelTransitionProps) {
  const [showGlitch, setShowGlitch] = useState(false);

  useEffect(() => {
    setShowGlitch(true);
    const timer = setTimeout(() => setShowGlitch(false), 80);
    return () => clearTimeout(timer);
  }, [transitionKey]);

  return (
    <>
      {showGlitch && <GlitchOverlay duration={50} />}
      <AnimatePresence mode="wait">
        <motion.div
          key={transitionKey}
          initial={{ clipPath: 'inset(0 50% 0 50%)', opacity: 0 }}
          animate={{
            clipPath: 'inset(0 0% 0 0%)',
            opacity: 1,
            transition: { duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] },
          }}
          exit={{
            clipPath: 'inset(0 50% 0 50%)',
            opacity: 0,
            transition: { duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] },
          }}
        >
          {children}
        </motion.div>
      </AnimatePresence>
    </>
  );
}
