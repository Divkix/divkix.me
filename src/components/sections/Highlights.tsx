import { useEffect, useRef, useState } from "react";
import { SectionLabel } from "@/components/shared/SectionLabel";
import { siteConfig } from "@/data/site.config";

interface StatProps {
  value: string;
  label: string;
}

function AnimatedStat({ value, label }: StatProps) {
  const [displayValue, setDisplayValue] = useState("0");
  const hasAnimatedRef = useRef(false);
  const ref = useRef<HTMLDivElement>(null);
  const animationIdRef = useRef<number | null>(null);

  useEffect(() => {
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
          observer.disconnect();
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
    <div ref={ref} className="text-center">
      <div
        className="text-4xl md:text-5xl font-mono font-bold text-foreground"
        style={{ fontVariantNumeric: "tabular-nums" }}
      >
        {displayValue}
      </div>
      <p className="text-sm text-muted-foreground mt-2">{label}</p>
    </div>
  );
}

export function Highlights() {
  const stats = [
    {
      value: siteConfig.facts.impact,
      label: "Users Reached",
    },
    {
      value: siteConfig.facts.projects,
      label: "Projects Built",
    },
    {
      value: siteConfig.facts.oss,
      label: "OSS Contributions",
    },
  ];

  return (
    <section
      id="highlights"
      className="container mx-auto px-4 py-16 reveal-on-scroll"
    >
      <SectionLabel number="01" label="highlights" />
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
        {stats.map((stat) => (
          <AnimatedStat
            key={stat.label}
            value={stat.value}
            label={stat.label}
          />
        ))}
      </div>
    </section>
  );
}
