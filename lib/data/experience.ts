export interface Experience {
  id: string;
  title: string;
  company: string;
  location: string;
  startDate: string;
  endDate: string;
  current: boolean;
  description: string;
  achievements: string[];
  technologies: string[];
  type: "work" | "education" | "leadership";
}

export const experiences: Experience[] = [
  {
    id: "asu-ms",
    title: "Master of Science in Computer Science",
    company: "Arizona State University",
    location: "Tempe, Arizona",
    startDate: "2024-08",
    endDate: "2026-05",
    current: true,
    description:
      "Graduate student pursuing MS in Computer Science with focus on AI/ML and Data Science. GPA: 4.0/4.0",
    achievements: [
      "Focus on Artificial Intelligence and Machine Learning",
      "Advanced coursework in Data Science and Analytics",
      "Research in Deep Learning and Computer Vision",
      "Graduate Teaching Assistant for CSE courses",
    ],
    technologies: [
      "Python",
      "TensorFlow",
      "PyTorch",
      "Machine Learning",
      "Deep Learning",
    ],
    type: "education",
  },
  {
    id: "asu-bs",
    title: "Bachelor of Science in Computer Science",
    company: "Arizona State University",
    location: "Tempe, Arizona",
    startDate: "2020-08",
    endDate: "2024-05",
    current: false,
    description:
      "Graduated Magna Cum Laude with BS in Computer Science. GPA: 3.8/4.0",
    achievements: [
      "Magna Cum Laude honors",
      "Dean's List all semesters",
      "Capstone project leader",
      "Active in multiple tech clubs and organizations",
    ],
    technologies: [
      "Java",
      "Python",
      "C++",
      "Data Structures",
      "Algorithms",
      "Software Engineering",
    ],
    type: "education",
  },
  {
    id: "ibm-intern",
    title: "Software Engineering Intern - Team Leader",
    company: "IBM & UC Berkeley",
    location: "Remote",
    startDate: "2023-06",
    endDate: "2023-08",
    current: false,
    description:
      "Led a team of 5 interns in developing enterprise solutions for IBM clients. Collaborated with UC Berkeley researchers on AI initiatives.",
    achievements: [
      "Led team of 5 interns to deliver project 2 weeks ahead of schedule",
      "Developed microservices architecture serving 10K+ requests/day",
      "Implemented CI/CD pipeline reducing deployment time by 60%",
      "Mentored junior interns on best practices and code reviews",
      "Received outstanding performance rating from both IBM and UC Berkeley",
    ],
    technologies: [
      "Python",
      "Go",
      "Docker",
      "Kubernetes",
      "AWS",
      "PostgreSQL",
      "Redis",
    ],
    type: "work",
  },
  {
    id: "gpcssi-2021",
    title: "Team Leader - AI Weapon Detection",
    company: "GPCSSI 2021 (Summer Program)",
    location: "Remote",
    startDate: "2021-06",
    endDate: "2021-08",
    current: false,
    description:
      "Led a team developing an AI-powered weapon detection system for surveillance footage. Part of competitive summer research program.",
    achievements: [
      "Led team of 4 developers in creating weapon detection system",
      "Achieved 95% accuracy in real-time weapon detection",
      "Implemented edge deployment for low-latency processing",
      "Presented findings at program symposium",
      "Won 'Best AI Project' award among 20+ teams",
    ],
    technologies: [
      "Python",
      "TensorFlow",
      "YOLOv5",
      "OpenCV",
      "Computer Vision",
      "Deep Learning",
    ],
    type: "leadership",
  },
  {
    id: "open-source",
    title: "Open Source Contributor",
    company: "Various Projects",
    location: "Global",
    startDate: "2019-01",
    endDate: "2025-01",
    current: true,
    description:
      "Active contributor to open source projects with 50+ contributions to various repositories. Maintainer of Alita Robot with 1M+ users.",
    achievements: [
      "50+ contributions to open source projects",
      "Maintained Alita Robot with 1M+ users",
      "Contributed to popular Go and Python projects",
      "Active in developer communities and forums",
      "Mentored 10+ new contributors",
    ],
    technologies: [
      "Go",
      "Python",
      "TypeScript",
      "Rust",
      "Docker",
      "Git",
      "GitHub Actions",
    ],
    type: "leadership",
  },
];

export function getExperiencesByType(
  type: Experience["type"]
): Experience[] {
  return experiences.filter((exp) => exp.type === type);
}

export function getCurrentExperiences(): Experience[] {
  return experiences.filter((exp) => exp.current);
}

export function getWorkExperiences(): Experience[] {
  return experiences.filter(
    (exp) => exp.type === "work" || exp.type === "leadership"
  );
}

export function getEducationExperiences(): Experience[] {
  return experiences.filter((exp) => exp.type === "education");
}
