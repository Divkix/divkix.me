"use client";

import { Github, Linkedin, Twitter, Mail, Heart } from "lucide-react";
import { motion } from "framer-motion";
import { SOCIAL_LINKS, PERSONAL_INFO } from "@/lib/constants";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

const socialIcons = {
  github: Github,
  linkedin: Linkedin,
  twitter: Twitter,
  email: Mail,
};

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative bg-background border-t border-border">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {/* About */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 bg-clip-text text-transparent">
              {PERSONAL_INFO.name}
            </h3>
            <p className="text-sm text-muted-foreground">
              Full-Stack Developer & AI/ML Engineer passionate about building
              scalable solutions and contributing to open source.
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Quick Links</h3>
            <div className="flex flex-col space-y-2">
              <a
                href="#about"
                className="text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                About
              </a>
              <a
                href="#projects"
                className="text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                Projects
              </a>
              <a
                href="#experience"
                className="text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                Experience
              </a>
              <a
                href="#contact"
                className="text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                Contact
              </a>
            </div>
          </div>

          {/* Social Links */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Connect</h3>
            <div className="flex space-x-2">
              {Object.entries(SOCIAL_LINKS).map(([key, url]) => {
                const Icon =
                  socialIcons[key as keyof typeof socialIcons] || Mail;
                return (
                  <motion.div key={key} whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
                    <Button
                      variant="ghost"
                      size="icon"
                      asChild
                      aria-label={key}
                    >
                      <a
                        href={url}
                        target={key === "email" ? "_self" : "_blank"}
                        rel={key === "email" ? undefined : "noopener noreferrer"}
                      >
                        <Icon className="h-5 w-5" />
                      </a>
                    </Button>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>

        <Separator className="my-8" />

        {/* Bottom */}
        <div className="flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0">
          <p className="text-sm text-muted-foreground">
            © {currentYear} {PERSONAL_INFO.name}. All rights reserved.
          </p>
          <p className="text-sm text-muted-foreground flex items-center">
            Built with{" "}
            <Heart className="h-4 w-4 mx-1 text-red-500 fill-red-500" /> using
            Next.js & Three.js
          </p>
        </div>
      </div>
    </footer>
  );
}
