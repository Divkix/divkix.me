export const siteConfig = {
  name: "Divanshu Chauhan",
  handle: "Divkix",
  tagline:
    "Software engineer intern at Cloudflare. MS in Computer Science from Arizona State (GPA 3.889). I ship side projects people actually use.",
  location: "Tempe, Arizona, USA",
  email: "divkix@divkix.me",
  about:
    "I'm Divanshu. I finished my MS in Computer Science at Arizona State University in May 2026 with a 3.889 GPA, and I intern on Cloudflare's ETI team. The side of my work I care about most is the projects people open every day: a Telegram bot now serving 300,000+ users, a self-hosted logging tool I built because Datadog priced me out, and a class tracker I made for ASU students who were tired of refreshing the registrar at midnight. I also contribute to Vinext, Cloudflare's open-source way of running Next.js apps on Vite. I spent two years tutoring eight CS courses at ASU, which is a humbling way to learn that you don't really understand something until you can explain it to someone who is stuck.",
  heroSummary:
    "Software engineer intern at Cloudflare. MS in Computer Science from ASU. I build edge infrastructure by day and side projects people actually open at night. Currently open to full-time backend, infrastructure, developer tools, and AI platform roles.",
  heroProof:
    "Alita Robot serves 300k+ Telegram users. I contribute to Vinext, Cloudflare's open-source Next.js-on-Workers stack.",
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
    jobTitle: "Software Engineer Intern",
    defaultTitle:
      "Divanshu Chauhan — Software engineer intern at Cloudflare, Vinext contributor",
    metaDescription:
      "Divanshu Chauhan (divkix) is a software engineer intern at Cloudflare and a Vinext contributor, currently open to full-time SWE roles.",
  },

  openToWork:
    "Currently open to full-time software engineering roles: backend, infrastructure, developer tools, AI platforms. Open to relocation. Remote-friendly.",

  /** 1-page PDF header (`resume/resume.tex` → `/Divanshu_Chauhan_Resume.pdf`) */
  resume: {
    email: "chauhan.divanshu@gmail.com",
    phone: "602-918-0541",
    github: "https://github.com/Divkix",
    linkedin: "https://www.linkedin.com/in/divkix/",
    site: "https://divkix.me",
    workAuthorization:
      "F-1 OPT (STEM-eligible), authorized to work in the US, will need H-1B sponsorship.",
  },

  /** Compact homepage proof points — outcomes, not skill tags */
  proofPoints: [
    {
      label: "Alita Robot",
      detail: "300k+ users on a Telegram bot I've maintained since 2020",
    },
    {
      label: "LogWell",
      detail: "Self-hosted logging I built after Datadog priced me out",
    },
    {
      label: "Teaching",
      detail: "Two years tutoring eight CS courses at ASU",
    },
  ] as const,

  faq: [
    {
      q: "Who is Divanshu Chauhan?",
      a: "Divanshu Chauhan (divkix) is a software engineer intern at Cloudflare with an MS in Computer Science from Arizona State University (GPA 3.889, completed May 2026). He is currently open to full-time backend, infrastructure, developer tools, and AI platform roles. He builds production tools like LogWell, Clickfolio, and Alita Robot, contributes to Cloudflare Vinext, and writes about developer tools and edge computing on divkix.me.",
    },
    {
      q: "What is Divanshu Chauhan's education?",
      a: "Divanshu earned an MS in Computer Science from Arizona State University in May 2026 with a 3.889 GPA, focused on AI/ML and data science. He also holds a BS in Computer Science from ASU (Magna Cum Laude, May 2025).",
    },
    {
      q: "What is Divanshu Chauhan working on at Cloudflare?",
      a: "Divanshu is a software engineer intern on Cloudflare's ETI team (June 2026 – Sep. 11, 2026) and an open-source contributor to Vinext (87 merged PRs, 4th contributor). He works on App Router rendering, ISR caching, image optimization, and server-action forwarding, and dogfoods Vinext in production on Clickfolio and PickMyClass.",
    },
    {
      q: "What is Vinext?",
      a: "Vinext is Cloudflare's open-source Vite plugin that reimplements the Next.js API surface for Workers and other runtimes. Divanshu Chauhan contributes to App Router rendering, ISR caching, image optimization, and server action forwarding. Clickfolio and PickMyClass run Vinext in production.",
    },
    {
      q: "What projects has Divanshu Chauhan built?",
      a: "Notable projects include Alita Robot (Telegram community bot used by 300,000+ users), LogWell (self-hosted logging platform), Clickfolio (AI portfolio builder on Cloudflare Workers), PickMyClass (ASU class availability tracker), and contributions to Cloudflare Vinext.",
    },
  ] as const,

  facts: {
    impact: "300k+",
    projects: "30+",
    oss: "50+",
  },

  skills: [
    { name: "TypeScript", category: "Languages" },
    { name: "JavaScript", category: "Languages" },
    { name: "Python", category: "Languages" },
    { name: "Go", category: "Languages" },
    { name: "Java", category: "Languages" },
    { name: "C/C++", category: "Languages" },
    { name: "React", category: "Frameworks" },
    { name: "Next.js", category: "Frameworks" },
    { name: "Node.js", category: "Frameworks" },
    { name: "Express", category: "Frameworks" },
    { name: "Vite", category: "Frameworks" },
    { name: "Astro", category: "Frameworks" },
    { name: "Tailwind CSS", category: "Frameworks" },
    { name: "REST APIs", category: "Frameworks" },
    { name: "Cloudflare Workers", category: "Cloud & Infrastructure" },
    { name: "Cloudflare Pages", category: "Cloud & Infrastructure" },
    { name: "D1", category: "Cloud & Infrastructure" },
    { name: "R2", category: "Cloud & Infrastructure" },
    { name: "Queues", category: "Cloud & Infrastructure" },
    { name: "Durable Objects", category: "Cloud & Infrastructure" },
    { name: "Docker", category: "Cloud & Infrastructure" },
    { name: "Linux", category: "Cloud & Infrastructure" },
    { name: "PostgreSQL", category: "Data & Systems" },
    { name: "SQLite", category: "Data & Systems" },
    { name: "MongoDB", category: "Data & Systems" },
    { name: "WebSockets", category: "Data & Systems" },
    { name: "SSE", category: "Data & Systems" },
    { name: "Observability", category: "Data & Systems" },
    { name: "Git", category: "Data & Systems" },
    { name: "Gemini API", category: "Data & Systems" },
    { name: "LLM workflows", category: "Data & Systems" },
  ] as const,

  experience: [
    {
      company: "Cloudflare",
      url: "https://www.cloudflare.com",
      location: "Austin, TX / Remote",
      duration: "June 2026 – Sep. 11, 2026",
      positions: [
        {
          title: "Software Engineer Intern",
          year: "June 2026 – Sep. 11, 2026",
          highlights: [
            "Shipped 87 merged PRs on cloudflare/vinext (4th contributor): App Router rendering, ISR caching, image optimization, and server-action forwarding so Next.js apps run on Vite and Cloudflare Workers",
            "Dogfooded Vinext in production on Clickfolio and PickMyClass (App Router on Workers)",
          ],
        },
      ],
    },
    {
      company: "Arizona State University",
      url: "https://www.asu.edu",
      location: "Tempe, AZ",
      duration: "Aug. 2023 – May 2026",
      positions: [
        {
          title: "Engineering Tutor, Instructional Aide, and Undergraduate TA",
          year: "Aug. 2023 – May 2026",
          highlights: [
            "Tutored eight CS courses (CSE110, CSE205, CSE230, CSE240, CSE310, CSE330, CSE360), including CSE110 support for 456 students",
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
      year: "Aug. 2025 – May 2026",
      focus: "AI/ML/Data Science",
      honors: "GPA 3.889/4.00",
    },
    {
      title: "BS, Computer Science — Arizona State University",
      year: "Jan. 2022 – May 2025",
      honors: "Magna Cum Laude, GPA 3.78/4.00",
    },
  ],

  projects: [
    {
      name: "Vinext",
      desc: "Intern contribution to Cloudflare Vinext (87 merged PRs, 4th contributor): App Router rendering, ISR caching, image optimization, and server-action forwarding. Clickfolio and PickMyClass run it in production.",
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
      desc: "Built a self-hosted, PostgreSQL-backed logging platform with OTLP compatibility and real-time streaming, packaged for deployment with one Docker Compose file.",
      image: "/og/blog/logwell-self-hosted-logging-platform.webp",
      tags: ["TypeScript", "PostgreSQL", "Docker", "SSE", "OTLP", "Node.js"],
      period: "2024 – Present",
      links: [{ label: "GitHub", href: "https://github.com/Divkix/Logwell" }],
    },
    {
      name: "Clickfolio",
      desc: "Built an end-to-end resume-to-portfolio platform with PDF upload, Gemini parsing, queue-backed processing, live WebSocket status, and generated portfolio sites on Cloudflare Workers, D1, R2, and Queues. Vinext App Router in production.",
      image: "/og/blog/clickfolio-full-stack-cloudflare-workers.webp",
      tags: [
        "Workers",
        "D1",
        "R2",
        "Queues",
        "Durable Objects",
        "WebSockets",
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
      desc: "Open-source Telegram group-management bot in Go (247 GitHub stars) serving 300,000+ users since 2020, with anti-spam, scheduling, role management, locale support, and self-hosting.",
      image: "/og/blog/scaling-telegram-bot-300k-users.webp",
      tags: ["Go", "MongoDB", "Telegram Bot API", "Docker"],
      period: "Feb. 2020 – Present",
      links: [
        { label: "GitHub", href: "https://github.com/Divkix/Alita_Robot" },
      ],
    },
    {
      name: "PickMyClass",
      desc: "Class availability tracker for ASU. Vinext App Router on Cloudflare Workers in production. It watches the registrar for open seats and pings you when one frees up.",
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
      desc: "Cross-platform download manager in Go (103 GitHub stars) with concurrent high-throughput downloads.",
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
