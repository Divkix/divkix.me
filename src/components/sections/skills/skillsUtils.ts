export type Skill = {
  name: string;
  category: string;
  proficiency: number;
};

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
