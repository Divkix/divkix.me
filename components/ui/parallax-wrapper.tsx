"use client";

import { motion } from "framer-motion";
import { useParallax } from "@/lib/hooks/use-parallax";
import { ReactNode, RefObject } from "react";

interface ParallaxWrapperProps {
  children: ReactNode;
  speed?: number;
  className?: string;
  targetRef?: RefObject<HTMLElement>;
}

/**
 * Wrapper component that applies parallax scroll effect to children
 * @param children - Content to apply parallax to
 * @param speed - Parallax speed (0.3-0.7 recommended, default 0.5)
 * @param className - Optional CSS classes
 * @param targetRef - Optional ref to scroll target element
 */
export function ParallaxWrapper({
  children,
  speed = 0.5,
  className,
  targetRef,
}: ParallaxWrapperProps): React.JSX.Element {
  const { y } = useParallax(speed, targetRef);

  return (
    <motion.div style={{ y }} className={className}>
      {children}
    </motion.div>
  );
}
