export const NAVIGATION_LINKS = [
  { name: "Home", href: "#home" },
  { name: "About", href: "#about" },
  { name: "Skills", href: "#skills" },
  { name: "Projects", href: "#projects" },
  { name: "Experience", href: "#experience" },
  { name: "Contact", href: "#contact" },
] as const;

export const SOCIAL_LINKS = {
  github: "https://github.com/divkix",
  linkedin: "https://linkedin.com/in/divkix",
  twitter: "https://twitter.com/divkix",
  email: "mailto:divkix@divkix.me",
} as const;

export const PERSONAL_INFO = {
  name: "Divanshu Chauhan",
  email: "divkix@divkix.me",
  location: "Tempe, Arizona, USA",
  birthday: "2003-01-09",
  github: "divkix",
  role: "Full-Stack Developer",
  roles: [
    "Full-Stack Developer",
    "AI/ML Engineer",
    "Open Source Contributor",
    "Cloud Architect",
  ],
  bio: "Graduate student at Arizona State University pursuing MS in Computer Science with a focus on AI/ML and Data Science. Passionate about building scalable systems and contributing to open source.",
} as const;

export const SECTION_IDS = {
  home: "home",
  about: "about",
  skills: "skills",
  projects: "projects",
  experience: "experience",
  contact: "contact",
} as const;

export const ANIMATION_DURATION = {
  fast: 0.2,
  normal: 0.4,
  slow: 0.6,
} as const;

export const BREAKPOINTS = {
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  "2xl": 1536,
} as const;
