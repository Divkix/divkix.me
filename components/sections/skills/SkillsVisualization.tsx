"use client"

import { useState } from "react"
import { SkillProficiencyBar } from "./SkillProficiencyBar"

interface Skill {
  readonly name: string
  readonly category: string
  readonly proficiency: number
}

interface SkillsVisualizationProps {
  skills: readonly Skill[]
}

/**
 * Compact skills visualization with category filters
 */
export function SkillsVisualization({ skills }: SkillsVisualizationProps): React.JSX.Element {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)

  // Get unique categories
  const categories = Array.from(new Set(skills.map((s) => s.category)))

  return (
    <div className="space-y-6">
      {/* Category filter */}
      <div className="flex flex-wrap gap-2 justify-center">
        <button
          onClick={() => setSelectedCategory(null)}
          className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
            selectedCategory === null
              ? "bg-primary text-primary-foreground"
              : "bg-muted text-foreground/70 hover:bg-muted/80"
          }`}
        >
          All
        </button>
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => setSelectedCategory(category)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
              selectedCategory === category
                ? "bg-primary text-primary-foreground"
                : "bg-muted text-foreground/70 hover:bg-muted/80"
            }`}
          >
            {category}
          </button>
        ))}
      </div>

      {/* Visualization area */}
      <div className="min-h-[300px]">
        <SkillProficiencyBar skills={skills} category={selectedCategory || undefined} />
      </div>
    </div>
  )
}
