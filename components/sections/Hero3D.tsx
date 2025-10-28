"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { GradientText } from "@/components/shared/GradientText"
import { SocialIcons } from "@/components/shared/SocialIcons"
import { siteConfig } from "@/content/site.config"
import { staggerContainer, staggerItem } from "@/lib/animations"

export function Hero3D() {
  return (
    <section className="container mx-auto px-4 py-20 lg:py-32">
      <div className="flex flex-col items-center text-center max-w-4xl mx-auto">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="show"
          className="space-y-6 w-full"
        >
          <motion.h1
            variants={staggerItem}
            className="text-5xl sm:text-6xl lg:text-7xl font-display font-bold tracking-tight"
          >
            {siteConfig.name.split(" ")[0]}{" "}
            <GradientText>{siteConfig.name.split(" ")[1]}</GradientText>
          </motion.h1>

          <motion.p
            variants={staggerItem}
            className="text-xl lg:text-2xl text-foreground/70 max-w-2xl mx-auto"
          >
            {siteConfig.tagline}
          </motion.p>

          <motion.div variants={staggerItem} className="flex justify-center">
            <SocialIcons />
          </motion.div>

          <motion.div variants={staggerItem} className="flex flex-wrap gap-4 justify-center">
            <Button asChild size="lg">
              <a href="#projects">View Projects</a>
            </Button>
            <Button asChild variant="outline" size="lg">
              <a href="/resume.pdf" download>
                Download Résumé
              </a>
            </Button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
