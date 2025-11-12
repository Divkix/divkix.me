"use client"

import { motion, useInView } from "framer-motion"
import { Card } from "@/components/ui/card"
import { siteConfig } from "@/content/site.config"
import { staggerContainer, staggerItem } from "@/lib/animations"
import { useEffect, useRef, useState } from "react"

const highlights = [
  { label: "Users", value: siteConfig.facts.impact },
  { label: "Projects", value: siteConfig.facts.projects },
  { label: "OSS Contributions", value: siteConfig.facts.oss },
]

function CountUp({ value }: { value: string }) {
  const [count, setCount] = useState(0)
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true })
  const rafIdRef = useRef<number | null>(null)
  const startTimeRef = useRef<number | null>(null)

  // Extract number and suffix
  const match = value.match(/^(\d+)(\+|M\+|K\+)?$/)
  const targetNumber = match ? parseInt(match[1]) : 0
  const suffix = match ? (match[2] || "") : value

  useEffect(() => {
    if (isInView && targetNumber) {
      const duration = 2000 // 2 seconds

      const animate = (currentTime: number) => {
        if (startTimeRef.current === null) {
          startTimeRef.current = currentTime
        }

        const elapsed = currentTime - startTimeRef.current
        const progress = Math.min(elapsed / duration, 1)

        // Easing function for smoother animation
        const easeOutQuart = 1 - Math.pow(1 - progress, 4)
        const newCount = Math.floor(easeOutQuart * targetNumber)

        setCount(newCount)

        if (progress < 1) {
          rafIdRef.current = requestAnimationFrame(animate)
        } else {
          setCount(targetNumber)
        }
      }

      rafIdRef.current = requestAnimationFrame(animate)

      return () => {
        if (rafIdRef.current !== null) {
          cancelAnimationFrame(rafIdRef.current)
        }
      }
    }
  }, [isInView, targetNumber])

  return (
    <div ref={ref}>
      {targetNumber ? `${count.toLocaleString()}${suffix}` : value}
    </div>
  )
}

export function Highlights() {
  return (
    <section className="container mx-auto px-4 py-20">
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
        className="grid md:grid-cols-3 gap-6"
      >
        {highlights.map((highlight) => (
          <motion.div key={highlight.label} variants={staggerItem}>
            <Card className="p-8 text-center glass-surface" style={{ contain: "layout" }}>
              <div
                className="text-4xl font-display font-bold mb-2"
                style={{
                  fontVariantNumeric: "tabular-nums",
                  minWidth: "8ch", // Reserve space for largest number
                }}
              >
                <CountUp value={highlight.value} />
              </div>
              <div className="text-sm text-foreground/60">{highlight.label}</div>
            </Card>
          </motion.div>
        ))}
      </motion.div>
    </section>
  )
}
