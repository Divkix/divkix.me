import { MenuIcon, X } from "lucide-react";
import { useEffect, useState } from "react";
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
  const [menuVisible, setMenuVisible] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [pathname, setPathname] = useState("");

  useEffect(() => {
    setPathname(window.location.pathname);

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

    const handlePageLoad = () => {
      setPathname(window.location.pathname);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    document.addEventListener("astro:page-load", handlePageLoad);
    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
      document.removeEventListener("astro:page-load", handlePageLoad);
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
    };
  }, []);

  useEffect(() => {
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

  // Staggered entrance animation for mobile menu
  useEffect(() => {
    if (isOpen) {
      requestAnimationFrame(() => setMenuVisible(true));
    } else {
      setMenuVisible(false);
    }
  }, [isOpen]);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  // Close mobile menu on Escape key
  useEffect(() => {
    if (!isOpen) return;
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsOpen(false);
    };
    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [isOpen]);

  const handleAnchorClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    href: string,
  ) => {
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
    if (href === "/") {
      return (
        pathname === "/" &&
        (!activeSection ||
          activeSection === "hero" ||
          activeSection === "highlights")
      );
    }
    if (href === "/blog") {
      return pathname.startsWith("/blog");
    }
    if (href === "/about") {
      return pathname === "/about";
    }
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
        className="sticky top-0 z-50 w-full bg-background transition-all duration-300"
        style={
          scrolled
            ? {
                borderBottom: "1px solid transparent",
                borderImage:
                  "linear-gradient(to right, var(--primary), var(--accent)) 1",
              }
            : undefined
        }
      >
        <div className="container mx-auto flex h-16 items-center justify-between px-4">
          <a
            href="/"
            className="font-mono font-bold text-lg text-foreground hover:text-primary transition-colors"
          >
            divkix_
          </a>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-1">
            {navItems.map((item) => {
              const isActive = getIsActive(item.href);
              return (
                <a
                  key={item.href}
                  href={item.href}
                  onClick={(e) => handleAnchorClick(e, item.href)}
                  className={cn(
                    "relative px-3 py-2 text-sm font-mono transition-colors",
                    isActive
                      ? "text-foreground"
                      : "text-muted-foreground hover:text-foreground",
                  )}
                  aria-label={`Navigate to ${item.label}`}
                >
                  {item.label}
                  <span
                    className={cn(
                      "absolute bottom-0 left-0 right-0 h-0.5 bg-primary transition-all duration-300 ease-out origin-left",
                      isActive
                        ? "scale-x-100 opacity-100"
                        : "scale-x-0 opacity-0",
                    )}
                  />
                </a>
              );
            })}
            <ThemeToggle />
          </div>

          {/* Mobile Navigation */}
          <div className="flex md:hidden items-center gap-4">
            <ThemeToggle />
            <button
              type="button"
              onClick={() => setIsOpen(true)}
              className="p-2 text-foreground hover:text-primary transition-colors"
              aria-label="Open menu"
            >
              <MenuIcon className="h-5 w-5" />
            </button>
          </div>
        </div>
      </nav>

      {/* Full-screen mobile overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 z-[100] bg-[oklch(0.08_0_0)] flex flex-col"
          role="dialog"
          aria-modal="true"
          aria-label="Navigation menu"
        >
          <div className="flex items-center justify-between px-4 h-16">
            <span className="font-mono font-bold text-lg text-[oklch(0.93_0.015_85)]">
              divkix_
            </span>
            <button
              type="button"
              onClick={() => setIsOpen(false)}
              className="p-2 text-[oklch(0.93_0.015_85)] hover:text-primary transition-colors"
              aria-label="Close menu"
            >
              <X className="h-6 w-6" />
            </button>
          </div>
          <nav
            className="flex flex-col items-start justify-center flex-1 px-8 gap-6"
            aria-label="Mobile navigation menu"
          >
            {navItems.map((item, i) => {
              const isActive = getIsActive(item.href);
              return (
                <a
                  key={item.href}
                  href={item.href}
                  onClick={(e) => handleAnchorClick(e, item.href)}
                  className={cn(
                    "text-3xl font-mono font-medium",
                    isActive
                      ? "text-primary"
                      : "text-[oklch(0.65_0.01_60)] hover:text-[oklch(0.93_0.015_85)]",
                  )}
                  style={{
                    opacity: menuVisible ? 1 : 0,
                    transform: menuVisible
                      ? "translateX(0)"
                      : "translateX(30px)",
                    transition: `opacity 0.4s ease-out ${i * 50}ms, transform 0.4s ease-out ${i * 50}ms`,
                  }}
                  aria-label={`Navigate to ${item.label}`}
                >
                  {item.label}
                </a>
              );
            })}
          </nav>
        </div>
      )}
    </>
  );
}
