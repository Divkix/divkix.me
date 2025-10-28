"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ExternalLink, Github, Filter } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { SectionContainer } from "@/components/shared/SectionContainer";
import { FadeIn } from "@/components/animations/FadeIn";
import { SlideIn } from "@/components/animations/SlideIn";
import { StaggerContainer } from "@/components/animations/StaggerContainer";
import { staggerItem } from "@/lib/animations";
import { projects, projectCategories } from "@/lib/data/projects";
import type { Project } from "@/lib/data/projects";

type ProjectCategory = keyof typeof projectCategories;

function ProjectCard({ project }: { project: Project }) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <motion.div variants={staggerItem}>
        <Card className="group h-full flex flex-col overflow-hidden hover:shadow-xl transition-shadow">
          {/* Image Placeholder */}
          <div className="relative w-full h-48 bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 overflow-hidden">
            <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors" />
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-4xl font-bold text-white opacity-50">
                {project.title
                  .split(" ")
                  .map((word) => word[0])
                  .join("")
                  .slice(0, 3)}
              </div>
            </div>
            {project.featured && (
              <div className="absolute top-4 right-4">
                <Badge className="bg-yellow-500 text-yellow-950">
                  Featured
                </Badge>
              </div>
            )}
          </div>

          <CardHeader>
            <CardTitle className="text-xl">{project.title}</CardTitle>
          </CardHeader>

          <CardContent className="flex-1 flex flex-col space-y-4">
            <p className="text-sm text-muted-foreground line-clamp-3">
              {project.description}
            </p>

            {/* Tags */}
            <div className="flex flex-wrap gap-2">
              {project.tags.slice(0, 4).map((tag) => (
                <Badge key={tag} variant="secondary" className="text-xs">
                  {tag}
                </Badge>
              ))}
              {project.tags.length > 4 && (
                <Badge variant="secondary" className="text-xs">
                  +{project.tags.length - 4}
                </Badge>
              )}
            </div>

            {/* Stats */}
            {project.stats && (
              <div className="flex gap-4 text-xs text-muted-foreground">
                {project.stats.users && <span>👥 {project.stats.users}</span>}
                {project.stats.stars && <span>⭐ {project.stats.stars}</span>}
                {project.stats.downloads && (
                  <span>📥 {project.stats.downloads}</span>
                )}
              </div>
            )}

            {/* Actions */}
            <div className="flex gap-2 mt-auto pt-4">
              {project.github && (
                <Button
                  variant="outline"
                  size="sm"
                  asChild
                  className="flex-1"
                >
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Github className="h-4 w-4 mr-2" />
                    Code
                  </a>
                </Button>
              )}
              {project.demo && (
                <Button
                  variant="outline"
                  size="sm"
                  asChild
                  className="flex-1"
                >
                  <a href={project.demo} target="_blank" rel="noopener noreferrer">
                    <ExternalLink className="h-4 w-4 mr-2" />
                    Demo
                  </a>
                </Button>
              )}
              <Button
                variant="default"
                size="sm"
                onClick={() => setIsModalOpen(true)}
                className="flex-1"
              >
                Details
              </Button>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Project Details Modal */}
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-2xl">{project.title}</DialogTitle>
            <DialogDescription className="text-base">
              {project.description}
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-6">
            {/* Full Description */}
            <div>
              <h4 className="font-semibold mb-2">About</h4>
              <p className="text-muted-foreground">{project.longDescription}</p>
            </div>

            {/* Technologies */}
            <div>
              <h4 className="font-semibold mb-2">Technologies</h4>
              <div className="flex flex-wrap gap-2">
                {project.tags.map((tag) => (
                  <Badge key={tag} variant="secondary">
                    {tag}
                  </Badge>
                ))}
              </div>
            </div>

            {/* Stats */}
            {project.stats && (
              <div>
                <h4 className="font-semibold mb-2">Statistics</h4>
                <div className="flex gap-6">
                  {project.stats.users && (
                    <div>
                      <div className="text-2xl font-bold gradient-text">
                        {project.stats.users}
                      </div>
                      <div className="text-sm text-muted-foreground">Users</div>
                    </div>
                  )}
                  {project.stats.stars && (
                    <div>
                      <div className="text-2xl font-bold gradient-text">
                        {project.stats.stars}
                      </div>
                      <div className="text-sm text-muted-foreground">Stars</div>
                    </div>
                  )}
                  {project.stats.downloads && (
                    <div>
                      <div className="text-2xl font-bold gradient-text">
                        {project.stats.downloads}
                      </div>
                      <div className="text-sm text-muted-foreground">
                        Downloads
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Links */}
            <div className="flex gap-2">
              {project.github && (
                <Button asChild>
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Github className="h-4 w-4 mr-2" />
                    View on GitHub
                  </a>
                </Button>
              )}
              {project.demo && (
                <Button variant="outline" asChild>
                  <a href={project.demo} target="_blank" rel="noopener noreferrer">
                    <ExternalLink className="h-4 w-4 mr-2" />
                    Live Demo
                  </a>
                </Button>
              )}
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}

export function Projects() {
  const [activeFilter, setActiveFilter] = useState<ProjectCategory>("all");

  const filteredProjects =
    activeFilter === "all"
      ? projects
      : projects.filter((p) => p.category === activeFilter);

  const filterButtons: Array<{
    value: ProjectCategory;
    label: string;
  }> = [
    { value: "all", label: "All Projects" },
    { value: "web", label: "Web Apps" },
    { value: "bot", label: "Bots" },
    { value: "ml", label: "AI/ML" },
    { value: "tool", label: "Tools" },
  ];

  return (
    <SectionContainer id="projects" className="bg-muted/30">
      <div className="space-y-12">
        {/* Header */}
        <FadeIn className="text-center space-y-4">
          <h2 className="text-4xl sm:text-5xl font-bold">
            Featured <span className="gradient-text">Projects</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            A selection of projects I've built, from web applications to AI
            systems
          </p>
        </FadeIn>

        {/* Filter Buttons */}
        <SlideIn direction="up">
          <div className="flex flex-wrap justify-center gap-2">
            {filterButtons.map((filter) => (
              <Button
                key={filter.value}
                variant={activeFilter === filter.value ? "default" : "outline"}
                onClick={() => setActiveFilter(filter.value)}
                className={
                  activeFilter === filter.value
                    ? "bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500"
                    : ""
                }
              >
                <Filter className="h-4 w-4 mr-2" />
                {filter.label}
              </Button>
            ))}
          </div>
        </SlideIn>

        {/* Projects Grid */}
        <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProjects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </StaggerContainer>

        {/* Empty State */}
        {filteredProjects.length === 0 && (
          <FadeIn className="text-center py-12">
            <p className="text-muted-foreground">
              No projects found in this category.
            </p>
          </FadeIn>
        )}
      </div>
    </SectionContainer>
  );
}
