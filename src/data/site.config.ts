export const siteConfig = {
  name: "Divanshu Chauhan",
  handle: "Divkix",
  tagline: "Developer building useful tools with code and curiosity.",
  location: "Tempe, Arizona, USA",
  email: "divkix@divkix.me",
  about:
    "Grad student at ASU with a thing for business + coding. I like side projects, trekking, soccer, and shipping fast.",
  authorImage: "/divanshu-chauhan.jpeg",
  yearsOfExperience: 5,
  certifications: [],
  nationality: "Indian",
  profileCreatedDate: "2024-01-01",
  address: {
    locality: "Tempe",
    region: "Arizona",
    country: "USA",
  },

  seo: {
    jobTitle: "Software Engineer",
    metaDescription:
      "Divanshu Chauhan (divkix) is a grad student at ASU specializing in AI and software engineering. Explore his projects and portfolio at divkix.me.",
  },

  facts: {
    impact: "250000+",
    projects: "30+",
    oss: "50+",
  },

  skills: [
    { name: "Python", category: "Languages", proficiency: 95 },
    { name: "JavaScript", category: "Languages", proficiency: 90 },
    { name: "TypeScript", category: "Languages", proficiency: 90 },
    { name: "Go", category: "Languages", proficiency: 85 },
    { name: "Java", category: "Languages", proficiency: 80 },
    { name: "Rust", category: "Languages", proficiency: 70 },
    { name: "C/C++", category: "Languages", proficiency: 75 },
    { name: "Dart", category: "Languages", proficiency: 72 },
    { name: "React", category: "Frameworks", proficiency: 90 },
    { name: "Next.js", category: "Frameworks", proficiency: 88 },
    { name: "Node.js", category: "Frameworks", proficiency: 85 },
    { name: "MongoDB", category: "Databases", proficiency: 82 },
    { name: "PostgreSQL", category: "Databases", proficiency: 78 },
    { name: "Git", category: "Tools", proficiency: 92 },
    { name: "Docker", category: "Tools", proficiency: 80 },
    { name: "AWS", category: "Tools", proficiency: 75 },
    { name: "Supabase", category: "Tools", proficiency: 85 },
    { name: "Hetzner", category: "Tools", proficiency: 80 },
    { name: "Cloudflare", category: "Tools", proficiency: 88 },
  ] as const,

  experience: [
    {
      company: "Arizona State University",
      location: "Tempe, Arizona, USA",
      duration: "Aug 2023 – Present",
      positions: [
        {
          title: "Engineering Tutor",
          year: "May 2024 – Present",
          highlights: [
            "Tutoring CSE courses including CSE205, CSE230, CSE240, CSE310, CSE330, CSE360",
          ],
        },
        {
          title: "Instructional Aide",
          year: "Aug 2025 – Dec 2025",
          highlights: [
            "Supported CSE110 classes, enhancing learning for 456 students",
            "Collaborated with five professors on instructional materials",
            "Provided one-on-one assistance for complex programming concepts",
          ],
        },
        {
          title: "Undergraduate Teaching Assistant",
          year: "Jan 2024 – May 2024",
          highlights: [
            "UGTA for CSE205 (OOP & Data Structures) and CSE240 (Programming Languages)",
            "Fostered positive learning environment and supported 100+ students",
            "Managed grading, attendance, and lab sessions",
          ],
        },
        {
          title: "Undergraduate Teaching Assistant",
          year: "Aug 2023 – Dec 2023",
          highlights: [
            "Mentored 80+ students in FSE100 (Introduction to Engineering)",
            "Taught Autodesk Fusion 360, MATLAB, and Lego Mindstorms",
            "Guided students through 3D modeling and automated car projects",
          ],
        },
      ],
    },
    {
      company: "The Software Developers Association at ASU",
      location: "Tempe, Arizona, USA",
      duration: "Apr 2024 – May 2025",
      positions: [
        {
          title: "Ambassador",
          year: "Apr 2024 – May 2025",
          highlights: [
            "Collaborated with marketing, industry, and development teams",
            "Coordinated events to boost member engagement and industry relations",
          ],
        },
      ],
    },
    {
      company: "Xrossways INC.",
      location: "Gurugram, Haryana, India",
      duration: "May 2022 – Aug 2022",
      positions: [
        {
          title: "Finance and Technology Intern",
          year: "May 2022 – Aug 2022",
          highlights: [
            "Conducted financial analysis leading to increased revenue",
            "Developed company website and automated key processes",
            "Contributed to three solar rooftop projects",
          ],
        },
      ],
    },
    {
      company: "UC Berkeley (The Purpose Academy)",
      location: "Berkeley, California, USA (Remote)",
      duration: "Jan 2021 – May 2021",
      positions: [
        {
          title: "Student Intern",
          year: "Jan 2021 – May 2021",
          highlights: [
            "Led design and implementation of graphic and communication materials",
            "Managed team of 2 and supervised quality assessment",
          ],
        },
      ],
    },
    {
      company: "IBM",
      location: "Bengaluru, Karnataka, India (Remote)",
      duration: "Dec 2020",
      positions: [
        {
          title: "Team Leader — EdTech Youth Challenge",
          year: "Dec 2020",
          highlights: [
            "Led team of 5 students in AI exploration program",
            "Developed dental anomaly detection app using YOLO, React, and Python",
          ],
        },
      ],
    },
    {
      company: "Haryana Police",
      location: "Gurugram, Haryana, India",
      duration: "Jun 2020 – Jul 2020",
      positions: [
        {
          title: "Student Intern",
          year: "Jun 2020 – Jul 2020",
          highlights: [
            "Developed AI model for weapon detection using Computer Vision",
            "Enhanced public safety measures through AI technology",
          ],
        },
      ],
    },
    {
      company: "CBSE x IBM",
      location: "Gurugram, Haryana, India",
      duration: "Sep 2019 – Jul 2020",
      positions: [
        {
          title: "Student Intern",
          year: "Sep 2019 – Jul 2020",
          highlights: [
            "Collaborated on AI curriculum project for health tech",
            "Created accessible healthcare solutions for visually impaired individuals",
          ],
        },
      ],
    },
  ] as const,

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
      name: "ASU Capstone",
      desc: "Full-stack platform for managing and showcasing Arizona State University capstone projects.",
      image: "/og-image.webp",
      tags: ["Next.js", "TypeScript", "Python", "Go"],
      period: "Aug 2024 – Present",
      links: [
        { label: "Live", href: "https://asucapstone.com" },
        { label: "GitHub", href: "https://github.com/asu-capstone-team" },
      ],
    },
    {
      name: "PickMyClass",
      desc: "ASU class enrollment monitoring system. Tracks seat availability and sends instant notifications to students.",
      image: "/og/blog/pickmyclass-never-miss-your-dream-class.webp",
      tags: ["Next.js", "TypeScript"],
      period: "2024 – Present",
      links: [
        { label: "Live", href: "https://pickmyclass.app" },
        { label: "GitHub", href: "https://github.com/Divkix/pickmyclass" },
      ],
    },
    {
      name: "LogWell",
      desc: "Self-hosted logging platform with real-time streaming, full-text search, and OTLP-compatible ingestion.",
      tags: ["TypeScript", "Logging", "OTLP"],
      period: "2024 – Present",
      links: [
        { label: "GitHub", href: "https://github.com/Divkix/Logwell" },
      ],
    },
    {
      name: "Alita Robot",
      desc: "Advanced Telegram group management bot with 1M+ users. High-performance automation using Go and Gotgbot framework.",
      tags: ["Go", "MongoDB", "Telegram"],
      period: "Feb 2020 – Present",
      links: [
        { label: "GitHub", href: "https://github.com/Divkix/Alita_Robot" },
      ],
    },
    {
      name: "WarpDL",
      desc: "Ultra-speedy cross-platform download manager expertly crafted using Go for optimal performance.",
      tags: ["Go", "MongoDB"],
      period: "May 2023 – Present",
      links: [
        { label: "GitHub", href: "https://github.com/warpdl/warpdl" },
      ],
    },
    {
      name: "WebResume",
      desc: "Modern resume builder that reimagines how resumes are created and shared.",
      tags: ["TypeScript", "Next.js"],
      period: "2024 – Present",
      links: [
        { label: "GitHub", href: "https://github.com/Divkix/webresume.now" },
      ],
    },
    {
      name: "AI Code Improvement Platform",
      desc: "AI-powered code analysis platform using Voyage AI embeddings, Qdrant vector search, and Claude for intelligent code improvements.",
      tags: ["Go", "AI/ML", "Qdrant", "MongoDB"],
      period: "2024 – Present",
      links: [
        { label: "GitHub", href: "https://github.com/Divkix/ai-code-improvement-platform" },
      ],
    },
  ],

  socials: [
    { label: "GitHub", href: "https://github.com/divkix" },
    { label: "LinkedIn", href: "https://www.linkedin.com/in/divkix/" },
    { label: "X", href: "https://x.com/divkix" },
    { label: "Hugging Face", href: "https://huggingface.co/divkix" },
    { label: "Instagram", href: "https://instagram.com/_divkix" },
    { label: "Email", href: "mailto:divkix@divkix.me" },
  ],
} as const;
