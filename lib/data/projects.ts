export interface Project {
  id: string;
  title: string;
  description: string;
  longDescription: string;
  image: string;
  tags: string[];
  category: "web" | "bot" | "ml" | "tool";
  featured: boolean;
  github?: string;
  demo?: string;
  stats?: {
    users?: string;
    stars?: string;
    downloads?: string;
  };
}

export const projects: Project[] = [
  {
    id: "alita-robot",
    title: "Alita Robot",
    description:
      "Telegram bot with 1M+ users built in Go, featuring moderation, entertainment, and utility tools",
    longDescription:
      "A comprehensive Telegram bot written in Go that serves over 1 million users. Features include advanced moderation tools, entertainment commands, music playback, admin utilities, anti-spam protection, and custom plugins. Built with scalability in mind using MongoDB for data persistence and Redis for caching.",
    image: "/projects/alita.jpg",
    tags: ["Go", "Telegram", "MongoDB", "Redis", "Docker"],
    category: "bot",
    featured: true,
    github: "https://github.com/divkix/Alita_Robot",
    demo: "https://t.me/AlitaRobot",
    stats: {
      users: "1M+",
      stars: "500+",
    },
  },
  {
    id: "asu-capstone",
    title: "ASU Capstone Platform",
    description:
      "Full-stack web application for managing capstone projects at Arizona State University",
    longDescription:
      "A comprehensive platform for managing capstone projects at ASU. Features include project proposals, team management, mentor assignment, milestone tracking, document submission, and evaluation tools. Built with React, Node.js, and PostgreSQL, serving hundreds of students and faculty members.",
    image: "/projects/capstone.jpg",
    tags: ["React", "Node.js", "PostgreSQL", "TypeScript", "Docker"],
    category: "web",
    featured: true,
    github: "https://github.com/divkix/asu-capstone",
    demo: "https://capstone.asu.edu",
    stats: {
      users: "500+",
    },
  },
  {
    id: "warpdl",
    title: "WarpDL",
    description:
      "High-performance download manager with multi-threaded downloads and resume capability",
    longDescription:
      "A fast and efficient download manager written in Rust. Features include multi-threaded downloads, resume capability, bandwidth control, browser integration, and support for multiple protocols (HTTP, HTTPS, FTP). Utilizes Rust's async runtime for optimal performance.",
    image: "/projects/warpdl.jpg",
    tags: ["Rust", "Async", "Multi-threading", "CLI"],
    category: "tool",
    featured: true,
    github: "https://github.com/divkix/warpdl",
    stats: {
      downloads: "10K+",
      stars: "200+",
    },
  },
  {
    id: "ai-weapon-detection",
    title: "AI Weapon Detection",
    description:
      "Machine learning system for real-time weapon detection in surveillance footage",
    longDescription:
      "An AI-powered system for detecting weapons in real-time video surveillance. Built using YOLOv5 and TensorFlow, achieving 95% accuracy. Led a team of 5 developers as part of GPCSSI 2021. Implemented edge deployment for low-latency detection.",
    image: "/projects/weapon-detection.jpg",
    tags: ["Python", "TensorFlow", "YOLOv5", "Computer Vision", "OpenCV"],
    category: "ml",
    featured: false,
    github: "https://github.com/divkix/ai-weapon-detection",
  },
  {
    id: "portfolio",
    title: "Portfolio Website",
    description:
      "Modern, responsive portfolio with 3D graphics and smooth animations",
    longDescription:
      "A cutting-edge portfolio website built with Next.js 15, React 19, and Three.js. Features include interactive 3D backgrounds, smooth scroll animations, dark mode support, and glass morphism effects. Optimized for performance with lazy loading and code splitting.",
    image: "/projects/portfolio.jpg",
    tags: ["Next.js", "React", "Three.js", "TypeScript", "Tailwind CSS"],
    category: "web",
    featured: false,
    github: "https://github.com/divkix/portfolio",
    demo: "https://divkix.me",
  },
  {
    id: "cloud-backup",
    title: "Cloud Backup System",
    description:
      "Automated backup solution with encryption and multi-cloud support",
    longDescription:
      "An enterprise-grade backup system supporting multiple cloud providers (AWS S3, Google Cloud Storage, Azure Blob). Features include AES-256 encryption, incremental backups, compression, scheduling, and email notifications. Built with Python and FastAPI.",
    image: "/projects/backup.jpg",
    tags: ["Python", "FastAPI", "AWS", "Azure", "Encryption"],
    category: "tool",
    featured: false,
    github: "https://github.com/divkix/cloud-backup",
  },
];

export const projectCategories = {
  all: "All Projects",
  web: "Web Apps",
  bot: "Bots",
  ml: "AI/ML",
  tool: "Tools",
} as const;

export function getProjectsByCategory(
  category: keyof typeof projectCategories
): Project[] {
  if (category === "all") return projects;
  return projects.filter((project) => project.category === category);
}

export function getFeaturedProjects(): Project[] {
  return projects.filter((project) => project.featured);
}

export function getProjectById(id: string): Project | undefined {
  return projects.find((project) => project.id === id);
}
