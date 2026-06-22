export const siteConfig = {
  name: "Divanshu Chauhan",
  handle: "Divkix",
  tagline:
    "Software engineer at Cloudflare. MS in Computer Science from Arizona State (GPA 3.889). I ship side projects people actually use.",
  location: "Tempe, Arizona, USA",
  email: "divkix@divkix.me",
  about:
    "I'm Divanshu. I finished my MS in Computer Science at Arizona State University in May 2026 with a 3.889 GPA, and I intern on Cloudflare's ETI team. The side of my work I care about most is the projects people open every day: a Telegram bot now serving 300,000+ users, a self-hosted logging tool I built because Datadog priced me out, and a class tracker I made for ASU students who were tired of refreshing the registrar at midnight. I also contribute to Vinext, Cloudflare's open-source way of running Next.js apps on Vite. I spent two years tutoring eight CS courses at ASU, which is a humbling way to learn that you don't really understand something until you can explain it to someone who is stuck.",
  heroSummary:
    "MS in Computer Science from ASU, GPA 3.889. SWE intern at Cloudflare and Vinext contributor. I write code on the edge during the day and ship side projects at night: a Telegram bot used by 300k people, a self-hosted logging tool, a class tracker for ASU.",
  founderPov:
    "I build tools so software feels obvious at 2am, when you're stressed and want it to just work. Cloudflare taught me how a real edge platform behaves under load. Side projects taught me what people actually open more than once. I care about building things that are small, durable, and worth coming back to. I ship in public and write down what I learn along the way.",
  interests:
    "When I'm not coding, I'm usually on a road trip with friends, exploring somewhere I haven't been, or planning the next drive when I should probably be asleep.",
  authorImage: "/divanshu-chauhan.webp",
  nationality: "Indian",
  address: {
    locality: "Tempe",
    region: "Arizona",
    country: "USA",
  },

  seo: {
    jobTitle: "Software Engineer",
    metaDescription:
      "Divanshu Chauhan (divkix) is a software engineer at Cloudflare and a Vinext contributor with an MS in Computer Science from Arizona State (GPA 3.889). He builds LogWell, Clickfolio, and Alita Robot, a Telegram bot used by 300,000+ people, and writes about edge computing, developer tools, and shipping side projects.",
  },

  faq: [
    {
      q: "Who is Divanshu Chauhan?",
      a: "Divanshu Chauhan (divkix) is a software engineer at Cloudflare with an MS in Computer Science from Arizona State University (GPA 3.889, completed May 2026). He builds production tools like LogWell, Clickfolio, and Alita Robot, contributes to Cloudflare Vinext, and writes about developer tools and edge computing on divkix.me.",
    },
    {
      q: "What is Divanshu Chauhan's education?",
      a: "Divanshu earned an MS in Computer Science from Arizona State University in May 2026 with a 3.889 GPA, focused on AI/ML and data science. He also holds a BS in Computer Science from ASU (Magna Cum Laude, May 2025).",
    },
    {
      q: "What is Divanshu Chauhan working on at Cloudflare?",
      a: "Divanshu is a software engineer intern on Cloudflare's ETI team and an open-source contributor to Vinext, Cloudflare's Vite-based reimplementation of the Next.js API surface for deployment on Workers and other runtimes.",
    },
    {
      q: "What is Vinext?",
      a: "Vinext is Cloudflare's open-source Vite plugin that reimplements the Next.js API surface for Workers and other runtimes. Divanshu Chauhan contributes to App Router rendering, ISR caching, image optimization, and server action forwarding.",
    },
    {
      q: "What projects has Divanshu Chauhan built?",
      a: "Notable projects include Alita Robot (Telegram community bot used by 300,000+ users), LogWell (self-hosted logging platform), Clickfolio (AI portfolio builder on Cloudflare Workers), PickMyClass (ASU class availability tracker), and contributions to Cloudflare Vinext.",
    },
  ] as const,

  facts: {
    impact: "300000+",
    projects: "30+",
    oss: "50+",
  },

  skills: [
    { name: "TypeScript", category: "Languages" },
    { name: "Python", category: "Languages" },
    { name: "JavaScript", category: "Languages" },
    { name: "Go", category: "Languages" },
    { name: "Java", category: "Languages" },
    { name: "C/C++", category: "Languages" },
    { name: "React", category: "Frontend" },
    { name: "Astro", category: "Frontend" },
    { name: "Tailwind CSS", category: "Frontend" },
    { name: "Vite", category: "Frontend" },
    { name: "Node.js", category: "Backend" },
    { name: "Express", category: "Backend" },
    { name: "REST APIs", category: "Backend" },
    { name: "WebSockets", category: "Backend" },
    { name: "SSE", category: "Backend" },
    { name: "Cloudflare Workers", category: "Cloud/Infra" },
    { name: "Cloudflare Pages", category: "Cloud/Infra" },
    { name: "Cloudflare D1", category: "Cloud/Infra" },
    { name: "Cloudflare R2", category: "Cloud/Infra" },
    { name: "Cloudflare Queues", category: "Cloud/Infra" },
    { name: "Cloudflare DO", category: "Cloud/Infra" },
    { name: "Docker", category: "Cloud/Infra" },
    { name: "Linux", category: "Cloud/Infra" },
    { name: "PostgreSQL", category: "Databases" },
    { name: "SQLite", category: "Databases" },
    { name: "MongoDB", category: "Databases" },
    { name: "Gemini API", category: "AI/Tooling" },
    { name: "LLM workflows", category: "AI/Tooling" },
    { name: "Git", category: "AI/Tooling" },
    { name: "Observability", category: "AI/Tooling" },
  ] as const,

  experience: [
    {
      company: "Cloudflare",
      url: "https://www.cloudflare.com",
      location: "Austin, Texas / Remote",
      duration: "June 2026 – Present",
      positions: [
        {
          title: "Software Engineer Intern",
          year: "June 2026 – Present",
          highlights: [
            "Working on engineering tooling and platform systems as part of the ETI team",
            "Focused on developer experience, infrastructure, and production-grade systems in the Cloudflare ecosystem",
          ],
        },
      ],
    },
    {
      company: "Arizona State University",
      url: "https://www.asu.edu",
      location: "Tempe, Arizona, USA",
      duration: "Aug 2023 – May 2026",
      positions: [
        {
          title: "Engineering Tutor",
          year: "May 2024 – May 2026",
          highlights: [
            "Tutoring CSE courses including CSE205, CSE230, CSE240, CSE310, CSE330, CSE360",
          ],
        },
        {
          title: "Instructional Aide",
          year: "Aug 2025 – Dec 2025",
          highlights: [
            "Supported CSE110 classes for 456 students with instructional materials",
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
      url: "https://thesoda.io",
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
      url: "https://xrossways.com",
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
      company: "The Purpose Academy (in partnership with SCET, UC Berkeley)",
      url: "https://thepurposeacademy.asia",
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
      url: "https://www.ibm.com",
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
      url: "https://haryanapolice.gov.in",
      location: "Gurugram, Haryana, India",
      duration: "Jun 2020 – Jul 2020",
      positions: [
        {
          title: "Student Intern",
          year: "Jun 2020 – Jul 2020",
          highlights: [
            "Developed AI model for weapon detection using Computer Vision",
            "Deployed AI weapon detection models for public safety applications",
          ],
        },
      ],
    },
    {
      company: "CBSE x IBM",
      url: "https://cbseacademic.nic.in",
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
      honors: "GPA 3.889",
    },
    {
      title: "BS, Computer Science — Arizona State University",
      year: "Jan 2022 – May 2025",
      honors: "Magna Cum Laude, GPA 3.78",
    },
  ],

  projects: [
    {
      name: "Vinext",
      desc: "Open-source contributor to Cloudflare Vinext, a Vite plugin that reimplements the Next.js API surface for Workers and other runtimes. My work touches App Router rendering, ISR caching, image optimization, and server-action forwarding.",
      image: "/og/blog/clickfolio-full-stack-cloudflare-workers.webp",
      tags: [
        "TypeScript",
        "Vite",
        "Next.js",
        "Cloudflare Workers",
        "Open Source",
      ],
      period: "2025 – Present",
      links: [
        { label: "GitHub", href: "https://github.com/cloudflare/vinext" },
        { label: "Docs", href: "https://vinext.dev" },
      ],
    },
    {
      name: "LogWell",
      desc: "A self-hosted logging tool I wrote because Datadog priced me out and the open-source alternatives wanted a PhD in Elasticsearch. PostgreSQL-backed, OTLP-compatible, real-time streaming, one Docker Compose file.",
      image: "/og/blog/logwell-self-hosted-logging-platform.webp",
      tags: ["TypeScript", "PostgreSQL", "Docker", "SSE", "OTLP", "Node.js"],
      period: "2024 – Present",
      links: [{ label: "GitHub", href: "https://github.com/Divkix/Logwell" }],
    },
    {
      name: "Clickfolio",
      desc: "Upload a PDF resume, get a live portfolio site. Built end-to-end on Cloudflare's stack: Workers, D1, R2, Queues, Durable Objects for live WebSocket status, Drizzle for the schema, Gemini for parsing.",
      image: "/og/blog/clickfolio-full-stack-cloudflare-workers.webp",
      tags: [
        "Cloudflare Workers",
        "D1",
        "R2",
        "Queues",
        "Durable Objects",
        "WebSockets",
        "TypeScript",
        "Drizzle",
        "Gemini",
      ],
      period: "2024 – Present",
      links: [
        { label: "Live", href: "https://clickfolio.me" },
        { label: "GitHub", href: "https://github.com/Divkix/clickfolio.me" },
      ],
    },
    {
      name: "Alita Robot",
      desc: "Open-source Telegram moderation bot I've maintained since 2020. Currently serving 300,000+ users across real communities, with the boring features people actually need: anti-spam, scheduling, role management, locale support, and a self-hostable Go binary.",
      image: "/og/blog/scaling-telegram-bot-300k-users.webp",
      tags: ["Go", "MongoDB", "Telegram Bot API", "Docker"],
      period: "Feb 2020 – Present",
      links: [
        { label: "GitHub", href: "https://github.com/Divkix/Alita_Robot" },
      ],
    },
    {
      name: "PickMyClass",
      desc: "Class availability tracker for ASU. It watches the registrar for open seats and pings you when one frees up. I built it because I was personally tired of refreshing the page at 11:59pm during registration week.",
      image: "/og/blog/pickmyclass-never-miss-your-dream-class.webp",
      tags: ["TypeScript", "React", "Node.js", "Automation"],
      period: "2024 – Present",
      links: [
        { label: "Live", href: "https://pickmyclass.app" },
        { label: "GitHub", href: "https://github.com/Divkix/pickmyclass" },
      ],
    },
    {
      name: "ASU Capstone",
      desc: "Full-stack platform for managing and showcasing Arizona State University senior capstone projects. Built with the capstone team for actual classes.",
      image: "/og-image.webp",
      tags: ["Next.js", "TypeScript", "Python", "Go"],
      period: "Aug 2024 – Present",
      links: [
        { label: "Live", href: "https://asucapstone.com" },
        { label: "GitHub", href: "https://github.com/asu-capstone-team" },
      ],
    },
    {
      name: "WarpDL",
      desc: "Cross-platform download manager written in Go. Handles high-throughput concurrent downloads. Started as a weekend project, kept it alive because people kept opening issues.",
      tags: ["Go", "MongoDB"],
      period: "May 2023 – Present",
      links: [{ label: "GitHub", href: "https://github.com/warpdl/warpdl" }],
    },
    {
      name: "AI Code Improvement Platform",
      desc: "Research-grade code analysis platform. Voyage AI embeddings, Qdrant for vector search, Claude for the review pass and refactor suggestions.",
      tags: ["Go", "AI/ML", "Qdrant", "MongoDB"],
      period: "2024 – Present",
      links: [
        {
          label: "GitHub",
          href: "https://github.com/Divkix/ai-code-improvement-platform",
        },
      ],
    },
  ],

  socials: [
    { label: "GitHub", href: "https://github.com/divkix" },
    { label: "LinkedIn", href: "https://www.linkedin.com/in/divkix/" },
    { label: "X", href: "https://x.com/divkix" },
    { label: "Hugging Face", href: "https://huggingface.co/divkix" },
    { label: "Instagram", href: "https://instagram.com/_divkix" },
    { label: "ORCID", href: "https://orcid.org/0009-0004-0423-2471" },
    { label: "Email", href: "mailto:divkix@divkix.me" },
  ],
} as const;

export const NOINDEX_PATHS = ["/mentions"] as const;
