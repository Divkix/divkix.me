import { MenuIcon, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { ErrorBoundary } from "@/components/shared/ErrorBoundary";
import { siteConfig } from "@/data/site.config";
import { cn } from "@/lib/utils";
import { ThemeToggle } from "./ThemeToggle";

const primaryNavItems = [
  { label: "Work", href: "/#projects" },
  { label: "Writing", href: "/blog" },
  { label: "About", href: "/about" },
  { label: "Resume", href: "/resume" },
  { label: "Contact", href: "/#contact" },
];

const allNavItems = [...primaryNavItems];

const mastLine = `${siteConfig.handle} · Portfolio · ${new Date().getFullYear()}`;

function isNavItemActive(
  href: string,
  pathname: string,
  activeSection: string,
): boolean {
  if (href === "/about") {
    return pathname === "/about";
  }
  if (href === "/blog") {
    return pathname.startsWith("/blog");
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

function Navbar() {
  const [activeSection, setActiveSection] = useState<string>("");
  const [isOpen, setIsOpen] = useState(false);
  const [pathname, setPathname] = useState(() =>
    typeof window !== "undefined" ? window.location.pathname : "",
  );

  const hamburgerRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const handlePageLoad = () => {
      setPathname(window.location.pathname);
    };
    document.addEventListener("astro:page-load", handlePageLoad);
    return () =>
      document.removeEventListener("astro:page-load", handlePageLoad);
  }, []);

  useEffect(() => {
    if (pathname !== "/") return;

    const sections = ["hero", "highlights", "writing", "projects", "contact"];

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

  return (
    <>
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-primary focus:text-primary-foreground"
      >
        Skip to main content
      </a>
      <header className="sticky top-0 z-50 w-full bg-background/95 backdrop-blur-sm border-b border-transparent">
        <div className="content-rail pt-(--space-md) pb-0">
          <p className="mast-line mb-(--space-2xs)">{mastLine}</p>
          <a
            href="/"
            className="font-display text-[clamp(1.75rem,4vw,2.75rem)] leading-[0.95] tracking-(--tracking-display) text-foreground transition-opacity hover:opacity-80 block min-w-0"
            aria-label={`${siteConfig.name} home`}
          >
            {siteConfig.name}
          </a>

          <nav
            className="hidden md:block mt-(--space-sm)"
            aria-label="Main navigation"
          >
            <ul className="flex flex-wrap items-center gap-x-(--space-lg) gap-y-2 list-none m-0 p-0">
              {primaryNavItems.map((item) => {
                const isActive = getIsActive(item.href);
                return (
                  <li key={item.href}>
                    <a
                      href={item.href}
                      onClick={(e) => handleAnchorClick(e, item.href)}
                      className={cn(
                        "text-sm link-underline-grow whitespace-nowrap transition-colors uppercase tracking-[0.06em]",
                        isActive
                          ? "text-foreground"
                          : "text-muted-foreground hover:text-foreground",
                      )}
                      aria-current={isActive ? "page" : undefined}
                    >
                      {item.label}
                    </a>
                  </li>
                );
              })}
              <li>
                <ThemeToggle />
              </li>
            </ul>
          </nav>

          <div className="flex md:hidden items-center gap-3 mt-(--space-sm) pb-(--space-xs)">
            <ThemeToggle />
            <button
              ref={hamburgerRef}
              type="button"
              onClick={() => setIsOpen(true)}
              className="p-2 text-foreground hover:text-primary transition-colors uppercase text-xs tracking-[0.08em]"
              aria-label="Open menu"
              aria-expanded={isOpen}
              aria-controls="mobile-nav-dialog"
            >
              <MenuIcon className="size-5" />
            </button>
          </div>

          <hr className="double-rule mt-(--space-sm) mb-0" />
        </div>
      </header>

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

export function NavbarWithBoundary() {
  return (
    <ErrorBoundary>
      <Navbar />
    </ErrorBoundary>
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
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const dialogRef = useRef<HTMLDivElement>(null);
  const prevIsOpen = useRef(false);

  const onCloseRef = useRef(onClose);
  const onClosedRef = useRef(onClosed);
  useEffect(() => {
    onCloseRef.current = onClose;
    onClosedRef.current = onClosed;
  }, [onClose, onClosed]);

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
      className="fixed inset-0 z-100 flex flex-col bg-background"
      role="dialog"
      aria-modal="true"
      aria-label="Navigation menu"
    >
      <div className="flex h-14 items-center justify-between border-b border-border px-(--page-gutter) gap-2">
        <span className="font-display text-base text-foreground truncate min-w-0">
          {siteConfig.name}
        </span>
        <button
          ref={closeButtonRef}
          type="button"
          onClick={onClose}
          className="p-2 text-foreground transition-colors hover:text-primary shrink-0"
          aria-label="Close menu"
        >
          <X className="size-6" />
        </button>
      </div>
      <nav
        className="flex flex-1 flex-col items-center justify-center gap-5 px-8"
        aria-label="Mobile navigation menu"
      >
        {allNavItems.map((item) => {
          const isActive = getIsActive(item.href);
          return (
            <a
              key={item.href}
              href={item.href}
              onClick={(e) => onAnchorClick(e, item.href)}
              className={cn(
                "font-display text-2xl whitespace-nowrap uppercase tracking-[0.04em]",
                isActive
                  ? "text-primary"
                  : "text-muted-foreground hover:text-foreground",
              )}
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
