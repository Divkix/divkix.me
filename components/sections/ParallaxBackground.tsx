"use client"

import { useEffect, useState, useRef } from "react"
import { motion, useMotionValue, useScroll, useTransform } from "framer-motion"
import { usePrefersReducedMotion } from "@/lib/hooks/use-interactive-animations"

interface ParallaxOrbProps {
  mouseX: ReturnType<typeof useMotionValue<number>>
  mouseY: ReturnType<typeof useMotionValue<number>>
  scrollProgress: ReturnType<typeof useMotionValue<number>>
  scrollSpeed: number
  mouseMultiplier: number
  color: string
  size: number
  position: { top?: string; bottom?: string; left?: string; right?: string }
  blur: number
  opacity: number
  disableMouseParallax: boolean
  prefersReducedMotion: boolean
}

function ParallaxOrb({
  mouseX,
  mouseY,
  scrollProgress,
  scrollSpeed,
  mouseMultiplier,
  color,
  size,
  position,
  blur,
  opacity,
  disableMouseParallax,
  prefersReducedMotion,
}: ParallaxOrbProps) {
  // Scroll-based parallax (vertical movement)
  const scrollY = useTransform(
    scrollProgress,
    [0, 1],
    prefersReducedMotion ? [0, 0] : [0, -scrollSpeed * 200]
  )

  // Mouse-based parallax (horizontal and vertical movement)
  const mouseParallaxX = useTransform(
    mouseX,
    [-50, 50],
    disableMouseParallax ? [0, 0] : [-mouseMultiplier * 50, mouseMultiplier * 50]
  )
  const mouseParallaxY = useTransform(
    mouseY,
    [-50, 50],
    disableMouseParallax ? [0, 0] : [-mouseMultiplier * 50, mouseMultiplier * 50]
  )

  return (
    <motion.div
      className="pointer-events-none absolute rounded-full"
      style={{
        width: size,
        height: size,
        ...position,
        background: `radial-gradient(circle at center, ${color}, transparent 70%)`,
        filter: `blur(${blur}px)`,
        opacity,
        y: scrollY,
        x: mouseParallaxX,
        translateY: mouseParallaxY,
        // Force GPU compositing with translate3d instead of will-change
        // will-change is automatically added by Framer Motion during animation
        transform: "translate3d(0, 0, 0)",
      }}
      transition={{
        type: "spring",
        damping: 20,
        stiffness: 150,
        mass: 0.5,
      }}
      aria-hidden="true"
    />
  )
}

