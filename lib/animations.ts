import { Variants } from "framer-motion";

// Timing constants for consistency
const TIMING = {
  fast: 0.3,
  medium: 0.8,
  slow: 1.2,
  verySlow: 1.5,
  stagger: 0.15,
  staggerDelay: 0.2,
  hover: 0.4,
  tap: 0.15,
};

export const fadeInUp: Variants = {
  hidden: {
    opacity: 0,
    y: 20,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: TIMING.medium,
      ease: [0.25, 0.1, 0.25, 1],
    },
  },
};

export const fadeInDown: Variants = {
  hidden: {
    opacity: 0,
    y: -20,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: TIMING.medium,
      ease: [0.25, 0.1, 0.25, 1],
    },
  },
};

export const fadeIn: Variants = {
  hidden: {
    opacity: 0,
  },
  visible: {
    opacity: 1,
    transition: {
      duration: TIMING.medium,
      ease: "easeOut",
    },
  },
};

export const scaleIn: Variants = {
  hidden: {
    opacity: 0,
    scale: 0.9,
  },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: TIMING.medium,
      ease: [0.34, 1.56, 0.64, 1],
    },
  },
};

export const slideInLeft: Variants = {
  hidden: {
    opacity: 0,
    x: -50,
  },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: TIMING.slow,
      ease: [0.25, 0.1, 0.25, 1],
    },
  },
};

export const slideInRight: Variants = {
  hidden: {
    opacity: 0,
    x: 50,
  },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: TIMING.slow,
      ease: [0.25, 0.1, 0.25, 1],
    },
  },
};

export const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: TIMING.stagger,
      delayChildren: TIMING.staggerDelay,
    },
  },
};

export const staggerItem: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: TIMING.medium,
      ease: [0.25, 0.1, 0.25, 1],
    },
  },
};

export const hoverScale = {
  scale: 1.05,
  transition: {
    duration: TIMING.hover,
    ease: [0.34, 1.56, 0.64, 1],
  },
};

export const hoverLift = {
  y: -5,
  transition: {
    duration: TIMING.hover,
    ease: [0.34, 1.56, 0.64, 1],
  },
};

export const tapScale = {
  scale: 0.95,
  transition: {
    duration: TIMING.tap,
    ease: "easeInOut",
  },
};

export const floatAnimation: Variants = {
  initial: {
    y: 0,
  },
  animate: {
    y: [-10, 10, -10],
    transition: {
      duration: 4,
      repeat: Infinity,
      ease: "easeInOut",
    },
  },
};

export const rotateAnimation: Variants = {
  initial: {
    rotate: 0,
  },
  animate: {
    rotate: 360,
    transition: {
      duration: 30,
      repeat: Infinity,
      ease: "linear",
    },
  },
};

export const pulseAnimation: Variants = {
  initial: {
    scale: 1,
  },
  animate: {
    scale: [1, 1.05, 1],
    transition: {
      duration: 3,
      repeat: Infinity,
      ease: "easeInOut",
    },
  },
};

export const drawLine: Variants = {
  hidden: {
    pathLength: 0,
    opacity: 0,
  },
  visible: {
    pathLength: 1,
    opacity: 1,
    transition: {
      pathLength: { duration: 2.5, ease: "easeInOut" },
      opacity: { duration: 0.8 },
    },
  },
};

export { TIMING };
