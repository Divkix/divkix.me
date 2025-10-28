"use client";

import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { ReactNode } from "react";

interface ScrollRevealProps {
  children: ReactNode;
  delay?: number;
  duration?: number;
  className?: string;
  threshold?: number;
}

export function ScrollReveal({
  children,
  delay = 0,
  duration = 0.6,
  className,
  threshold = 0.1,
}: ScrollRevealProps) {
  const [ref, inView] = useInView({
    threshold,
    triggerOnce: true,
  });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={
        inView
          ? {
              opacity: 1,
              y: 0,
              transition: { duration, delay, ease: "easeOut" },
            }
          : { opacity: 0, y: 50 }
      }
      className={className}
    >
      {children}
    </motion.div>
  );
}
