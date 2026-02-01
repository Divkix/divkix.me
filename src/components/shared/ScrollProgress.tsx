import { useEffect, useState } from "react";

export function ScrollProgress() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let timeoutId: ReturnType<typeof setTimeout> | null = null;
    let lastExecutedTime = 0;
    const wait = 50; // 50ms for smoother progress bar

    const updateProgress = () => {
      const now = Date.now();
      const remaining = wait - (now - lastExecutedTime);

      const calculate = () => {
        const scrollTop = window.scrollY;
        const docHeight =
          document.documentElement.scrollHeight - window.innerHeight;
        const progress = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
        setProgress(progress);
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

  return (
    <div className="fixed top-0 left-0 right-0 h-1 z-50 bg-transparent">
      <div
        className="h-full bg-linear-to-r from-primary to-accent transition-transform duration-150 origin-left"
        style={{ transform: `scaleX(${progress / 100})` }}
      />
    </div>
  );
}
