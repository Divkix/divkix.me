export const siteConfig = {
  name: "Divanshu Chauhan",
  handle: "Divkix",
  tagline: "Developer building useful tools with code and curiosity.",
  location: "Tempe, Arizona, USA",
  email: "divkix@divkix.me",
  about: "Grad student at ASU with a thing for business + coding. I like side projects, trekking, soccer, and shipping fast.",

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
    { name: "React", category: "Frameworks", proficiency: 90 },
    { name: "Next.js", category: "Frameworks", proficiency: 88 },
    { name: "Node.js", category: "Frameworks", proficiency: 85 },
    { name: "MongoDB", category: "Databases", proficiency: 82 },
    { name: "PostgreSQL", category: "Databases", proficiency: 78 },
    { name: "Git", category: "Tools", proficiency: 92 },
    { name: "Docker", category: "Tools", proficiency: 80 },
    { name: "AWS", category: "Tools", proficiency: 75 },
  ] as const,

  experience: [
    {
      company: "Arizona State University",
      location: "Tempe, Arizona, USA",
      duration: "Aug 2023 – Present",
      positions: [
        {
          title: "Instructional Aide",
          year: "Aug 2025 – Present",
          highlights: [
            "Supported CSE110 classes, enhancing learning for 456 students",
            "Collaborated with five professors on instructional materials",
            "Provided one-on-one assistance for complex programming concepts",
          ],
        },
        {
          title: "Engineering Tutor",
          year: "May 2024 – Present",
          highlights: [
            "Tutoring 8 CSE courses including Data Structures, OS, and Software Engineering",
            "Supporting students in mastering computer science fundamentals",
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
      tags: ["Next.js", "TypeScript", "Python", "Go"],
      period: "Aug 2024 – Present",
      links: [
        { label: "Live", href: "https://asucapstone.com" },
      ],
    },
    {
      name: "PickMyClass",
      desc: "ASU class enrollment monitoring system. Tracks seat availability and sends instant notifications to students.",
      tags: ["Next.js", "TypeScript"],
      period: "2024",
      links: [
        { label: "Live", href: "https://pickmyclass.app" }
      ],
    },
    {
      name: "Alita Robot",
      desc: "Advanced Telegram group management bot with 1M+ users. High-performance automation using Go and Gotgbot framework.",
      tags: ["Go", "MongoDB", "Telegram"],
      period: "Feb 2020 – Jul 2023",
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
        { label: "GitHub", href: "https://github.com/warpdl/warpdl" }
      ],
    },
    {
      name: "Srink Co.",
      desc: "Quick, straightforward, and dependable URL shortening service.",
      tags: ["Go", "MongoDB"],
      period: "May 2023 – Sep 2023",
      links: [
        { label: "GitHub", href: "https://github.com/srinkco/srink" }
      ],
    },
    {
      name: "ProxyGrab",
      desc: "Software to scrape proxies for web scraping and testing using aiohttp and API integrations.",
      tags: ["Python"],
      period: "Aug 2020 – May 2023",
      links: [
        { label: "GitHub", href: "https://github.com/Divkix/ProxyGrab" }
      ],
    },
    {
      name: "Project Spyn",
      desc: "LEGO EV3 autonomous vehicle for FSE100. Completed ahead of schedule with 100%+ grade navigating obstacles.",
      tags: ["Robotics", "LEGO Mindstorms"],
      period: "Jan 2022 – Apr 2022",
      links: [
        { label: "GitHub", href: "https://github.com/Divkix/ProjectSpyn" }
      ],
    },
    {
      name: "I-Helmet",
      desc: "Smart helmet for visually impaired using computer vision to interpret surroundings and provide auditory feedback.",
      tags: ["Python", "Computer Vision"],
      period: "Dec 2020",
      links: [
        { label: "GitHub", href: "https://github.com/Divkix/I-Helmet" }
      ],
    },
    {
      name: "NodeMCU WiFi Smart Car",
      desc: "Remotely controlled smart car with live camera feed. Android app in Dart controls C++ programmed NodeMCU.",
      tags: ["C++", "Dart", "IoT"],
      period: "Oct 2019 – Dec 2020",
      links: [
        { label: "GitHub", href: "https://github.com/Divkix/WifiCar" }
      ],
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
