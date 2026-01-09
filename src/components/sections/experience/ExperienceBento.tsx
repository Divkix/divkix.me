import { Briefcase, Calendar, GraduationCap, MapPin } from "lucide-react";
import { useState } from "react";
import { siteConfig } from "@/data/site.config";
import { cn } from "@/lib/utils";

type Position = (typeof siteConfig.experience)[number]["positions"][number];
type Company = (typeof siteConfig.experience)[number];
type Education = (typeof siteConfig.education)[number];

export function ExperienceBento() {
  const [hoveredCompany, setHoveredCompany] = useState<string | null>(null);

  // Determine card size based on number of positions and tenure
  const getCardSize = (company: Company, index: number) => {
    const posCount = company.positions.length as number;
    if (posCount >= 3 || index === 0) return "large";
    if (posCount >= 2) return "medium";
    return "small";
  };

  return (
    <section id="experience" className="container mx-auto px-4 py-20">
      <div className="space-y-12">
        <div className="text-center space-y-4">
          <h2 className="text-4xl font-display font-bold">Experience</h2>
        </div>

        <div className="max-w-6xl mx-auto space-y-10">
          {/* Education Row */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-primary/10">
                <GraduationCap className="w-5 h-5 text-primary" />
              </div>
              <h3 className="text-2xl font-display font-semibold">Education</h3>
            </div>

            <div className="flex flex-wrap gap-4">
              {siteConfig.education.map((edu: Education, index: number) => (
                <div
                  key={edu.title}
                  className="flex-1 min-w-[280px] glass-surface rounded-xl border border-border p-5 animate-fade-in-up hover:border-primary/50 transition-colors"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-sm text-foreground/60">
                      <Calendar className="w-4 h-4" />
                      {edu.year}
                    </div>
                    <h4 className="font-semibold">{edu.title}</h4>
                    {"focus" in edu && (
                      <p className="text-sm text-foreground/60">
                        Focus: {edu.focus}
                      </p>
                    )}
                    {"honors" in edu && (
                      <span className="inline-block px-2 py-0.5 text-xs font-medium bg-primary/10 text-primary rounded">
                        {edu.honors}
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Work Bento Grid */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-primary/10">
                <Briefcase className="w-5 h-5 text-primary" />
              </div>
              <h3 className="text-2xl font-display font-semibold">
                Work Experience
              </h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 auto-rows-min">
              {siteConfig.experience.map((company: Company, index: number) => {
                const size = getCardSize(company, index);
                const isHovered = hoveredCompany === company.company;
                const isCurrentRole = company.duration.includes("Present");

                return (
                  // biome-ignore lint/a11y/noStaticElementInteractions: Hover interaction for revealing content, not actionable
                  <div
                    key={company.company}
                    className={cn(
                      "group relative glass-surface rounded-xl border transition-all duration-500 animate-fade-in-up overflow-hidden",
                      size === "large" && "md:col-span-2 lg:col-span-2",
                      size === "medium" && "lg:row-span-2",
                      isHovered
                        ? "border-primary shadow-xl scale-[1.02] z-10"
                        : "border-border hover:border-primary/50",
                    )}
                    style={{ animationDelay: `${index * 80}ms` }}
                    onMouseEnter={() => setHoveredCompany(company.company)}
                    onMouseLeave={() => setHoveredCompany(null)}
                  >
                    {/* Gradient overlay for large cards */}
                    {size === "large" && (
                      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    )}

                    <div className="relative p-6 h-full flex flex-col">
                      {/* Header */}
                      <div className="flex items-start justify-between gap-4 mb-4">
                        <div className="space-y-1">
                          <div className="flex items-center gap-2">
                            {isCurrentRole && (
                              <span className="relative flex h-2.5 w-2.5">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-500 opacity-75" />
                                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-green-500" />
                              </span>
                            )}
                            <h4 className="font-bold text-lg">
                              {company.company}
                            </h4>
                          </div>
                          <div className="flex items-center gap-1.5 text-sm text-foreground/60">
                            <MapPin className="w-3.5 h-3.5" />
                            {company.location}
                          </div>
                        </div>
                        <div className="text-right shrink-0">
                          <span className="px-3 py-1 text-xs font-semibold bg-secondary rounded-full">
                            {company.duration}
                          </span>
                          <p className="text-xs text-foreground/50 mt-1">
                            {company.positions.length} role
                            {company.positions.length > 1 ? "s" : ""}
                          </p>
                        </div>
                      </div>

                      {/* Position pills (always visible) */}
                      <div className="flex flex-wrap gap-2 mb-4">
                        {company.positions.map(
                          (position: Position, pIndex: number) => (
                            <span
                              key={`${position.title}-${pIndex}`}
                              className={cn(
                                "px-3 py-1.5 text-sm rounded-lg transition-all duration-300",
                                pIndex === 0
                                  ? "bg-primary/10 text-primary font-medium"
                                  : "bg-muted text-foreground/70",
                              )}
                            >
                              {position.title}
                            </span>
                          ),
                        )}
                      </div>

                      {/* Expanded highlights on hover */}
                      <div
                        className={cn(
                          "flex-1 transition-all duration-300 overflow-hidden",
                          isHovered
                            ? "opacity-100 max-h-[500px]"
                            : "opacity-0 max-h-0",
                        )}
                      >
                        <div className="pt-4 border-t border-border/50 space-y-3">
                          {company.positions[0].highlights
                            .slice(0, 3)
                            .map((highlight: string, hIndex: number) => (
                              <p
                                key={hIndex}
                                className="text-sm text-foreground/70 leading-relaxed flex gap-2"
                              >
                                <span className="text-primary shrink-0">
                                  {"\u2022"}
                                </span>
                                {highlight}
                              </p>
                            ))}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
