import { SectionHeading } from "@/components/shared/SectionHeading";
import { siteConfig } from "@/data/site.config";
import type { Skill } from "./skillsUtils";

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
    list.sort((a, b) => a.name.localeCompare(b.name));
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

export function Skills() {
  const skills = siteConfig.skills;
  const groupedSkills = groupSkillsByCategory(skills);

  return (
    <section id="skills" className="min-w-0 space-y-10 not-prose">
      <SectionHeading
        title="Tools I reach for"
        description="Technologies I use regularly — grouped by what they're for, not ranked by arbitrary scores."
      />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 min-w-0">
        {CATEGORIES.map((category) => {
          const categorySkills = groupedSkills[category];
          if (!categorySkills || categorySkills.length === 0) return null;

          return (
            <div key={category} className="min-w-0 space-y-4">
              <h3 className="font-display text-lg font-medium text-foreground border-b border-border pb-2">
                {category}
              </h3>
              <ul className="flex flex-wrap gap-2">
                {categorySkills.map((skill) => (
                  <li key={skill.name}>
                    <span className="inline-block px-3 py-1 text-sm border border-border text-foreground/80 rounded-[var(--radius-input)] whitespace-nowrap">
                      {skill.name}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          );
        })}
      </div>
    </section>
  );
}
