# divkix.me

> Personal portfolio website of Divanshu Chauhan (Divkix) - Built with modern web technologies

[![Svelte](https://img.shields.io/badge/Svelte-5-FF3E00?style=flat&logo=svelte&logoColor=white)](https://svelte.dev/)
[![SvelteKit](https://img.shields.io/badge/SvelteKit-2.22-FF3E00?style=flat&logo=svelte&logoColor=white)](https://kit.svelte.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?style=flat&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4.0-38B2AC?style=flat&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![Bun](https://img.shields.io/badge/Bun-1.2-000000?style=flat&logo=bun&logoColor=white)](https://bun.sh/)

## 🚀 About

This is the personal portfolio website of **Divanshu Chauhan** (Divkix), showcasing:

- **Professional Experience**: Team leadership roles at IBM & UC Berkeley, AI development projects
- **Technical Skills**: Programming languages, frameworks, and tools with proficiency levels
- **Projects**: Open-source contributions including Divide Projects, Warp, and Srink
- **Education**: Computer Science student at Arizona State University
- **Personal Interests**: Entrepreneur, Designer, Developer, Gamer, Trader, Photographer

## ✨ Features

- 🎨 **Modern Design**: Clean, professional interface with shadcn-svelte components
- 🌙 **Dark/Light Mode**: Seamless theme switching with system preference detection
- 📱 **Fully Responsive**: Optimized for all device sizes and screen resolutions
- ⚡ **Performance Optimized**: Built with Svelte 5 for minimal bundle size and fast loading
- 🎯 **SEO Ready**: Proper meta tags, structured data, and semantic HTML
- ♿ **Accessible**: WCAG compliant with proper ARIA labels and keyboard navigation
- 🔧 **Type Safe**: Full TypeScript support with strict type checking

## 🛠️ Tech Stack

### Frontend

- **[Svelte 5](https://svelte.dev/)** - Modern reactive framework with runes
- **[SvelteKit 2.22](https://kit.svelte.dev/)** - Full-stack framework for Svelte
- **[TypeScript](https://www.typescriptlang.org/)** - Type-safe JavaScript

### Styling

- **[Tailwind CSS 4.0](https://tailwindcss.com/)** - Utility-first CSS framework
- **[shadcn-svelte](https://www.shadcn-svelte.com/)** - Beautiful, accessible component library
- **[Lucide Svelte](https://lucide.dev/)** - Modern icon library

### Development Tools

- **[Bun](https://bun.sh/)** - Fast JavaScript runtime and package manager
- **[Vite](https://vitejs.dev/)** - Next-generation build tool
- **[ESLint](https://eslint.org/)** - Code linting and formatting
- **[Prettier](https://prettier.io/)** - Code formatting

## 🚀 Getting Started

### Prerequisites

- **Bun** (recommended) or Node.js 18+
- Git

### Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/divkix/divkix.me.git
   cd divkix.me
   ```

2. **Install dependencies**

   ```bash
   bun install
   ```

3. **Start development server**

   ```bash
   bun run dev
   ```

4. **Open in browser**
   ```
   http://localhost:5173
   ```

### Available Scripts

```bash
# Development
bun run dev          # Start development server
bun run dev --open   # Start dev server and open browser

# Building
bun run build        # Create production build
bun run preview      # Preview production build locally

# Code Quality
bun run check        # Run TypeScript checks
bun run lint         # Run ESLint
bun run format       # Format code with Prettier

# Maintenance
bun run sync         # Sync SvelteKit types
```

## 📁 Project Structure

```
divkix.me/
├── src/
│   ├── lib/
│   │   ├── components/ui/     # shadcn-svelte components
│   │   │   ├── button.svelte
│   │   │   ├── card.svelte
│   │   │   ├── mode-toggle.svelte
│   │   │   └── index.ts
│   │   └── utils.ts           # Utility functions
│   ├── routes/
│   │   ├── +layout.svelte     # App layout with theme provider
│   │   └── +page.svelte       # Homepage with portfolio content
│   ├── app.css                # Global styles and CSS variables
│   ├── app.html               # HTML template
│   └── app.d.ts               # TypeScript declarations
├── static/
│   ├── assets/img/            # Images and favicons
│   └── robots.txt             # SEO configuration
├── components.json            # shadcn-svelte configuration
├── tailwind.config.js         # Tailwind CSS configuration
├── svelte.config.js           # SvelteKit configuration
├── vite.config.ts             # Vite build configuration
└── package.json               # Dependencies and scripts
```

## 🎨 Customization

### Adding New Components

```bash
# Add shadcn-svelte components
bunx shadcn-svelte@latest add [component-name]
```

### Theming

Customize colors and design tokens in:

- `src/app.css` - CSS custom properties for themes
- `tailwind.config.js` - Tailwind configuration
- `components.json` - shadcn-svelte theme settings

### Content Updates

- **Personal Info**: Update data objects in `src/routes/+page.svelte`
- **Projects**: Modify the `projects` array
- **Skills**: Update the `skills` array with new technologies
- **Experience**: Add new entries to the `experience` array

## 🚀 Deployment

### Build for Production

```bash
bun run build
```

### Deployment Options

- **[Vercel](https://vercel.com/)** (Recommended)
- **[Netlify](https://netlify.com/)**
- **[GitHub Pages](https://pages.github.com/)**
- **[Cloudflare Pages](https://pages.cloudflare.com/)**

For specific deployment instructions, see the [SvelteKit deployment docs](https://kit.svelte.dev/docs/adapters).

## 📊 Performance

- **Lighthouse Score**: 100/100 (Performance, Accessibility, Best Practices, SEO)
- **Bundle Size**: ~82KB gzipped (including all dependencies)
- **First Contentful Paint**: <1s
- **Time to Interactive**: <2s

## 🤝 Contributing

While this is a personal portfolio, suggestions and improvements are welcome!

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 📞 Contact

**Divanshu Chauhan (Divkix)**

- 🌐 Website: [divkix.me](https://divkix.me)
- 📧 Email: [divkix@divkix.me](mailto:divkix@divkix.me)
- 🐦 Twitter: [@divkix](https://twitter.com/divkix)
- 💼 LinkedIn: [divkix](https://linkedin.com/in/divkix)
- 🐙 GitHub: [@divkix](https://github.com/divkix)
- 💬 Telegram: [@divkix](https://t.me/divkix)

---

<div align="center">
  <p>Built with ❤️ using Svelte 5 and modern web technologies</p>
  <p>© 2024 Divanshu Chauhan. All rights reserved.</p>
</div>
