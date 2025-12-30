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

    let timeoutId: ReturnType<typeof setTimeout> | null = null;
    let lastExecutedTime = 0;
    const wait = 50;

    // Cache layout properties to avoid reflow
    const articleTop = article.offsetTop;
    const articleHeight = article.offsetHeight;

    const updateProgress = () => {
      const now = Date.now();
      const remaining = wait - (now - lastExecutedTime);

      const calculate = () => {
        const scrolled = window.scrollY - articleTop;
        const progress = Math.min(
          Math.max((scrolled / articleHeight) * 100, 0),
          100,
        );
        setProgress(progress);
        setIsVisible(window.scrollY > 200);
      };

      if (remaining <= 0) {
        if (timeoutId) {
          clearTimeout(timeoutId);
          timeoutId = null;
        }
        lastExecutedTime = now;
        calculate();
      } else if (!timeoutId) {
        timeoutId = setTimeout(() => {
          lastExecutedTime = Date.now();
          timeoutId = null;
          calculate();
        }, remaining);
      }
    };

    window.addEventListener("scroll", updateProgress, { passive: true });
    updateProgress();

    return () => {
      window.removeEventListener("scroll", updateProgress);
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
    };
  }, []);

  const timeRemaining = Math.ceil(readingTime * (1 - progress / 100));
  const circumference = 2 * Math.PI * 18;
  const strokeDashoffset = circumference - (progress / 100) * circumference;

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-8 right-8 z-50 flex items-center gap-3 bg-card/90 backdrop-blur-sm rounded-full px-4 py-2 shadow-lg border border-border">
      <svg
        width="44"
        height="44"
        className="-rotate-90"
        role="img"
        aria-label={`Reading progress: ${Math.round(progress)}%`}
      >
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
