import { cn } from "@/lib/utils";

interface SectionLabelProps {
  number: string;
  label: string;
  className?: string;
  variant?: "default" | "terminal";
}

export function SectionLabel({
  number,
  label,
  className,
  variant = "default",
}: SectionLabelProps) {
  return (
    <p
      className={cn(
        "mb-4 font-mono text-sm tracking-wider",
        variant === "terminal"
          ? "text-[oklch(0.7_0.2_140)]"
          : "text-muted-foreground",
        className,
      )}
    >
      {"// "}
      {number} — {label}
    </p>
  );
}
