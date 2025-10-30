"use client"

import { motion } from "framer-motion"
import { siteConfig } from "@/content/site.config"
import { staggerContainer, staggerItem } from "@/lib/animations"
import { SkillsVisualization } from "./skills/SkillsVisualization"

export function Skills() {
  return (
    <section id="skills" className="container mx-auto px-4 py-20">
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
        className="space-y-12"
      >
        <motion.div variants={staggerItem} className="text-center space-y-4">
          <h2 className="text-4xl font-display font-bold">Skills</h2>
          <p className="text-foreground/60 max-w-2xl mx-auto">
            Technical proficiency across languages, frameworks, databases, and tools.
          </p>
        </motion.div>

        <motion.div variants={staggerItem}>
          <SkillsVisualization skills={siteConfig.skills} />
        </motion.div>
      </motion.div>
    </section>
  )
}
