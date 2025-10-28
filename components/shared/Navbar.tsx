"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { motion } from "framer-motion"
import { ThemeToggle } from "./ThemeToggle"
import { cn } from "@/lib/utils"
import { useEffect, useState } from "react"

const navItems = [
  { label: "Home", href: "/" },
  { label: "Projects", href: "/#projects" },
  { label: "Contact", href: "/#contact" },
  { label: "Blog", href: "/blog" },
]

export function Navbar() {
  const pathname = usePathname()
  const [activeSection, setActiveSection] = useState<string>("")

  useEffect(() => {
    // Only run on homepage
    if (pathname !== "/") return

    const handleScroll = () => {
      const sections = ["projects", "contact"]
      const scrollPosition = window.scrollY + 100 // Offset for navbar height

      // Check if at the top
      if (scrollPosition < 300) {
        setActiveSection("")
        return
      }

      // Find which section is currently in view
      for (const section of sections) {
        const element = document.getElementById(section)
        if (element) {
          const { offsetTop, offsetHeight } = element
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section)
            return
          }
        }
      }
    }

    handleScroll() // Check initial position
    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [pathname])

  const handleAnchorClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (href.startsWith("/#") && pathname === "/") {
      e.preventDefault()
      const id = href.replace("/#", "")
      const element = document.getElementById(id)
      if (element) {
        element.scrollIntoView({ behavior: "smooth" })
      }
    }
  }

  const getIsActive = (href: string) => {
    // For homepage link
    if (href === "/") {
      return pathname === "/" && !activeSection
    }
    // For blog
    if (href === "/blog") {
      return pathname.startsWith("/blog")
    }
    // For anchor links, check if we're on homepage and if this section is active
    if (href.startsWith("/#")) {
      const section = href.replace("/#", "")
      return pathname === "/" && activeSection === section
    }
    return false
  }

  return (
    <>
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-primary focus:text-primary-foreground focus:rounded"
      >
        Skip to main content
      </a>
      <nav className="sticky top-0 z-50 w-full glass-surface">
        <div className="container mx-auto flex h-16 items-center justify-between px-4">
          <Link href="/" className="text-xl font-display font-bold">
            Divkix
          </Link>

          <div className="flex items-center gap-6">
            {navItems.map((item) => {
              const isActive = getIsActive(item.href)
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={(e) => handleAnchorClick(e, item.href)}
                  className={cn(
                    "relative px-3 py-2 text-sm font-medium transition-colors",
                    isActive
                      ? "text-foreground"
                      : "text-foreground/60 hover:text-foreground"
                  )}
                >
                  {item.label}
                  {isActive && (
                    <motion.div
                      layoutId="navbar-indicator"
                      className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary"
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}
                </Link>
              )
            })}
            <ThemeToggle />
          </div>
        </div>
      </nav>
    </>
  )
}
