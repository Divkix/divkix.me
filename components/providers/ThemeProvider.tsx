"use client";

import * as React from "react";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import { type ThemeProviderProps } from "next-themes";

export function ThemeProvider({ children, ...props }: ThemeProviderProps) {
  const [isTransitioning, setIsTransitioning] = React.useState(false);
  const [transitionOrigin, setTransitionOrigin] = React.useState({ x: 0, y: 0 });

  React.useEffect(() => {
    const handleThemeTransition = (e: CustomEvent) => {
      setIsTransitioning(true);
      setTransitionOrigin(e.detail);

      setTimeout(() => setIsTransitioning(false), 800);
    };

    window.addEventListener('theme-transition' as any, handleThemeTransition);
    return () => {
      window.removeEventListener('theme-transition' as any, handleThemeTransition);
    };
  }, []);

  return (
    <>
      <NextThemesProvider {...props}>{children}</NextThemesProvider>

      {isTransitioning && (
        <div
          className="theme-transition-overlay"
          style={{
            '--transition-x': `${transitionOrigin.x}px`,
            '--transition-y': `${transitionOrigin.y}px`,
          } as React.CSSProperties}
        />
      )}
    </>
  );
}
