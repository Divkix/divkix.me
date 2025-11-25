"use client";

import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown, HelpCircle } from "lucide-react";
import { useState } from "react";
import type { FAQ } from "@/lib/content";
import { cn } from "@/lib/utils";

interface FaqAccordionProps {
  items: FAQ[];
}

/**
 * FAQ accordion component for blog posts
 * Generates FAQPage schema for rich snippets
 */
export function FaqAccordion({ items }: FaqAccordionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  if (!items || items.length === 0) return null;

  const toggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const handleKeyDown = (e: React.KeyboardEvent, index: number) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      toggle(index);
    } else if (e.key === "Escape" && openIndex !== null) {
      setOpenIndex(null);
    }
  };

  return (
    <section
      aria-label="Frequently asked questions"
      className="mt-12 pt-8 border-t border-border"
    >
      <h2 className="text-2xl font-display font-bold flex items-center gap-2 mb-6">
        <HelpCircle className="h-6 w-6 text-primary" />
        Frequently Asked Questions
      </h2>
      <div className="space-y-3">
        {items.map((faq, index) => (
          <div
            key={`faq-${faq.q.slice(0, 20)}-${index}`}
            className="border border-border rounded-lg overflow-hidden"
          >
            <button
              type="button"
              onClick={() => toggle(index)}
              onKeyDown={(e) => handleKeyDown(e, index)}
              className="w-full flex justify-between items-center p-4 text-left font-medium hover:bg-muted/50 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-inset"
              aria-expanded={openIndex === index}
              aria-controls={`faq-answer-${index}`}
            >
              <span>{faq.q}</span>
              <ChevronDown
                className={cn(
                  "h-5 w-5 shrink-0 transition-transform duration-200",
                  openIndex === index && "rotate-180",
                )}
              />
            </button>
            <AnimatePresence>
              {openIndex === index && (
                <motion.div
                  id={`faq-answer-${index}`}
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.2, ease: "easeInOut" }}
                >
                  <div className="px-4 pb-4 text-foreground/70">{faq.a}</div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ))}
      </div>
    </section>
  );
}
