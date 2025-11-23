"use client";

import { motion } from "framer-motion";
import { useMemo } from "react";
import { getSkillIcon } from "./skill-icons";

interface Skill {
  readonly name: string;
  readonly category: string;
  readonly proficiency: number;
}

interface SkillProficiencyBarProps {
  skills: readonly Skill[];
  category?: string;
}

/**
 * Compact 2-column bar view for skill proficiency with icons
 */
export function SkillProficiencyBar({
  skills,
  category,
}: SkillProficiencyBarProps): React.JSX.Element {
  // Filter and group skills by category
  const groupedSkills = useMemo(() => {
    const filtered = category
      ? skills.filter((skill) => skill.category === category)
      : skills;

    // Group by category
    const groups = filtered.reduce(
      (acc, skill) => {
        if (!acc[skill.category]) {
          acc[skill.category] = [];
        }
        acc[skill.category].push(skill);
        return acc;
      },
      {} as Record<string, Skill[]>,
    );

    // Sort skills within each category by proficiency
    Object.keys(groups).forEach((cat) => {
      groups[cat].sort((a, b) => b.proficiency - a.proficiency);
    });

    return groups;
  }, [skills, category]);

  const categories = Object.keys(groupedSkills);

  if (categories.length === 0) {
    return (
      <div className="flex items-center justify-center h-40">
        <p className="text-foreground/60">No skills to display</p>
      </div>
    );
  }

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      {categories.map((cat, catIndex) => (
        <div key={cat} className="space-y-3">
          <h4 className="text-base font-semibold text-foreground/80">{cat}</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {groupedSkills[cat].map((skill, skillIndex) => {
              const Icon = getSkillIcon(skill.name);

              return (
                <motion.div
                  key={skill.name}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{
                    duration: 0.4,
                    delay: catIndex * 0.1 + skillIndex * 0.05,
                  }}
                >
                  <div className="flex items-center gap-3">
                    {/* Skill icon */}
                    <div className="shrink-0">
                      <Icon className="h-5 w-5 text-foreground/70" />
                    </div>

                    {/* Skill name */}
                    <span className="text-sm font-medium text-foreground w-28 shrink-0">
                      {skill.name}
                    </span>

                    {/* Progress bar */}
                    <div className="flex-1 h-4 bg-muted rounded-full overflow-hidden relative">
                      <motion.div
                        className="h-full bg-linear-to-r from-primary to-accent rounded-full"
                        initial={{ width: 0 }}
                        whileInView={{ width: `${skill.proficiency}%` }}
                        viewport={{ once: true }}
                        transition={{
                          duration: 1,
                          delay: catIndex * 0.1 + skillIndex * 0.05,
                          ease: "easeOut",
                        }}
                      />
                      {/* Proficiency label inside bar */}
                      <motion.span
                        className="absolute right-2 top-1/2 -translate-y-1/2 text-xs font-semibold text-background mix-blend-difference"
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{
                          duration: 0.3,
                          delay: catIndex * 0.1 + skillIndex * 0.05 + 0.5,
                        }}
                      >
                        {skill.proficiency}%
                      </motion.span>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
}
