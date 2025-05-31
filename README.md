# Astro Blog

Modern blog built with Astro, TypeScript, and Tailwind CSS.

## Features

- 📝 **Blog System**: Markdown-based articles with frontmatter
- 🏷️ **Tag System**: Categorize and filter articles by tags  
- 📱 **Responsive Design**: Mobile-first responsive layout
- 🔍 **Search**: Full-text search functionality
- 📄 **Pagination**: Paginated blog listing
- 📋 **Table of Contents**: Auto-generated TOC with sticky positioning
- 🔗 **Related Articles**: Algorithm-based article recommendations
- 🌙 **Dark Mode**: Toggle between light and dark themes
- 📡 **RSS Feed**: Auto-generated RSS feed for subscribers
- 🔗 **Breadcrumb Navigation**: Clear navigation paths

## Tech Stack

- **Framework**: [Astro](https://astro.build/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Content**: Markdown with frontmatter
- **TypeScript**: Full type safety
- **Deployment**: Cloudflare Pages

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

```bash
# Clone the repository
git clone https://github.com/yourusername/astro-blog.git
cd astro-blog

# Install dependencies
npm install

# Start development server
npm run dev
```

### Development

```bash
# Development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## Project Structure

```
src/
├── components/          # Reusable Astro components
├── content/
│   └── blog/           # Blog posts (Markdown)
├── layouts/            # Page layouts
├── pages/              # File-based routing
├── styles/             # Global styles
├── types/              # TypeScript type definitions
└── utils/              # Utility functions
```

## Adding Content

Create new blog posts in `src/content/blog/`:

```markdown
---
title: "Your Post Title"
description: "Brief description"
pubDate: 2024-01-15
updatedDate: 2024-01-20
heroImage: "https://images.unsplash.com/photo-xxx"
tags: ["JavaScript", "Web Development"]
---

Your content here...
```

## Configuration

Update `astro.config.mjs` with your domain:

```js
export default defineConfig({
  site: 'https://yourdomain.com',
  // ...
});
```

## Deployment

This project is configured for deployment on Cloudflare Pages:

1. Push to GitHub
2. Connect repository to Cloudflare Pages
3. Set build command: `npm run build`
4. Set output directory: `dist`

## License

MIT License