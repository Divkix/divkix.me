"use client"

import { RefObject, useEffect, useState } from "react"
import { useScroll, useTransform, MotionValue } from "framer-motion"
import { usePrefersReducedMotion } from "./use-interactive-animations"

interface ParallaxReturn {
  y: MotionValue<number>
  scrollYProgress: MotionValue<number>
}

/**
 * Hook to create parallax scroll effect
 * @param speed - Parallax speed multiplier (0.3-0.7 recommended). Lower = slower movement
 * @param ref - Optional reference to specific element, defaults to viewport
 * @returns Object containing y motion value for transform and scrollYProgress
 */
export function useParallax(
  speed: number = 0.5,
  ref?: RefObject<HTMLElement>
): ParallaxReturn {
  const [isMobile, setIsMobile] = useState<boolean>(false)
  const prefersReducedMotion = usePrefersReducedMotion()

  // Detect mobile devices with debounced resize handler
  useEffect(() => {
    const checkMobile = (): void => {
      setIsMobile(window.innerWidth < 768)
    }

    checkMobile()

    let resizeTimeout: NodeJS.Timeout
    const handleResize = () => {
      clearTimeout(resizeTimeout)
      resizeTimeout = setTimeout(checkMobile, 150)
    }

    window.addEventListener("resize", handleResize, { passive: true })

    return () => {
      window.removeEventListener("resize", handleResize)
      clearTimeout(resizeTimeout)
    }
  }, [])

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  })

  // Calculate parallax offset
  // Multiply by viewport height and speed factor for smooth movement
  const y = useTransform(
    scrollYProgress,
    [0, 1],
    [0, -(speed * 200)] // Negative for upward movement
  )

  // Disable parallax on mobile or if user prefers reduced motion
  const disabledY = useTransform(() => 0)

  return {
    y: isMobile || prefersReducedMotion ? disabledY : y,
    scrollYProgress,
  }
}
