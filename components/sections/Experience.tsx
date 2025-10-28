"use client";

import { motion } from "framer-motion";
import { Briefcase, GraduationCap, Users, MapPin, Calendar } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { SectionContainer } from "@/components/shared/SectionContainer";
import { FadeIn } from "@/components/animations/FadeIn";
import { SlideIn } from "@/components/animations/SlideIn";
import { experiences, getWorkExperiences } from "@/lib/data/experience";
import { formatDate } from "@/lib/utils";
import type { Experience } from "@/lib/data/experience";

function ExperienceCard({
  experience,
  index,
}: {
  experience: Experience;
  index: number;
}) {
  const isEven = index % 2 === 0;
  const Icon =
    experience.type === "education"
      ? GraduationCap
      : experience.type === "leadership"
      ? Users
      : Briefcase;

  return (
    <div className="relative grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
      {/* Timeline Dot & Line */}
      <div className="absolute left-1/2 transform -translate-x-1/2 hidden md:flex flex-col items-center">
        <motion.div
          initial={{ scale: 0 }}
          whileInView={{ scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.3, delay: 0.2 }}
          className="w-4 h-4 rounded-full bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 z-10"
        />
      </div>

      {/* Content - Alternating Sides */}
      <SlideIn
        direction={isEven ? "left" : "right"}
        className={`${isEven ? "md:col-start-1 md:text-right" : "md:col-start-2"}`}
      >
        <Card
          className={`${
            experience.current ? "border-purple-500 bg-purple-500/5" : ""
          } hover:shadow-lg transition-shadow`}
        >
          <CardContent className="p-6 space-y-4">
            {/* Header */}
            <div className="flex items-start justify-between gap-4">
              <div className={`flex-1 ${isEven ? "md:text-right" : ""}`}>
                <div className="flex items-center gap-2 mb-1">
                  <Icon className="h-5 w-5 text-purple-500" />
                  <h3 className="text-xl font-bold">{experience.title}</h3>
                </div>
                <p className="text-lg text-muted-foreground font-medium">
                  {experience.company}
                </p>
              </div>
              {experience.current && (
                <Badge className="bg-purple-500 text-white">Current</Badge>
              )}
            </div>

            {/* Meta Info */}
            <div className={`flex flex-wrap gap-4 text-sm text-muted-foreground ${isEven ? "md:justify-end" : ""}`}>
              <div className="flex items-center gap-1">
                <Calendar className="h-4 w-4" />
                <span>
                  {formatDate(experience.startDate)} -{" "}
                  {experience.current ? "Present" : formatDate(experience.endDate)}
                </span>
              </div>
              <div className="flex items-center gap-1">
                <MapPin className="h-4 w-4" />
                <span>{experience.location}</span>
              </div>
            </div>

            <Separator />

            {/* Description */}
            <p className="text-muted-foreground">{experience.description}</p>

            {/* Achievements */}
            <div className="space-y-2">
              <h4 className="font-semibold text-sm">Key Achievements:</h4>
              <ul className={`space-y-1 text-sm text-muted-foreground ${isEven ? "md:text-right" : ""}`}>
                {experience.achievements.map((achievement, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className={`text-purple-500 ${isEven ? "md:order-2" : ""}`}>
                      •
                    </span>
                    <span className="flex-1">{achievement}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Technologies */}
            <div className="space-y-2">
              <h4 className="font-semibold text-sm">Technologies:</h4>
              <div className={`flex flex-wrap gap-2 ${isEven ? "md:justify-end" : ""}`}>
                {experience.technologies.map((tech) => (
                  <Badge key={tech} variant="secondary" className="text-xs">
                    {tech}
                  </Badge>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      </SlideIn>
    </div>
  );
}

export function Experience() {
  const workExperiences = getWorkExperiences();

  return (
    <SectionContainer id="experience" className="bg-background">
      <div className="space-y-16">
        {/* Header */}
        <FadeIn className="text-center space-y-4">
          <h2 className="text-4xl sm:text-5xl font-bold">
            Work <span className="gradient-text">Experience</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            My professional journey and leadership roles
          </p>
        </FadeIn>

        {/* Timeline */}
        <div className="relative space-y-12">
          {/* Vertical Line */}
          <motion.div
            initial={{ height: 0 }}
            whileInView={{ height: "100%" }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: "easeInOut" }}
            className="absolute left-1/2 top-0 w-0.5 bg-gradient-to-b from-blue-500 via-purple-500 to-pink-500 transform -translate-x-1/2 hidden md:block"
            style={{ height: "calc(100% - 48px)" }}
          />

          {/* Experience Cards */}
          {workExperiences.map((experience, index) => (
            <ExperienceCard
              key={experience.id}
              experience={experience}
              index={index}
            />
          ))}
        </div>

        {/* View All */}
        <FadeIn delay={0.4} className="text-center">
          <p className="text-sm text-muted-foreground">
            Want to know more?{" "}
            <a
              href="#contact"
              className="text-purple-500 hover:text-purple-600 font-medium transition-colors"
            >
              Let's connect
            </a>
          </p>
        </FadeIn>
      </div>
    </SectionContainer>
  );
}
