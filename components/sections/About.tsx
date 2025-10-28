"use client";

import React from "react";
import { motion } from "framer-motion";
import { Users, Briefcase, Award, GraduationCap } from "lucide-react";
import { SectionContainer } from "@/components/shared/SectionContainer";
import { FadeIn } from "@/components/animations/FadeIn";
import { SlideIn } from "@/components/animations/SlideIn";

const stats = [
  { icon: Users, value: "1M+", label: "Users Reached", delay: 0 },
  { icon: Briefcase, value: "30+", label: "Projects", delay: 0.2 },
  { icon: Award, value: "50+", label: "Contributions", delay: 0.4 },
  { icon: GraduationCap, value: "3.8+", label: "GPA", delay: 0.6 },
];

const education = [
  {
    degree: "MS Computer Science",
    school: "Arizona State University",
    period: "2025 - 2026",
    focus: "AI, ML, and Data Science",
  },
  {
    degree: "BS Computer Science",
    school: "Arizona State University",
    period: "2022 - 2025",
    honor: "Magna Cum Laude",
  },
];

export function About() {
  return (
    <SectionContainer id="about" className="gradient-mesh">
      <div className="max-w-7xl mx-auto">
        <FadeIn className="text-center mb-16">
          <h2 className="text-5xl sm:text-6xl font-bold mb-4">
            About <span className="gradient-text">Me</span>
          </h2>
        </FadeIn>

        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left: Morphing profile */}
          <SlideIn direction="left" className="flex justify-center lg:justify-start">
            <motion.div
              className="relative w-80 h-80"
              animate={{
                borderRadius: [
                  "30% 70% 70% 30% / 30% 30% 70% 70%",
                  "70% 30% 30% 70% / 70% 70% 30% 30%",
                  "50% 50% 50% 50% / 50% 50% 50% 50%",
                  "30% 70% 70% 30% / 30% 30% 70% 70%",
                ],
              }}
              transition={{
                duration: 10,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              <div
                className="absolute inset-0 bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 p-1"
                style={{ borderRadius: "inherit" }}
              >
                <div
                  className="w-full h-full bg-background flex items-center justify-center text-9xl font-black gradient-text"
                  style={{ borderRadius: "inherit" }}
                >
                  DC
                </div>
              </div>
            </motion.div>
          </SlideIn>

          {/* Right: Bio */}
          <SlideIn direction="right" className="space-y-6">
            <div className="prose prose-lg dark:prose-invert max-w-none">
              <p className="text-lg text-foreground/90">
                Hey! I&apos;m <span className="font-semibold gradient-text">Divanshu Chauhan</span>, a graduate student at Arizona State University pursuing my MS in Computer Science with a focus on AI, ML, and Data Science.
              </p>
              <p className="text-lg text-foreground/90">
                I started programming in high school and fell in love with building things that solve real problems. From creating <span className="font-semibold">Alita Robot</span> that serves over 1 million users to working on cutting-edge AI projects, I&apos;m constantly exploring new technologies and pushing boundaries.
              </p>
              <p className="text-lg text-foreground/90">
                My journey includes leading teams at <span className="font-semibold">IBM</span>, <span className="font-semibold">UC Berkeley</span>, and contributing to open source projects that impact thousands of developers worldwide.
              </p>
              <p className="text-lg text-foreground/90">
                When I&apos;m not coding, you&apos;ll find me exploring new frameworks, contributing to open source, or mentoring aspiring developers. I believe in learning by building and sharing knowledge with the community.
              </p>
            </div>
          </SlideIn>
        </div>

        {/* Floating orb stats */}
        <div className="relative h-96 mt-20">
          {stats.map((stat, index) => {
            const positions = [
              { top: "10%", left: "15%" },
              { top: "50%", right: "10%" },
              { bottom: "15%", left: "20%" },
              { top: "25%", right: "25%" },
            ];

            const Icon = stat.icon;

            return (
              <motion.div
                key={stat.label}
                className="absolute w-36 h-36 rounded-full bg-gradient-to-br from-blue-500/20 to-purple-500/20 backdrop-blur-xl border border-white/10 flex flex-col items-center justify-center cursor-pointer"
                style={positions[index]}
                initial={{ opacity: 0, scale: 0 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: stat.delay, duration: 0.6 }}
                animate={{
                  y: [0, -20, 0],
                }}
                whileHover={{
                  scale: 1.3,
                  rotate: 360,
                  boxShadow: "0 0 40px rgba(139, 92, 246, 0.6)",
                }}
                {...({
                  transition: {
                    y: {
                      duration: 3 + index,
                      repeat: Infinity,
                      ease: "easeInOut",
                    },
                    scale: { duration: 0.4 },
                    rotate: { duration: 0.8 },
                  },
                } as any)}
              >
                <Icon className="h-10 w-10 text-purple-500 mb-2" />
                <div className="text-3xl font-bold gradient-text">{stat.value}</div>
                <div className="text-xs text-center px-2 text-muted-foreground">{stat.label}</div>
              </motion.div>
            );
          })}
        </div>

        {/* Education cards - angled */}
        <div className="mt-20 flex flex-wrap justify-center gap-8">
          {education.map((edu, index) => (
            <motion.div
              key={edu.degree}
              className="w-80 p-6 bg-background/80 backdrop-blur-sm border border-purple-500/30 shadow-brutal-hover"
              style={{
                borderRadius: "20px",
                transform: `rotate(${index % 2 === 0 ? -2 : 2}deg)`,
              }}
              initial={{ opacity: 0, y: 50, rotate: 0 }}
              whileInView={{
                opacity: 1,
                y: 0,
                rotate: index % 2 === 0 ? -2 : 2
              }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.2, duration: 0.6 }}
              whileHover={{
                rotate: 0,
                scale: 1.05,
              }}
            >
              <h3 className="text-xl font-bold mb-2">{edu.degree}</h3>
              <p className="text-purple-500 font-medium mb-1">{edu.school}</p>
              <p className="text-sm text-muted-foreground mb-2">{edu.period}</p>
              {edu.focus && (
                <p className="text-sm">
                  <span className="font-semibold">Focus:</span> {edu.focus}
                </p>
              )}
              {edu.honor && (
                <p className="text-sm font-semibold text-purple-500">{edu.honor}</p>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </SectionContainer>
  );
}
