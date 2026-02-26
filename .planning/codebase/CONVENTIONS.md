# Coding Conventions

**Analysis Date:** 2026-02-25

## Naming Patterns

**Files:**
- React components: PascalCase (e.g., `Projects.tsx`, `Contact.tsx`, `Navbar.tsx`)
- Utility/library files: camelCase (e.g., `utils.ts`, `schema.ts`, `seo.ts`)
- Config files: camelCase with dash prefix for overrides (e.g., `site.config.ts`, `astro.config.mjs`)
- Astro templates: PascalCase (e.g., `BaseLayout.astro`, `BlogLayout.astro`)
- Test validation scripts: camelCase dash-separated (e.g., `validate-content.ts`, `generate-posts-metadata.js`)

**Functions:**
- Exported functions: camelCase or PascalCase for React components
- Internal helper functions: camelCase (e.g., `getTagColor()`, `isFeatured()`, `formatDate()`)
- Custom hooks: PascalCase with `use` prefix (e.g., `useScrollReveal()`)

**Variables:**
- State variables: camelCase (e.g., `isSubmitting`, `selectedTag`, `activeSection`)
- Constants: camelCase for regular constants, UPPER_SNAKE_CASE for non-exported module constants (e.g., `navItems`, `CONTENT_DIR`)
- Types/interfaces: PascalCase (e.g., `Project`, `ContactFormData`, `ProjectLink`, `StatProps`)
- React refs: camelCase with `Ref` suffix (e.g., `ref`, `filterRefs`, `containerRef`, `hamburgerRef`)

**Types:**
- Interfaces: PascalCase (e.g., `PostMetadata`, `PostsJson`, `StatProps`)
- Type aliases: PascalCase (e.g., `ContactFormData`)
- Generic types: Single letter or descriptive PascalCase (e.g., `T`, `Project`)

## Code Style

**Formatting:**
- Formatter: Biome 2.4.3 (configured in `biome.json`)
- Indent style: spaces (2 spaces)
- Line width: 80 characters
- Line ending: LF
- Quote style: double quotes (jsx and js)
- Trailing commas: all (includes function parameters and arrays)
- Semicolons: always
- Arrow parentheses: always (wrap single params in parens)
- Bracket spacing: true (spaces inside object literals)

**Linting:**
- Linter: Biome 2.4.3
- Rules: recommended preset enabled with specific overrides
- `.astro` files are explicitly excluded from linting
- Accessibility rules set to warn (not error): `noSvgWithoutTitle`, `noAriaUnsupportedElements`, `useAltText`
- Security rule: `noDangerouslySetInnerHtml` disabled (used for terminal styling in Contact component)
- Suspicious rules: `noArrayIndexKey` warns, `useIterableCallbackReturn` disabled
- Style rule: `useBlockStatements` disabled (allows single-line statements)
- Complexity rule: `noImportantStyles` disabled (Tailwind uses !important)

