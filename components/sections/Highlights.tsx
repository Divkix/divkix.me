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

  // Extract number and suffix
  const match = value.match(/^(\d+)(\+|M\+|K\+)?$/)
  const targetNumber = match ? parseInt(match[1]) : 0
  const suffix = match ? (match[2] || "") : value

  useEffect(() => {
    if (isInView && targetNumber) {
      let start = 0
      const duration = 2000
      const increment = targetNumber / (duration / 16)

      const timer = setInterval(() => {
        start += increment
        if (start >= targetNumber) {
          setCount(targetNumber)
          clearInterval(timer)
        } else {
          setCount(Math.floor(start))
        }
      }, 16)

      return () => clearInterval(timer)
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
            <Card className="p-8 text-center glass-surface">
              <div className="text-4xl font-display font-bold mb-2">
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
