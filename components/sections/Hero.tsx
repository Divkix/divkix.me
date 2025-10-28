"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { ArrowDown, Github, Linkedin, Mail, Twitter } from "lucide-react";
import { Scene } from "@/components/three/Scene";
import { ParticleField } from "@/components/three/ParticleField";
import { FloatingShapes } from "@/components/three/FloatingShapes";
import { Button } from "@/components/ui/button";
import { PERSONAL_INFO, SOCIAL_LINKS } from "@/lib/constants";
import { fadeInUp, fadeIn } from "@/lib/animations";
import { cn } from "@/lib/utils";

const socialIcons = {
  github: Github,
  linkedin: Linkedin,
  twitter: Twitter,
  email: Mail,
};

export function Hero() {
  const [currentRoleIndex, setCurrentRoleIndex] = useState(0);
  const [displayedText, setDisplayedText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  // Typing animation effect
  useEffect(() => {
    const currentRole = PERSONAL_INFO.roles[currentRoleIndex];
    const typingSpeed = isDeleting ? 50 : 100;

    const timer = setTimeout(() => {
      if (!isDeleting) {
        if (displayedText.length < currentRole.length) {
          setDisplayedText(currentRole.slice(0, displayedText.length + 1));
        } else {
          setTimeout(() => setIsDeleting(true), 2000);
        }
      } else {
        if (displayedText.length > 0) {
          setDisplayedText(currentRole.slice(0, displayedText.length - 1));
        } else {
          setIsDeleting(false);
          setCurrentRoleIndex(
            (prevIndex) => (prevIndex + 1) % PERSONAL_INFO.roles.length
          );
        }
      }
    }, typingSpeed);

    return () => clearTimeout(timer);
  }, [displayedText, isDeleting, currentRoleIndex]);

  const handleScroll = () => {
    const aboutSection = document.querySelector("#about");
    if (aboutSection) {
      aboutSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section
      id="home"
      className="relative min-h-screen w-full flex items-center justify-center overflow-hidden"
    >
      {/* 3D Background */}
      <div className="absolute inset-0 z-0">
        <Scene className="w-full h-full">
          <ParticleField count={1000} />
          <FloatingShapes />
        </Scene>
      </div>

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-background/50 via-background/30 to-background z-0" />

      {/* Content */}
      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-32">
        <div className="flex flex-col items-center justify-center text-center space-y-8">
          {/* Greeting */}
          <motion.div
            initial="hidden"
            animate="visible"
            variants={fadeIn}
            className="text-muted-foreground text-lg sm:text-xl"
          >
            Hi, my name is
          </motion.div>

          {/* Name */}
          <motion.h1
            initial="hidden"
            animate="visible"
            variants={fadeInUp}
            className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold tracking-tight"
          >
            <span className="bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 bg-clip-text text-transparent bg-[length:200%_auto] animate-gradient">
              {PERSONAL_INFO.name}
            </span>
          </motion.h1>

          {/* Typing Role */}
          <motion.div
            initial="hidden"
            animate="visible"
            variants={fadeInUp}
            transition={{ delay: 0.2 }}
            className="h-16 flex items-center justify-center"
          >
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-semibold text-muted-foreground">
              {displayedText}
              <span className="animate-pulse">|</span>
            </h2>
          </motion.div>

          {/* Bio */}
          <motion.p
            initial="hidden"
            animate="visible"
            variants={fadeInUp}
            transition={{ delay: 0.4 }}
            className="max-w-2xl text-lg sm:text-xl text-muted-foreground"
          >
            {PERSONAL_INFO.bio}
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial="hidden"
            animate="visible"
            variants={fadeInUp}
            transition={{ delay: 0.6 }}
            className="flex flex-col sm:flex-row gap-4 pt-4"
          >
            <Button
              size="lg"
              onClick={() => {
                const projectsSection = document.querySelector("#projects");
                if (projectsSection) {
                  projectsSection.scrollIntoView({ behavior: "smooth" });
                }
              }}
              className="text-lg px-8 py-6 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 hover:opacity-90 transition-opacity"
            >
              View My Work
            </Button>
            <Button
              size="lg"
              variant="outline"
              onClick={() => {
                const contactSection = document.querySelector("#contact");
                if (contactSection) {
                  contactSection.scrollIntoView({ behavior: "smooth" });
                }
              }}
              className="text-lg px-8 py-6"
            >
              Get In Touch
            </Button>
          </motion.div>

          {/* Social Links */}
          <motion.div
            initial="hidden"
            animate="visible"
            variants={fadeInUp}
            transition={{ delay: 0.8 }}
            className="flex gap-4 pt-4"
          >
            {Object.entries(SOCIAL_LINKS).map(([key, url]) => {
              const Icon = socialIcons[key as keyof typeof socialIcons] || Mail;
              return (
                <motion.a
                  key={key}
                  href={url}
                  target={key === "email" ? "_self" : "_blank"}
                  rel={key === "email" ? undefined : "noopener noreferrer"}
                  whileHover={{ scale: 1.1, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  className={cn(
                    "p-3 rounded-full border border-border",
                    "bg-background/50 backdrop-blur-sm",
                    "hover:bg-accent hover:text-accent-foreground",
                    "transition-colors"
                  )}
                  aria-label={key}
                >
                  <Icon className="h-6 w-6" />
                </motion.a>
              );
            })}
          </motion.div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 1 }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10"
      >
        <motion.button
          onClick={handleScroll}
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="flex flex-col items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
          aria-label="Scroll to about section"
        >
          <span className="text-sm font-medium">Scroll Down</span>
          <ArrowDown className="h-5 w-5" />
        </motion.button>
      </motion.div>
    </section>
  );
}
