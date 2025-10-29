"use client"

import { useRef, useEffect } from "react"
import { motion, useMotionValue, useSpring } from "framer-motion"
import { usePrefersReducedMotion } from "@/lib/hooks/use-interactive-animations"

/**
 * Interactive gradient mesh background that follows cursor movement
 * Automatically disables on mobile and respects reduced motion preferences
 */
export function InteractiveGradient() {
  const ref = useRef<HTMLDivElement>(null)
  const mouseX = useMotionValue(50)
  const mouseY = useMotionValue(50)

  const springX = useSpring(mouseX, { damping: 25, stiffness: 100 })
  const springY = useSpring(mouseY, { damping: 25, stiffness: 100 })

  const prefersReducedMotion = usePrefersReducedMotion()

  useEffect(() => {
    if (prefersReducedMotion) return

    // Check if device is touch-capable
    const isTouchDevice = "ontouchstart" in window || navigator.maxTouchPoints > 0

    if (isTouchDevice) return

    const handleMouseMove = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth) * 100
      const y = (e.clientY / window.innerHeight) * 100
      mouseX.set(x)
      mouseY.set(y)
    }

    window.addEventListener("mousemove", handleMouseMove)

    return () => {
      window.removeEventListener("mousemove", handleMouseMove)
    }
  }, [mouseX, mouseY, prefersReducedMotion])

  if (prefersReducedMotion) {
    return null
  }

  return (
    <motion.div
      ref={ref}
      className="fixed inset-0 pointer-events-none"
      style={{
        zIndex: -10,
        opacity: 0.25,
        background: `radial-gradient(circle at ${springX.get()}% ${springY.get()}%, oklch(0.64 0.22 264.5 / 0.3), oklch(0.72 0.20 310 / 0.2), transparent 50%)`,
      }}
      animate={{
        background: `radial-gradient(circle at ${springX.get()}% ${springY.get()}%, oklch(0.64 0.22 264.5 / 0.3), oklch(0.72 0.20 310 / 0.2), transparent 50%)`,
      }}
      transition={{ duration: 0.3 }}
    />
  )
}
