import { useCallback, useEffect, useRef, useState } from "react";
import { getProficiencyLevel, type Skill } from "./Skills";

interface SkillsTerminalProps {
  groupedSkills: Record<string, Skill[]>;
}

const CATEGORIES = ["Languages", "Frameworks", "Databases", "Tools"] as const;
type Category = (typeof CATEGORIES)[number];

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
        flex items-center gap-3 text-sm
        transition-all duration-300
        ${isVisible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-4"}
      `}
      style={{
        transitionDelay: `${index * 60}ms`,
        textShadow: "0 0 2px currentColor",
      }}
    >
      <span className="text-[oklch(0.7_0.2_140)] w-28 truncate">
        {skill.name.toLowerCase()}
      </span>
      <span className="text-[oklch(1_0_0_/_0.35)] w-20 text-xs">
        {label.toLowerCase()}
      </span>
      <span className="text-[oklch(0.72_0.12_185)] tracking-wider">
        {blocks}
      </span>
    </div>
  );
}

export function SkillsTerminal({ groupedSkills }: SkillsTerminalProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [activeTab, setActiveTab] = useState<Category>("Languages");
  const [typedCommand, setTypedCommand] = useState("");
  const [showOutput, setShowOutput] = useState(false);
  const [showFlicker, setShowFlicker] = useState(true);
  const containerRef = useRef<HTMLDivElement>(null);
  const typingRef = useRef<ReturnType<typeof setTimeout> | null>(null);

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

  // CRT flicker on initial load
  useEffect(() => {
    if (!isVisible) return;
    const timer = setTimeout(() => setShowFlicker(false), 200);
    return () => clearTimeout(timer);
  }, [isVisible]);

  const runTypingAnimation = useCallback((category: Category) => {
    if (typingRef.current) clearTimeout(typingRef.current);
    setTypedCommand("");
    setShowOutput(false);

    const command = `$ divkix --list-skills --category=${category.toLowerCase()}`;
    let i = 0;

    function typeChar() {
      if (i < command.length) {
        setTypedCommand(command.slice(0, i + 1));
        i++;
        typingRef.current = setTimeout(typeChar, 25 + Math.random() * 20);
      } else {
        typingRef.current = setTimeout(() => setShowOutput(true), 200);
      }
    }

    typingRef.current = setTimeout(typeChar, 100);
  }, []);

  useEffect(() => {
    if (!isVisible) return;
    runTypingAnimation(activeTab);
    return () => {
      if (typingRef.current) clearTimeout(typingRef.current);
    };
  }, [activeTab, isVisible, runTypingAnimation]);

  const handleTabChange = (category: Category) => {
    if (category === activeTab) return;
    setActiveTab(category);
  };

  const skills = groupedSkills[activeTab] || [];

  return (
    <div ref={containerRef} className="max-w-3xl mx-auto">
      <div
        className={`
          overflow-hidden rounded-lg
          transition-all duration-700
          ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}
        `}
        style={{
          animation:
            showFlicker && isVisible
              ? "terminal-flicker 200ms ease-out"
              : undefined,
        }}
      >
        {/* Title bar + tabs */}
        <div className="bg-[oklch(0.12_0_0)] px-4 pt-3 pb-0">
          <div className="flex items-center">
            <div className="flex gap-2">
              <span className="size-3 rounded-full bg-[#ff5f57]" />
              <span className="size-3 rounded-full bg-[#febc2e]" />
              <span className="size-3 rounded-full bg-[#28c840]" />
            </div>
            <span className="ml-4 font-mono text-xs text-[oklch(0.78_0.17_65)]">
              skills@divkix
            </span>
          </div>

          {/* Tab bar */}
          <div
            className="flex gap-1 mt-3 border-b border-[oklch(1_0_0_/_0.08)]"
            role="tablist"
            aria-label="Skill categories"
          >
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                type="button"
                role="tab"
                aria-selected={activeTab === cat}
                aria-controls={`tabpanel-${cat.toLowerCase()}`}
                id={`tab-${cat.toLowerCase()}`}
                className={`
                  px-4 py-2 font-mono text-xs tracking-wide transition-colors relative cursor-pointer
                  ${
                    activeTab === cat
                      ? "text-[oklch(0.78_0.17_65)]"
                      : "text-[oklch(1_0_0_/_0.4)] hover:text-[oklch(1_0_0_/_0.6)]"
                  }
                `}
                onClick={() => handleTabChange(cat)}
              >
                {cat}
                {activeTab === cat && (
                  <span
                    className="absolute bottom-0 left-0 right-0 h-[2px] bg-[oklch(0.78_0.17_65)]"
                    style={{
                      boxShadow: "0 0 8px oklch(0.78 0.17 65 / 0.5)",
                    }}
                  />
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Terminal content */}
        <div
          className="relative bg-[oklch(0.08_0_0)] p-6 font-mono min-h-[320px]"
          role="tabpanel"
          id={`tabpanel-${activeTab.toLowerCase()}`}
          aria-labelledby={`tab-${activeTab.toLowerCase()}`}
          style={{
            textShadow: "0 0 2px currentColor",
            boxShadow: "inset 0 0 60px rgba(0,0,0,0.3)",
          }}
        >
          {/* Scanlines overlay */}
          <div
            className="pointer-events-none absolute inset-0"
            aria-hidden="true"
            style={{
              background:
                "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.15) 2px, rgba(0,0,0,0.15) 4px)",
              opacity: 0.07,
            }}
          />

          <div className="relative space-y-4">
            {/* Typing command */}
            <div className="text-sm text-[oklch(0.7_0.2_140)]">
              <span>{typedCommand}</span>
              <span
                className="inline-block w-2 h-4 bg-[oklch(0.7_0.2_140)] align-middle ml-0.5"
                style={{
                  animation: "terminal-cursor-blink 1s steps(1) infinite",
                  boxShadow: "0 0 6px oklch(0.7 0.2 140)",
                }}
              />
            </div>

            {/* Output */}
            {showOutput && (
              <>
                {/* Column headers */}
                <div className="text-xs text-[oklch(1_0_0_/_0.3)] uppercase tracking-wider flex items-center gap-3 pt-2">
                  <span className="w-28">package</span>
                  <span className="w-20">level</span>
                  <span>mastery</span>
                </div>

                {/* Skills list */}
                <div className="space-y-1.5">
                  {skills.map((skill, index) => (
                    <SkillRow
                      key={skill.name}
                      skill={skill}
                      index={index}
                      isVisible={showOutput}
                    />
                  ))}
                </div>

                {/* Cursor at bottom */}
                <div
                  className="text-sm pt-3 opacity-0"
                  style={{
                    animation: `terminal-fade-in 0.3s ease-out ${skills.length * 60 + 200}ms forwards`,
                  }}
                >
                  <span className="text-[oklch(0.7_0.2_140)]">$ </span>
                  <span
                    className="text-[oklch(0.7_0.2_140)]"
                    style={{
                      animation: "cursor-glow 1s ease-in-out infinite",
                      textShadow: "0 0 8px oklch(0.7 0.2 140)",
                    }}
                  >
                    ▊
                  </span>
                </div>
              </>
            )}
          </div>
        </div>
      </div>

      <style>{`
        @keyframes terminal-flicker {
          0% { opacity: 0.8; }
          5% { opacity: 1; }
          10% { opacity: 0.85; }
          15% { opacity: 1; }
          100% { opacity: 1; }
        }

        @keyframes terminal-fade-in {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        @keyframes terminal-cursor-blink {
          0%, 49% { opacity: 1; }
          50%, 100% { opacity: 0; }
        }

        @media (prefers-reduced-motion: reduce) {
          [style*="terminal-flicker"] {
            animation: none !important;
          }
        }
      `}</style>
    </div>
  );
}
