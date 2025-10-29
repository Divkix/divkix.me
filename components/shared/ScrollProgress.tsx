"use client"

import { motion } from "framer-motion"
import { useScrollProgress } from "@/lib/hooks/use-interactive-animations"

/**
 * Scroll progress indicator component
 * Displays a fixed bar at the top of the viewport showing scroll progress
 */
export function ScrollProgress() {
  const { smoothProgress } = useScrollProgress()

  return (
    <motion.div
      className="fixed top-0 left-0 right-0 h-[3px] bg-primary origin-left z-[100]"
      style={{ scaleX: smoothProgress }}
      initial={{ scaleX: 0 }}
    />
  )
}
