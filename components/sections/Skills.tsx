"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Scene } from "@/components/three/Scene";
import { AnimatedSphere } from "@/components/three/AnimatedSphere";
import { SectionContainer } from "@/components/shared/SectionContainer";
import { FadeIn } from "@/components/animations/FadeIn";
import { SlideIn } from "@/components/animations/SlideIn";
import { StaggerContainer } from "@/components/animations/StaggerContainer";
import { staggerItem } from "@/lib/animations";
import { skills, skillCategories, getSkillsByCategory } from "@/lib/data/skills";
import type { Skill } from "@/lib/data/skills";

function SkillCard({ skill }: { skill: Skill }) {
  return (
    <motion.div variants={staggerItem}>
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Card className="group hover:bg-accent/50 transition-colors cursor-pointer">
              <CardContent className="p-4 space-y-3">
                <div className="flex items-center justify-between">
                  <h4 className="font-semibold text-sm sm:text-base">
                    {skill.name}
                  </h4>
                  <span className="text-xs sm:text-sm font-medium text-muted-foreground group-hover:text-foreground transition-colors">
                    {skill.level}%
                  </span>
                </div>
                <Progress value={skill.level} className="h-2" />
              </CardContent>
            </Card>
          </TooltipTrigger>
          <TooltipContent>
            <p>Proficiency: {skill.level}%</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </motion.div>
  );
}

export function Skills() {
  const [activeTab, setActiveTab] = useState<Skill["category"]>("languages");

  const categories: Array<{
    value: Skill["category"];
    label: string;
  }> = [
    { value: "languages", label: "Languages" },
    { value: "frameworks", label: "Frameworks" },
    { value: "tools", label: "Tools" },
    { value: "cloud", label: "Cloud & DevOps" },
  ];

  return (
    <SectionContainer id="skills" className="relative bg-background overflow-hidden">
      {/* 3D Background */}
      <div className="absolute inset-0 z-0 opacity-30">
        <Scene className="w-full h-full">
          <AnimatedSphere />
        </Scene>
      </div>

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-background/80 to-background z-0" />

      {/* Content */}
      <div className="relative z-10 space-y-12">
        {/* Header */}
        <FadeIn className="text-center space-y-4">
          <h2 className="text-4xl sm:text-5xl font-bold">
            Technical <span className="gradient-text">Skills</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Technologies and tools I work with across different domains
          </p>
        </FadeIn>

        {/* Skills Tabs */}
        <SlideIn direction="up">
          <Tabs
            value={activeTab}
            onValueChange={(value) => setActiveTab(value as Skill["category"])}
            className="w-full"
          >
            <TabsList className="grid w-full grid-cols-2 lg:grid-cols-4 mb-8 h-auto gap-2 bg-transparent">
              {categories.map((category) => (
                <TabsTrigger
                  key={category.value}
                  value={category.value}
                  className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-500 data-[state=active]:via-purple-500 data-[state=active]:to-pink-500 data-[state=active]:text-white py-3 text-sm sm:text-base"
                >
                  {category.label}
                </TabsTrigger>
              ))}
            </TabsList>

            {categories.map((category) => (
              <TabsContent
                key={category.value}
                value={category.value}
                className="mt-0"
              >
                <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {getSkillsByCategory(category.value).map((skill) => (
                    <SkillCard key={skill.name} skill={skill} />
                  ))}
                </StaggerContainer>
              </TabsContent>
            ))}
          </Tabs>
        </SlideIn>

        {/* Summary Stats */}
        <FadeIn delay={0.4}>
          <div className="mt-12 p-6 glass rounded-xl">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
              <div>
                <div className="text-3xl font-bold gradient-text">8+</div>
                <div className="text-sm text-muted-foreground">Languages</div>
              </div>
              <div>
                <div className="text-3xl font-bold gradient-text">10+</div>
                <div className="text-sm text-muted-foreground">Frameworks</div>
              </div>
              <div>
                <div className="text-3xl font-bold gradient-text">15+</div>
                <div className="text-sm text-muted-foreground">Tools</div>
              </div>
              <div>
                <div className="text-3xl font-bold gradient-text">8+</div>
                <div className="text-sm text-muted-foreground">Cloud Platforms</div>
              </div>
            </div>
          </div>
        </FadeIn>
      </div>
    </SectionContainer>
  );
}
