"use client"

import { motion } from "framer-motion"
import { useMemo, useState } from "react"

interface Skill {
  readonly name: string
  readonly category: string
  readonly proficiency: number
}

interface SkillRadarChartProps {
  skills: readonly Skill[]
  category?: string
}

/**
 * Custom SVG radar chart for skill proficiency visualization
 */
export function SkillRadarChart({ skills, category }: SkillRadarChartProps): React.JSX.Element {
  const [hoveredSkill, setHoveredSkill] = useState<string | null>(null)

  // Filter skills by category if provided
  const filteredSkills = useMemo(() => {
    const filtered = category
      ? skills.filter((skill) => skill.category === category)
      : skills.slice(0, 8) // Limit to 8 skills for readability

    return filtered.slice(0, 8) // Maximum 8 points on radar
  }, [skills, category])

  const size = 400
  const center = size / 2
  const maxRadius = center - 60
  const levels = 5

  // Calculate polygon points for skill proficiency
  const calculatePoint = (index: number, value: number): { x: number; y: number } => {
    const angle = (Math.PI * 2 * index) / filteredSkills.length - Math.PI / 2
    const radius = (value / 100) * maxRadius
    return {
      x: center + radius * Math.cos(angle),
      y: center + radius * Math.sin(angle),
    }
  }

  // Generate path for skill proficiency polygon
  const skillPath = useMemo(() => {
    if (filteredSkills.length === 0) return ""

    const points = filteredSkills.map((skill, index) => {
      const point = calculatePoint(index, skill.proficiency)
      return `${index === 0 ? "M" : "L"} ${point.x} ${point.y}`
    })

    return `${points.join(" ")} Z`
  }, [filteredSkills])

  // Generate grid levels
  const gridLevels = useMemo(() => {
    return Array.from({ length: levels }, (_, i) => {
      const levelValue = ((i + 1) * 100) / levels
      const points = filteredSkills.map((_, index) => {
        const point = calculatePoint(index, levelValue)
        return `${index === 0 ? "M" : "L"} ${point.x} ${point.y}`
      })
      return `${points.join(" ")} Z`
    })
  }, [filteredSkills, levels])

  if (filteredSkills.length === 0) {
    return (
      <div className="flex items-center justify-center h-96">
        <p className="text-foreground/60">No skills to display</p>
      </div>
    )
  }

  return (
    <div className="flex flex-col items-center">
      <svg
        width={size}
        height={size}
        viewBox={`0 0 ${size} ${size}`}
        className="max-w-full h-auto"
      >
        {/* Grid levels */}
        {gridLevels.map((path, index) => (
          <path
            key={index}
            d={path}
            fill="none"
            stroke="hsl(var(--border))"
            strokeWidth="1"
            opacity={0.3}
          />
        ))}

        {/* Axis lines */}
        {filteredSkills.map((_, index) => {
          const point = calculatePoint(index, 100)
          return (
            <line
              key={index}
              x1={center}
              y1={center}
              x2={point.x}
              y2={point.y}
              stroke="hsl(var(--border))"
              strokeWidth="1"
              opacity={0.3}
            />
          )
        })}

        {/* Skill proficiency polygon with gradient */}
        <defs>
          <linearGradient id="radarGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="hsl(var(--primary))" stopOpacity="0.6" />
            <stop offset="100%" stopColor="hsl(var(--accent))" stopOpacity="0.4" />
          </linearGradient>
        </defs>

        <motion.path
          d={skillPath}
          fill="url(#radarGradient)"
          stroke="hsl(var(--primary))"
          strokeWidth="2"
          initial={{ pathLength: 0, opacity: 0 }}
          whileInView={{ pathLength: 1, opacity: 1 }}
          viewport={{ once: true }}
          transition={{
            duration: 1.5,
            ease: "easeInOut",
          }}
        />

        {/* Skill points and labels */}
        {filteredSkills.map((skill, index) => {
          const point = calculatePoint(index, skill.proficiency)
          const labelPoint = calculatePoint(index, 110)
          const isHovered = hoveredSkill === skill.name

          return (
            <g key={skill.name}>
              {/* Point circle */}
              <motion.circle
                cx={point.x}
                cy={point.y}
                r={isHovered ? 6 : 4}
                fill="hsl(var(--primary))"
                stroke="hsl(var(--background))"
                strokeWidth="2"
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true }}
                transition={{
                  duration: 0.4,
                  delay: index * 0.1,
                }}
                onMouseEnter={() => setHoveredSkill(skill.name)}
                onMouseLeave={() => setHoveredSkill(null)}
                className="cursor-pointer"
              />

              {/* Skill label */}
              <text
                x={labelPoint.x}
                y={labelPoint.y}
                textAnchor="middle"
                dominantBaseline="middle"
                className="text-xs fill-foreground font-medium"
                onMouseEnter={() => setHoveredSkill(skill.name)}
                onMouseLeave={() => setHoveredSkill(null)}
              >
                {skill.name}
              </text>

              {/* Proficiency tooltip on hover */}
              {isHovered && (
                <text
                  x={point.x}
                  y={point.y - 15}
                  textAnchor="middle"
                  className="text-xs fill-primary font-semibold"
                >
                  {skill.proficiency}%
                </text>
              )}
            </g>
          )
        })}
      </svg>
    </div>
  )
}
