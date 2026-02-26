# Testing Patterns

**Analysis Date:** 2026-02-25

## Current State

**No automated tests present.** The codebase contains:
- Zero test files (no `*.test.ts`, `*.spec.ts`)
- No test runner configured (Jest, Vitest, Playwright not present)
- No test scripts in `package.json`
- No test coverage tooling

This is a **static site (Astro) with client-side React islands** — testing would focus on component behavior and build validation.

## Validation in Place

Instead of unit tests, the build pipeline includes validation checks:

**Build-time Validation:**
- `scripts/validate-content.ts` — validates blog post metadata sync
  - Runs as part of `bun run build` chain (step 3)
  - Ensures MDX files match `posts.json` generated metadata
  - Checks slug format: `/^[a-z0-9-]+$/`
  - Fails build if mismatch detected
  - Location: `src/content/blog/*.mdx` vs `content/blog/posts.json`

**Schema Validation:**
- `src/content/config.ts` — Zod schema validation for blog content
  - Enforces date format: `YYYY-MM-DD`
  - Validates dates parse correctly: `.refine((date) => !Number.isNaN(Date.parse(date)))`
  - Enforces required fields: title, date, excerpt, tags, published
  - Optional fields: dateModified, author, seoTitle, seoDescription, tldr, keyTakeaways, faq, howto

**Type Checking:**
- `bun run type-check` → `astro check` (TypeScript type validation)
- Runs separately from build; catches type errors pre-build
- Configuration: `tsconfig.json` with strictest settings

## Recommended Testing Structure

For adding tests to this codebase, follow this pattern:

### Test File Organization

**Location:**
- Co-locate with source files: `src/components/Button.tsx` → `src/components/__tests__/Button.test.tsx`
- Alternatively, mirror structure: `src/components/Button.tsx` → `tests/components/Button.test.tsx`

**Naming:**
- `Component.test.tsx` for React component tests
- `utils.test.ts` for utility function tests
- `schema.test.ts` for validation schema tests

**Directory Structure:**
```
src/
├── components/
│   ├── __tests__/
│   │   ├── Button.test.tsx
│   │   ├── Projects.test.tsx
│   │   └── Contact.test.tsx
├── lib/
│   ├── __tests__/
│   │   ├── utils.test.ts
│   │   └── schema.test.ts
└── content/
    └── __tests__/
        └── config.test.ts
```

### Testing Approach by File Type

**React Components (`.tsx`):**
- Use Vitest + React Testing Library (recommended for Astro)
- Test component render output
- Test event handlers and state changes
- Test accessibility attributes

**Example test structure:**
```typescript
import { describe, it, expect, beforeEach, afterEach } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { Contact } from "./Contact";

describe("Contact Component", () => {
  it("renders form fields", () => {
    render(<Contact />);
    expect(screen.getByLabelText("Name")).toBeInTheDocument();
    expect(screen.getByLabelText("Email")).toBeInTheDocument();
    expect(screen.getByLabelText("Message")).toBeInTheDocument();
  });

  it("validates email format", async () => {
    render(<Contact />);
    const submitButton = screen.getByRole("button", { name: /send/i });
    fireEvent.click(submitButton);
    await expect(screen.findByText(/invalid email/i)).resolves.toBeInTheDocument();
  });

  it("disables submit button while submitting", () => {
    render(<Contact />);
    // Test implementation
  });
});
```

**Utility Functions (`.ts`):**
- Use Vitest for pure function testing
- Test input/output pairs
- Test edge cases

**Example:**
```typescript
import { describe, it, expect } from "vitest";
import { cn, formatDate } from "./utils";

describe("cn utility", () => {
  it("merges class names", () => {
    expect(cn("px-2", "px-4")).toBe("px-4"); // Tailwind merge takes last
  });

  it("removes duplicates", () => {
    expect(cn("flex flex-col flex-row")).toBe("flex flex-row");
  });
});

describe("formatDate utility", () => {
  it("formats date to US locale", () => {
    expect(formatDate("2026-02-25")).toBe("February 25, 2026");
  });
});
```

**Schema Validation (`.ts`):**
- Test Zod schemas directly
- Test valid/invalid inputs
- Test custom refinements

**Example:**
```typescript
import { describe, it, expect } from "vitest";
import { collections } from "./config";

describe("Blog schema", () => {
  it("accepts valid date format", () => {
    const result = collections.blog.schema.safeParse({
      title: "Test",
      date: "2026-02-25",
      excerpt: "Test excerpt",
      tags: ["testing"],
      published: true,
    });
    expect(result.success).toBe(true);
  });

  it("rejects invalid date format", () => {
    const result = collections.blog.schema.safeParse({
      title: "Test",
      date: "02-25-2026",
      excerpt: "Test excerpt",
      tags: ["testing"],
      published: true,
    });
    expect(result.success).toBe(false);
  });

  it("rejects future dates", () => {
    // If a refinement was added for this
  });
});
```

**Custom Hooks:**
- Use `@testing-library/react-hooks` or Vitest
- Test return values and side effects

