# Divkix Portfolio

A modern, production-ready portfolio site built with Next.js 15, TypeScript, and Tailwind CSS. Deployed on Cloudflare Workers with edge-optimized architecture, featuring Framer Motion animations, an MDX-powered blog, and a comprehensive single-page experience.

## Features

- **Modern Design**: Clean aesthetic with glass surfaces and gradient text effects
- **Hero Section**: Animated hero with Framer Motion stagger effects and social icons
- **Highlights Dashboard**: Animated count-up statistics (users, projects, OSS contributions)
- **Single-Page Experience**: Homepage with smooth scrolling sections (Hero, Highlights, Projects, Experience, Skills, Contact)
- **Blog System**: MDX-powered blog with pre-generated metadata for edge deployment
- **Responsive**: Mobile-first design that works on all devices
- **Accessible**: WCAG AA compliant with keyboard navigation and screen reader support
- **Fast**: Optimized for Cloudflare Workers with edge runtime
- **SEO Optimized**: Meta tags, JSON-LD structured data, and semantic HTML
- **Type-Safe**: 100% TypeScript with strict mode enabled

## Tech Stack

- **Framework**: Next.js 15 with App Router
- **Language**: TypeScript 5 with strict mode
- **Styling**: Tailwind CSS v4 with custom design system
- **UI Components**: shadcn/ui (Radix UI primitives)
- **Animations**: Framer Motion with stagger effects and count-up animations
- **Forms**: React Hook Form + Zod validation
- **Content**: MDX with gray-matter and build-time metadata generation
- **Icons**: Lucide React
- **Deployment**: Cloudflare Workers via @opennextjs/cloudflare
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
│   │   └── page.tsx         # Homepage (Hero, Highlights, Projects, Experience, Skills, Contact)
│   ├── blog/                # Blog pages
│   │   ├── [slug]/          # Dynamic blog post pages
│   │   │   └── page.tsx     # Loads MDX dynamically
│   │   ├── layout.tsx       # Blog layout
│   │   └── page.tsx         # Blog listing (reads posts.json)
│   ├── api/                 # API routes
│   │   └── contact/         # Contact form endpoint
│   │       └── route.ts
│   ├── rss.xml/             # RSS feed generation
│   │   └── route.ts
│   ├── layout.tsx           # Root layout with providers
│   └── globals.css          # Global styles with OKLCH colors
├── components/              # React components
│   ├── sections/            # Page sections
│   │   ├── Hero3D.tsx       # Hero with animated text and social icons
│   │   ├── Highlights.tsx   # Animated statistics dashboard
│   │   ├── Projects.tsx     # Projects section with filtering
│   │   ├── Experience.tsx   # Work experience timeline
│   │   ├── Skills.tsx       # Skills grid
│   │   └── Contact.tsx      # Contact form
│   ├── shared/              # Shared components
│   │   ├── Navbar.tsx       # Navigation with smooth scroll
│   │   ├── Footer.tsx       # Site footer
│   │   ├── GradientText.tsx # Gradient text wrapper
│   │   ├── SocialIcons.tsx  # Social media icons
│   │   └── ThemeToggle.tsx  # Dark/light mode toggle
│   ├── ui/                  # shadcn/ui components (Button, Card, Input, etc.)
│   ├── mdx/                 # MDX components
│   └── providers/           # Context providers
│       └── ThemeProvider.tsx
├── content/                 # Content files
│   ├── blog/                # MDX blog posts + generated metadata
│   │   ├── *.mdx            # Blog post files
│   │   └── posts.json       # Generated at build time
│   └── site.config.ts       # Site configuration (all content)
├── lib/                     # Utilities
│   ├── utils.ts             # Helper functions (cn, etc.)
│   ├── animations.ts        # Framer Motion variants
│   ├── content.ts           # Blog post utilities (reads posts.json)
│   └── seo.ts               # SEO metadata utilities
├── scripts/                 # Build scripts
│   ├── generate-posts-metadata.js  # Generates posts.json from MDX
│   └── generate-favicons.ts        # Favicon generation
├── public/                  # Static assets
│   ├── *.svg                # Icons and logos
│   └── resume.pdf           # Downloadable resume
├── next.config.ts           # Next.js configuration with MDX
├── tailwind.config.ts       # Tailwind configuration
├── tsconfig.json            # TypeScript configuration
├── wrangler.jsonc           # Cloudflare Workers configuration
└── open-next.config.ts      # OpenNext configuration
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

## Navigation

The site uses a single-page layout with smooth scrolling to sections:

- **Home**: Hero section with animated text and social icons
- **Highlights**: Animated statistics dashboard (users, projects, OSS contributions)
- **Projects**: Filterable project gallery (accessible via `/#projects`)
- **Experience**: Work experience timeline with multiple positions
- **Skills**: Skills grid showcasing technologies
- **Contact**: Contact form (accessible via `/#contact`)
- **Blog**: Separate blog listing page with MDX posts

Navigation links automatically scroll to sections when on the homepage, or navigate to the homepage and scroll when on other pages.

## Scripts

- `bun run dev` - Start development server
- `bun run build` - Build for production (includes prebuild)
- `bun run prebuild` - Generate blog posts metadata
- `bun run start` - Start production server
- `bun run lint` - Run ESLint
- `bun run preview` - Preview with OpenNext locally
- `bun run deploy` - Deploy to Cloudflare Workers
- `bun run cf-typegen` - Generate Cloudflare types

## Performance Optimizations

The site includes several performance optimizations:

- **Edge deployment** on Cloudflare Workers for global low-latency
- **Build-time generation** of blog metadata (no filesystem access at runtime)
- **Image optimization** with AVIF/WebP formats
- **Font optimization** with next/font
- **Code splitting** and lazy loading
- **Package optimization** for lucide-react and framer-motion
- **Reduced motion support** for accessibility (respects `prefers-reduced-motion`)

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
- Skip to main content link

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

### Cloudflare Workers (Configured)

This project is configured for Cloudflare Workers deployment:

```bash
bun run deploy
```

This will:
1. Generate blog posts metadata
2. Build the Next.js app with OpenNext
3. Deploy to Cloudflare Workers

### Configuration

- Worker name: `divkix-me` (in `wrangler.jsonc`)
- Compatibility flags: `nodejs_compat`, `global_fetch_strictly_public`
- Assets served from `.open-next/assets`

### Important Notes

- The site is optimized for edge runtime (no filesystem access)
- Blog posts are pre-generated at build time into `posts.json`
- Always run `bun run prebuild` before deploying
- Preview locally with `bun run preview` before deploying

## Customization Tips

### Adding New Sections

1. Create a new component in `/components/sections/`
2. Import it in `/app/(site)/page.tsx`
3. Add necessary types in the component
4. Update `/content/site.config.ts` if needed
5. Add navigation link with anchor in `/components/shared/Navbar.tsx` if needed

### Modifying Animations

The hero section uses Framer Motion for smooth animations. Modify `/lib/animations.ts` to customize animation variants:

### Customizing Highlights

Edit the statistics displayed in the Highlights section by updating `content/site.config.ts`:

```typescript
facts: {
  impact: "250000+",  // Total users reached
  projects: "30+",    // Number of projects
  oss: "50+",         // Open source contributions
}
```

The Highlights component automatically animates these numbers with a count-up effect.

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
