import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import sitemap from '@astrojs/sitemap';
import mdx from '@astrojs/mdx';
import remarkLinkCard from 'remark-link-card';
import rehypeRaw from 'rehype-raw';

export default defineConfig({
  site: 'https://astro-blog.pages.dev', // Cloudflare Pages URL
  prefetch: false, // Disable prefetch for better performance
  integrations: [
    tailwind(),
    sitemap(),
    mdx()
  ],
  markdown: {
    remarkPlugins: [
      [remarkLinkCard, {
        cache: true,
        shortenUrl: true
      }]
    ],
    rehypePlugins: [rehypeRaw],
    shikiConfig: {
      theme: 'github-dark',
      wrap: true
    }
  }
});
