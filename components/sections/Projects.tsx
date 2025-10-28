"use client"

import { motion } from "framer-motion"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { siteConfig } from "@/content/site.config"
import { staggerContainer, staggerItem } from "@/lib/animations"
import { ExternalLink } from "lucide-react"

export function Projects() {
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
          <h2 className="text-4xl font-display font-bold">Featured Projects</h2>
          <p className="text-foreground/60 max-w-2xl mx-auto">
            A selection of projects I've built, from Telegram bots to web platforms.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {siteConfig.projects.map((project, index) => (
            <motion.div key={project.name} variants={staggerItem}>
              <Card className="h-full glass-surface hover:border-primary/50 transition-colors">
                <CardHeader>
                  <CardTitle>{project.name}</CardTitle>
                  <CardDescription>{project.desc}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex flex-wrap gap-2">
                    {project.tags.map((tag) => (
                      <Badge key={tag} variant="secondary">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                  <div className="flex gap-2">
                    {project.links.map((link) => (
                      <Button key={link.label} variant="outline" size="sm" asChild>
                        <a href={link.href} target="_blank" rel="noopener noreferrer">
                          {link.label}
                          <ExternalLink className="ml-2 h-4 w-4" />
                        </a>
                      </Button>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  )
}
