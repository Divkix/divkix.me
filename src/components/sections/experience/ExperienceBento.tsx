import { useEffect, useRef, useState } from "react";

import { SectionHeading } from "@/components/shared/SectionHeading";
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

function ExperienceEntry({
  company,
  index,
}: {
  company: Company;
  index: number;
}) {
  const { ref, isVisible } = useScrollReveal();
  const isCurrentRole = company.duration.includes("Present");

  return (
    <article
      ref={ref}
      className={cn(
        "border-t border-border pt-8 transition-all duration-700 min-w-0",
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4",
      )}
      style={{ transitionDelay: `${index * 80}ms` }}
    >
      <div className="split-studio">
        <div className="split-studio-content min-w-0 space-y-2">
          <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
            <h3 className="font-display text-xl md:text-2xl font-medium">
              {company.company}
            </h3>
            {isCurrentRole && (
              <span className="text-xs uppercase tracking-wide text-primary">
                Current
              </span>
            )}
          </div>
          <p className="text-sm text-muted-foreground">{company.location}</p>
          <p className="text-sm text-muted-foreground">{company.duration}</p>
        </div>

        <div className="split-studio-proof space-y-6 min-w-0">
          {company.positions.map((position: Position) => (
            <div key={`${company.company}-${position.title}-${position.year}`}>
              <div className="flex flex-wrap items-baseline justify-between gap-x-2 gap-y-1 mb-2">
                <h4 className="font-medium text-foreground">
                  {position.title}
                </h4>
                <span className="text-sm text-muted-foreground">
                  {position.year}
                </span>
              </div>
              <ul className="space-y-2">
                {position.highlights.map((highlight: string) => (
                  <li
                    key={highlight}
                    className="text-sm text-foreground/75 leading-relaxed pl-4 border-l border-border"
                  >
                    {highlight}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </article>
  );
}

export function ExperienceBento() {
  return (
    <section
      id="experience"
      className="container mx-auto px-4 py-16 md:py-24 reveal-on-scroll max-w-6xl"
    >
      <div className="space-y-12">
        <SectionHeading
          title="Where I've worked"
          description="Engineering roles, teaching, and the occasional internship that shaped how I build."
        />

        <div className="split-studio">
          <div className="split-studio-content min-w-0">
            <h3 className="font-display text-xl font-medium mb-4">Education</h3>
            <div className="space-y-4">
              {siteConfig.education.map((edu: Education) => (
                <div key={edu.title} className="space-y-1">
                  <p className="font-medium text-foreground">{edu.title}</p>
                  <p className="text-sm text-muted-foreground">{edu.year}</p>
                  {"focus" in edu && (
                    <p className="text-sm text-muted-foreground">
                      Focus: {edu.focus}
                    </p>
                  )}
                  {"honors" in edu && (
                    <p className="text-sm text-primary">{edu.honors}</p>
                  )}
                </div>
              ))}
            </div>
          </div>

          <div className="split-studio-proof min-w-0">
            <p className="text-muted-foreground leading-relaxed">
              MS (GPA 3.889) and BS in Computer Science from Arizona State
              University. I've also spent years teaching programming, which
              taught me as much about explaining ideas as writing code.
            </p>
          </div>
        </div>

        <div className="space-y-0">
          {siteConfig.experience.map((company: Company, index: number) => (
            <ExperienceEntry
              key={company.company}
              company={company}
              index={index}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
