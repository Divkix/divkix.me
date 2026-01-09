import { ExternalLink, GithubIcon, Globe } from "lucide-react";
import { useState } from "react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { siteConfig } from "@/data/site.config";

type Project = (typeof siteConfig.projects)[number];
type ProjectLink = Project["links"][number];

const allTags = Array.from(
  new Set(siteConfig.projects.flatMap((p: Project) => p.tags)),
) as string[];

function getAccentClass(tags: readonly string[]): string {
  const primaryTag = tags[0]?.toLowerCase() || "";

  if (primaryTag.includes("ai") || primaryTag.includes("ml")) {
    return "accent-ai";
  }
  if (primaryTag === "go") {
    return "accent-go";
  }
  if (primaryTag === "python") {
    return "accent-python";
  }
  return "accent-typescript";
}

function isFeatured(project: Project): boolean {
  return project.links.some((link: ProjectLink) => link.label === "Live");
}

export function Projects() {
  const [selectedTag, setSelectedTag] = useState<string | null>(null);

  const filteredProjects = selectedTag
    ? siteConfig.projects.filter((p: Project) =>
        (p.tags as readonly string[]).includes(selectedTag),
      )
    : siteConfig.projects;

  return (
    <section id="projects" className="container mx-auto px-4 py-20">
      <div className="space-y-12">
        <div className="text-center space-y-4 animate-fade-in-up">
          <h2 className="text-4xl font-display font-bold">Projects</h2>
          <p className="text-foreground/60 max-w-2xl mx-auto">
            A selection of projects I&apos;ve built across different
            technologies.
          </p>
        </div>

        {/* Filter chips */}
        <div className="flex flex-wrap justify-center gap-2 animate-fade-in-up animation-delay-100">
          <Button
            variant={selectedTag === null ? "default" : "outline"}
            onClick={() => setSelectedTag(null)}
            size="sm"
          >
            All
          </Button>
          {allTags.map((tag: string) => (
            <Button
              key={tag}
              variant={selectedTag === tag ? "default" : "outline"}
              onClick={() => setSelectedTag(tag)}
              size="sm"
            >
              {tag}
            </Button>
          ))}
        </div>

        {/* Bento grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-5">
          {filteredProjects.map((project: Project, index: number) => {
            const featured = isFeatured(project);
            const accentClass = getAccentClass(project.tags);

            return (
              <article
                key={project.name}
                className={`
                  project-card ${accentClass}
                  ${featured ? "md:col-span-2 project-card-featured" : "project-card-regular"}
                  animate-project-entrance
                `}
                style={{
                  animationDelay: `${150 + index * 80}ms`,
                }}
              >
                <div className="project-card-content">
                  {/* Header */}
                  <div className="space-y-3">
                    <div className="flex justify-between items-start gap-2">
                      <h3
                        className={`font-display font-bold leading-tight ${
                          featured ? "text-2xl" : "text-xl"
                        }`}
                      >
                        {project.name}
                      </h3>
                      {"period" in project && project.period && (
                        <span className="text-xs text-muted-foreground shrink-0">
                          {project.period}
                        </span>
                      )}
                    </div>

                    <p
                      className={`text-foreground/70 leading-relaxed ${
                        featured ? "text-base" : "text-sm line-clamp-2"
                      }`}
                    >
                      {project.desc}
                    </p>
                  </div>

                  {/* Footer */}
                  <div className="space-y-3 mt-4">
                    {/* Tags */}
                    <div className="flex flex-wrap gap-1.5">
                      {project.tags.map((tag: string) => (
                        <Badge key={tag} variant="secondary" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                    </div>

                    {/* Links */}
                    {project.links.length > 0 && (
                      <div className="flex gap-2">
                        {project.links.map((link: ProjectLink) => (
                          <Button
                            key={link.label}
                            variant="outline"
                            size="sm"
                            asChild
                          >
                            <a
                              href={link.href}
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              {link.label === "Live" ? (
                                <Globe className="mr-1.5 h-3.5 w-3.5" />
                              ) : link.label === "GitHub" ? (
                                <GithubIcon className="mr-1.5 h-3.5 w-3.5" />
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
                </div>
              </article>
            );
          })}
        </div>

        {filteredProjects.length === 0 && (
          <p className="text-center text-foreground/60">
            No projects found with this tag.
          </p>
        )}
      </div>
    </section>
  );
}
