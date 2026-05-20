import { BookOpen, ExternalLink, Globe } from "lucide-react";
import type { ComponentProps } from "react";

import { SectionHeading } from "@/components/shared/SectionHeading";
import { Button } from "@/components/ui/button";
import { siteConfig } from "@/data/site.config";

type Project = (typeof siteConfig.projects)[number];
type ProjectLink = Project["links"][number];

const FEATURED_PROJECT_NAMES = new Set([
  "Vinext",
  "LogWell",
  "Clickfolio",
  "Alita Robot",
]);

const PROJECT_BLOG_MAP: Record<string, string> = {
  LogWell: "/blog/logwell-self-hosted-logging-platform",
  Clickfolio: "/blog/clickfolio-full-stack-cloudflare-workers",
  "Alita Robot": "/blog/scaling-telegram-bot-300k-users",
};

function isFeatured(project: Project): boolean {
  return FEATURED_PROJECT_NAMES.has(project.name);
}

function GitHubIcon(props: ComponentProps<"svg">) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      {...props}
    >
      <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.4 5.4 0 0 0 4 9c0 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
      <path d="M9 18c-4.51 2-5-2-7-2" />
    </svg>
  );
}

function FeaturedProjectCard({ project }: { project: Project }) {
  return (
    <article className="border-t border-border pt-[var(--space-lg)] first:border-t-0 first:pt-0 min-w-0">
      <div className="grid grid-cols-1 md:grid-cols-[minmax(0,1fr)_auto] gap-[var(--space-md)] md:gap-[var(--space-xl)] items-start">
        <div className="min-w-0 space-y-2">
          <div className="flex flex-wrap items-baseline justify-between gap-2">
            <h3 className="text-xl md:text-2xl font-display leading-[1.1]">
              {project.name}
            </h3>
            {"period" in project && project.period && (
              <span className="text-xs text-muted-foreground uppercase tracking-[0.06em]">
                {project.period}
              </span>
            )}
          </div>
          <p className="text-foreground/80 leading-relaxed max-w-prose text-base">
            {project.desc}
          </p>
        </div>
        <div className="flex flex-wrap gap-2 items-start min-w-0">
          {project.links.map((link: ProjectLink) => {
            const linkLabel = link.label;
            const ariaLabel =
              linkLabel === "Live"
                ? `View ${project.name} live`
                : linkLabel === "GitHub"
                  ? `View ${project.name} on GitHub`
                  : `${linkLabel} - ${project.name}`;
            return (
              <Button key={link.label} variant="outline" size="sm" asChild>
                <a
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={ariaLabel}
                  className="rounded-none uppercase tracking-[0.04em] text-xs"
                >
                  {linkLabel === "Live" ? (
                    <Globe className="mr-1.5 size-3.5" />
                  ) : linkLabel === "GitHub" ? (
                    <GitHubIcon className="mr-1.5 size-3.5" />
                  ) : (
                    <ExternalLink className="mr-1.5 size-3.5" />
                  )}
                  {linkLabel}
                </a>
              </Button>
            );
          })}
          {PROJECT_BLOG_MAP[project.name] && (
            <Button variant="ghost" size="sm" asChild>
              <a
                href={PROJECT_BLOG_MAP[project.name]}
                className="rounded-none uppercase tracking-[0.04em] text-xs"
              >
                <BookOpen className="mr-1.5 size-3.5" />
                Read more
              </a>
            </Button>
          )}
        </div>
      </div>
    </article>
  );
}

export function Projects() {
  const featured = siteConfig.projects.filter(isFeatured);

  return (
    <section
      id="projects"
      className="text-band max-w-4xl space-y-[var(--space-xl)]"
    >
      <SectionHeading
        title="Selected work"
        description="Four products and tools I've built — edge platforms, logging, portfolios, and bots people actually use."
      />

      <div className="space-y-0">
        {featured.map((project: Project) => (
          <FeaturedProjectCard key={project.name} project={project} />
        ))}
      </div>

      <p className="text-muted-foreground">
        <a
          href="/about"
          className="text-primary link-underline-grow whitespace-nowrap uppercase text-sm tracking-[0.06em]"
        >
          More projects and full résumé on About →
        </a>
      </p>
    </section>
  );
}
