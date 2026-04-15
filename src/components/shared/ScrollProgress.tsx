import { useEffect, useState } from "react";
import { throttle } from "@/lib/hooks";

export function ScrollProgress() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const updateProgress = throttle(() => {
      const scrollTop = window.scrollY;
      const docHeight =
        document.documentElement.scrollHeight - window.innerHeight;
      const progress = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
      setProgress(progress);
    }, 50);

    window.addEventListener("scroll", updateProgress, { passive: true });
    updateProgress();

    return () => {
      window.removeEventListener("scroll", updateProgress);
      updateProgress.cancel();
    };
  }, []);

  return (
    <div className="fixed top-0 left-0 right-0 h-1 z-50 bg-transparent">
      <div
        className="h-full bg-linear-to-r from-primary to-accent transition-transform duration-150 origin-left"
        style={{ transform: `scaleX(${progress / 100})` }}
      />
    </div>
  );
}
