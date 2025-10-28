export interface Skill {
  name: string;
  level: number;
  category: "languages" | "frameworks" | "tools" | "cloud";
  icon?: string;
}

export const skills: Skill[] = [
  // Languages
  { name: "Python", level: 100, category: "languages" },
  { name: "HTML/CSS", level: 100, category: "languages" },
  { name: "JavaScript", level: 90, category: "languages" },
  { name: "TypeScript", level: 90, category: "languages" },
  { name: "Go", level: 95, category: "languages" },
  { name: "Java", level: 75, category: "languages" },
  { name: "Rust", level: 65, category: "languages" },
  { name: "C/C++", level: 55, category: "languages" },
  { name: "SQL", level: 85, category: "languages" },
  { name: "Bash", level: 80, category: "languages" },

  // Frameworks
  { name: "React", level: 95, category: "frameworks" },
  { name: "Next.js", level: 90, category: "frameworks" },
  { name: "Node.js", level: 90, category: "frameworks" },
  { name: "Express", level: 85, category: "frameworks" },
  { name: "FastAPI", level: 90, category: "frameworks" },
  { name: "Django", level: 80, category: "frameworks" },
  { name: "TensorFlow", level: 75, category: "frameworks" },
  { name: "PyTorch", level: 70, category: "frameworks" },
  { name: "Gin", level: 85, category: "frameworks" },
  { name: "Fiber", level: 80, category: "frameworks" },

  // Tools
  { name: "Git", level: 95, category: "tools" },
  { name: "Docker", level: 90, category: "tools" },
  { name: "Kubernetes", level: 75, category: "tools" },
  { name: "MongoDB", level: 85, category: "tools" },
  { name: "PostgreSQL", level: 90, category: "tools" },
  { name: "Redis", level: 85, category: "tools" },
  { name: "Nginx", level: 80, category: "tools" },
  { name: "Linux", level: 90, category: "tools" },
  { name: "VS Code", level: 95, category: "tools" },
  { name: "Postman", level: 85, category: "tools" },

  // Cloud
  { name: "AWS", level: 85, category: "cloud" },
  { name: "Google Cloud", level: 80, category: "cloud" },
  { name: "Azure", level: 70, category: "cloud" },
  { name: "Vercel", level: 90, category: "cloud" },
  { name: "Netlify", level: 85, category: "cloud" },
  { name: "Heroku", level: 80, category: "cloud" },
  { name: "DigitalOcean", level: 85, category: "cloud" },
  { name: "CloudFlare", level: 90, category: "cloud" },
];

export const skillCategories = {
  languages: "Languages",
  frameworks: "Frameworks",
  tools: "Tools",
  cloud: "Cloud & DevOps",
} as const;

export function getSkillsByCategory(
  category: Skill["category"]
): Skill[] {
  return skills.filter((skill) => skill.category === category);
}

export function getTopSkills(limit: number = 10): Skill[] {
  return [...skills].sort((a, b) => b.level - a.level).slice(0, limit);
}
