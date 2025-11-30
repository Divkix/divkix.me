"use client";

import { motion, useMotionValue, useSpring } from "framer-motion";
import { useEffect, useRef, useState } from "react";

export const CustomCursor = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const isHoveringRef = useRef(false);
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

  const springConfig = { damping: 25, stiffness: 700 };
  const cursorXSpring = useSpring(cursorX, springConfig);
  const cursorYSpring = useSpring(cursorY, springConfig);

  useEffect(() => {
    const moveCursor = (e: MouseEvent) => {
      cursorX.set(e.clientX - 16);
      cursorY.set(e.clientY - 16);

      // Detect link/button hover during mouse movement
      const target = e.target as HTMLElement;
      const isOverInteractive =
        target.tagName === "A" ||
        target.tagName === "BUTTON" ||
        target.closest("a") !== null ||
        target.closest("button") !== null;

      // Only update state if hover status changed (avoids unnecessary re-renders)
      if (isOverInteractive !== isHoveringRef.current) {
        isHoveringRef.current = isOverInteractive;
        setIsHovering(isOverInteractive);
      }
    };

    const handleMouseEnter = () => setIsVisible(true);
    const handleMouseLeave = () => {
      setIsVisible(false);
      // Reset hover state when cursor leaves window
      if (isHoveringRef.current) {
        isHoveringRef.current = false;
        setIsHovering(false);
      }
    };

    window.addEventListener("mousemove", moveCursor);
    document.documentElement.addEventListener("mouseenter", handleMouseEnter);
    document.documentElement.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      window.removeEventListener("mousemove", moveCursor);
      document.documentElement.removeEventListener(
        "mouseenter",
        handleMouseEnter
      );
      document.documentElement.removeEventListener(
        "mouseleave",
        handleMouseLeave
      );
    };
  }, [cursorX, cursorY]);

  // Hide on touch devices
  if (
    typeof window !== "undefined" &&
    window.matchMedia("(pointer: coarse)").matches
  ) {
    return null;
  }

  return (
    <motion.div
      className="fixed top-0 left-0 w-8 h-8 border border-primary rounded-full pointer-events-none z-50 mix-blend-difference"
      style={{
        x: cursorXSpring,
        y: cursorYSpring,
        opacity: isVisible ? 1 : 0,
      }}
      animate={{
        scale: isHovering ? 2 : 1,
        backgroundColor: isHovering ? "var(--primary)" : "transparent",
      }}
      transition={{ type: "spring", stiffness: 500, damping: 28 }}
    />
  );
};
