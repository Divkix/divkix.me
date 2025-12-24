"use client";

import { AnimatePresence, motion } from "framer-motion";
import { ExternalLink } from "lucide-react";
import { useState } from "react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ParallaxWrapper } from "@/components/ui/parallax-wrapper";
import { TiltCard } from "@/components/ui/tilt-card";
import { siteConfig } from "@/content/site.config";
import { staggerContainer, staggerItem } from "@/lib/animations";

/**
 * Generate responsive image srcset for project images
 * Uses pre-generated WebP images at multiple sizes
 */
function getResponsiveImage(imagePath: string) {
  const basePath = imagePath.replace(".webp", "");
  return {
    srcSet: `${basePath}-480.webp 480w, ${basePath}-768.webp 768w, ${basePath}.webp 1200w`,
    sizes: "(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw",
    src: imagePath,
  };
}

const allTags = Array.from(
  new Set(siteConfig.projects.flatMap((p) => p.tags)),
) as string[];

export function Projects() {
  const [selectedTag, setSelectedTag] = useState<string | null>(null);

  const filteredProjects = selectedTag
    ? siteConfig.projects.filter((p) =>
        (p.tags as readonly string[]).includes(selectedTag),
      )
    : siteConfig.projects;

  return (
    <section id="projects" className="container mx-auto px-4 py-20">
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
        className="space-y-12"
      >
        <motion.div variants={staggerItem} className="text-center space-y-4">
          <h2 className="text-4xl font-display font-bold">Projects</h2>
          <p className="text-foreground/60 max-w-2xl mx-auto">
            A selection of projects I&apos;ve built across different
            technologies.
          </p>
        </motion.div>

        {/* Filter chips */}
        <motion.div
          variants={staggerItem}
          className="flex flex-wrap justify-center gap-2"
        >
          <Button
            variant={selectedTag === null ? "default" : "outline"}
            onClick={() => setSelectedTag(null)}
            size="sm"
          >
            All
          </Button>
          {allTags.map((tag) => (
            <Button
              key={tag}
              variant={selectedTag === tag ? "default" : "outline"}
              onClick={() => setSelectedTag(tag)}
              size="sm"
            >
              {tag}
            </Button>
          ))}
        </motion.div>

        {/* Projects grid - removed layout prop to reduce compositor overhead */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence mode="wait">
            {filteredProjects.map((project, index) => (
              <motion.div
                key={project.name}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{
                  duration: 0.3,
                  delay: index * 0.05, // Stagger effect without layout
                }}
              >
                <ParallaxWrapper speed={0.5 + (index % 3) * 0.1}>
                  <TiltCard>
                    <Card className="h-full glass-surface hover:border-primary/50 transition-colors flex flex-col overflow-hidden">
                      {"image" in project &&
                        project.image &&
                        (() => {
                          const responsive = getResponsiveImage(
                            project.image as string,
                          );
                          return (
                            <div className="relative aspect-video w-full overflow-hidden bg-muted/50">
                              {/* biome-ignore lint/performance/noImgElement: Using native img with srcset for responsive images since next/image doesn't optimize with unoptimized:true */}
                              <img
                                src={responsive.src}
                                srcSet={responsive.srcSet}
                                sizes={responsive.sizes}
                                alt={project.name}
                                loading={index < 2 ? "eager" : "lazy"}
                                decoding="async"
                                className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                              />
                            </div>
                          );
                        })()}
                      <CardHeader>
                        <div className="flex justify-between items-start gap-2">
                          <CardTitle className="line-clamp-1">
                            {project.name}
                          </CardTitle>
                          {"period" in project && project.period && (
                            <span className="text-xs text-foreground/60 shrink-0">
                              {project.period}
                            </span>
                          )}
                        </div>
                        <CardDescription className="line-clamp-2">
                          {project.desc}
                        </CardDescription>
                      </CardHeader>
                      <CardContent className="space-y-4 mt-auto">
                        <div className="flex flex-wrap gap-2">
                          {project.tags.map((tag) => (
                            <Badge key={tag} variant="secondary">
                              {tag}
                            </Badge>
                          ))}
                        </div>
                        {project.links.length > 0 && (
                          <div className="flex gap-2">
                            {project.links.map((link) => (
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
                                  {link.label}
                                  <ExternalLink className="ml-2 h-4 w-4" />
                                </a>
                              </Button>
                            ))}
                          </div>
                        )}
                      </CardContent>
                    </Card>
                  </TiltCard>
                </ParallaxWrapper>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {filteredProjects.length === 0 && (
          <p className="text-center text-foreground/60">
            No projects found with this tag.
          </p>
        )}
      </motion.div>
    </section>
  );
}
