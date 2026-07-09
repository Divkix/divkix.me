import { SectionHeading } from "@/components/shared/SectionHeading";
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

function linkLabel(label: ProjectLink["label"]): string {
  if (label === "Live") return "Visit site";
  if (label === "GitHub") return "Source";
  return label;
}

function ProjectEntry({ project }: { project: Project }) {
  const blogHref = PROJECT_BLOG_MAP[project.name];
  const hasTags = "tags" in project && project.tags && project.tags.length > 0;
  const hasPeriod = "period" in project && project.period;

  return (
    <article className="border-t border-border py-(--space-xl) first:border-t-0 first:pt-0">
      <div className="split-studio">
        <div className="min-w-0 space-y-(--space-sm)">
          <h3 className="font-display text-2xl md:text-[1.75rem] leading-[1.05] m-0">
            {project.name}
          </h3>
          {hasPeriod && (
            <p className="m-0 text-xs text-muted-foreground tabular-nums">
              {project.period}
            </p>
          )}
          {hasTags && (
            <p className="m-0 text-xs text-muted-foreground leading-relaxed">
              {project.tags.join(" · ")}
            </p>
          )}
        </div>

        <div className="min-w-0 space-y-(--space-md)">
          <p className="m-0 text-base text-foreground/85 leading-relaxed max-w-prose">
            {project.desc}
          </p>

          <p className="m-0 flex flex-wrap items-center gap-x-(--space-lg) gap-y-(--space-xs) text-sm">
            {project.links.map((link: ProjectLink) => (
              <a
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`${linkLabel(link.label)} — ${project.name}`}
                className="text-foreground link-underline-grow"
              >
                {linkLabel(link.label)} <span aria-hidden="true">↗</span>
              </a>
            ))}
            {blogHref && (
              <a
                href={blogHref}
                aria-label={`Case study — ${project.name}`}
                className="text-primary link-underline-grow"
              >
                Case study <span aria-hidden="true">→</span>
              </a>
            )}
          </p>
        </div>
      </div>
    </article>
  );
}

export function Projects() {
  const featured = siteConfig.projects.filter(isFeatured);

  return (
    <section id="projects" className="text-band min-w-0">
      <SectionHeading
        title="Selected work"
        description="Four projects I keep coming back to. Edge infrastructure at Cloudflare, a logging tool I built because Datadog priced me out, an AI portfolio generator, and the Telegram bot that taught me what shipping at scale really means."
      />

      <div className="mt-(--space-lg)">
        {featured.map((project: Project) => (
          <ProjectEntry key={project.name} project={project} />
        ))}
      </div>

      <p className="mt-(--space-lg)">
        <a href="/about" className="text-sm text-primary link-underline-grow">
          More projects and full résumé on About{" "}
          <span aria-hidden="true">→</span>
        </a>
      </p>
    </section>
  );
}
