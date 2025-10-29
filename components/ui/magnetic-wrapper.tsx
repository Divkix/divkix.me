"use client"

import { useRef, ReactNode } from "react"
import { motion } from "framer-motion"
import { useMagneticEffect } from "@/lib/hooks/use-interactive-animations"
import { cn } from "@/lib/utils"

interface MagneticWrapperProps {
  children: ReactNode
  className?: string
  strength?: number
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
  const ref = useRef<HTMLDivElement>(null)
  const { x, y } = useMagneticEffect(ref, strength)

  return (
    <motion.div
      ref={ref}
      style={{ x, y }}
      className={cn("will-change-transform", className)}
    >
      {children}
    </motion.div>
  )
}
