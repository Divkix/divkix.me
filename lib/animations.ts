import type { Variants } from "framer-motion"

/**
 * Animation variants optimized for GPU compositing
 * Uses only transform and opacity for hardware acceleration
 * Avoids layout shifts that cause reflows
 */

export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      duration: 0.5,
      ease: "easeOut" as const
    }
  },
}

export const slideUp: Variants = {
  hidden: {
    opacity: 0,
    // Use translate3d for GPU acceleration
    y: 20,
  },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: "easeOut" as const
    }
  },
}

export const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.05, // Reduced from 0.1s for faster rendering
      delayChildren: 0,      // Removed initial delay
    },
  },
}

export const staggerItem: Variants = {
  hidden: {
    opacity: 0,
    // Use translate3d for GPU acceleration via y transform
    y: 20,
  },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: "easeOut" as const
    }
  },
}

/**
 * Optimized hero animations for LCP performance
 * Minimal delays and durations to ensure content paints quickly
 */
export const heroStaggerContainer: Variants = {
  hidden: { opacity: 1 }, // Start visible for LCP
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.01, // Reduced from 0.03s for faster FCP
      delayChildren: 0,      // No initial delay
    },
  },
}

export const heroStaggerItem: Variants = {
  hidden: {
    opacity: 0,
    y: 8, // Reduced from 20px for subtler effect
  },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.25, // Reduced from 0.5s
      ease: "easeOut" as const
    }
  },
}

/**
 * Instant variant for LCP-critical content (h1)
 * Renders immediately with no delay for optimal LCP
 */
export const heroTitle: Variants = {
  hidden: {
    opacity: 1, // Start visible immediately
    y: 0,
  },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.2, // Fast fade-in only
      ease: "easeOut" as const
    }
  },
}

/**
 * Scale animation with GPU acceleration
 * Used for modal/popup appearances
 */
export const scaleIn: Variants = {
  hidden: {
    opacity: 0,
    scale: 0.95,
  },
  show: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.3,
      ease: "easeOut" as const
    }
  },
}

/**
 * Slide in from right
 * GPU-accelerated with translateX
 */
export const slideInRight: Variants = {
  hidden: {
    opacity: 0,
    x: 50,
  },
  show: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.4,
      ease: "easeOut" as const
    }
  },
}

/**
 * Slide in from left
 * GPU-accelerated with translateX
 */
export const slideInLeft: Variants = {
  hidden: {
    opacity: 0,
    x: -50,
  },
  show: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.4,
      ease: "easeOut" as const
    }
  },
}