**HTML formatting:**
- `indentScriptAndStyle`: false (don't indent script/style contents)
- `selfCloseVoidElements`: always (e.g., `<br />` not `<br>`)

## Import Organization

**Order:**
1. External library imports (React, node modules): `import { X } from "library"`
2. Type-only imports: `import type { X } from "..."`
3. Internal absolute imports: `import { X } from "@/..."`
4. Internal relative imports: `import { X } from "./..."`

**Example from codebase (Contact.tsx):**
```typescript
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import * as z from "zod";
import { SectionLabel } from "@/components/shared/SectionLabel";
import { TerminalWindow } from "@/components/shared/TerminalWindow";
import { siteConfig } from "@/data/site.config";
```

**Path Aliases:**
- `@/*` → `./src/*` (configured in `tsconfig.json`)
- Use `@/` for all internal imports; avoid relative paths in component files
- Organize imports: Biome's `organizeImports` action is enabled for automatic organization

## Error Handling

**Pattern: Try-Catch with Type Narrowing**
- Use `error instanceof Error ? error.message : error` pattern for unknown error types
- Example from `validate-content.ts`:
```typescript
catch (error) {
  console.error(
    `❌ Failed to read content directory: ${error instanceof Error ? error.message : error}`,
  );
  process.exit(1);
}
```

**Pattern: Early Exit Pattern**
- Use early returns and `process.exit()` in build scripts for validation failures
- Always provide user-friendly error messages with emoji indicators

**Pattern: Error Toast Notifications (UI)**
- Use `sonner` toast library for user-facing errors
- Provide description with context-specific error info
- Example from `Contact.tsx`:
```typescript
catch (error) {
  toast.error("Failed to send message", {
    description:
      error instanceof Error
        ? error.message
        : "An error occurred. Please try again.",
  });
}
```

**Pattern: Zod Validation**
- Use Zod for runtime schema validation
- Chain validators: `.min()`, `.email()`, `.regex()`, `.refine()`
- Example from `content/config.ts`:
```typescript
date: z
  .string()
  .regex(/^\d{4}-\d{2}-\d{2}$/, "Date must be in YYYY-MM-DD format")
  .refine(
    (date) => !Number.isNaN(Date.parse(date)),
    "Date must be a valid date",
  )
```

## Logging

**Framework:** console (no external logging library)

**Patterns:**
- Build scripts use emoji prefixes for visual categorization:
  - `🔍` for information/checks
  - `❌` for errors
  - `⚠️` for warnings
  - `✅` for success
- Example from `validate-content.ts`:
```typescript
console.log("🔍 Validating content sync...");
console.error("❌ Content directory not found: ${CONTENT_DIR}");
console.warn("⚠️ Non-URL-safe slugs: ${invalidSlugs.join(", ")}");
console.log("✅ Content validated: ${mdxFiles.length} posts in sync");
```

**When to Log:**
- Build validation steps: all major checks logged
- Form submission: success/error states logged via toast notifications
- Browser console: minimal; most issues communicated via UI

## Comments

**When to Comment:**
- Document purpose of complex functions (use JSDoc)
- Explain non-obvious business logic or algorithmic decisions
- Mark sections in components (e.g., `{/* Mobile Navigation */}`)
- Minimal in small utility functions (code should be self-documenting)

**JSDoc/TSDoc:**
- Used for exported schema generation functions in `lib/schema.ts`
- Format: block comment with `/**` opener
- Example from `schema.ts`:
```typescript
/**
 * Generate Person schema for E-E-A-T signals
 */
export function generatePersonSchema() { ... }
```

## Function Design

**Size:** Keep functions small and focused
- Components: typically 50-200 lines including JSX
- Utilities: < 50 lines (e.g., `cn()` is 5 lines, `formatDate()` is 8 lines)
- Custom hooks: extracted when logic exceeds 40 lines (e.g., `useScrollReveal()`)

**Parameters:**
- Destructure props immediately in function signature
- Use object parameters for >2 related arguments
- Example from `Projects.tsx`:
```typescript
function FeaturedProjectCard({
  project,
  index,
}: {
  project: Project;
  index: number;
})
```

**Return Values:**
- Always explicit return types on exported functions
- Implicit return allowed for short arrow functions (< 2 lines)
- Examples:
```typescript
export function cn(...inputs: ClassValue[]) {  // Explicit return type implied
  return twMerge(clsx(inputs));
}

function getTagColor(tag: string): string {  // Explicit type annotation
  const t = tag.toLowerCase();
  if (t === "typescript" || t === "next.js") return "oklch(0.65 0.2 250)";
  return "oklch(0.6 0 0)";
}
```

## Module Design

**Exports:**
- Named exports preferred over default exports
- One exported component/function per file (except UI component library)
- Re-export sub-components only when necessary

**Barrel Files:**
- Used in `src/components/sections/skills/index.ts` to aggregate skills-related components
- Pattern:
```typescript
export { SkillsTerminal } from "./SkillsTerminal";
export { Skills } from "./Skills";
```

**File Organization:**
- Component files export one React component
- Utility files export one or more pure functions
- Type/schema files export types and schema generators

## TypeScript Strictness

**Configuration (`tsconfig.json`):**
- Base: `extends: "astro/tsconfigs/strict"`
- `noUnusedLocals: true` — unused variables cause errors
- `noUnusedParameters: true` — unused function parameters cause errors
- `noUncheckedIndexedAccess: true` — bracket access returns `T | undefined`
- `exactOptionalPropertyTypes: true` — can't assign `undefined` to optional properties; use omission instead
- `noImplicitReturns: true` — all code paths must return a value
- `strict: true` — enables all strict type-checking options

**Impact on Code:**
- Cannot write: `const x: { prop?: string } = { prop: undefined };` — must omit property instead
- Must handle `undefined` in array/object bracket access: `array[i]?.property`
- All function branches must return values explicitly

## Conventions in Practice

**Example 1: React Component with Strict TypeScript**
```typescript
import { useCallback, useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

interface ProjectProps {
  project: Project;
  index: number;
}

function FeaturedProjectCard({ project, index }: ProjectProps) {
  const { ref, isVisible } = useScrollReveal();
  const accentColor = getAccentColor(project.tags);
  const liveLink = project.links.find((l: ProjectLink) => l.label === "Live");

  return (
    <div
      ref={ref}
      className={cn(
        "grid grid-cols-1 md:grid-cols-2 rounded-xl",
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8",
      )}
      style={{ transitionDelay: `${index * 150}ms` }}
    >
      {/* Content */}
    </div>
  );
}
```

**Example 2: Custom Hook**
```typescript
function useScrollReveal() {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (entry?.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(el);
        }
      },
      { threshold: 0.1 },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return { ref, isVisible };
}
```

**Example 3: Biome-Formatted Code**
- Always 2-space indentation
- Trailing commas on all multi-line arrays/objects
- Double quotes throughout
- Semicolons at line end

---

*Convention analysis: 2026-02-25*
