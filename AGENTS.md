# AGENTS.md - Development Guidelines

## Build/Lint/Test Commands

- `bun dev` - Start development server
- `bun build` - Build for production
- `bun preview` - Preview production build
- `bun check` - Type check with svelte-check
- `bun check:watch` - Type check in watch mode
- `bun lint` - Run prettier check and eslint
- `bun format` - Format code with prettier
- No test framework configured
- Deployed using Cloudflare Workers (Static)

## Code Style Guidelines

- **Formatting**: Use tabs (not spaces), single quotes, no trailing commas, 100 char line width
- **Imports**: Use `$lib/` path aliases, group imports (external first, then internal)
- **Types**: Use TypeScript with strict checking, define Props types for components
- **Naming**: camelCase for variables/functions, PascalCase for components
- **Components**: Use Svelte 5 syntax with `$props()` and snippets
- **Styling**: Use Tailwind CSS classes, follow existing component patterns
- **Error Handling**: Use try/catch blocks, provide meaningful error messages

## Framework Notes

- SvelteKit with Svelte 5, TypeScript, Tailwind CSS
- UI components use bits-ui and tailwind-variants
- No test framework currently configured
- Uses Bun as package manager
