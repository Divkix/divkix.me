# Divkix Portfolio

A modern, production-ready portfolio site built with Next.js 15, TypeScript, React Three Fiber, and Tailwind CSS. Features a clean design with 3D graphics, smooth animations, and a full blog system.

## Features

- **Modern Design**: Clean aesthetic with subtle glass surfaces and gradients
- **3D Hero Scene**: Interactive TorusKnot with custom shader and particle system
- **Blog System**: MDX-powered blog with syntax highlighting and reading time
- **Responsive**: Mobile-first design that works on all devices
- **Accessible**: WCAG AA compliant with keyboard navigation and screen reader support
- **Fast**: Optimized performance with dynamic imports and code splitting
- **SEO Optimized**: Meta tags, structured data, and semantic HTML
- **Type-Safe**: 100% TypeScript with strict mode enabled

## Tech Stack

- **Framework**: Next.js 15 with App Router
- **Language**: TypeScript 5 with strict mode
- **Styling**: Tailwind CSS v4 with custom design system
- **UI Components**: shadcn/ui (Radix UI primitives)
- **3D Graphics**: React Three Fiber + Three.js + Drei
- **Animations**: Framer Motion
- **Forms**: React Hook Form + Zod validation
- **Content**: MDX with gray-matter and reading-time
- **Icons**: Lucide React
- **Package Manager**: Bun

## Getting Started

### Prerequisites

- Node.js 18+ or Bun
- Git

### Installation

1. Clone the repository:
```bash
git clone https://github.com/divkix/portfolio.git
cd portfolio
```

2. Install dependencies:
```bash
bun install
# or
npm install
```

3. Run the development server:
```bash
bun run dev
# or
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
├── app/                      # Next.js App Router
│   ├── (site)/              # Main site route group
│   │   ├── layout.tsx       # Site layout
│   │   └── page.tsx         # Homepage
│   ├── blog/                # Blog pages
│   │   ├── [slug]/          # Dynamic blog post pages
│   │   │   └── page.tsx
│   │   └── page.tsx         # Blog listing
│   ├── projects/            # Projects page
│   │   └── page.tsx
│   ├── contact/             # Contact page
│   │   └── page.tsx
│   ├── api/                 # API routes
│   │   └── contact/         # Contact form endpoint
│   │       └── route.ts
│   ├── layout.tsx           # Root layout
│   └── globals.css          # Global styles
├── components/              # React components
│   ├── sections/            # Page sections
│   │   ├── hero.tsx
│   │   ├── about.tsx
│   │   ├── skills.tsx
│   │   ├── projects.tsx
│   │   └── contact.tsx
│   ├── three/               # 3D components
│   │   └── hero-scene.tsx
│   ├── shared/              # Shared components
│   │   ├── header.tsx
│   │   └── footer.tsx
│   ├── ui/                  # shadcn/ui components
│   ├── mdx/                 # MDX components
│   └── providers/           # Context providers
│       └── theme-provider.tsx
├── content/                 # Content files
│   ├── blog/                # MDX blog posts
│   │   ├── hello-world.mdx
│   │   └── building-with-nextjs.mdx
│   └── site.config.ts       # Site configuration
├── lib/                     # Utilities
│   ├── utils.ts             # Helper functions
│   ├── animations.ts        # Framer Motion variants
│   ├── content.ts           # MDX utilities
│   └── seo.ts               # SEO utilities
├── public/                  # Static assets
│   └── *.svg                # SVG icons
├── next.config.ts           # Next.js configuration
├── tailwind.config.ts       # Tailwind configuration
└── tsconfig.json            # TypeScript configuration
```

## Configuration

### Editing Site Content

All site content is centralized in `/content/site.config.ts`. Update this file to change:

- Personal information (name, email, location, etc.)
- Skills and technologies
- Projects with links and descriptions
- Work experience and education
- Social media links

```typescript
export const siteConfig = {
  name: "Your Name",
  handle: "yourhandle",
  tagline: "Your tagline here",
  location: "Your Location",
  email: "your@email.com",
  about: "Brief description about yourself",
  // ... more config
}
```

### Adding Blog Posts

1. Create a new MDX file in `/content/blog/`:

```bash
touch content/blog/my-new-post.mdx
```

2. Add frontmatter and content:

