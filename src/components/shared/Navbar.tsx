import { MenuIcon } from "lucide-react";
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
  const [activeSection, setActiveSection] = useState<string>("");
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [pathname, setPathname] = useState("");
  const [theme, setTheme] = useState<"light" | "dark">("dark");

  useEffect(() => {
    // Set pathname from window location
    setPathname(window.location.pathname);

    // Handle scroll effect with inline throttle
    let timeoutId: ReturnType<typeof setTimeout> | null = null;
    let lastExecutedTime = 0;
    const wait = 100;

    const handleScroll = () => {
      const now = Date.now();
      const remaining = wait - (now - lastExecutedTime);

      if (remaining <= 0) {
        if (timeoutId) {
          clearTimeout(timeoutId);
          timeoutId = null;
        }
        lastExecutedTime = now;
        setScrolled(window.scrollY > 50);
      } else if (!timeoutId) {
        timeoutId = setTimeout(() => {
          lastExecutedTime = Date.now();
          timeoutId = null;
          setScrolled(window.scrollY > 50);
        }, remaining);
      }
    };

    // Handle View Transitions navigation (Astro ClientRouter)
    const handlePageLoad = () => {
      setPathname(window.location.pathname);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    document.addEventListener("astro:page-load", handlePageLoad);
    handleScroll(); // Initial check

    return () => {
      window.removeEventListener("scroll", handleScroll);
      document.removeEventListener("astro:page-load", handlePageLoad);
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
    };
  }, []);

  useEffect(() => {
    // Only run on homepage
    if (pathname !== "/") return;

    const sections = [
      "hero",
      "highlights",
      "projects",
      "experience",
      "skills",
      "contact",
    ];

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
            break;
          }
        }
      },
      {
        rootMargin: "-20% 0px -80% 0px",
        threshold: 0,
      },
    );

    const elements: Element[] = [];
    for (const id of sections) {
      const element = document.getElementById(id);
      if (element) {
        observer.observe(element);
        elements.push(element);
      }
    }

    return () => observer.disconnect();
  }, [pathname]);

  useEffect(() => {
    const isDark = document.documentElement.classList.contains("dark");
    setTheme(isDark ? "dark" : "light");

    const observer = new MutationObserver((mutations) => {
      for (const mutation of mutations) {
        if (mutation.attributeName === "class") {
          const isDark = document.documentElement.classList.contains("dark");
          setTheme(isDark ? "dark" : "light");
        }
      }
    });

    observer.observe(document.documentElement, { attributes: true });
    return () => observer.disconnect();
  }, []);

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
    // For homepage link - active when at hero/highlights or no section detected
    if (href === "/") {
      return (
        pathname === "/" &&
        (!activeSection ||
          activeSection === "hero" ||
          activeSection === "highlights")
      );
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
      <nav
        className={cn(
          "sticky top-0 z-50 w-full glass-surface transition-all duration-300",
          scrolled && "backdrop-blur-md bg-background/90 shadow-sm",
        )}
      >
        <div className="container mx-auto flex h-16 items-center justify-between px-4">
          <a href="/" className="flex items-center">
            <img
              src={
                theme === "dark"
                  ? "/transparent-text.png"
                  : "/transparent-text-dark.png"
              }
              alt="Divkix"
              className="h-8 w-auto"
            />
          </a>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-6">
            {navItems.map((item) => {
              const isActive = getIsActive(item.href);
              return (
                <a
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
                    <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary animate-navbar-indicator" />
                  )}
                </a>
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
                        <a
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
                        </a>
                      );
                    })}
                  </div>
                </nav>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </nav>
    </>
  );
}
