import { useEffect, useRef, useState } from "react";
import { Card } from "@/components/ui/card";
import { siteConfig } from "@/data/site.config";

interface StatCardProps {
  value: string;
  label: string;
  description: string;
}

function StatCard({ value, label, description }: StatCardProps) {
  const [displayValue, setDisplayValue] = useState("0");
  const hasAnimatedRef = useRef(false);
  const ref = useRef<HTMLDivElement>(null);
  const animationIdRef = useRef<number | null>(null);

  useEffect(() => {
    // Guard: don't create observer if already animated
    if (hasAnimatedRef.current) return;

    const animateValue = () => {
      const numericValue = Number.parseInt(value.replace(/[^0-9]/g, ""), 10);
      const suffix = value.replace(/[0-9]/g, "");
      const duration = 2000;
      const startTime = performance.now();

      const easeOutQuart = (t: number) => 1 - (1 - t) ** 4;

      const animate = (currentTime: number) => {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const easedProgress = easeOutQuart(progress);
        const current = Math.floor(easedProgress * numericValue);

        setDisplayValue(current.toLocaleString() + suffix);

        if (progress < 1) {
          animationIdRef.current = requestAnimationFrame(animate);
        } else {
          animationIdRef.current = null;
        }
      };

      animationIdRef.current = requestAnimationFrame(animate);
    };

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (entry?.isIntersecting && !hasAnimatedRef.current) {
          hasAnimatedRef.current = true;
          animateValue();
          observer.disconnect(); // Stop observing after animation starts
        }
      },
      { threshold: 0.5 },
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      observer.disconnect();
      if (animationIdRef.current !== null) {
        cancelAnimationFrame(animationIdRef.current);
        animationIdRef.current = null;
      }
    };
  }, [value]);

  return (
    <div ref={ref} className="highlight-card-wrapper">
      <Card className="text-center p-8 glass-surface transition-all duration-300 highlight-card">
        <div className="text-5xl md:text-6xl font-display font-bold text-primary mb-2">
          {displayValue}
        </div>
        <div className="text-xl font-semibold mb-1">{label}</div>
        <div className="text-muted-foreground text-sm">{description}</div>
      </Card>
      <style>{`
        .highlight-card-wrapper {
          position: relative;
        }

        .highlight-card-wrapper::before {
          content: "";
          position: absolute;
          inset: 0;
          padding: 1px;
          border-radius: var(--radius-lg);
          background: conic-gradient(
            from var(--border-angle, 0deg),
            oklch(0.64 0.22 264.5),
            oklch(0.72 0.2 310),
            oklch(0.55 0.22 264.5),
            oklch(0.64 0.22 264.5)
          );
          mask:
            linear-gradient(#fff 0 0) content-box,
            linear-gradient(#fff 0 0);
          mask-composite: exclude;
          opacity: 0;
          transition: opacity 0.3s ease;
          pointer-events: none;
        }

        .highlight-card-wrapper:hover::before {
          opacity: 1;
          animation: border-rotate 3s linear infinite;
        }

        .highlight-card-wrapper:hover .highlight-card {
          border-color: transparent;
          box-shadow:
            0 8px 24px -8px oklch(0.64 0.22 264.5 / 0.2),
            0 0 20px -8px oklch(0.64 0.22 264.5 / 0.15);
        }

        .dark .highlight-card-wrapper:hover .highlight-card {
          box-shadow:
            0 8px 32px -8px oklch(0.78 0.2 264.5 / 0.3),
            0 0 28px -8px oklch(0.78 0.2 264.5 / 0.2);
        }

        @media (prefers-reduced-motion: reduce) {
          .highlight-card-wrapper::before {
            display: none;
          }
          .highlight-card-wrapper:hover .highlight-card {
            border-color: oklch(0.64 0.22 264.5 / 0.5);
          }
        }
      `}</style>
    </div>
  );
}

export function Highlights() {
  const stats = [
    {
      value: siteConfig.facts.impact,
      label: "Users Impacted",
      description: "Through open source projects",
    },
    {
      value: siteConfig.facts.projects,
      label: "Projects Shipped",
      description: "From concept to production",
    },
    {
      value: siteConfig.facts.oss,
      label: "OSS Contributions",
      description: "Commits, PRs, and issues",
    },
  ];

  return (
    <section id="highlights" className="container mx-auto px-4 py-20">
      <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
        {stats.map((stat) => (
          <StatCard key={stat.label} {...stat} />
        ))}
      </div>
    </section>
  );
}
