import type { Variants } from 'framer-motion';
import { TIMING } from './constants';

// Framer Motion variants for page transitions
export const panelTransitionVariants: Variants = {
  initial: {
    clipPath: 'inset(0 50% 0 50%)',
    opacity: 0,
  },
  animate: {
    clipPath: 'inset(0 0% 0 0%)',
    opacity: 1,
    transition: {
      duration: TIMING.panelTransition / 1000,
      ease: [0.25, 0.46, 0.45, 0.94],
    },
  },
  exit: {
    clipPath: 'inset(0 50% 0 50%)',
    opacity: 0,
    transition: {
      duration: TIMING.panelTransition / 1000,
      ease: [0.25, 0.46, 0.45, 0.94],
    },
  },
};

// Menu item stagger
export const menuContainerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

export const menuItemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: 'easeOut' as const },
  },
};

// Section content stagger
export const sectionContainerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.3,
    },
  },
};

export const sectionItemVariants: Variants = {
  hidden: { opacity: 0, y: 15 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: 'easeOut' as const },
  },
};
