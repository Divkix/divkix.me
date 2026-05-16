import { SectionLabel } from "@/components/shared/SectionLabel";
import { siteConfig } from "@/data/site.config";
import type { Skill } from "./skillsUtils";
import { getProficiencyLevel } from "./skillsUtils";

function groupSkillsByCategory(
  skills: readonly Skill[],
): Record<string, Skill[]> {
  const grouped: Record<string, Skill[]> = {};
  for (const skill of skills) {
    const existing = grouped[skill.category];
    if (existing) {
      existing.push({ ...skill });
    } else {
      grouped[skill.category] = [{ ...skill }];
    }
  }
  for (const [, list] of Object.entries(grouped)) {
    list.sort((a, b) => b.proficiency - a.proficiency);
  }
  return grouped;
}

const CATEGORIES = [
  "Languages",
  "Frontend",
  "Backend",
  "Cloud/Infra",
  "Databases",
  "AI/Tooling",
] as const;

function SkillBar({ skill }: { skill: Skill }) {
  const { label, blocks } = getProficiencyLevel(skill.proficiency);

  return (
    <div className="flex items-center gap-3 text-sm">
      <span className="w-24 truncate text-foreground/80">{skill.name}</span>
      <span className="w-16 text-xs text-muted-foreground">{label}</span>
      <span
        className="text-primary tracking-wider"
        role="img"
        aria-label={`${skill.name} proficiency: ${label}`}
      >
        {blocks}
      </span>
    </div>
  );
}

export function Skills() {
  const skills = siteConfig.skills;
  const groupedSkills = groupSkillsByCategory(skills);

  return (
    <section
      id="skills"
      className="container mx-auto px-4 py-24 reveal-on-scroll"
    >
      <SectionLabel number="04" label="skills" />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl">
        {CATEGORIES.map((category) => {
          const categorySkills = groupedSkills[category];
          if (!categorySkills || categorySkills.length === 0) return null;

          return (
            <div
              key={category}
              className="rounded-xl border border-border bg-card p-6 shadow-sm"
            >
              <h3 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground/60 mb-4">
                {category}
              </h3>
              <div className="space-y-2">
                {categorySkills.map((skill) => (
                  <SkillBar key={skill.name} skill={skill} />
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
