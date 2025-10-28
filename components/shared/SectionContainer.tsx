import { cn } from "@/lib/utils";

interface SectionContainerProps {
  id: string;
  children: React.ReactNode;
  className?: string;
}

export function SectionContainer({
  id,
  children,
  className,
}: SectionContainerProps) {
  return (
    <section
      id={id}
      className={cn(
        "relative min-h-screen w-full py-20 px-4 sm:px-6 lg:px-8",
        className
      )}
    >
      <div className="mx-auto max-w-7xl">{children}</div>
    </section>
  );
}
