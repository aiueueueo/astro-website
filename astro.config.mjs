import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://astro-blog.pages.dev', // Cloudflare Pages URL
  prefetch: false, // Disable prefetch for better performance
  integrations: [
    tailwind(),
    sitemap(),
  ],
});
