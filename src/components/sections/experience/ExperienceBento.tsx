import { Calendar, GraduationCap, MapPin } from "lucide-react";
import { useEffect, useRef, useState } from "react";

import { SectionLabel } from "@/components/shared/SectionLabel";
import { siteConfig } from "@/data/site.config";
import { cn } from "@/lib/utils";

type Position = (typeof siteConfig.experience)[number]["positions"][number];
type Company = (typeof siteConfig.experience)[number];
type Education = (typeof siteConfig.education)[number];

function useScrollReveal() {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (entry?.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(el);
        }
      },
      { threshold: 0.15 },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return { ref, isVisible };
}

function TimelineCard({ company, index }: { company: Company; index: number }) {
  const { ref, isVisible } = useScrollReveal();
  const isCurrentRole = company.duration.includes("Present");
  const isEven = index % 2 === 0;

  return (
    <div ref={ref} className="relative">
      {/* Timeline node */}
      <div className="absolute left-0 md:left-1/2 -translate-x-1/2 top-6 z-10">
        {isCurrentRole ? (
          <span className="relative flex h-4 w-4">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-500 opacity-75" />
            <span className="relative inline-flex rounded-full h-4 w-4 bg-green-500 border-2 border-background" />
          </span>
        ) : (
          <span className="inline-flex rounded-full h-4 w-4 bg-muted-foreground/40 border-2 border-background" />
        )}
      </div>

      {/* Horizontal connector — desktop only */}
      <div
        className={cn(
          "hidden md:block absolute top-7.5 h-px bg-border w-6",
          isEven ? "left-[calc(50%+8px)]" : "right-[calc(50%+8px)]",
        )}
      />

      {/* Card */}
      <div
        className={cn(
          "pl-6 md:pl-0 transition-all duration-700",
          isEven
            ? "md:w-[calc(50%-2rem)] md:ml-[calc(50%+2rem)]"
            : "md:w-[calc(50%-2rem)]",
          isVisible
            ? "opacity-100 translate-x-0"
            : cn(
                "opacity-0",
                isEven ? "translate-x-8" : "translate-x-8 md:-translate-x-8",
              ),
        )}
      >
        <div className="rounded-xl border border-border bg-card p-6 shadow-hard hover:border-primary/50 transition-colors">
          {/* Company header */}
          <div className="flex items-start justify-between gap-3 mb-4">
            <div>
              <div className="flex items-center gap-2">
                {isCurrentRole && (
                  <span className="text-xs font-mono font-semibold text-green-500 uppercase tracking-wider">
                    Active
                  </span>
                )}
                <h4 className="font-bold text-lg">{company.company}</h4>
              </div>
              <div className="flex items-center gap-1.5 text-sm text-muted-foreground mt-1">
                <MapPin className="w-3.5 h-3.5 shrink-0" />
                {company.location}
              </div>
            </div>
            <span className="px-3 py-1 text-xs font-mono bg-secondary text-secondary-foreground rounded-full shrink-0">
              {company.duration}
            </span>
          </div>

          {/* Position progression — mini nested timeline */}
          <div className="relative pl-4 border-l-2 border-primary/20 space-y-4">
            {company.positions.map((position: Position, pIndex: number) => (
              <div key={`${position.title}-${pIndex}`} className="relative">
                <div className="absolute -left-[calc(0.5rem+1px)] top-1.5 w-2 h-2 rounded-full bg-primary/60" />
                <div className="space-y-2">
                  <div className="flex flex-wrap items-baseline justify-between gap-x-2">
                    <h5
                      className={cn(
                        "text-sm font-semibold",
                        pIndex === 0 ? "text-primary" : "text-foreground",
                      )}
                    >
                      {position.title}
                    </h5>
                    <span className="text-xs font-mono text-muted-foreground">
                      {position.year}
                    </span>
                  </div>
                  <ul className="space-y-1">
                    {position.highlights.map((highlight: string) => (
                      <li
                        key={highlight}
                        className="text-sm text-foreground/70 leading-relaxed flex gap-2"
                      >
                        <span className="text-primary shrink-0">
                          {"\u2022"}
                        </span>
                        {highlight}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export function ExperienceBento() {
  return (
    <section
      id="experience"
      className="container mx-auto px-4 py-16 reveal-on-scroll overflow-x-hidden"
    >
      <div className="space-y-12">
        <div className="space-y-4">
          <SectionLabel number="03" label="experience" />
          <h2 className="text-4xl font-display font-bold">Experience</h2>
        </div>

        <div className="max-w-5xl mx-auto space-y-12">
          {/* Education banner — distinct treatment at top */}
          <div className="rounded-xl bg-muted/50 border border-border p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 rounded-lg bg-primary/10">
                <GraduationCap className="w-5 h-5 text-primary" />
              </div>
              <h3 className="text-lg font-display font-semibold">Education</h3>
            </div>
            <div className="flex flex-col sm:flex-row gap-4">
              {siteConfig.education.map((edu: Education) => (
                <div
                  key={edu.title}
                  className="flex-1 rounded-lg bg-card border border-border p-4"
                >
                  <div className="flex items-center gap-2 text-xs font-mono text-muted-foreground mb-2">
                    <Calendar className="w-3.5 h-3.5" />
                    {edu.year}
                  </div>
                  <h4 className="font-semibold text-sm">{edu.title}</h4>
                  {"focus" in edu && (
                    <p className="text-xs text-muted-foreground mt-1">
                      Focus: {edu.focus}
                    </p>
                  )}
                  {"honors" in edu && (
                    <span className="inline-block mt-2 px-2 py-0.5 text-xs font-medium bg-primary/10 text-primary rounded">
                      {edu.honors}
                    </span>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Work timeline */}
          <div className="relative">
            {/* Vertical amber line */}
            <div className="absolute left-0 md:left-1/2 md:-translate-x-px top-0 bottom-0 w-[3px] bg-primary/30" />

            <div className="space-y-12">
              {siteConfig.experience.map((company: Company, index: number) => (
                <TimelineCard
                  key={company.company}
                  company={company}
                  index={index}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
