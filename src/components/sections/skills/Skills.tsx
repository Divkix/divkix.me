import { siteConfig } from "@/data/site.config";
import { SkillsTerminal } from "./SkillsTerminal";

export type Skill = {
  name: string;
  category: string;
  proficiency: number;
};

// Group skills by category
function groupSkillsByCategory(
  skills: readonly Skill[],
): Record<string, Skill[]> {
  const grouped: Record<string, Skill[]> = {};
  for (const skill of skills) {
    if (!(skill.category in grouped)) {
      grouped[skill.category] = [];
    }
    grouped[skill.category]!.push({ ...skill });
  }
  // Sort by proficiency within each category
  for (const category of Object.keys(grouped)) {
    grouped[category]!.sort((a, b) => b.proficiency - a.proficiency);
  }
  return grouped;
}

// Map proficiency to abstract level
export function getProficiencyLevel(proficiency: number): {
  label: string;
  dots: number;
  blocks: string;
} {
  if (proficiency >= 90) return { label: "Expert", dots: 5, blocks: "█████░" };
  if (proficiency >= 80)
    return { label: "Advanced", dots: 4, blocks: "████░░" };
  if (proficiency >= 70)
    return { label: "Proficient", dots: 3, blocks: "███░░░" };
  if (proficiency >= 60)
    return { label: "Familiar", dots: 2, blocks: "██░░░░" };
  return { label: "Learning", dots: 1, blocks: "█░░░░░" };
}

export function Skills() {
  const skills = siteConfig.skills as unknown as Skill[];
  const groupedSkills = groupSkillsByCategory(skills);

  return (
    <section id="skills" className="container mx-auto px-4 py-20">
      <div className="space-y-12">
        {/* Section Header */}
        <div className="text-center space-y-4">
          <h2 className="text-4xl font-display font-bold">Skills</h2>
          <p className="text-foreground/60 max-w-2xl mx-auto">
            Technical proficiency across languages, frameworks, databases, and
            tools.
          </p>
        </div>

        <SkillsTerminal groupedSkills={groupedSkills} />
      </div>
    </section>
  );
}
