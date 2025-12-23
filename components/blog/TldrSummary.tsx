"use client";

import { motion } from "framer-motion";
import { Lightbulb } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

interface TldrSummaryProps {
  summary: string;
}

/**
 * TL;DR summary box for blog posts
 * Provides a quick summary for scanners and AI answer engines
 */
export function TldrSummary({ summary }: TldrSummaryProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
    >
      <Card className="tldr-summary border-l-4 border-l-primary bg-primary/5">
        <CardContent className="flex items-start gap-3 py-4">
          <Lightbulb className="h-5 w-5 text-primary shrink-0 mt-0.5" />
          <div>
            <span className="text-sm font-semibold text-primary uppercase tracking-wider">
              TL;DR
            </span>
            <p className="text-foreground/80 mt-1">{summary}</p>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
