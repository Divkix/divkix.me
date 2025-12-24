"use client";

import { type MotionValue, useScroll, useTransform } from "framer-motion";
import { type RefObject, useEffect, useState } from "react";
import { usePrefersReducedMotion } from "./use-interactive-animations";

interface ParallaxReturn {
  y: MotionValue<number>;
  scrollYProgress: MotionValue<number>;
}

/**
 * Hook to create parallax scroll effect
 * @param speed - Parallax speed multiplier (0.3-0.7 recommended). Lower = slower movement
 * @param ref - Optional reference to specific element, defaults to viewport
 * @returns Object containing y motion value for transform and scrollYProgress
 */
export function useParallax(
  speed: number = 0.5,
  ref?: RefObject<HTMLElement>,
): ParallaxReturn {
  const [isMobile, setIsMobile] = useState<boolean>(false);
  const [isMounted, setIsMounted] = useState<boolean>(false);
  const prefersReducedMotion = usePrefersReducedMotion();

  // Detect hydration complete to prevent CLS from parallax transforms
  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Detect mobile devices with debounced resize handler
  useEffect(() => {
    const checkMobile = (): void => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();

    let resizeTimeout: NodeJS.Timeout;
    const handleResize = () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(checkMobile, 150);
    };

    window.addEventListener("resize", handleResize, { passive: true });

    return () => {
      window.removeEventListener("resize", handleResize);
      clearTimeout(resizeTimeout);
    };
  }, []);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  // Calculate parallax offset
  // Multiply by viewport height and speed factor for smooth movement
  // Only apply transform after mount to prevent CLS
  const y = useTransform(
    scrollYProgress,
    [0, 1],
    isMounted ? [0, -(speed * 200)] : [0, 0], // No transform until mounted
  );

  // Disable parallax on mobile or if user prefers reduced motion
  const disabledY = useTransform(() => 0);

  return {
    y: isMobile || prefersReducedMotion ? disabledY : y,
    scrollYProgress,
  };
}
