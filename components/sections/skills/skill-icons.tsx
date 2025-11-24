"use client";

import { Code } from "lucide-react";
import type { IconType } from "react-icons";
import { DiJava } from "react-icons/di";
import {
  SiAmazonwebservices,
  SiC,
  SiCloudflare,
  SiDart,
  SiDocker,
  SiGit,
  SiGo,
  SiHetzner,
  SiJavascript,
  SiMongodb,
  SiNextdotjs,
  SiNodedotjs,
  SiPostgresql,
  SiPython,
  SiReact,
  SiRust,
  SiSupabase,
  SiTypescript,
} from "react-icons/si";

/**
 * Icon mapping for skill names
 */
const skillIconMap: Record<string, IconType> = {
  Python: SiPython,
  JavaScript: SiJavascript,
  TypeScript: SiTypescript,
  Go: SiGo,
  Java: DiJava,
  Rust: SiRust,
  "C/C++": SiC,
  Dart: SiDart,
  React: SiReact,
  "Next.js": SiNextdotjs,
  "Node.js": SiNodedotjs,
  MongoDB: SiMongodb,
  PostgreSQL: SiPostgresql,
  Git: SiGit,
  Docker: SiDocker,
  AWS: SiAmazonwebservices,
  Supabase: SiSupabase,
  Hetzner: SiHetzner,
  Cloudflare: SiCloudflare,
};

/**
 * Get the icon component for a skill name
 */
export function getSkillIcon(skillName: string): IconType {
  return skillIconMap[skillName] || Code;
}
