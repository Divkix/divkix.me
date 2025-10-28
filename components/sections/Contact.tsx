"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { GradientText } from "@/components/shared/GradientText"
import { slideUp } from "@/lib/animations"
import Link from "next/link"

export function Contact() {
  return (
    <section className="container mx-auto px-4 py-20">
      <motion.div
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
        variants={slideUp}
      >
        <Card className="p-12 text-center space-y-6 glass-surface bg-gradient-to-br from-primary/10 to-accent/10">
          <h2 className="text-4xl font-display font-bold">
            Let's <GradientText>Build Together</GradientText>
          </h2>
          <p className="text-foreground/70 max-w-2xl mx-auto">
            Have a project in mind or just want to chat? I'm always open to new
            opportunities and collaborations.
          </p>
          <Button asChild size="lg">
            <Link href="/contact">Get in Touch</Link>
          </Button>
        </Card>
      </motion.div>
    </section>
  )
}
