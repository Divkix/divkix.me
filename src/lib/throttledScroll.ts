/**
 * Installs a leading + trailing throttled scroll listener and returns a cleanup
 * function. Runs the handler immediately once, then at most once per `wait` ms
 * on scroll (with a trailing call). Cleanup removes the listener and clears any
 * pending timeout.
 */
export function onThrottledScroll(handler: () => void, wait = 50): () => void {
  let timeoutId: ReturnType<typeof setTimeout> | null = null;
  let lastExecutedTime = 0;

  const updateProgress = () => {
    const now = Date.now();
    const remaining = wait - (now - lastExecutedTime);

    if (remaining <= 0) {
      if (timeoutId) {
        clearTimeout(timeoutId);
        timeoutId = null;
      }
      lastExecutedTime = now;
      handler();
    } else if (!timeoutId) {
      timeoutId = setTimeout(() => {
        lastExecutedTime = Date.now();
        timeoutId = null;
        handler();
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
}
