import dynamic from "next/dynamic";
import { Contact } from "@/components/sections/Contact";
import { Hero3D } from "@/components/sections/Hero3D";
import { Highlights } from "@/components/sections/Highlights";

// Dynamic imports for heavy components to reduce initial bundle size
// ParallaxBackground and InteractiveGradient have heavy animation logic
// These are already client components ("use client"), no SSR needed but Next.js will handle it
const ParallaxBackground = dynamic(
  () =>
    import("@/components/sections/ParallaxBackground").then((mod) => ({
      default: mod.ParallaxBackground,
    })),
  {
    loading: () => null, // No visual placeholder needed for background effects
  },
);

const InteractiveGradient = dynamic(
  () =>
    import("@/components/ui/interactive-gradient").then((mod) => ({
      default: mod.InteractiveGradient,
    })),
  {
    loading: () => null, // No visual placeholder needed for background effects
  },
);

// Below-fold sections can be lazy-loaded
// Loading placeholders prevent cumulative layout shift (CLS)
const Projects = dynamic(
  () =>
    import("@/components/sections/Projects").then((mod) => ({
      default: mod.Projects,
    })),
  {
    loading: () => <div className="min-h-screen" />,
  },
);

const Experience = dynamic(
  () =>
    import("@/components/sections/Experience").then((mod) => ({
      default: mod.Experience,
    })),
  {
    loading: () => <div className="min-h-screen" />,
  },
);

const Skills = dynamic(
  () =>
    import("@/components/sections/Skills").then((mod) => ({
      default: mod.Skills,
    })),
  {
    loading: () => <div className="min-h-[600px]" />,
  },
);

export default function HomePage() {
  return (
    <>
      <InteractiveGradient />
      <ParallaxBackground />
      <Hero3D />
      <Highlights />
      <Projects />
      <Experience />
      <Skills />
      <Contact />
    </>
  );
}
