import { ExternalLink, Github, Globe } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";

import { SectionLabel } from "@/components/shared/SectionLabel";
import { Button } from "@/components/ui/button";
import { siteConfig } from "@/data/site.config";
import { cn } from "@/lib/utils";

type Project = (typeof siteConfig.projects)[number];
type ProjectLink = Project["links"][number];

const allTags = Array.from(
  new Set(siteConfig.projects.flatMap((p: Project) => p.tags)),
) as string[];

function getTagColor(tag: string): string {
  const t = tag.toLowerCase();
  if (t === "typescript" || t === "next.js") return "oklch(0.65 0.2 250)";
  if (t === "go") return "oklch(0.65 0.2 185)";
  if (t === "python") return "oklch(0.7 0.15 85)";
  if (t.includes("ai") || t.includes("ml")) return "oklch(0.65 0.2 300)";
  if (t === "mongodb") return "oklch(0.6 0.15 155)";
  if (t === "telegram") return "oklch(0.6 0.15 220)";
  if (t === "qdrant") return "oklch(0.65 0.2 300)";
  if (t === "logging" || t === "otlp") return "oklch(0.7 0.15 55)";
  return "oklch(0.6 0 0)";
}

function getAccentColor(tags: readonly string[]): string {
  return getTagColor(tags[0] || "");
}

function isFeatured(project: Project): boolean {
  return project.links.some((link: ProjectLink) => link.label === "Live");
}

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
      { threshold: 0.1 },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return { ref, isVisible };
}

function BrowserMockup({
  url,
  accentColor,
}: {
  url: string;
  accentColor: string;
}) {
  return (
    <div className="w-full rounded-xl overflow-hidden border border-border shadow-sm">
      <div className="flex items-center gap-2 px-4 py-2.5 bg-muted/60 border-b border-border">
        <div className="flex gap-1.5">
          <div className="w-3 h-3 rounded-full bg-red-400/70" />
          <div className="w-3 h-3 rounded-full bg-yellow-400/70" />
          <div className="w-3 h-3 rounded-full bg-green-400/70" />
        </div>
        <div className="flex-1 mx-2 px-3 py-1 text-xs font-mono text-muted-foreground bg-background/60 rounded-md truncate">
          {url}
        </div>
      </div>
      <div
        className="h-32 md:h-40"
        style={{
          background: `linear-gradient(135deg, ${accentColor} 0%, oklch(0.25 0.02 60) 100%)`,
        }}
      />
    </div>
  );
}

