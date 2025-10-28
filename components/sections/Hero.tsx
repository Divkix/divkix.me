"use client";

import React from "react";
import { motion } from "framer-motion";
import { Github, Linkedin, Mail, ChevronDown } from "lucide-react";
import { Scene } from "@/components/three/Scene";
import { ParticleField } from "@/components/three/ParticleField";
import { PERSONAL_INFO, SOCIAL_LINKS } from "@/lib/constants";

const roles = [
  "Full-Stack Developer",
  "AI/ML Engineer",
  "Open Source Contributor",
  "Graduate Student @ ASU",
];

export function Hero() {
  const [displayedText, setDisplayedText] = React.useState("");
  const [roleIndex, setRoleIndex] = React.useState(0);

  React.useEffect(() => {
    let timeout: NodeJS.Timeout;
    const currentRole = roles[roleIndex];

    if (displayedText.length < currentRole.length) {
      timeout = setTimeout(() => {
        setDisplayedText(currentRole.slice(0, displayedText.length + 1));
      }, 100);
    } else {
      timeout = setTimeout(() => {
        setDisplayedText("");
        setRoleIndex((prev) => (prev + 1) % roles.length);
      }, 2000);
    }

    return () => clearTimeout(timeout);
  }, [displayedText, roleIndex]);

  const handleScroll = (id: string) => {
    const element = document.getElementById(id);
    element?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* 3D Background */}
      <div className="absolute inset-0 z-0">
        <Scene className="w-full h-full">
          <ParticleField count={500} />
        </Scene>
      </div>

      {/* Morphing background blobs */}
      <div className="absolute top-20 left-20 w-96 h-96 bg-gradient-to-br from-blue-500/20 to-purple-500/20 blur-3xl animate-morph" />
      <div className="absolute bottom-20 right-20 w-96 h-96 bg-gradient-to-br from-purple-500/20 to-pink-500/20 blur-3xl animate-morph" style={{ animationDelay: "2s" }} />

      {/* Content */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Diagonal massive name */}
        <motion.div
          className="absolute top-[-10vh] left-[-5%] sm:left-[5%]"
          initial={{ opacity: 0, x: -100, rotate: 0 }}
          animate={{ opacity: 1, x: 0, rotate: -8 }}
          transition={{ duration: 1, ease: [0.25, 0.1, 0.25, 1] }}
        >
          <h1 className="text-[12vw] sm:text-[15vw] font-black leading-[0.9] tracking-tighter">
            <span className="block bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 bg-clip-text text-transparent text-stroke-2">
              {PERSONAL_INFO.name.split(" ")[0]}
            </span>
            <span className="block text-foreground/5 ml-[10vw] text-outline">
              {PERSONAL_INFO.name.split(" ")[1]}
            </span>
          </h1>
        </motion.div>

        {/* Animated role text - circular motion */}
        <motion.div
          className="absolute top-[35%] sm:top-[45%] right-[5%] sm:right-[10%] text-xl sm:text-2xl font-medium text-foreground"
          animate={{
            x: [0, 50, 0],
            y: [0, -30, 0],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          <span className="inline-block px-6 py-3 bg-background/80 backdrop-blur-sm rounded-full border border-purple-500/30">
            {displayedText}
            <span className="animate-pulse">|</span>
          </span>
        </motion.div>

        {/* Bio text */}
        <motion.p
          className="absolute bottom-[35%] left-[5%] max-w-md text-lg text-muted-foreground"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.8 }}
        >
          Building scalable applications and AI-powered solutions. MS Computer Science student specializing in ML/AI at ASU.
        </motion.p>

        {/* Blob buttons */}
        <motion.div
          className="absolute bottom-[20%] left-[5%] flex flex-wrap gap-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 0.8 }}
        >
          <motion.button
            onClick={() => handleScroll("projects")}
            className="relative px-8 py-4 text-lg font-semibold text-white overflow-hidden button-liquid blob-1"
            style={{
              background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
            }}
            whileHover={{
              scale: 1.05,
            }}
            transition={{ duration: 0.3 }}
          >
            View My Work
          </motion.button>

          <motion.button
            onClick={() => handleScroll("contact")}
            className="relative px-8 py-4 text-lg font-semibold text-foreground border-2 border-purple-500 overflow-hidden button-liquid blob-2"
            style={{
              background: "rgba(255, 255, 255, 0.05)",
              backdropFilter: "blur(10px)",
            }}
            whileHover={{
              scale: 1.05,
              background: "rgba(139, 92, 246, 0.2)",
            }}
            transition={{ duration: 0.3 }}
          >
            Get In Touch
          </motion.button>
        </motion.div>

        {/* Social links - floating */}
        <motion.div
          className="absolute bottom-[10%] right-[5%] flex gap-4"
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.9, duration: 0.6 }}
        >
          <motion.a
            href={SOCIAL_LINKS.github}
            target="_blank"
            rel="noopener noreferrer"
            className="w-12 h-12 rounded-full bg-background/80 backdrop-blur-sm border border-purple-500/30 flex items-center justify-center hover:border-purple-500"
            whileHover={{ scale: 1.2, rotate: 360 }}
            transition={{ duration: 0.6 }}
          >
            <Github className="h-5 w-5" />
          </motion.a>
          <motion.a
            href={SOCIAL_LINKS.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="w-12 h-12 rounded-full bg-background/80 backdrop-blur-sm border border-purple-500/30 flex items-center justify-center hover:border-purple-500"
            whileHover={{ scale: 1.2, rotate: 360 }}
            transition={{ duration: 0.6 }}
          >
            <Linkedin className="h-5 w-5" />
          </motion.a>
          <motion.a
            href={SOCIAL_LINKS.email}
            className="w-12 h-12 rounded-full bg-background/80 backdrop-blur-sm border border-purple-500/30 flex items-center justify-center hover:border-purple-500"
            whileHover={{ scale: 1.2, rotate: 360 }}
            transition={{ duration: 0.6 }}
          >
            <Mail className="h-5 w-5" />
          </motion.a>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
          animate={{
            y: [0, 10, 0],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          <button
            onClick={() => handleScroll("about")}
            className="flex flex-col items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
          >
            <span className="text-sm">Scroll to explore</span>
            <ChevronDown className="h-6 w-6" />
          </button>
        </motion.div>
      </div>
    </section>
  );
}