**Example:**
```typescript
import { describe, it, expect } from "vitest";
import { renderHook, waitFor } from "@testing-library/react";
import { useScrollReveal } from "./Projects";

describe("useScrollReveal hook", () => {
  it("returns ref and isVisible state", () => {
    const { result } = renderHook(() => useScrollReveal());
    expect(result.current.ref).toBeDefined();
    expect(result.current.isVisible).toBe(false);
  });

  it("sets isVisible when element intersects viewport", async () => {
    // Mock IntersectionObserver
    // Test implementation
  });
});
```

## Build Validation Patterns

**Keep and Enhance Existing Validation:**
- Maintain `validate-content.ts` for content integrity
- Add more checks to this file as content grows
- Pattern: Check, report issue with emoji, exit with error code

**Example Enhancement:**
```typescript
function validateContent(): void {
  console.log("🔍 Validating content sync...");

  // Existing checks...

  // New: Validate all posts have tags
  const postsWithoutTags = mdxSlugs.filter(slug => {
    const post = postsJson.posts.find(p => p.slug === slug);
    return !post || post.tags.length === 0;
  });

  if (postsWithoutTags.length > 0) {
    console.warn(`⚠️ Posts without tags: ${postsWithoutTags.join(", ")}`);
  }

  console.log("✅ Content validated: ${mdxFiles.length} posts in sync");
}
```

## Recommended Testing Stack

If adding automated tests to this project:

**Runner:**
- Framework: Vitest
- Config: `vitest.config.ts`
- Run commands:
  ```bash
  bun run test              # Run all tests
  bun run test:watch       # Watch mode
  bun run test:coverage    # Coverage report
  ```

**Component Testing:**
- Library: React Testing Library
- Query by: role, label, text (accessibility-first)
- Not: className selectors, data-testid as fallback

**Additional Tools:**
- Playwright for E2E tests (already in dependencies for browser automation)
- Mock setup: `vitest.mock()` for internal modules, `msw` for API mocks

**Config Example (vitest.config.ts):**
```typescript
import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";
import path from "path";

export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: "jsdom",
    setupFiles: [],
    coverage: {
      provider: "v8",
      reporter: ["text", "json", "html"],
      include: ["src/**/*.{ts,tsx}"],
      exclude: ["src/**/*.stories.tsx", "src/**/__tests__/**"],
    },
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});
```

## Test Coverage Guidelines

**Minimum Coverage Targets (if enforced):**
- Statements: 70%
- Branches: 65%
- Functions: 70%
- Lines: 70%

**High-Priority Areas (if starting with limited tests):**
1. `src/content/config.ts` — Zod schema validation (easy wins)
2. `src/lib/utils.ts` — Small, pure functions
3. `src/lib/schema.ts` — Schema generators with complex logic
4. `src/components/sections/Contact.tsx` — Form validation and error handling

**Low-Priority (inherently hard to test, lower ROI):**
- `src/components/shared/Navbar.tsx` — Complex DOM interactions, scroll listeners
- Astro static components (`.astro` files) — Rendered at build time, minimal logic

## Mocking Patterns

**External API Mocks:**
- Contact form uses Formspree (external service)
- Mock fetch for testing submission logic
- Pattern: Use `msw` (Mock Service Worker)

**Example MSW handler:**
```typescript
import { http, HttpResponse } from "msw";

export const handlers = [
  http.post("https://formspree.io/f/xgvreprq", async () => {
    // Return success or error based on test scenario
    return HttpResponse.json({ ok: true });
  }),
];
```

**DOM API Mocks:**
- IntersectionObserver (used in `useScrollReveal`, `Navbar.tsx`)
- window.matchMedia (used in `Contact.tsx` for motion preferences)
- window.scrollY, scrollIntoView

**Example IntersectionObserver mock:**
```typescript
global.IntersectionObserver = vi.fn().mockImplementation(() => ({
  observe: vi.fn(),
  unobserve: vi.fn(),
  disconnect: vi.fn(),
}));
```

## What NOT to Mock

- React functions (useState, useEffect, useRef, useCallback)
- Internal utility functions (should be tested separately or used as-is)
- Tailwind CSS output (let the browser handle styling)
- Third-party UI libraries (test integration, not implementation)

## Async Testing

**Pattern for async operations:**
```typescript
it("submits form and shows success message", async () => {
  const { user } = render(<Contact />);

  await user.type(screen.getByLabelText("Name"), "John Doe");
  await user.type(screen.getByLabelText("Email"), "john@example.com");
  await user.type(screen.getByLabelText("Message"), "Test message content here");

  await user.click(screen.getByRole("button", { name: /send/i }));

  await waitFor(() => {
    expect(screen.getByText(/message sent/i)).toBeInTheDocument();
  });
});
```

## Error Testing

**Pattern for error scenarios:**
```typescript
it("shows error toast on submission failure", async () => {
  // Mock failed response
  global.fetch = vi.fn().mockRejectedValueOnce(new Error("Network error"));

  const { user } = render(<Contact />);
  await user.click(screen.getByRole("button", { name: /send/i }));

  await waitFor(() => {
    expect(screen.getByText(/failed to send message/i)).toBeInTheDocument();
  });
});
```

---

*Testing analysis: 2026-02-25*
