import { cn } from "@/lib/utils";

interface SectionHeadingProps {
  title: string;
  description?: string;
  className?: string;
}

export function SectionHeading({
  title,
  description,
  className,
}: SectionHeadingProps) {
  return (
    <div className={cn("space-y-3 min-w-0", className)}>
      <h2 className="font-display text-[length:var(--text-display-s)] leading-[1.05] text-foreground overflow-wrap-anywhere">
        {title}
      </h2>
      {description && (
        <p className="text-muted-foreground text-base md:text-lg max-w-prose leading-relaxed">
          {description}
        </p>
      )}
    </div>
  );
}
