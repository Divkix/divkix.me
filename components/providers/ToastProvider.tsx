"use client";

import { useTheme } from "next-themes";
import { Toaster } from "sonner";

/**
 * Toast notification provider using Sonner
 * Automatically adapts to light/dark theme
 */
export function ToastProvider() {
  const { theme } = useTheme();

  return (
    <Toaster
      position="bottom-right"
      theme={theme as "light" | "dark" | "system"}
      richColors
      closeButton
      toastOptions={{
        style: {
          background: "var(--color-card)",
          color: "var(--color-card-foreground)",
          border: "1px solid var(--color-border)",
        },
      }}
    />
  );
}
