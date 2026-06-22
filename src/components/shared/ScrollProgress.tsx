import { useEffect, useState } from "react";
import { onThrottledScroll } from "@/lib/throttledScroll";

export function ScrollProgress() {
  const [progress, setProgress] = useState(0);

  useEffect(
    () =>
      onThrottledScroll(() => {
        const scrollTop = window.scrollY;
        const docHeight =
          document.documentElement.scrollHeight - window.innerHeight;
        const progress = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
        setProgress(progress);
      }),
    [],
  );

  return (
    <div
      className="fixed top-0 left-0 right-0 h-px z-50 bg-border"
      aria-hidden="true"
    >
      <div
        className="h-full bg-primary transition-transform duration-150 origin-left"
        style={{ transform: `scaleX(${progress / 100})` }}
      />
    </div>
  );
}
