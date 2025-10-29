"use client"

import { useEffect, useState, RefObject } from "react"
import {
  useMotionValue,
  useSpring,
  useTransform,
  useScroll,
  SpringOptions,
} from "framer-motion"

/**
 * Spring configuration for smooth, natural animations
 */
const springConfig: SpringOptions = {
  damping: 20,
  stiffness: 300,
  mass: 0.5,
}

/**
 * Hook to track mouse position relative to an element
 * @param ref - Reference to the element to track mouse position for
 * @returns Object containing mouseX and mouseY motion values
 */
export function useMousePosition(ref: RefObject<HTMLElement | null>) {
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)

  useEffect(() => {
    const element = ref.current
    if (!element) return

    const handleMouseMove = (e: MouseEvent) => {
      const rect = element.getBoundingClientRect()
      const x = e.clientX - rect.left - rect.width / 2
      const y = e.clientY - rect.top - rect.height / 2
      mouseX.set(x)
      mouseY.set(y)
    }

    const handleMouseLeave = () => {
      mouseX.set(0)
      mouseY.set(0)
    }

    element.addEventListener("mousemove", handleMouseMove)
    element.addEventListener("mouseleave", handleMouseLeave)

    return () => {
      element.removeEventListener("mousemove", handleMouseMove)
      element.removeEventListener("mouseleave", handleMouseLeave)
    }
  }, [ref, mouseX, mouseY])

  return { mouseX, mouseY }
}

/**
 * Hook to track page scroll progress from 0 to 1
 * @returns Scroll progress value (0-1) and smoothed spring value
 */
export function useScrollProgress() {
  const { scrollYProgress } = useScroll()
  const smoothProgress = useSpring(scrollYProgress, springConfig)

  return { scrollProgress: scrollYProgress, smoothProgress }
}

/**
 * Hook to detect if user prefers reduced motion
 * @returns Boolean indicating if reduced motion is preferred
 */
export function usePrefersReducedMotion(): boolean {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false)

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)")
    setPrefersReducedMotion(mediaQuery.matches)

    const handleChange = (e: MediaQueryListEvent) => {
      setPrefersReducedMotion(e.matches)
    }

    mediaQuery.addEventListener("change", handleChange)
    return () => mediaQuery.removeEventListener("change", handleChange)
  }, [])

  return prefersReducedMotion
}

/**
 * Hook to create magnetic effect on hover - element follows cursor
 * @param ref - Reference to the element
 * @param strength - Magnetic strength (0-1), default 0.3
 * @returns Object containing x and y spring values for transform
 */
export function useMagneticEffect(
  ref: RefObject<HTMLElement | null>,
  strength: number = 0.3
) {
  const x = useMotionValue(0)
  const y = useMotionValue(0)

  const springX = useSpring(x, springConfig)
  const springY = useSpring(y, springConfig)

  const prefersReducedMotion = usePrefersReducedMotion()

  useEffect(() => {
    const element = ref.current
    if (!element || prefersReducedMotion) return

    // Check if device is touch-capable
    const isTouchDevice = "ontouchstart" in window || navigator.maxTouchPoints > 0

    if (isTouchDevice) return

    const handleMouseMove = (e: MouseEvent) => {
      const rect = element.getBoundingClientRect()
      const centerX = rect.left + rect.width / 2
      const centerY = rect.top + rect.height / 2

      const distanceX = (e.clientX - centerX) * strength
      const distanceY = (e.clientY - centerY) * strength

      x.set(distanceX)
      y.set(distanceY)
    }

    const handleMouseLeave = () => {
      x.set(0)
      y.set(0)
    }

    element.addEventListener("mousemove", handleMouseMove)
    element.addEventListener("mouseleave", handleMouseLeave)

    return () => {
      element.removeEventListener("mousemove", handleMouseMove)
      element.removeEventListener("mouseleave", handleMouseLeave)
    }
  }, [ref, strength, x, y, prefersReducedMotion])

  return { x: springX, y: springY }
}

/**
 * Hook to create 3D tilt effect based on cursor position
 * @param ref - Reference to the element
 * @param maxTilt - Maximum tilt angle in degrees, default 15
 * @returns Object containing rotateX, rotateY spring values and scale
 */
export function use3DTilt(ref: RefObject<HTMLElement | null>, maxTilt: number = 15) {
  const x = useMotionValue(0)
  const y = useMotionValue(0)

  const rotateX = useSpring(
    useTransform(y, [-0.5, 0.5], [maxTilt, -maxTilt]),
    springConfig
  )
  const rotateY = useSpring(
    useTransform(x, [-0.5, 0.5], [-maxTilt, maxTilt]),
    springConfig
  )

  const prefersReducedMotion = usePrefersReducedMotion()

  useEffect(() => {
    const element = ref.current
    if (!element || prefersReducedMotion) return

    // Check if device is touch-capable
    const isTouchDevice = "ontouchstart" in window || navigator.maxTouchPoints > 0

    if (isTouchDevice) return

    const handleMouseMove = (e: MouseEvent) => {
      const rect = element.getBoundingClientRect()
      const centerX = rect.left + rect.width / 2
      const centerY = rect.top + rect.height / 2

      // Normalize to -0.5 to 0.5 range
      const normalizedX = (e.clientX - centerX) / rect.width
      const normalizedY = (e.clientY - centerY) / rect.height

      x.set(normalizedX)
      y.set(normalizedY)
    }

    const handleMouseLeave = () => {
      x.set(0)
      y.set(0)
    }

    element.addEventListener("mousemove", handleMouseMove)
    element.addEventListener("mouseleave", handleMouseLeave)

    return () => {
      element.removeEventListener("mousemove", handleMouseMove)
      element.removeEventListener("mouseleave", handleMouseLeave)
    }
  }, [ref, x, y, prefersReducedMotion])

  return { rotateX, rotateY }
}
