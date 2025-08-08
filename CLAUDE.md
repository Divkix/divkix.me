# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this
repository.

## Project Overview

Personal portfolio website for Divanshu Chauhan (Divkix) built with SvelteKit 2.22, Svelte 5,
TypeScript, and Tailwind CSS 4.0. Deployed on Cloudflare Workers/Pages.

## Development Commands

```bash
# Development
bun run dev          # Start dev server (http://localhost:5173)
bun run dev --open   # Start dev server and open browser

# Build & Preview
bun run build        # Create production build
bun run preview      # Preview production build locally

# Code Quality
bun run check        # TypeScript type checking
bun run check:watch  # Type checking in watch mode  
bun run lint         # Run Prettier check + ESLint
bun run format       # Format code with Prettier

# Deployment
bun run deploy       # Deploy to Cloudflare
bun run cf:dev       # Run Cloudflare dev server
```

## Architecture & Key Patterns

### Component Architecture

- **UI Components**: Located in `src/lib/components/ui/` - shadcn-svelte components with TypeScript
- **Component Exports**: All UI components are re-exported through `src/lib/components/ui/index.ts`
- **Svelte 5 Syntax**: Use `$props()` for props, snippets for slots, and runes for reactivity

### Routing & Pages

- **Single Page**: Main content is in `src/routes/+page.svelte`
- **Layout**: Theme provider and navigation in `src/routes/+layout.svelte`
- **Static Generation**: Using `@sveltejs/adapter-static` for SSG

### Styling Conventions

- **Tailwind CSS 4.0**: Primary styling framework
- **CSS Variables**: Theme colors defined in `src/app.css` using HSL values
- **Dark Mode**: Handled by `mode-watcher` package with system preference detection
- **shadcn Components**: Pre-styled components following design system

### Code Style Rules (from AGENTS.md)

- **Indentation**: Use tabs (not spaces)
- **Quotes**: Single quotes for strings
- **Line Width**: 100 character maximum
- **Trailing Commas**: Do not use trailing commas
- **TypeScript**: Strict mode enabled, always use proper types

### TypeScript Configuration

- Strict mode enabled with all strict checks
- Module resolution: bundler
- Target: ES2022
- Path alias: `$lib/*` maps to `src/lib/*`

## Important Project-Specific Details

### Deployment Configuration

- **Platform**: Cloudflare Workers/Pages
- **Config File**: `wrangler.jsonc`
- **Build Output**: `./build` directory
- **Domain**: divkix.me

### Key Dependencies

- **Svelte 5.15+**: Latest Svelte with runes and snippets
- **SvelteKit 2.22+**: Full-stack framework
- **Tailwind CSS 4.0**: Next-gen CSS framework
- **shadcn-svelte**: Component library
- **bits-ui**: Headless UI primitives
- **lucide-svelte & simple-icons**: Icon libraries

### Performance Requirements

- Maintain Lighthouse score of 100/100
- Keep bundle size under 100KB gzipped
- Ensure static generation works correctly

## Development Guidelines

1. **Component Creation**: When creating new UI components, follow the shadcn-svelte pattern in
   `src/lib/components/ui/`
2. **Type Safety**: Always define proper TypeScript types for props and data
3. **Svelte 5 Features**: Use modern Svelte 5 syntax ($props, snippets, runes)
4. **Static Assets**: Place images in `static/assets/img/`
5. **Theme Consistency**: Use CSS variables defined in `src/app.css` for colors
6. **Code Formatting**: Always run `bun run format` before committing
7. **Type Checking**: Ensure `bun run check` passes before deployment
