"use client"

import {
  SiPython,
  SiJavascript,
  SiTypescript,
  SiGo,
  SiRust,
  SiC,
  SiReact,
  SiNextdotjs,
  SiNodedotjs,
  SiMongodb,
  SiPostgresql,
  SiGit,
  SiDocker,
  SiAmazonwebservices,
} from "react-icons/si"
import { Code } from "lucide-react"
import type { IconType } from "react-icons"

/**
 * Icon mapping for skill names
 */
const skillIconMap: Record<string, IconType> = {
  Python: SiPython,
  JavaScript: SiJavascript,
  TypeScript: SiTypescript,
  Go: SiGo,
  Java: Code, // SiJava not available, fallback to Code icon
  Rust: SiRust,
  "C/C++": SiC,
  React: SiReact,
  "Next.js": SiNextdotjs,
  "Node.js": SiNodedotjs,
  MongoDB: SiMongodb,
  PostgreSQL: SiPostgresql,
  Git: SiGit,
  Docker: SiDocker,
  AWS: SiAmazonwebservices,
}

/**
 * Get the icon component for a skill name
 */
export function getSkillIcon(skillName: string): IconType {
  return skillIconMap[skillName] || Code
}
