import { useEffect, useRef, useState } from "react";

/**
 * Triggers a one-shot visibility flag when the element scrolls into view.
 */
export function useScrollReveal(threshold = 0.1) {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (entry?.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(el);
        }
      },
      { threshold },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold]);

  return { ref, isVisible };
}

/**
 * Classic throttle with trailing edge — limits `fn` to at most once per `wait` ms.
 */
export function throttle<T extends (...args: never[]) => void>(
  fn: T,
  wait: number,
): T & { cancel: () => void } {
  let timeoutId: ReturnType<typeof setTimeout> | null = null;
  let lastExecutedTime = 0;

  const throttled = (...args: Parameters<T>) => {
    const now = Date.now();
    const remaining = wait - (now - lastExecutedTime);

    if (remaining <= 0) {
      if (timeoutId) {
        clearTimeout(timeoutId);
        timeoutId = null;
      }
      lastExecutedTime = now;
      fn(...args);
    } else if (!timeoutId) {
      timeoutId = setTimeout(() => {
        lastExecutedTime = Date.now();
        timeoutId = null;
        fn(...args);
      }, remaining);
    }
  };

  throttled.cancel = () => {
    if (timeoutId) {
      clearTimeout(timeoutId);
      timeoutId = null;
    }
  };

  return throttled as T & { cancel: () => void };
}
