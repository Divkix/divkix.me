"use client"

import { motion } from "framer-motion"
import { useMemo } from "react"

interface Skill {
  readonly name: string
  readonly category: string
  readonly proficiency: number
}

interface SkillProficiencyBarProps {
  skills: readonly Skill[]
  category?: string
}

/**
 * Horizontal bar view for skill proficiency with category grouping
 */
export function SkillProficiencyBar({
  skills,
  category,
}: SkillProficiencyBarProps): React.JSX.Element {
  // Filter and group skills by category
  const groupedSkills = useMemo(() => {
    const filtered = category
      ? skills.filter((skill) => skill.category === category)
      : skills

    // Group by category
    const groups = filtered.reduce((acc, skill) => {
      if (!acc[skill.category]) {
        acc[skill.category] = []
      }
      acc[skill.category].push(skill)
      return acc
    }, {} as Record<string, Skill[]>)

    // Sort skills within each category by proficiency
    Object.keys(groups).forEach((cat) => {
      groups[cat].sort((a, b) => b.proficiency - a.proficiency)
    })

    return groups
  }, [skills, category])

  const categories = Object.keys(groupedSkills)

  if (categories.length === 0) {
    return (
      <div className="flex items-center justify-center h-40">
        <p className="text-foreground/60">No skills to display</p>
      </div>
    )
  }

  return (
    <div className="space-y-8 max-w-4xl mx-auto">
      {categories.map((cat, catIndex) => (
        <div key={cat} className="space-y-4">
          <h4 className="text-lg font-semibold text-foreground/80">{cat}</h4>
          <div className="space-y-3">
            {groupedSkills[cat].map((skill, skillIndex) => (
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
                <div className="flex items-center gap-4">
                  {/* Skill name */}
                  <span className="text-sm font-medium text-foreground w-32 shrink-0">
                    {skill.name}
                  </span>

                  {/* Progress bar */}
                  <div className="flex-1 h-6 bg-muted rounded-full overflow-hidden relative">
                    <motion.div
                      className="h-full bg-gradient-to-r from-primary to-accent rounded-full"
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
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}