function FeaturedProjectCard({
  project,
  index,
}: {
  project: Project;
  index: number;
}) {
  const { ref, isVisible } = useScrollReveal();
  const accentColor = getAccentColor(project.tags);
  const liveLink = project.links.find((l: ProjectLink) => l.label === "Live");

  return (
    <div
      ref={ref}
      className={cn(
        "grid grid-cols-1 md:grid-cols-2 rounded-xl border border-border bg-card shadow-hard overflow-hidden transition-all duration-700",
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8",
      )}
      style={{ transitionDelay: `${index * 150}ms` }}
    >
      <div className="p-8 flex flex-col justify-between">
        <div className="space-y-4">
          <div className="flex items-center justify-between gap-2">
            <h3 className="text-2xl font-display font-bold">{project.name}</h3>
            {"period" in project && project.period && (
              <span className="text-xs font-mono text-muted-foreground shrink-0">
                {project.period}
              </span>
            )}
          </div>
          <p className="text-foreground/70 leading-relaxed">{project.desc}</p>
          <div className="flex flex-wrap gap-1.5">
            {project.tags.map((tag: string) => (
              <span
                key={tag}
                className="px-1.5 py-0.5 text-xs font-mono rounded bg-muted"
                style={{ color: getTagColor(tag) }}
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
        <div className="flex gap-2 mt-6">
          {project.links.map((link: ProjectLink) => (
            <Button key={link.label} variant="outline" size="sm" asChild>
              <a href={link.href} target="_blank" rel="noopener noreferrer">
                {link.label === "Live" ? (
                  <Globe className="mr-1.5 h-3.5 w-3.5" />
                ) : link.label === "GitHub" ? (
                  <Github className="mr-1.5 h-3.5 w-3.5" />
                ) : (
                  <ExternalLink className="mr-1.5 h-3.5 w-3.5" />
                )}
                {link.label}
              </a>
            </Button>
          ))}
        </div>
      </div>
      <div className="p-6 flex items-center">
        <BrowserMockup
          url={
            liveLink?.href.replace("https://", "") ||
            project.name.toLowerCase().replace(/\s+/g, "")
          }
          accentColor={accentColor}
        />
      </div>
    </div>
  );
}

function RegularProjectCard({
  project,
  index,
}: {
  project: Project;
  index: number;
}) {
  const { ref, isVisible } = useScrollReveal();
  const accentColor = getAccentColor(project.tags);

  return (
    <article
      ref={ref}
      className={cn(
        "rounded-xl border border-border border-t-4 bg-card shadow-hard overflow-hidden transition-all duration-700 hover:-translate-y-0.5 hover:shadow-elevated",
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8",
      )}
      style={{
        borderTopColor: accentColor,
        transitionDelay: `${index * 100}ms`,
      }}
    >
      <div className="p-6 flex flex-col justify-between h-full min-h-[200px]">
        <div className="space-y-3">
          <div className="flex items-center justify-between gap-2">
            <h3 className="text-xl font-display font-bold">{project.name}</h3>
            {"period" in project && project.period && (
              <span className="text-xs font-mono text-muted-foreground shrink-0">
                {project.period}
              </span>
            )}
          </div>
          <p className="text-sm text-foreground/70 leading-relaxed line-clamp-2">
            {project.desc}
          </p>
          <div className="flex flex-wrap gap-1.5">
            {project.tags.map((tag: string) => (
              <span
                key={tag}
                className="px-1.5 py-0.5 text-xs font-mono rounded bg-muted"
                style={{ color: getTagColor(tag) }}
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
        {project.links.length > 0 && (
          <div className="flex gap-2 mt-4">
            {project.links.map((link: ProjectLink) => (
              <Button key={link.label} variant="outline" size="sm" asChild>
                <a href={link.href} target="_blank" rel="noopener noreferrer">
                  {link.label === "GitHub" ? (
                    <Github className="mr-1.5 h-3.5 w-3.5" />
                  ) : link.label === "Live" ? (
                    <Globe className="mr-1.5 h-3.5 w-3.5" />
                  ) : (
                    <ExternalLink className="mr-1.5 h-3.5 w-3.5" />
                  )}
                  {link.label}
                </a>
              </Button>
            ))}
          </div>
        )}
      </div>
    </article>
  );
}

export function Projects() {
  const [selectedTag, setSelectedTag] = useState<string | null>(null);
  const [indicatorStyle, setIndicatorStyle] = useState<React.CSSProperties>({});
  const filterRefs = useRef<Map<string, HTMLButtonElement>>(new Map());
  const containerRef = useRef<HTMLDivElement>(null);

  const filteredProjects = selectedTag
    ? siteConfig.projects.filter((p: Project) =>
        (p.tags as readonly string[]).includes(selectedTag),
      )
    : siteConfig.projects;

  const featured = filteredProjects.filter(isFeatured);
  const regular = filteredProjects.filter((p) => !isFeatured(p));

  const updateIndicator = useCallback((key: string) => {
    const el = filterRefs.current.get(key);
    const container = containerRef.current;
    if (!el || !container) return;

    const containerRect = container.getBoundingClientRect();
    const elRect = el.getBoundingClientRect();

    setIndicatorStyle({
      width: elRect.width,
      transform: `translateX(${elRect.left - containerRect.left}px)`,
    });
  }, []);

  useEffect(() => {
    updateIndicator(selectedTag || "all");
  }, [selectedTag, updateIndicator]);

  useEffect(() => {
    const handleResize = () => updateIndicator(selectedTag || "all");
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [selectedTag, updateIndicator]);

  return (
    <section
      id="projects"
      className="container mx-auto px-4 py-24 reveal-on-scroll"
    >
      <div className="space-y-12">
        <div className="space-y-4">
          <SectionLabel number="02" label="projects" />
          <h2 className="text-4xl font-display font-bold">Projects</h2>
          <p className="text-muted-foreground max-w-2xl">
            A selection of projects I&apos;ve built across different
            technologies.
          </p>
        </div>

        {/* Segmented control filter */}
        <div
          ref={containerRef}
          className="relative inline-flex gap-0.5 p-1 bg-muted rounded-lg overflow-x-auto max-w-full"
        >
          <div
            className="absolute top-1 h-[calc(100%-8px)] bg-background rounded-md shadow-sm transition-all duration-300 ease-out"
            style={indicatorStyle}
          />
          <button
            ref={(el) => {
              if (el) filterRefs.current.set("all", el);
            }}
            type="button"
            className={cn(
              "relative z-10 px-4 py-1.5 text-sm font-medium rounded-md transition-colors whitespace-nowrap",
              selectedTag === null
                ? "text-foreground"
                : "text-muted-foreground hover:text-foreground",
            )}
            onClick={() => setSelectedTag(null)}
          >
            All
          </button>
          {allTags.map((tag: string) => (
            <button
              key={tag}
              ref={(el) => {
                if (el) filterRefs.current.set(tag, el);
              }}
              type="button"
              className={cn(
                "relative z-10 px-4 py-1.5 text-sm font-medium rounded-md transition-colors whitespace-nowrap",
                selectedTag === tag
                  ? "text-foreground"
                  : "text-muted-foreground hover:text-foreground",
              )}
              onClick={() => setSelectedTag(tag)}
            >
              {tag}
            </button>
          ))}
        </div>

        {/* Featured projects — full-width hero cards */}
        {featured.length > 0 && (
          <div className="space-y-6">
            {featured.map((project: Project, index: number) => (
              <FeaturedProjectCard
                key={project.name}
                project={project}
                index={index}
              />
            ))}
          </div>
        )}

        {/* Regular projects — 2-column grid */}
        {regular.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {regular.map((project: Project, index: number) => (
              <RegularProjectCard
                key={project.name}
                project={project}
                index={index}
              />
            ))}
          </div>
        )}

        {filteredProjects.length === 0 && (
          <p className="text-muted-foreground">
            No projects found with this tag.
          </p>
        )}
      </div>
    </section>
  );
}
