"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface TimelineNodeProps {
  index: number;
  isActive?: boolean;
  className?: string;
}

/**
 * Individual timeline node with pulse animation
 */
export function TimelineNode({
  index,
  isActive = false,
  className,
}: TimelineNodeProps): React.JSX.Element {
  return (
    <motion.div
      className={cn(
        "relative w-4 h-4 rounded-full border-2 border-primary bg-background z-10",
        isActive && "bg-primary",
        className,
      )}
      initial={{ scale: 0, opacity: 0 }}
      whileInView={{ scale: 1, opacity: 1 }}
      viewport={{ once: true }}
      transition={{
        duration: 0.4,
        delay: index * 0.15, // Stagger based on index
        ease: "easeOut",
      }}
    >
      {/* Pulse effect */}
      <motion.div
        className="absolute inset-0 rounded-full border-2 border-primary"
        initial={{ scale: 1, opacity: 0.8 }}
        animate={{
          scale: [1, 1.5, 1],
          opacity: [0.8, 0, 0.8],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          delay: index * 0.15,
          ease: "easeInOut",
        }}
      />
    </motion.div>
  );
}
