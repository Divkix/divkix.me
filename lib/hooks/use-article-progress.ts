"use client";

import { RefObject } from "react";
import { useScroll, useTransform } from "framer-motion";

interface ArticleProgressReturn {
  progress: number;
  percentComplete: number;
  timeRemaining: number;
}

/**
 * Hook to track article reading progress
 * @param articleRef - Reference to the article element
 * @param readingTime - Total reading time in minutes
 * @returns Object containing progress (0-1), percentComplete (0-100), and timeRemaining
 */
export function useArticleProgress(
  articleRef: RefObject<HTMLElement>,
  readingTime: number,
): ArticleProgressReturn {
  const { scrollYProgress } = useScroll({
    target: articleRef,
    offset: ["start end", "end end"],
  });

  // Transform to percentage (0-100)
  const percentComplete = useTransform(scrollYProgress, [0, 1], [0, 100]);

  // Calculate time remaining based on reading time and progress
  const timeRemaining = useTransform(scrollYProgress, (latest) =>
    Math.max(0, readingTime * (1 - latest)),
  );

  // Get current values for consumers that need raw numbers
  const progress = scrollYProgress.get();
  const percent = percentComplete.get();
  const remaining = timeRemaining.get();

  return {
    progress,
    percentComplete: percent,
    timeRemaining: remaining,
  };
}
