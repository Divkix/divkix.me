export const siteConfig = {
  name: "Divanshu Chauhan",
  handle: "Divkix",
  tagline: "Developer building useful tools with code and curiosity.",
  location: "Tempe, Arizona, USA",
  email: "divkix@divkix.me",
  about: "Grad student at ASU with a thing for business + coding. I like side projects, trekking, soccer, and shipping fast.",

  facts: {
    impact: "1000000+",
    projects: "30+",
    oss: "50+",
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
      title: "Instructional Aide — Arizona State University",
      year: "Aug 2025 – Present",
      highlights: [
        "Supported CSE110 classes, enhancing learning for 456 students",
        "Collaborated with five professors on instructional materials",
        "Provided one-on-one assistance for complex programming concepts",
      ],
    },
    {
      title: "Engineering Tutor — Arizona State University",
      year: "May 2024 – Present",
      highlights: [
        "Tutoring 8 CSE courses including Data Structures, OS, and Software Engineering",
        "Supporting students in mastering computer science fundamentals",
      ],
    },
    {
      title: "Undergraduate Teaching Assistant — Arizona State University",
      year: "Jan 2024 – May 2024",
      highlights: [
        "UGTA for CSE205 (OOP & Data Structures) and CSE240 (Programming Languages)",
        "Fostered positive learning environment and supported 100+ students",
        "Managed grading, attendance, and lab sessions",
      ],
    },
    {
      title: "Undergraduate Teaching Assistant — Arizona State University",
      year: "Aug 2023 – Dec 2023",
      highlights: [
        "Mentored 80+ students in FSE100 (Introduction to Engineering)",
        "Taught Autodesk Fusion 360, MATLAB, and Lego Mindstorms",
        "Guided students through 3D modeling and automated car projects",
      ],
    },
    {
      title: "Ambassador — The Software Developers Association at ASU",
      year: "Apr 2024 – May 2025",
      highlights: [
        "Collaborated with marketing, industry, and development teams",
        "Coordinated events to boost member engagement and industry relations",
      ],
    },
    {
      title: "Finance and Technology Intern — Xrossways INC.",
      year: "May 2022 – Aug 2022",
      highlights: [
        "Conducted financial analysis leading to increased revenue",
        "Developed company website and automated key processes",
        "Contributed to three solar rooftop projects",
      ],
    },
    {
      title: "Student Intern — UC Berkeley (The Purpose Academy)",
      year: "Jan 2021 – May 2021",
      highlights: [
        "Led design and implementation of graphic and communication materials",
        "Managed team of 2 and supervised quality assessment",
      ],
    },
    {
      title: "Team Leader — IBM EdTech Youth Challenge",
      year: "Dec 2020",
      highlights: [
        "Led team of 5 students in AI exploration program",
        "Developed dental anomaly detection app using YOLO, React, and Python",
      ],
    },
    {
      title: "Student Intern — Haryana Police (Gurgaon)",
      year: "Jun 2020 – Jul 2020",
      highlights: [
        "Developed AI model for weapon detection using Computer Vision",
        "Enhanced public safety measures through AI technology",
      ],
    },
    {
      title: "Student Intern — CBSE x IBM",
      year: "Sep 2019 – Jul 2020",
      highlights: [
        "Collaborated on AI curriculum project for health tech",
        "Created accessible healthcare solutions for visually impaired individuals",
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
        { label: "Live", href: "https://asucapstone.com" },
      ],
    },
    {
      name: "PickMyClass",
      desc: "ASU class enrollment monitoring system. Tracks seat availability and sends instant notifications.",
      tags: ["TypeScript", "Next.js", "Web"],
      links: [
        { label: "Live", href: "https://pickmyclass.app" }
      ],
    },
    {
      name: "WarpDL",
      desc: "Cross-platform download manager.",
      tags: ["Tools", "Open Source"],
      links: [{ label: "GitHub", href: "https://github.com/search?q=WarpDL" }],
    },
  ],

  socials: [
    { label: "GitHub", href: "https://github.com/divkix" },
    { label: "LinkedIn", href: "https://www.linkedin.com/in/divkix/" },
    { label: "Instagram", href: "https://instagram.com/_divkix" },
    { label: "Email", href: "mailto:divkix@divkix.me" },
  ],
} as const

export type SiteConfig = typeof siteConfig
