"use client";

import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { GradientText } from "@/components/shared/GradientText";
import { SocialIcons } from "@/components/shared/SocialIcons";
import { Button } from "@/components/ui/button";
import { MagneticWrapper } from "@/components/ui/magnetic-wrapper";
import { ParallaxWrapper } from "@/components/ui/parallax-wrapper";
import { TypewriterEffect } from "@/components/ui/typewriter-effect";
import { siteConfig } from "@/content/site.config";
import {
  heroStaggerContainer,
  heroStaggerItem,
  heroTitle,
} from "@/lib/animations";

export function Hero3D() {
  return (
    <section className="container mx-auto px-4 min-h-[calc(100vh-4rem)] flex flex-col justify-center relative overflow-hidden py-20">
      {/* Parallax background elements */}
      <ParallaxWrapper speed={0.3} className="absolute inset-0 -z-10">
        <div className="absolute top-20 left-10 w-64 h-64 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-accent/5 rounded-full blur-3xl" />
      </ParallaxWrapper>

      <div className="flex flex-col items-center text-center max-w-4xl mx-auto flex-grow justify-center">
        <motion.div
          variants={heroStaggerContainer}
          initial="hidden"
          animate="show"
          className="space-y-8 w-full"
        >
          {/* LCP-critical h1 renders immediately with minimal animation */}
          <motion.h1
            variants={heroTitle}
            className="text-5xl sm:text-6xl lg:text-8xl font-display font-bold tracking-tight"
          >
            {siteConfig.name.split(" ")[0]}{" "}
            <GradientText>{siteConfig.name.split(" ")[1]}</GradientText>
          </motion.h1>

          <motion.p
            variants={heroStaggerItem}
            className="text-lg text-muted-foreground/60 font-mono tracking-wide mt-2"
          >
            @{siteConfig.handle.toLowerCase()}
          </motion.p>

          <motion.div
            variants={heroStaggerItem}
            className="text-xl lg:text-3xl text-foreground/80 max-w-2xl mx-auto h-8 sm:h-10"
          >
            <TypewriterEffect
              words={[
                "Full Stack Developer",
                "Open Source Contributor",
                "Building Useful Tools",
                "Shipping Fast",
              ]}
            />
          </motion.div>

          <motion.p
            variants={heroStaggerItem}
            className="text-muted-foreground max-w-xl mx-auto text-lg"
          >
            {siteConfig.tagline}
          </motion.p>

          <motion.div
            variants={heroStaggerItem}
            className="flex justify-center pt-4"
          >
            <SocialIcons />
          </motion.div>

          <motion.div
            variants={heroStaggerItem}
            className="flex flex-wrap gap-4 justify-center pt-4"
          >
            <MagneticWrapper strength={0.2}>
              <Button
                asChild
                size="lg"
                className="text-lg px-8 h-12 rounded-full"
              >
                <a href="#projects">View Projects</a>
              </Button>
            </MagneticWrapper>
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 2, duration: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
        >
          <ChevronDown className="w-6 h-6 text-muted-foreground" />
        </motion.div>
      </motion.div>
    </section>
  );
}
