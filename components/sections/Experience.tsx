"use client"

import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { siteConfig } from "@/content/site.config"
import { staggerContainer, staggerItem } from "@/lib/animations"
import { MapPin } from "lucide-react"
import { TimelinePath } from "./experience/TimelinePath"
import { TimelineNode } from "./experience/TimelineNode"

export function Experience() {
  return (
    <section id="experience" className="container mx-auto px-4 py-20">
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

        <div className="max-w-4xl mx-auto space-y-8">
          {/* Education */}
          <div className="space-y-4">
            <h3 className="text-2xl font-display font-semibold">Education</h3>
            <div className="relative">
              {/* Animated timeline for education */}
              <div className="absolute left-2 top-8">
                <TimelinePath nodeCount={siteConfig.education.length} />
              </div>

              {siteConfig.education.map((edu, index) => (
                <motion.div key={index} variants={staggerItem} className="relative">
                  {/* Timeline node */}
                  <div className="absolute left-0 top-6">
                    <TimelineNode index={index} isActive={index === 0} />
                  </div>

                  <div className="pl-10 mb-6">
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
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Work Experience */}
          <div className="space-y-6">
            <h3 className="text-2xl font-display font-semibold">Work</h3>

            {/* Animated timeline for work experience */}
            <div className="relative">
              <div className="absolute left-2 top-8">
                <TimelinePath nodeCount={siteConfig.experience.length} />
              </div>

              {siteConfig.experience.map((company, companyIndex) => (
                <motion.div key={companyIndex} variants={staggerItem} className="relative">
                  {/* Timeline node */}
                  <div className="absolute left-0 top-6">
                    <TimelineNode index={companyIndex} isActive={companyIndex === 0} />
                  </div>

                  <div className="pl-10 mb-8">
                    <Card className="glass-surface">
                      <CardHeader>
                        <div className="space-y-2">
                          <div className="flex justify-between items-start gap-4">
                            <CardTitle className="text-xl">{company.company}</CardTitle>
                            <Badge variant="secondary" className="shrink-0">
                              {company.duration}
                            </Badge>
                          </div>
                          <div className="flex items-center gap-2 text-sm text-foreground/60">
                            <MapPin className="h-4 w-4" />
                            {company.location}
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-6 relative">
                          {/* Timeline connector for positions */}
                          {company.positions.length > 1 && (
                            <div className="absolute left-2 top-8 bottom-8 w-0.5 bg-border" />
                          )}

                          {company.positions.map((position, posIndex) => (
                            <div key={posIndex} className="relative pl-8">
                              {/* Timeline dot for positions */}
                              {company.positions.length > 1 && (
                                <div className="absolute left-0 top-2 h-4 w-4 rounded-full border-2 border-primary bg-background" />
                              )}

                              <div className="space-y-3">
                                <div className="flex justify-between items-start gap-4">
                                  <h4 className="font-semibold text-foreground">
                                    {position.title}
                                  </h4>
                                  <span className="text-sm text-foreground/60 shrink-0">
                                    {position.year}
                                  </span>
                                </div>
                                <ul className="space-y-2 text-sm text-foreground/70">
                                  {position.highlights.map((highlight, i) => (
                                    <li key={i} className="flex gap-2">
                                      <span className="text-primary mt-1.5">•</span>
                                      <span>{highlight}</span>
                                    </li>
                                  ))}
                                </ul>
                              </div>
                            </div>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  )
}