```mdx
---
title: "My New Post"
date: "2025-01-25"
excerpt: "A brief description of your post"
---

# My New Post

Your content here...
```

3. The post will automatically appear on the blog page with reading time calculation.

### Customizing Colors

Colors are defined in `/app/globals.css` using CSS variables and OKLCH color space:

```css
:root {
  --primary: oklch(0.64 0.22 264.5);    /* Indigo */
  --accent: oklch(0.72 0.20 310);       /* Fuchsia */
  --background: oklch(1 0 0);           /* White */
  --foreground: oklch(0.145 0 0);       /* Dark gray */
}
```

Dark mode colors are defined in the `.dark` selector. The design system uses OKLCH for better color interpolation and perceptual uniformity.

### Updating Skills & Projects

Edit the `skills`, `projects`, `experience`, and `education` arrays in `/content/site.config.ts`:

```typescript
skills: [
  "Python",
  "TypeScript",
  "React",
  // ... add your skills
],

projects: [
  {
    name: "Project Name",
    desc: "Brief description",
    tags: ["Tag1", "Tag2"],
    links: [
      { label: "GitHub", href: "https://github.com/..." },
      { label: "Live", href: "https://..." },
    ],
  },
  // ... add more projects
],
```

## Scripts

- `bun run dev` - Start development server
- `bun run build` - Build for production
- `bun run start` - Start production server
- `bun run lint` - Run ESLint

## Performance Optimizations

The site includes several performance optimizations:

- **Dynamic imports** for 3D components to reduce initial bundle size
- **Image optimization** with AVIF/WebP formats
- **Font optimization** with next/font
- **Code splitting** and lazy loading
- **Package optimization** for lucide-react, @react-three/fiber, and @react-three/drei
- **Reduced motion support** for accessibility

Target Lighthouse scores:
- **Performance**: 90+
- **Accessibility**: 100
- **Best Practices**: 100
- **SEO**: 100

## Accessibility

The site follows WCAG AA guidelines and includes:

- Keyboard navigation throughout
- Screen reader compatible ARIA labels
- Focus indicators on interactive elements
- Respects `prefers-reduced-motion` for animations
- High contrast text ratios
- Semantic HTML structure
- Alt text for images

## Type Safety

The project uses TypeScript with strict mode enabled for maximum type safety:

```json
{
  "compilerOptions": {
    "strict": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "noFallthroughCasesInSwitch": true
  }
}
```

All components, utilities, and configurations are fully typed with TypeScript.

## Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Import project in Vercel
3. Deploy with default settings

The site will automatically build and deploy with optimal settings for Next.js.

### Other Platforms

Build the project and deploy the `.next` folder:

```bash
bun run build
```

Ensure your platform supports:
- Node.js 18+
- Server-side rendering (SSR)
- API routes

## Customization Tips

### Adding New Sections

1. Create a new component in `/components/sections/`
2. Import it in `/app/(site)/page.tsx`
3. Add necessary types in the component
4. Update `/content/site.config.ts` if needed

### Modifying 3D Scene

The hero 3D scene is in `/components/three/hero-scene.tsx`. Modify the TorusKnot parameters, shader code, or particle system to customize the visual:

```typescript
<mesh rotation={[0.5, 0.5, 0]}>
  <torusKnotGeometry args={[1, 0.3, 128, 32]} />
  <meshStandardMaterial color="#6366f1" />
</mesh>
```

### Changing Animations

Framer Motion variants are defined in `/lib/animations.ts`. Modify these to change animation behavior:

```typescript
export const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5 }
}
```

## Environment Variables

Currently no environment variables are required. If you add external services (analytics, CMS, etc.), create a `.env.local` file:

```bash
# Example
NEXT_PUBLIC_ANALYTICS_ID=your_id_here
```

## Contributing

This is a personal portfolio template. Feel free to fork and customize for your own use.

## License

MIT License - feel free to use this as a template for your own portfolio!

## Credits

- Built by [Divanshu Chauhan](https://divkix.me)
- Icons from [Lucide](https://lucide.dev)
- UI components from [shadcn/ui](https://ui.shadcn.com)
- 3D graphics with [React Three Fiber](https://docs.pmnd.rs/react-three-fiber)

## Support

For issues or questions, please open an issue on GitHub or contact [divkix@divkix.me](mailto:divkix@divkix.me).
