"use client"

import dynamic from "next/dynamic"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { GradientText } from "@/components/shared/GradientText"
import { siteConfig } from "@/content/site.config"
import { slideUp, staggerContainer, staggerItem } from "@/lib/animations"
import Link from "next/link"

// Dynamically import 3D components (only on client, not SSR)
const Scene = dynamic(() => import("@/components/three/Scene").then(mod => ({ default: mod.Scene })), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full flex items-center justify-center">
      <div className="text-foreground/30">Loading 3D Scene...</div>
    </div>
  ),
})

const TorusKnotWithShader = dynamic(
  () => import("@/components/three/TorusKnotWithShader").then(mod => ({ default: mod.TorusKnotWithShader })),
  { ssr: false }
)

const ParticleSystem = dynamic(
  () => import("@/components/three/ParticleSystem").then(mod => ({ default: mod.ParticleSystem })),
  { ssr: false }
)

const Lights = dynamic(
  () => import("@/components/three/Lights").then(mod => ({ default: mod.Lights })),
  { ssr: false }
)

export function Hero3D() {
  return (
    <section className="container mx-auto px-4 py-20 lg:py-32">
      <div className="grid lg:grid-cols-2 gap-12 items-center">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="show"
          className="space-y-6"
        >
          <motion.h1
            variants={staggerItem}
            className="text-5xl lg:text-7xl font-display font-bold tracking-tight"
          >
            {siteConfig.name.split(" ")[0]}{" "}
            <GradientText>{siteConfig.name.split(" ")[1]}</GradientText>
          </motion.h1>

          <motion.p
            variants={staggerItem}
            className="text-xl text-foreground/70"
          >
            {siteConfig.tagline}
          </motion.p>

          <motion.div variants={staggerItem} className="flex gap-4">
            <Button asChild size="lg">
              <Link href="/projects">View Projects</Link>
            </Button>
            <Button asChild variant="outline" size="lg">
              <a href="/resume.pdf" download>
                Download Résumé
              </a>
            </Button>
          </motion.div>
        </motion.div>

        <div className="relative h-[400px] lg:h-[600px]">
          <Scene>
            <Lights />
            <TorusKnotWithShader />
            <ParticleSystem />
          </Scene>
        </div>
      </div>
    </section>
  )
}
