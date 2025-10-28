"use client"

import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { siteConfig } from "@/content/site.config"
import { staggerContainer, staggerItem } from "@/lib/animations"

export function Experience() {
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
          <h2 className="text-4xl font-display font-bold">Experience</h2>
        </motion.div>

        <div className="max-w-3xl mx-auto space-y-8">
          {/* Education */}
          <div className="space-y-4">
            <h3 className="text-2xl font-display font-semibold">Education</h3>
            {siteConfig.education.map((edu, index) => (
              <motion.div key={index} variants={staggerItem}>
                <Card className="glass-surface">
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <CardTitle className="text-lg">{edu.title}</CardTitle>
                      <span className="text-sm text-foreground/60">{edu.year}</span>
                    </div>
                  </CardHeader>
                  {("focus" in edu || "honors" in edu) && (
                    <CardContent>
                      <p className="text-sm text-foreground/60">
                        {"focus" in edu ? edu.focus : "honors" in edu ? edu.honors : ""}
                      </p>
                    </CardContent>
                  )}
                </Card>
              </motion.div>
            ))}
          </div>

          {/* Work Experience */}
          <div className="space-y-4">
            <h3 className="text-2xl font-display font-semibold">Work</h3>
            {siteConfig.experience.map((exp, index) => (
              <motion.div key={index} variants={staggerItem}>
                <Card className="glass-surface">
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <CardTitle className="text-lg">{exp.title}</CardTitle>
                      <span className="text-sm text-foreground/60">{exp.year}</span>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2 list-disc list-inside text-sm text-foreground/70">
                      {exp.highlights.map((highlight, i) => (
                        <li key={i}>{highlight}</li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>
    </section>
  )
}