export function ParallaxBackground() {
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)
  const prefersReducedMotion = usePrefersReducedMotion()
  const [isTouchDevice, setIsTouchDevice] = useState(false)
  const rafIdRef = useRef<number | null>(null)

  // Detect touch devices
  useEffect(() => {
    if (typeof window === "undefined") return

    const checkTouchDevice = () => {
      setIsTouchDevice(
        "ontouchstart" in window ||
          navigator.maxTouchPoints > 0 ||
          // @ts-ignore - for older browsers
          navigator.msMaxTouchPoints > 0
      )
    }

    checkTouchDevice()

    // Debounced resize handler
    let resizeTimeout: NodeJS.Timeout
    const handleResize = () => {
      clearTimeout(resizeTimeout)
      resizeTimeout = setTimeout(checkTouchDevice, 150)
    }

    window.addEventListener("resize", handleResize, { passive: true })
    return () => {
      window.removeEventListener("resize", handleResize)
      clearTimeout(resizeTimeout)
    }
  }, [])

  // Track mouse position for desktop parallax with RAF throttling
  useEffect(() => {
    if (typeof window === "undefined") return
    if (isTouchDevice || prefersReducedMotion) return

    const handleMouseMove = (e: MouseEvent) => {
      // Use RAF to throttle updates to 60fps max
      if (rafIdRef.current !== null) return

      rafIdRef.current = requestAnimationFrame(() => {
        // Convert mouse position to -50 to 50 range
        const x = (e.clientX / window.innerWidth - 0.5) * 100
        const y = (e.clientY / window.innerHeight - 0.5) * 100
        mouseX.set(x)
        mouseY.set(y)
        rafIdRef.current = null
      })
    }

    window.addEventListener("mousemove", handleMouseMove, { passive: true })
    return () => {
      window.removeEventListener("mousemove", handleMouseMove)
      if (rafIdRef.current !== null) {
        cancelAnimationFrame(rafIdRef.current)
      }
    }
  }, [isTouchDevice, prefersReducedMotion, mouseX, mouseY])

  // Track scroll progress for scroll-based parallax
  const { scrollYProgress } = useScroll()

  // Disable all parallax effects if reduced motion is preferred
  const disableMouseParallax = isTouchDevice || prefersReducedMotion

  // Orb configurations - each layer with different speeds for depth
  const orbs = [
    // Background layer - largest, slowest, furthest back
    {
      color: "oklch(0.7 0.15 240 / 1)",
      size: 700,
      position: { top: "-20%", left: "-10%" },
      blur: 100,
      opacity: 0.15,
      scrollSpeed: 0.8,
      mouseMultiplier: 0.5,
      key: "orb-1",
    },
    // Mid-background layer
    {
      color: "oklch(0.65 0.2 330 / 1)",
      size: 500,
      position: { top: "10%", right: "-5%" },
      blur: 90,
      opacity: 0.2,
      scrollSpeed: 0.6,
      mouseMultiplier: 0.7,
      key: "orb-2",
    },
    // Mid-foreground layer
    {
      color: "oklch(0.68 0.12 180 / 1)",
      size: 450,
      position: { bottom: "15%", left: "5%" },
      blur: 80,
      opacity: 0.25,
      scrollSpeed: 0.4,
      mouseMultiplier: 1,
      key: "orb-3",
    },
    // Foreground layer - smallest, fastest, closest
    {
      color: "oklch(0.72 0.18 60 / 1)",
      size: 350,
      position: { top: "5%", right: "20%" },
      blur: 70,
      opacity: 0.3,
      scrollSpeed: 0.3,
      mouseMultiplier: 1.5,
      key: "orb-4",
    },
    // Additional accent orb for mobile
    {
      color: "oklch(0.68 0.16 270 / 1)",
      size: 400,
      position: { bottom: "5%", right: "10%" },
      blur: 85,
      opacity: 0.18,
      scrollSpeed: 0.5,
      mouseMultiplier: 0.8,
      key: "orb-5",
    },
  ]

  // Reduce orb count on mobile for performance
  const displayOrbs = isTouchDevice ? orbs.slice(0, 3) : orbs

  return (
    <div
      className="absolute top-0 left-0 w-full h-[calc(100vh+50rem)] z-0 pointer-events-none overflow-hidden"
      aria-hidden="true"
    >
      {/* Parallax orbs */}
      <div className="absolute inset-0">
        {displayOrbs.map((orbConfig) => (
          <ParallaxOrb
            key={orbConfig.key}
            mouseX={mouseX}
            mouseY={mouseY}
            scrollProgress={scrollYProgress}
            scrollSpeed={orbConfig.scrollSpeed}
            mouseMultiplier={orbConfig.mouseMultiplier}
            color={orbConfig.color}
            size={isTouchDevice ? orbConfig.size * 0.7 : orbConfig.size}
            position={orbConfig.position}
            blur={isTouchDevice ? orbConfig.blur * 0.5 : orbConfig.blur}
            opacity={orbConfig.opacity}
            disableMouseParallax={disableMouseParallax}
            prefersReducedMotion={prefersReducedMotion}
          />
        ))}
      </div>

      {/* Bottom gradient fade for smooth blend into Projects section */}
      <div
        className="pointer-events-none absolute bottom-0 left-0 right-0 h-48 bg-gradient-to-t from-background to-transparent"
        aria-hidden="true"
      />

      {/* Dark mode adjustment overlay */}
      <div
        className="pointer-events-none absolute inset-0 bg-background/10 dark:bg-background/20"
        aria-hidden="true"
      />
    </div>
  )
}
