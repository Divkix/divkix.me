import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface TerminalWindowProps {
  title?: string;
  children: ReactNode;
  className?: string;
  accentColor?: string;
}

export function TerminalWindow({
  title,
  children,
  className,
  accentColor,
}: TerminalWindowProps) {
  const textColor = accentColor ?? "oklch(0.7 0.2 140)";

  return (
    <div
      className={cn("overflow-hidden rounded-lg", className)}
      style={
        {
          "--terminal-color": textColor,
        } as React.CSSProperties
      }
    >
      {/* Title bar */}
      <div className="flex items-center bg-[oklch(0.12_0_0)] px-4 py-3">
        <div className="flex gap-2">
          <span className="size-3 rounded-full bg-[#ff5f57]" />
          <span className="size-3 rounded-full bg-[#febc2e]" />
          <span className="size-3 rounded-full bg-[#28c840]" />
        </div>
        {title && (
          <span className="flex-1 text-center font-mono text-xs text-muted-foreground">
            {title}
          </span>
        )}
      </div>

      {/* Content area */}
      <div
        className="relative bg-[oklch(0.08_0_0)] p-6 font-mono"
        style={{
          color: "var(--terminal-color)",
          textShadow: "0 0 2px currentColor",
          boxShadow: "inset 0 0 60px rgba(0,0,0,0.3)",
        }}
      >
        {/* Scanlines overlay */}
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.15) 2px, rgba(0,0,0,0.15) 4px)",
            opacity: 0.06,
          }}
        />

        <div className="relative">{children}</div>
      </div>
    </div>
  );
}
