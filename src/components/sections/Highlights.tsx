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
    <div ref={ref}>
      <Card className="text-center p-8 glass-surface hover:border-primary/50 transition-colors">
        <div className="text-5xl md:text-6xl font-display font-bold text-primary mb-2">
          {displayValue}
        </div>
        <div className="text-xl font-semibold mb-1">{label}</div>
        <div className="text-muted-foreground text-sm">{description}</div>
      </Card>
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
