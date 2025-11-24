"use client";

import { motion } from "framer-motion";
import { type ReactNode, useRef } from "react";
import { useMagneticEffect } from "@/lib/hooks/use-interactive-animations";
import { cn } from "@/lib/utils";

interface MagneticWrapperProps {
  children: ReactNode;
  className?: string;
  strength?: number;
}

/**
 * Magnetic wrapper component that follows cursor movement
 * Automatically disables on touch devices and respects reduced motion preferences
 * @param children - Content to wrap
 * @param className - Additional CSS classes
 * @param strength - Magnetic strength (0-1), default 0.3
 */
export function MagneticWrapper({
  children,
  className,
  strength = 0.3,
}: MagneticWrapperProps) {
  const ref = useRef<HTMLDivElement>(null);
  const { x, y } = useMagneticEffect(ref, strength);

  return (
    <motion.div
      ref={ref}
      style={{
        x,
        y,
        // Force GPU compositing without will-change
        // Framer Motion adds will-change automatically during animation
        transform: "translate3d(0, 0, 0)",
      }}
      className={cn(className)}
    >
      {children}
    </motion.div>
  );
}
