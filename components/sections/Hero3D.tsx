"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { MagneticWrapper } from "@/components/ui/magnetic-wrapper";
import { ParallaxWrapper } from "@/components/ui/parallax-wrapper";
import { GradientText } from "@/components/shared/GradientText";
import { SocialIcons } from "@/components/shared/SocialIcons";
import { siteConfig } from "@/content/site.config";
import {
  heroStaggerContainer,
  heroStaggerItem,
  heroTitle,
} from "@/lib/animations";

export function Hero3D() {
  return (
    <section className="container mx-auto px-4 py-20 lg:py-32 relative overflow-hidden">
      {/* Parallax background elements */}
      <ParallaxWrapper speed={0.3} className="absolute inset-0 -z-10">
        <div className="absolute top-20 left-10 w-64 h-64 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-accent/5 rounded-full blur-3xl" />
      </ParallaxWrapper>

      <div className="flex flex-col items-center text-center max-w-4xl mx-auto">
        <motion.div
          variants={heroStaggerContainer}
          initial="hidden"
          animate="show"
          className="space-y-6 w-full"
        >
          {/* LCP-critical h1 renders immediately with minimal animation */}
          <motion.h1
            variants={heroTitle}
            className="text-5xl sm:text-6xl lg:text-7xl font-display font-bold tracking-tight"
          >
            {siteConfig.name.split(" ")[0]}{" "}
            <GradientText>{siteConfig.name.split(" ")[1]}</GradientText>
          </motion.h1>

          <motion.p
            variants={heroStaggerItem}
            className="text-xl lg:text-2xl text-foreground/70 max-w-2xl mx-auto"
          >
            {siteConfig.tagline}
          </motion.p>

          <motion.div
            variants={heroStaggerItem}
            className="flex justify-center"
          >
            <SocialIcons />
          </motion.div>

          <motion.div
            variants={heroStaggerItem}
            className="flex flex-wrap gap-4 justify-center"
          >
            <MagneticWrapper strength={0.2}>
              <Button asChild size="lg">
                <a href="#projects">View Projects</a>
              </Button>
            </MagneticWrapper>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
