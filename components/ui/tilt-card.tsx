"use client";

import { motion } from "framer-motion";
import { ReactNode, useRef } from "react";
import { use3DTilt } from "@/lib/hooks/use-interactive-animations";
import { cn } from "@/lib/utils";

interface TiltCardProps {
  children: ReactNode;
  className?: string;
  maxTilt?: number;
}

/**
 * 3D tilt card component that responds to mouse movement
 * Automatically disables on touch devices and respects reduced motion preferences
 * @param children - Card content
 * @param className - Additional CSS classes
 * @param maxTilt - Maximum tilt angle in degrees (default: 12)
 */
export function TiltCard({ children, className, maxTilt = 12 }: TiltCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const { rotateX, rotateY } = use3DTilt(ref, maxTilt);

  return (
    <motion.div
      ref={ref}
      style={{
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
        perspective: 1000,
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
