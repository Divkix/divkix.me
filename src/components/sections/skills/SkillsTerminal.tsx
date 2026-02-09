import { useEffect, useRef, useState } from "react";
import { getProficiencyLevel, type Skill } from "./Skills";

interface SkillsTerminalProps {
  groupedSkills: Record<string, Skill[]>;
}

function SkillRow({
  skill,
  index,
  isVisible,
}: {
  skill: Skill;
  index: number;
  isVisible: boolean;
}) {
  const { label, blocks } = getProficiencyLevel(skill.proficiency);

  return (
    <div
      className={`
        flex items-center gap-2 font-mono text-sm
        transition-all duration-300
        ${isVisible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-4"}
      `}
      style={{ transitionDelay: `${400 + index * 60}ms` }}
    >
      <span className="text-emerald-400 w-24 truncate">
        {skill.name.toLowerCase()}
      </span>
      <span className="text-foreground/40 w-20">{label.toLowerCase()}</span>
      <span className="text-cyan-400 tracking-wider">{blocks}</span>
    </div>
  );
}

function TerminalWindow({
  category,
  skills,
  windowIndex,
  isVisible,
}: {
  category: string;
  skills: Skill[];
  windowIndex: number;
  isVisible: boolean;
}) {
  const [showContent, setShowContent] = useState(false);

  useEffect(() => {
    if (!isVisible) return;
    const timer = setTimeout(
      () => setShowContent(true),
      windowIndex * 200 + 300,
    );
    return () => clearTimeout(timer);
  }, [isVisible, windowIndex]);

  return (
    <div
      className={`
        rounded-lg overflow-hidden border border-foreground/10
        transition-all duration-500
        ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}
      `}
      style={{
        transitionDelay: `${windowIndex * 100}ms`,
        background: "linear-gradient(180deg, #1a1a2e 0%, #16162a 100%)",
        fontFamily: "'JetBrains Mono', 'Fira Code', 'SF Mono', monospace",
      }}
    >
      {/* Title bar */}
      <div className="flex items-center gap-2 px-4 py-2.5 bg-black/30 border-b border-foreground/10">
        <div className="flex gap-1.5">
          <div className="w-3 h-3 rounded-full bg-red-500/80" />
          <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
          <div className="w-3 h-3 rounded-full bg-green-500/80" />
        </div>
        <span className="text-xs text-foreground/40 ml-2">
          skills — {category.toLowerCase()}
        </span>
      </div>

      {/* Terminal content */}
      <div className="p-4 space-y-2 relative">
        {/* Scanlines overlay */}
        <div className="terminal-scanlines" />

        {/* Column headers */}
        <div className="text-xs text-foreground/30 uppercase tracking-wider flex items-center gap-2">
          <span className="w-24">package</span>
          <span className="w-20">level</span>
          <span>mastery</span>
        </div>

        {/* Skills list */}
        {showContent && (
          <div className="space-y-1">
            {skills.map((skill, index) => (
              <SkillRow
                key={skill.name}
                skill={skill}
                index={index}
                isVisible={showContent}
              />
            ))}
          </div>
        )}

        {/* Glowing cursor at bottom */}
        {showContent && (
          <div
            className="text-sm pt-2 opacity-0 animate-[fadeIn_0.3s_ease-out_forwards]"
            style={{ animationDelay: `${skills.length * 60 + 400}ms` }}
          >
            <span className="text-emerald-400">$ </span>
            <span className="terminal-cursor">▊</span>
          </div>
        )}
      </div>
    </div>
  );
}

export function SkillsTerminal({ groupedSkills }: SkillsTerminalProps) {
  const [isVisible, setIsVisible] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 },
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, []);

  // Row 1: Languages | Tools
  // Row 2: Frameworks | Databases
  const rows = [
    ["Languages", "Tools"],
    ["Frameworks", "Databases"],
  ];

  let windowIndex = 0;

  return (
    <div ref={containerRef} className="max-w-4xl mx-auto space-y-4">
      {rows.map((row) => (
        <div
          key={row.join("-")}
          className="grid grid-cols-1 md:grid-cols-2 gap-4"
        >
          {row.map((category) => {
            const idx = windowIndex++;
            return (
              <TerminalWindow
                key={category}
                category={category}
                skills={groupedSkills[category] || []}
                windowIndex={idx}
                isVisible={isVisible}
              />
            );
          })}
        </div>
      ))}

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500&display=swap');

        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        /* Scanlines overlay for CRT effect */
        .terminal-scanlines {
          position: absolute;
          inset: 0;
          pointer-events: none;
          background: repeating-linear-gradient(
            0deg,
            transparent,
            transparent 2px,
            oklch(0 0 0 / 0.03) 2px,
            oklch(0 0 0 / 0.03) 4px
          );
          z-index: 10;
        }

        /* Glowing cursor */
        .terminal-cursor {
          color: oklch(0.7 0.2 140);
          text-shadow: 0 0 8px oklch(0.7 0.2 140);
          animation: cursor-glow 1s ease-in-out infinite;
        }

        @keyframes cursor-glow {
          0%, 100% {
            opacity: 1;
            text-shadow: 0 0 8px oklch(0.7 0.2 140);
          }
          50% {
            opacity: 0.4;
            text-shadow: 0 0 4px oklch(0.7 0.2 140);
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .terminal-cursor {
            animation: none;
            opacity: 1;
          }
          .terminal-scanlines {
            display: none;
          }
        }
      `}</style>
    </div>
  );
}
