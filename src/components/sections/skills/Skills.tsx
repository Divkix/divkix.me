import { SectionLabel } from "@/components/shared/SectionLabel";
import { siteConfig } from "@/data/site.config";
import { SkillsTerminal } from "./SkillsTerminal";
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
    list.sort((a, b) => b.proficiency - a.proficiency);
  }
  return grouped;
}

export function Skills() {
  const skills = siteConfig.skills;
  const groupedSkills = groupSkillsByCategory(skills);

  return (
    <>
      {/* Gradient divider: page background → terminal black */}
      <div
        className="h-24"
        style={{
          background:
            "linear-gradient(to bottom, var(--background), oklch(0.08 0 0))",
        }}
        aria-hidden="true"
      />

      {/* Full-bleed dark section */}
      <section
        id="skills"
        className="relative py-20"
        style={{ background: "oklch(0.08 0 0)" }}
      >
        <div className="container mx-auto px-4">
          <SectionLabel number="04" label="skills" variant="terminal" />
          <SkillsTerminal groupedSkills={groupedSkills} />
        </div>
      </section>
    </>
  );
}
