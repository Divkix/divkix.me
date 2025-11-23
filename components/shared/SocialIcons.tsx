"use client";

import { Github, Linkedin, Instagram, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { MagneticWrapper } from "@/components/ui/magnetic-wrapper";
import { siteConfig } from "@/content/site.config";

const iconMap = {
  GitHub: Github,
  LinkedIn: Linkedin,
  Instagram: Instagram,
  Email: Mail,
};

interface SocialIconsProps {
  showLabels?: boolean;
  size?: "sm" | "default" | "lg";
}

export function SocialIcons({
  showLabels = false,
  size = "default",
}: SocialIconsProps) {
  return (
    <div className="flex items-center gap-2">
      {siteConfig.socials.map((social) => {
        const Icon = iconMap[social.label as keyof typeof iconMap];
        if (!Icon) return null;

        return (
          <MagneticWrapper key={social.label} strength={0.25}>
            <Button
              variant="ghost"
              size={
                size === "sm" ? "icon-sm" : size === "lg" ? "icon-lg" : "icon"
              }
              asChild
              className="transition-colors"
            >
              <a
                href={social.href}
                target={social.label !== "Email" ? "_blank" : undefined}
                rel={
                  social.label !== "Email" ? "noopener noreferrer" : undefined
                }
                aria-label={social.label}
              >
                <Icon
                  className={
                    size === "sm"
                      ? "h-4 w-4"
                      : size === "lg"
                        ? "h-6 w-6"
                        : "h-5 w-5"
                  }
                />
                {showLabels && <span className="ml-2">{social.label}</span>}
              </a>
            </Button>
          </MagneticWrapper>
        );
      })}
    </div>
  );
}
