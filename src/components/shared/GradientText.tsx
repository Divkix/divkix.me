import { cn } from "@/lib/utils";

interface GradientTextProps {
  children: React.ReactNode;
  className?: string;
  animate?: boolean;
}

export function GradientText({
  children,
  className,
  animate = false,
}: GradientTextProps) {
  return (
    <span
      className={cn(
        "bg-linear-to-r from-indigo-500 via-violet-500 to-fuchsia-500 bg-clip-text text-transparent",
        animate && "animate-gradient-shift bg-size-[200%_200%]",
        className,
      )}
    >
      {children}
    </span>
  );
}
