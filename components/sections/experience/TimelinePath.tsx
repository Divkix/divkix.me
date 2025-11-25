"use client";

import { motion } from "framer-motion";

interface TimelinePathProps {
  nodeCount: number;
  className?: string;
}

/**
 * SVG path connecting timeline nodes vertically with drawing animation
 */
export function TimelinePath({
  nodeCount,
  className,
}: TimelinePathProps): React.JSX.Element {
  // Calculate path height based on number of nodes
  // Each node is approximately 150px apart
  const pathHeight = Math.max(100, (nodeCount - 1) * 150);

  return (
    <svg
      className={className}
      width="2"
      height={pathHeight}
      viewBox={`0 0 2 ${pathHeight}`}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <motion.path
        d={`M1 0 L1 ${pathHeight}`}
        stroke="hsl(var(--primary))"
        strokeWidth="2"
        strokeLinecap="round"
        initial={{ pathLength: 0 }}
        whileInView={{ pathLength: 1 }}
        viewport={{ once: true }}
        transition={{
          duration: 1.5,
          ease: "easeInOut",
        }}
      />
    </svg>
  );
}
