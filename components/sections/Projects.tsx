"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ExternalLink, Github, Filter } from "lucide-react";
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
import { projects, projectCategories } from "@/lib/data/projects";
import type { Project } from "@/lib/data/projects";

type ProjectCategory = keyof typeof projectCategories;

function ProjectCard({ project, index }: { project: Project; index: number }) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Create varied card sizes for bento-style layout
  const isLarge = project.featured || index % 5 === 0;
  const rotations = [-2, 2, -1, 1, 0];
  const rotation = rotations[index % rotations.length];

  return (
    <>
      <motion.div
        className={`${isLarge ? "md:col-span-2" : ""} group`}
        initial={{ opacity: 0, y: 50, rotate: 0 }}
        whileInView={{ opacity: 1, y: 0, rotate: rotation }}
        viewport={{ once: true }}
        transition={{ delay: index * 0.1, duration: 0.6 }}
        whileHover={{
          rotate: 0,
          scale: 1.02,
        }}
      >
        <div className="h-full p-6 bg-background/80 backdrop-blur-sm border border-purple-500/30 shadow-brutal-hover overflow-hidden blob-3">
          {/* Image Placeholder with morphing effect */}
          <motion.div
            className="relative w-full h-48 bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 overflow-hidden mb-4 blob-1"
            animate={{
              borderRadius: [
                "30% 70% 70% 30% / 30% 30% 70% 70%",
                "70% 30% 30% 70% / 70% 70% 30% 30%",
                "30% 70% 70% 30% / 30% 30% 70% 70%",
              ],
            }}
            transition={{
              duration: 6,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors flex items-center justify-center">
              <div className="text-5xl font-bold text-white opacity-50">
                {project.title
                  .split(" ")
                  .map((word) => word[0])
                  .join("")
                  .slice(0, 3)}
              </div>
            </div>
            {project.featured && (
              <div className="absolute top-4 right-4">
                <Badge className="bg-yellow-500 text-yellow-950 blob-4">
                  Featured
                </Badge>
              </div>
            )}
          </motion.div>

          {/* Content */}
          <div className="space-y-4">
            <h3 className="text-2xl font-bold">{project.title}</h3>

            <p className="text-sm text-muted-foreground line-clamp-3">
              {project.description}
            </p>

            {/* Tags */}
            <div className="flex flex-wrap gap-2">
              {project.tags.slice(0, 4).map((tag) => (
                <Badge key={tag} variant="secondary" className="text-xs blob-2">
                  {tag}
                </Badge>
              ))}
              {project.tags.length > 4 && (
                <Badge variant="secondary" className="text-xs blob-2">
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
            <div className="flex gap-2 pt-2">
              {project.github && (
                <motion.a
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 text-sm font-medium bg-background/50 border border-purple-500/30 rounded-full hover:bg-purple-500/20 transition-colors flex items-center gap-2"
                  whileHover={{ scale: 1.05 }}
                >
                  <Github className="h-4 w-4" />
                  Code
                </motion.a>
              )}
              {project.demo && (
                <motion.a
                  href={project.demo}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 text-sm font-medium bg-background/50 border border-purple-500/30 rounded-full hover:bg-purple-500/20 transition-colors flex items-center gap-2"
                  whileHover={{ scale: 1.05 }}
                >
                  <ExternalLink className="h-4 w-4" />
                  Demo
                </motion.a>
              )}
              <motion.button
                onClick={() => setIsModalOpen(true)}
                className="px-4 py-2 text-sm font-medium bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-full flex items-center gap-2"
                whileHover={{ scale: 1.05 }}
              >
                Details
              </motion.button>
            </div>
          </div>
        </div>
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

        {/* Filter Buttons - Organic blobs */}
        <SlideIn direction="up">
          <div className="flex flex-wrap justify-center gap-3">
            {filterButtons.map((filter, index) => (
              <motion.button
                key={filter.value}
                onClick={() => setActiveFilter(filter.value)}
                className={`px-6 py-3 font-semibold relative overflow-hidden ${
                  activeFilter === filter.value
                    ? "blob-1 text-white"
                    : "blob-2 text-foreground border-2 border-purple-500/30"
                }`}
                style={{
                  background: activeFilter === filter.value
                    ? "linear-gradient(135deg, #667eea 0%, #764ba2 100%)"
                    : "rgba(255, 255, 255, 0.05)",
                  backdropFilter: "blur(10px)",
                }}
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.3 }}
              >
                <Filter className="inline h-4 w-4 mr-2" />
                {filter.label}
              </motion.button>
            ))}
          </div>
        </SlideIn>

        {/* Projects Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 auto-rows-auto">
          {filteredProjects.map((project, index) => (
            <ProjectCard key={project.id} project={project} index={index} />
          ))}
        </div>

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
