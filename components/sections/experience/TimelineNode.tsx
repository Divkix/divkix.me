"use client";

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
    <div
      className={cn(
        "relative w-4 h-4 rounded-full border-2 border-primary bg-background z-10 animate-[timeline-node-appear_0.4s_ease-out_forwards]",
        isActive && "bg-primary",
        className,
      )}
      style={{
        animationDelay: `${index * 0.15}s`,
        opacity: 0,
        transform: "scale(0)",
      }}
    >
      {/* Pulse effect */}
      <div
        className="absolute inset-0 rounded-full border-2 border-primary animate-[timeline-pulse_2s_ease-in-out_infinite]"
        style={{
          animationDelay: `${index * 0.15}s`,
        }}
      />
    </div>
  );
}
