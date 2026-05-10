import { MenuIcon, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
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
  { label: "Resume", href: "/resume/" },
];

function isNavItemActive(
  href: string,
  pathname: string,
  activeSection: string,
): boolean {
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
  if (href.startsWith("/resume")) {
    return pathname.startsWith("/resume");
  }
  if (href.startsWith("/#")) {
    const section = href.replace("/#", "");
    return pathname === "/" && activeSection === section;
  }
  return false;
}

export function Navbar() {
  const [activeSection, setActiveSection] = useState<string>("");
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [pathname, setPathname] = useState(() =>
    typeof window !== "undefined" ? window.location.pathname : "",
  );
  const [navIndicator, setNavIndicator] = useState<{
    left: number;
    width: number;
    visible: boolean;
  }>({ left: 0, width: 0, visible: false });

  const hamburgerRef = useRef<HTMLButtonElement>(null);
  const desktopNavRef = useRef<HTMLDivElement>(null);
  const navLinkRefs = useRef<Map<string, HTMLAnchorElement>>(new Map());

  // Page load / navigation updates
  useEffect(() => {
    const handlePageLoad = () => {
      setPathname(window.location.pathname);
    };
    document.addEventListener("astro:page-load", handlePageLoad);
    return () =>
      document.removeEventListener("astro:page-load", handlePageLoad);
  }, []);

  // Scroll-based navbar styling
  useEffect(() => {
    let timeoutId: ReturnType<typeof setTimeout> | null = null;
    let lastExecutedTime = 0;
    const wait = 100;

    const handleScroll = () => {
      const now = Date.now();
      const remaining = wait - (now - lastExecutedTime);
      const nextScrolled = window.scrollY > 50;

      if (remaining <= 0) {
        if (timeoutId) {
          clearTimeout(timeoutId);
          timeoutId = null;
        }
        lastExecutedTime = now;
        setScrolled(nextScrolled);
      } else if (!timeoutId) {
        timeoutId = setTimeout(() => {
          lastExecutedTime = Date.now();
          timeoutId = null;
          setScrolled(window.scrollY > 50);
        }, remaining);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
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

    for (const id of sections) {
      const element = document.getElementById(id);
      if (element) observer.observe(element);
    }

    return () => observer.disconnect();
  }, [pathname]);

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

  const getIsActive = (href: string) =>
    isNavItemActive(href, pathname, activeSection);

  // Sliding underline indicator for active desktop nav item
  useEffect(() => {
    const container = desktopNavRef.current;
    if (!container) return;

    const update = () => {
      const activeItem = navItems.find((item) =>
        isNavItemActive(item.href, pathname, activeSection),
      );
      const el = activeItem ? navLinkRefs.current.get(activeItem.href) : null;

      if (!activeItem || !el) {
        setNavIndicator({ left: 0, width: 0, visible: false });
        return;
      }

      const cr = container.getBoundingClientRect();
      const er = el.getBoundingClientRect();
      setNavIndicator({
        left: er.left - cr.left,
        width: er.width,
        visible: true,
      });
    };

    update();
    window.addEventListener("resize", update);
    document.addEventListener("astro:page-load", update);
    return () => {
      window.removeEventListener("resize", update);
      document.removeEventListener("astro:page-load", update);
    };
  }, [pathname, activeSection]);

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
            className="font-mono text-base tracking-tight text-foreground transition-opacity hover:opacity-80"
            aria-label="divkix home"
          >
            divkix<span className="text-primary">_</span>
          </a>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-4">
            <div
              ref={desktopNavRef}
              className="relative flex items-center gap-1"
            >
              <span
                aria-hidden
                className="pointer-events-none absolute bottom-0 left-0 h-0.5 rounded-full bg-primary transition-all duration-300 ease-out"
                style={{
                  width: navIndicator.visible ? navIndicator.width : 0,
                  transform: `translateX(${navIndicator.left}px)`,
                  opacity: navIndicator.visible ? 1 : 0,
                }}
              />
              {navItems.map((item) => {
                const isActive = getIsActive(item.href);
                return (
                  <a
                    key={item.href}
                    ref={(el) => {
                      if (el) navLinkRefs.current.set(item.href, el);
                      else navLinkRefs.current.delete(item.href);
                    }}
                    href={item.href}
                    onClick={(e) => handleAnchorClick(e, item.href)}
                    className={cn(
                      "relative z-10 px-3 py-2 text-sm font-mono transition-colors",
                      isActive
                        ? "text-foreground"
                        : "text-muted-foreground hover:text-foreground",
                    )}
                    aria-label={`Navigate to ${item.label}`}
                    aria-current={isActive ? "page" : undefined}
                  >
                    {item.label}
                  </a>
                );
              })}
            </div>
            <ThemeToggle />
          </div>

          {/* Mobile Navigation */}
          <div className="flex md:hidden items-center gap-4">
            <ThemeToggle />
            <button
              ref={hamburgerRef}
              type="button"
              onClick={() => setIsOpen(true)}
              className="p-2 text-foreground hover:text-primary transition-colors"
              aria-label="Open menu"
              aria-expanded={isOpen}
              aria-controls="mobile-nav-dialog"
            >
              <MenuIcon className="size-5" />
            </button>
          </div>
        </div>
      </nav>

      <MobileNavDialog
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        getIsActive={getIsActive}
        onAnchorClick={handleAnchorClick}
        onClosed={() => hamburgerRef.current?.focus()}
      />
    </>
  );
}

interface MobileNavDialogProps {
  isOpen: boolean;
  onClose: () => void;
  getIsActive: (href: string) => boolean;
  onAnchorClick: (e: React.MouseEvent<HTMLAnchorElement>, href: string) => void;
  onClosed: () => void;
}

function MobileNavDialog({
  isOpen,
  onClose,
  getIsActive,
  onAnchorClick,
  onClosed,
}: MobileNavDialogProps) {
  const [menuVisible, setMenuVisible] = useState(false);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const dialogRef = useRef<HTMLDivElement>(null);
  const prevIsOpen = useRef(false);

  // Keep latest callbacks in refs so keyboard listeners don't re-subscribe
  const onCloseRef = useRef(onClose);
  const onClosedRef = useRef(onClosed);
  useEffect(() => {
    onCloseRef.current = onClose;
    onClosedRef.current = onClosed;
  }, [onClose, onClosed]);

  useEffect(() => {
    let raf: number | undefined;
    if (isOpen) {
      raf = requestAnimationFrame(() => setMenuVisible(true));
    } else {
      setMenuVisible(false);
    }
    return () => {
      if (raf !== undefined) cancelAnimationFrame(raf);
    };
  }, [isOpen]);

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

  useEffect(() => {
    if (!isOpen) return;
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") onCloseRef.current();
    };
    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [isOpen]);

  // Focus trap for accessibility: keep focus within open mobile menu
  useEffect(() => {
    if (!isOpen) return;

    requestAnimationFrame(() => {
      closeButtonRef.current?.focus();
    });

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key !== "Tab") return;

      const dialog = dialogRef.current;
      if (!dialog) return;

      const focusable = dialog.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])',
      );
      if (focusable.length === 0) return;

      const first = focusable[0] as HTMLElement | undefined;
      const last = focusable[focusable.length - 1] as HTMLElement | undefined;
      if (!first || !last) return;

      if (e.shiftKey) {
        if (document.activeElement === first) {
          e.preventDefault();
          last.focus();
        }
      } else {
        if (document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isOpen]);

  // Restore focus to hamburger when menu closes
  useEffect(() => {
    if (prevIsOpen.current && !isOpen) {
      onClosedRef.current();
    }
    prevIsOpen.current = isOpen;
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div
      ref={dialogRef}
      id="mobile-nav-dialog"
      className="fixed inset-0 z-[100] flex flex-col bg-background"
      role="dialog"
      aria-modal="true"
      aria-label="Navigation menu"
    >
      <div className="flex h-16 items-center justify-between border-b border-border px-4">
        <span className="font-mono text-lg tracking-tight text-foreground">
          divkix<span className="text-primary">_</span>
        </span>
        <button
          ref={closeButtonRef}
          type="button"
          onClick={onClose}
          className="p-2 text-foreground transition-colors hover:text-primary"
          aria-label="Close menu"
        >
          <X className="size-6" />
        </button>
      </div>
      <nav
        className="flex flex-1 flex-col items-start justify-center gap-6 px-8"
        aria-label="Mobile navigation menu"
      >
        {navItems.map((item, i) => {
          const isActive = getIsActive(item.href);
          return (
            <a
              key={item.href}
              href={item.href}
              onClick={(e) => onAnchorClick(e, item.href)}
              className={cn(
                "font-mono text-3xl font-medium",
                isActive
                  ? "text-primary"
                  : "text-muted-foreground hover:text-foreground",
              )}
              style={{
                opacity: menuVisible ? 1 : 0,
                transform: menuVisible ? "translateX(0)" : "translateX(30px)",
                transition: `opacity 0.4s ease-out ${i * 50}ms, transform 0.4s ease-out ${i * 50}ms`,
              }}
              aria-label={`Navigate to ${item.label}`}
              aria-current={isActive ? "page" : undefined}
            >
              {item.label}
            </a>
          );
        })}
      </nav>
    </div>
  );
}
