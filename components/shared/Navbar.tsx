"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { MenuIcon } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { cn } from "@/lib/utils";
import { ThemeToggle } from "./ThemeToggle";

const navItems = [
  { label: "Home", href: "/" },
  { label: "Projects", href: "/#projects" },
  { label: "Experience", href: "/#experience" },
  { label: "Skills", href: "/#skills" },
  { label: "Contact", href: "/#contact" },
  { label: "Blog", href: "/blog" },
  { label: "About", href: "/about" },
];

export function Navbar() {
  const pathname = usePathname();
  const [activeSection, setActiveSection] = useState<string>("");
  const [isOpen, setIsOpen] = useState(false);

  const { scrollY } = useScroll();

  // Transform scroll position to blur and opacity values
  const blur = useTransform(scrollY, [0, 100], [0, 12]);
  const opacity = useTransform(scrollY, [0, 100], [0.6, 1]);
  const scale = useTransform(scrollY, [0, 100], [1, 0.98]);

  useEffect(() => {
    // Only run on homepage
    if (pathname !== "/") return;

    // Use IntersectionObserver to detect active section without forced reflows
    const sections = ["projects", "experience", "skills", "contact"];

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      {
        threshold: 0.3,
        rootMargin: "-20% 0px -60% 0px", // Trigger when section is 20% from top
      },
    );

    sections.forEach((section) => {
      const element = document.getElementById(section);
      if (element) {
        observer.observe(element);
      }
    });

    return () => observer.disconnect();
  }, [pathname]);

  const handleAnchorClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    href: string,
  ) => {
    // Close mobile menu when a link is clicked
    setIsOpen(false);

    if (href.startsWith("/#") && pathname === "/") {
      e.preventDefault();
      const id = href.replace("/#", "");
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  const getIsActive = (href: string) => {
    // For homepage link
    if (href === "/") {
      return pathname === "/" && !activeSection;
    }
    // For blog
    if (href === "/blog") {
      return pathname.startsWith("/blog");
    }
    // For about
    if (href === "/about") {
      return pathname === "/about";
    }
    // For anchor links, check if we're on homepage and if this section is active
    if (href.startsWith("/#")) {
      const section = href.replace("/#", "");
      return pathname === "/" && activeSection === section;
    }
    return false;
  };

  return (
    <>
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-primary focus:text-primary-foreground focus:rounded"
      >
        Skip to main content
      </a>
      <motion.nav
        className="sticky top-0 z-50 w-full glass-surface"
        style={{
          backdropFilter: blur.get() > 0 ? `blur(${blur.get()}px)` : undefined,
          backgroundColor: `oklch(var(--background) / ${opacity.get()})`,
          scale,
        }}
      >
        <div className="container mx-auto flex h-16 items-center justify-between px-4">
          <Link href="/" className="text-xl font-display font-bold">
            Divkix
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-6">
            {navItems.map((item) => {
              const isActive = getIsActive(item.href);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={(e) => handleAnchorClick(e, item.href)}
                  className={cn(
                    "relative px-3 py-2 text-sm font-medium transition-colors",
                    isActive
                      ? "text-foreground"
                      : "text-foreground/60 hover:text-foreground",
                  )}
                  aria-label={`Navigate to ${item.label}`}
                >
                  {item.label}
                  {isActive && (
                    <motion.div
                      layoutId="navbar-indicator"
                      className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary"
                      transition={{
                        type: "spring",
                        stiffness: 380,
                        damping: 30,
                      }}
                    />
                  )}
                </Link>
              );
            })}
            <ThemeToggle />
          </div>

          {/* Mobile Navigation */}
          <div className="flex md:hidden items-center gap-4">
            <ThemeToggle />
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" aria-label="Open menu">
                  <MenuIcon className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[300px] sm:w-[400px]">
                <SheetHeader>
                  <SheetTitle className="text-left">Navigation</SheetTitle>
                </SheetHeader>
                <nav aria-label="Mobile navigation menu">
                  <div className="flex flex-col gap-4 mt-8">
                    {navItems.map((item) => {
                      const isActive = getIsActive(item.href);
                      return (
                        <Link
                          key={item.href}
                          href={item.href}
                          onClick={(e) => handleAnchorClick(e, item.href)}
                          className={cn(
                            "px-4 py-3 text-lg font-medium transition-colors rounded-lg",
                            isActive
                              ? "text-foreground bg-primary/10"
                              : "text-foreground/60 hover:text-foreground hover:bg-primary/5",
                          )}
                          aria-label={`Navigate to ${item.label} (mobile menu)`}
                        >
                          {item.label}
                        </Link>
                      );
                    })}
                  </div>
                </nav>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </motion.nav>
    </>
  );
}
