import { cn } from "@/lib/utils";

interface SectionLabelProps {
  number: string;
  label: string;
  className?: string;
}

export function SectionLabel({ number, label, className }: SectionLabelProps) {
  return (
    <p
      className={cn(
        "mb-4 font-mono text-xs tracking-widest uppercase text-muted-foreground/60",
        className,
      )}
    >
      {number} — {label}
    </p>
  );
}
