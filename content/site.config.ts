export const siteConfig = {
  name: "Divanshu Chauhan",
  handle: "Divkix",
  tagline: "Developer building useful tools with code and curiosity.",
  location: "Tempe, Arizona, USA",
  email: "divkix@divkix.me",
  about: "Grad student at ASU with a thing for business + coding. I like side projects, trekking, soccer, and shipping fast.",

  facts: {
    impact: "Products used by 1M+ users",
    projects: "30+ projects",
    oss: "50+ open source contributions",
  },

  skills: [
    "Python",
    "JavaScript/TypeScript",
    "Go",
    "Java",
    "Rust",
    "C/C++",
    "HTML/CSS",
  ],

  experience: [
    {
      title: "Team Leader — IBM x UC Berkeley",
      year: "2021",
      highlights: [
        "Led design and implementation for a small team",
        "Managed budgets and quality checks end-to-end",
      ],
    },
    {
      title: "Team Leader — Gurgaon Police GPCSSI",
      year: "2021",
      highlights: [
        "Built AI system for detecting specific weapons",
        "Delivered under pressure across multiple workstreams",
      ],
    },
  ],

  education: [
    {
      title: "MS, Computer Science — Arizona State University",
      year: "Aug 2025 – May 2026",
      focus: "AI/ML/Data Science",
    },
    {
      title: "BS, Computer Science — Arizona State University",
      year: "Jan 2022 – May 2025",
      honors: "Magna Cum Laude",
    },
  ],

  projects: [
    {
      name: "Alita Robot",
      desc: "Telegram group management bot serving 1M+ users. Built in Go with gotgbot.",
      tags: ["Go", "Telegram", "Bot"],
      links: [
        { label: "GitHub", href: "https://github.com/search?q=Alita+Robot" },
      ],
    },
    {
      name: "ASU Capstone",
      desc: "Platform for managing and showcasing ASU capstone projects.",
      tags: ["TypeScript", "Web"],
      links: [
        { label: "Live", href: "https://betasubmission.asucapstone.com" },
      ],
    },
    {
      name: "WarpDL",
      desc: "Cross-platform download manager.",
      tags: ["Tools", "Open Source"],
      links: [{ label: "GitHub", href: "https://github.com/search?q=WarpDL" }],
    },
  ],

  socials: [{ label: "Email", href: "mailto:divkix@divkix.me" }],
} as const

export type SiteConfig = typeof siteConfig
