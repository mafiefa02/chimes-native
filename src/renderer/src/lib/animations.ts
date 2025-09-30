import { Variants } from 'motion/react';

export const containerVariants: Variants = {
  initial: { opacity: 0 },
  animate: { opacity: 1, transition: { staggerChildren: 0.1, ease: 'easeIn' } },
  exit: {
    opacity: 0,
    transition: {
      staggerChildren: 0.035,
      staggerDirection: -1,
      ease: 'easeOut',
    },
  },
};

export const itemVariantsFromBottom: Variants = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -20 },
};

export const itemVariantsFromTop: Variants = {
  initial: { opacity: 0, y: -20 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -20 },
};

export const itemVariantsX: Variants = {
  initial: { opacity: 0, x: -20 },
  animate: { opacity: 1, x: 0, transition: { duration: 0.1, ease: 'easeOut' } },
  exit: { opacity: 0, x: 20, transition: { duration: 0.15, ease: 'easeIn' } },
};

export const itemVariantsXFromRight: Variants = {
  initial: { opacity: 0, x: 20 },
  animate: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: 20 },
};

export const breadcrumbItem: Variants = {
  initial: { opacity: 0, x: -20 },
  animate: { opacity: 1, x: 0, transition: { ease: 'backOut' } },
  exit: { opacity: 0, x: -20, transition: { ease: 'backOut' } },
};

export const upcomingBadge: Variants = {
  initial: { x: 20, opacity: 0 },
  animate: {
    x: 0,
    opacity: 1,
    transition: { duration: 0.3, ease: 'backInOut' },
  },
  exit: { x: 0, opacity: 0, transition: { duration: 0.1 } },
};

export const fadeInOut: Variants = {
  initial: { opacity: 0 },
  animate: { opacity: 1, transition: { type: 'spring', duration: 0.4 } },
  exit: { opacity: 0, transition: { type: 'spring', duration: 0.4 } },
};

export const delayedFadeIn: Variants = {
  initial: { opacity: 0 },
  animate: { opacity: 1, transition: { delay: 0.15, ease: 'easeOut' } },
  exit: { opacity: 0 },
};

export const sidebar: Variants = {
  open: {
    width: '300px',
    transition: { type: 'spring', stiffness: 300, damping: 30 },
  },
  closed: {
    width: '80px',
    transition: { type: 'spring', stiffness: 300, damping: 30 },
  },
};
