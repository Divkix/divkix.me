"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { SkillRadarChart } from "./SkillRadarChart"
import { SkillProficiencyBar } from "./SkillProficiencyBar"
import { BarChart3, Radar } from "lucide-react"

interface Skill {
  readonly name: string
  readonly category: string
  readonly proficiency: number
}

interface SkillsVisualizationProps {
  skills: readonly Skill[]
}

type ViewMode = "radar" | "bar"

/**
 * Container component with toggle between radar and bar view
 */
export function SkillsVisualization({ skills }: SkillsVisualizationProps): React.JSX.Element {
  const [viewMode, setViewMode] = useState<ViewMode>("bar")
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)

  // Get unique categories
  const categories = Array.from(new Set(skills.map((s) => s.category)))

  return (
    <div className="space-y-8">
      {/* View mode and category filters */}
      <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
        {/* View mode toggle */}
        <Tabs value={viewMode} onValueChange={(v) => setViewMode(v as ViewMode)}>
          <TabsList>
            <TabsTrigger value="bar" className="flex items-center gap-2">
              <BarChart3 className="h-4 w-4" />
              <span>Bars</span>
            </TabsTrigger>
            <TabsTrigger value="radar" className="flex items-center gap-2">
              <Radar className="h-4 w-4" />
              <span>Radar</span>
            </TabsTrigger>
          </TabsList>
        </Tabs>

        {/* Category filter */}
        <div className="flex flex-wrap gap-2">
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
      </div>

      {/* Visualization area with animated transitions */}
      <div className="min-h-[400px]">
        <AnimatePresence mode="wait">
          {viewMode === "radar" ? (
            <motion.div
              key="radar"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              <SkillRadarChart skills={skills} category={selectedCategory || undefined} />
            </motion.div>
          ) : (
            <motion.div
              key="bar"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              <SkillProficiencyBar skills={skills} category={selectedCategory || undefined} />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}
