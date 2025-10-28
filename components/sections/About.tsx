"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { GraduationCap, Users, GitBranch, Award } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { SectionContainer } from "@/components/shared/SectionContainer";
import { FadeIn } from "@/components/animations/FadeIn";
import { SlideIn } from "@/components/animations/SlideIn";
import { StaggerContainer } from "@/components/animations/StaggerContainer";
import { staggerItem } from "@/lib/animations";
import { PERSONAL_INFO } from "@/lib/constants";
import { calculateAge } from "@/lib/utils";

interface StatCardProps {
  icon: React.ElementType;
  value: string;
  label: string;
  delay?: number;
}

function StatCard({ icon: Icon, value, label, delay = 0 }: StatCardProps) {
  const [count, setCount] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  // Extract number from value string (e.g., "1M+" -> 1, "3.8+" -> 3.8)
  const targetNumber = parseFloat(value.replace(/[^0-9.]/g, ""));
  const suffix = value.replace(/[0-9.]/g, "");

  useEffect(() => {
    if (!isVisible) return;

    const duration = 2000; // 2 seconds
    const steps = 60;
    const increment = targetNumber / steps;
    const stepDuration = duration / steps;

    let currentStep = 0;
    const timer = setInterval(() => {
      currentStep++;
      if (currentStep >= steps) {
        setCount(targetNumber);
        clearInterval(timer);
      } else {
        setCount(currentStep * increment);
      }
    }, stepDuration);

    return () => clearInterval(timer);
  }, [isVisible, targetNumber]);

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      onViewportEnter={() => setIsVisible(true)}
      variants={staggerItem}
      transition={{ delay }}
    >
      <Card className="glass hover:bg-accent/50 transition-colors">
        <CardContent className="p-6 flex flex-col items-center text-center space-y-2">
          <div className="p-3 rounded-full bg-gradient-to-br from-blue-500 to-purple-500">
            <Icon className="h-6 w-6 text-white" />
          </div>
          <div className="text-3xl font-bold">
            {count.toFixed(suffix.includes(".") ? 1 : 0)}
            {suffix}
          </div>
          <div className="text-sm text-muted-foreground">{label}</div>
        </CardContent>
      </Card>
    </motion.div>
  );
}

export function About() {
  const age = calculateAge(PERSONAL_INFO.birthday);

  const stats = [
    { icon: Users, value: "1M+", label: "Users Reached" },
    { icon: GitBranch, value: "30+", label: "Projects Built" },
    { icon: GitBranch, value: "50+", label: "OSS Contributions" },
    { icon: Award, value: "3.8+", label: "GPA (Magna Cum Laude)" },
  ];

  const education = [
    {
      degree: "Master of Science in Computer Science",
      institution: "Arizona State University",
      location: "Tempe, Arizona",
      period: "2024 - 2026",
      gpa: "4.0/4.0",
      focus: "AI/ML & Data Science",
      current: true,
    },
    {
      degree: "Bachelor of Science in Computer Science",
      institution: "Arizona State University",
      location: "Tempe, Arizona",
      period: "2020 - 2024",
      gpa: "3.8/4.0",
      focus: "Software Engineering",
      honors: "Magna Cum Laude",
      current: false,
    },
  ];

  return (
    <SectionContainer id="about" className="bg-background">
      <div className="space-y-16">
        {/* Header */}
        <FadeIn className="text-center space-y-4">
          <h2 className="text-4xl sm:text-5xl font-bold">
            About <span className="gradient-text">Me</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Learn more about my journey, education, and achievements
          </p>
        </FadeIn>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          {/* Profile Image & Bio */}
          <SlideIn direction="left">
            <div className="space-y-6">
              {/* Profile Image Placeholder */}
              <div className="relative w-full aspect-square max-w-md mx-auto lg:mx-0">
                <motion.div
                  className="absolute inset-0 bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 rounded-2xl"
                  animate={{
                    rotate: [0, 5, 0, -5, 0],
                  }}
                  transition={{
                    duration: 5,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                />
                <div className="absolute inset-2 bg-muted rounded-2xl flex items-center justify-center">
                  <div className="text-center space-y-2">
                    <div className="text-8xl font-bold gradient-text">DC</div>
                    <div className="text-sm text-muted-foreground">
                      {age} years old
                    </div>
                  </div>
                </div>
              </div>

              {/* Bio Text */}
              <div className="space-y-4 text-muted-foreground">
                <p>
                  I'm a passionate software engineer currently pursuing my Master's
                  degree in Computer Science at Arizona State University, with a
                  focus on Artificial Intelligence, Machine Learning, and Data
                  Science.
                </p>
                <p>
                  With a strong foundation in full-stack development and a deep
                  interest in AI/ML, I've built projects that have reached over
                  1 million users, including the popular Telegram bot{" "}
                  <span className="text-foreground font-semibold">
                    Alita Robot
                  </span>
                  .
                </p>
                <p>
                  I'm passionate about open source and have contributed to 50+
                  projects across various technologies. I enjoy solving complex
                  problems and building scalable solutions that make a real
                  impact.
                </p>
                <p>
                  When I'm not coding, I'm exploring new technologies, mentoring
                  fellow developers, or contributing to the tech community.
                </p>
              </div>
            </div>
          </SlideIn>

          {/* Stats & Education */}
          <div className="space-y-8">
            {/* Stats Grid */}
            <SlideIn direction="right">
              <StaggerContainer className="grid grid-cols-2 gap-4">
                {stats.map((stat, index) => (
                  <StatCard key={stat.label} {...stat} delay={index * 0.1} />
                ))}
              </StaggerContainer>
            </SlideIn>

            {/* Education Timeline */}
            <SlideIn direction="right" delay={0.2}>
              <div className="space-y-4">
                <h3 className="text-2xl font-bold flex items-center gap-2">
                  <GraduationCap className="h-6 w-6 text-purple-500" />
                  Education
                </h3>
                <div className="space-y-4">
                  {education.map((edu, index) => (
                    <Card
                      key={index}
                      className={
                        edu.current
                          ? "border-purple-500 bg-purple-500/5"
                          : "border-border"
                      }
                    >
                      <CardContent className="p-6 space-y-2">
                        <div className="flex items-start justify-between gap-4">
                          <div>
                            <h4 className="font-semibold text-lg">
                              {edu.degree}
                            </h4>
                            <p className="text-muted-foreground">
                              {edu.institution}
                            </p>
                          </div>
                          {edu.current && (
                            <span className="px-3 py-1 text-xs font-medium bg-purple-500 text-white rounded-full">
                              Current
                            </span>
                          )}
                        </div>
                        <div className="flex flex-wrap gap-x-4 gap-y-1 text-sm text-muted-foreground">
                          <span>{edu.period}</span>
                          <span>•</span>
                          <span>{edu.location}</span>
                        </div>
                        <div className="flex flex-wrap gap-x-4 gap-y-1 text-sm">
                          <span className="text-foreground font-medium">
                            GPA: {edu.gpa}
                          </span>
                          {edu.honors && (
                            <>
                              <span>•</span>
                              <span className="text-purple-500 font-medium">
                                {edu.honors}
                              </span>
                            </>
                          )}
                        </div>
                        <div className="text-sm text-muted-foreground">
                          Focus: {edu.focus}
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            </SlideIn>
          </div>
        </div>
      </div>
    </SectionContainer>
  );
}
