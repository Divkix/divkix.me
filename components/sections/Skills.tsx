"use client"

import { motion } from "framer-motion"
import { Badge } from "@/components/ui/badge"
import { siteConfig } from "@/content/site.config"
import { staggerContainer, staggerItem } from "@/lib/animations"

export function Skills() {
  return (
    <section className="container mx-auto px-4 py-20">
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
        className="space-y-12"
      >
        <motion.div variants={staggerItem} className="text-center space-y-4">
          <h2 className="text-4xl font-display font-bold">Skills</h2>
        </motion.div>

        <motion.div
          variants={staggerItem}
          className="flex flex-wrap justify-center gap-3 max-w-3xl mx-auto"
        >
          {siteConfig.skills.map((skill) => (
            <Badge key={skill} variant="secondary" className="text-base px-4 py-2">
              {skill}
            </Badge>
          ))}
        </motion.div>
      </motion.div>
    </section>
  )
}
