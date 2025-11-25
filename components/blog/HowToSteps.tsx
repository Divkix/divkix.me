"use client";

import { motion } from "framer-motion";
import { BookOpen, Clock } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { HowTo } from "@/lib/content";

interface HowToStepsProps {
  howto: HowTo;
}

const staggerContainer = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const staggerItem = {
  hidden: { opacity: 0, y: 12 },
  show: { opacity: 1, y: 0 },
};

/**
 * Format ISO 8601 duration to human-readable string
 * e.g., "PT15M" -> "15 min", "PT1H30M" -> "1h 30min"
 */
function formatDuration(duration: string): string {
  const match = duration.match(/PT(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?/);
  if (!match) return duration;

  const hours = match[1] ? `${match[1]}h` : "";
  const minutes = match[2] ? `${match[2]} min` : "";
  const seconds = match[3] ? `${match[3]}s` : "";

  return [hours, minutes, seconds].filter(Boolean).join(" ") || duration;
}

/**
 * HowTo steps component for tutorials
 * Generates HowTo schema for Google featured snippets
 */
export function HowToSteps({ howto }: HowToStepsProps) {
  if (!howto || !howto.steps || howto.steps.length === 0) return null;

  return (
    <section
      aria-label="Tutorial steps"
      className="mt-12 pt-8 border-t border-border"
    >
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-display font-bold flex items-center gap-2">
          <BookOpen className="h-6 w-6 text-primary" />
          {howto.name}
        </h2>
        <Badge variant="secondary" className="text-sm">
          <Clock className="h-4 w-4 mr-1" />
          {formatDuration(howto.totalTime)}
        </Badge>
      </div>

      <motion.ol
        className="relative border-l border-border ml-4 space-y-6"
        variants={staggerContainer}
        initial="hidden"
        animate="show"
      >
        {howto.steps.map((step, index) => (
          <motion.li
            key={`step-${step.name.slice(0, 20)}-${index}`}
            className="ml-6"
            variants={staggerItem}
          >
            <span className="absolute -left-3 flex h-6 w-6 items-center justify-center rounded-full bg-primary text-xs font-bold text-primary-foreground">
              {index + 1}
            </span>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-base">{step.name}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-foreground/70 text-sm">{step.text}</p>
              </CardContent>
            </Card>
          </motion.li>
        ))}
      </motion.ol>
    </section>
  );
}
