"use client"

import { RefObject, useEffect, useState } from "react"
import { motion, useScroll, useSpring, useTransform } from "framer-motion"
import { cn } from "@/lib/utils"

interface ReadingProgressProps {
  articleRef: RefObject<HTMLElement | null>
  readingTime: number
  className?: string
}

export function ReadingProgress({
  articleRef,
  readingTime,
  className,
}: ReadingProgressProps): React.JSX.Element | null {
  const [isVisible, setIsVisible] = useState<boolean>(false)
  const [isMounted, setIsMounted] = useState<boolean>(false)

  const { scrollYProgress } = useScroll({
    target: articleRef,
    offset: ["start end", "end end"],
  })

  // Smooth spring animation for progress
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  })

  // Transform to percentage
  const percentComplete = useTransform(smoothProgress, [0, 1], [0, 100])

  // Transform for stroke dash offset (must be called at top level)
  const strokeDashOffset = useTransform(percentComplete, [0, 100], [100, 0])

  // Calculate time remaining
  const [timeRemaining, setTimeRemaining] = useState<number>(readingTime)
  const [percent, setPercent] = useState<number>(0)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  useEffect(() => {
    const unsubscribe = smoothProgress.on("change", (latest) => {
      const remaining = Math.max(0, readingTime * (1 - latest))
      const pct = Math.round(latest * 100)

      setTimeRemaining(remaining)
      setPercent(pct)

      // Show progress bar when user has scrolled into content (>1%) and not at end (<99%)
      setIsVisible(pct > 1 && pct < 99)
    })

    return () => unsubscribe()
  }, [smoothProgress, readingTime])

  // Prevent hydration mismatch by not rendering until mounted
  if (!isMounted || !isVisible) {
    return null
  }

  return (
    <div
      className={cn(
        "fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-sm border-b",
        className
      )}
    >
      {/* Progress bar */}
      <motion.div
        className="h-1 bg-primary origin-left"
        style={{ scaleX: smoothProgress }}
      />

      {/* Progress info */}
      <div className="container mx-auto px-4 py-2 flex items-center justify-between text-sm">
        <div className="flex items-center gap-3">
          {/* Circular progress indicator */}
          <div className="relative w-10 h-10">
            <svg className="w-10 h-10 transform -rotate-90" viewBox="0 0 36 36">
              <circle
                className="stroke-current text-muted"
                strokeWidth="3"
                fill="none"
                cx="18"
                cy="18"
                r="16"
              />
              <motion.circle
                className="stroke-current text-primary"
                strokeWidth="3"
                fill="none"
                cx="18"
                cy="18"
                r="16"
                strokeDasharray="100"
                style={{
                  strokeDashoffset,
                }}
                strokeLinecap="round"
              />
            </svg>
            <div className="absolute inset-0 flex items-center justify-center text-xs font-semibold">
              {percent}%
            </div>
          </div>

          {/* Time remaining */}
          <span className="text-foreground/60">
            {timeRemaining < 1
              ? "Less than 1 min left"
              : `${Math.ceil(timeRemaining)} min left`}
          </span>
        </div>
      </div>
    </div>
  )
}
