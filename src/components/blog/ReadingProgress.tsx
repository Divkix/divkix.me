"use client";

import { useEffect, useState } from "react";

interface ReadingProgressProps {
  readingTime: number; // in minutes
}

export function ReadingProgress({ readingTime }: ReadingProgressProps) {
  const [progress, setProgress] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const article = document.querySelector("article");
    if (!article) return;

    const updateProgress = () => {
      const articleTop = article.offsetTop;
      const articleHeight = article.offsetHeight;
      const scrolled = window.scrollY - articleTop;
      const progress = Math.min(
        Math.max((scrolled / articleHeight) * 100, 0),
        100,
      );

      setProgress(progress);
      setIsVisible(window.scrollY > 200);
    };

    window.addEventListener("scroll", updateProgress, { passive: true });
    updateProgress();

    return () => window.removeEventListener("scroll", updateProgress);
  }, []);

  const timeRemaining = Math.ceil(readingTime * (1 - progress / 100));
  const circumference = 2 * Math.PI * 18;
  const strokeDashoffset = circumference - (progress / 100) * circumference;

  if (!isVisible) return <></>;

  return (
    <div className="fixed bottom-8 right-8 z-50 flex items-center gap-3 bg-card/90 backdrop-blur-sm rounded-full px-4 py-2 shadow-lg border border-border">
      <svg width="44" height="44" className="-rotate-90">
        <circle
          cx="22"
          cy="22"
          r="18"
          fill="none"
          stroke="currentColor"
          strokeWidth="3"
          className="text-muted"
        />
        <circle
          cx="22"
          cy="22"
          r="18"
          fill="none"
          stroke="currentColor"
          strokeWidth="3"
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="round"
          className="text-primary transition-all duration-300"
        />
      </svg>
      <div className="text-sm">
        <div className="font-medium">{Math.round(progress)}%</div>
        <div className="text-muted-foreground text-xs">
          {timeRemaining > 0 ? `${timeRemaining} min left` : "Done!"}
        </div>
      </div>
    </div>
  );
}

export default ReadingProgress;
