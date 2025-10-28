"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Scene } from "@/components/three/Scene";
import { AnimatedSphere } from "@/components/three/AnimatedSphere";
import { SectionContainer } from "@/components/shared/SectionContainer";
import { FadeIn } from "@/components/animations/FadeIn";
import { getSkillsByCategory } from "@/lib/data/skills";
import type { Skill } from "@/lib/data/skills";

function SkillBubble({ skill, index }: { skill: Skill; index: number }) {
  // Create varied bubble sizes and positions
  const sizes = ["w-32 h-32", "w-36 h-36", "w-40 h-40", "w-28 h-28"];
  const size = sizes[index % sizes.length];

  return (
    <motion.div
      className={`${size} rounded-full bg-gradient-to-br from-blue-500/20 to-purple-500/20 backdrop-blur-xl border border-white/10 flex flex-col items-center justify-center cursor-pointer`}
      initial={{ opacity: 0, scale: 0 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.05, duration: 0.5 }}
      animate={{
        y: [0, -15, 0],
      }}
      whileHover={{
        scale: 1.2,
        boxShadow: "0 0 30px rgba(139, 92, 246, 0.5)",
      }}
      {...({
        transition: {
          y: {
            duration: 2 + (index % 3),
            repeat: Infinity,
            ease: "easeInOut",
          },
          scale: { duration: 0.3 },
        },
      } as any)}
    >
      <div className="text-center px-3">
        <div className="text-sm font-bold mb-1">{skill.name}</div>
        <div className="text-xs text-purple-400">{skill.level}%</div>
      </div>
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

  const currentSkills = getSkillsByCategory(activeTab);

  return (
    <SectionContainer id="skills" className="relative bg-background overflow-hidden">
      {/* 3D Background */}
      <div className="absolute inset-0 z-0 opacity-10">
        <Scene className="w-full h-full">
          <AnimatedSphere />
        </Scene>
      </div>

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-background/95 to-background z-0" />

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

        {/* Category Tabs - Organic blob buttons */}
        <motion.div
          className="flex flex-wrap justify-center gap-4"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          {categories.map((category, index) => (
            <motion.button
              key={category.value}
              onClick={() => setActiveTab(category.value)}
              className={`px-6 py-3 font-semibold relative overflow-hidden ${
                activeTab === category.value
                  ? "blob-1 text-white"
                  : "blob-2 text-foreground border-2 border-purple-500/30"
              }`}
              style={{
                background: activeTab === category.value
                  ? "linear-gradient(135deg, #667eea 0%, #764ba2 100%)"
                  : "rgba(255, 255, 255, 0.05)",
                backdropFilter: "blur(10px)",
              }}
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.3 }}
            >
              {category.label}
            </motion.button>
          ))}
        </motion.div>

        {/* Skills displayed as floating bubbles in asymmetric layout */}
        <div className="relative min-h-[500px]">
          <div className="flex flex-wrap justify-center gap-6 p-8">
            {currentSkills.map((skill, index) => (
              <SkillBubble key={skill.name} skill={skill} index={index} />
            ))}
          </div>
        </div>

        {/* Summary Stats - Tilted cards */}
        <div className="mt-12 flex flex-wrap justify-center gap-6">
          {[
            { value: "8+", label: "Languages" },
            { value: "10+", label: "Frameworks" },
            { value: "15+", label: "Tools" },
            { value: "8+", label: "Cloud Platforms" },
          ].map((stat, index) => (
            <motion.div
              key={stat.label}
              className="w-40 p-6 glass-strong"
              style={{
                borderRadius: "20px",
                transform: `rotate(${index % 2 === 0 ? -3 : 3}deg)`,
              }}
              initial={{ opacity: 0, y: 50, rotate: 0 }}
              whileInView={{
                opacity: 1,
                y: 0,
                rotate: index % 2 === 0 ? -3 : 3,
              }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              whileHover={{
                rotate: 0,
                scale: 1.1,
              }}
            >
              <div className="text-4xl font-bold gradient-text mb-2 text-center">
                {stat.value}
              </div>
              <div className="text-sm text-muted-foreground text-center">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </SectionContainer>
  );
}
