import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import { remarkReadingTime } from './remark-reading-time.mjs';

export default defineConfig({
  site: 'https://qin-blog.vercel.app',
  integrations: [
    mdx(),
    sitemap(),
  ],
  markdown: {
    remarkPlugins: [remarkReadingTime],
    shikiConfig: {
      theme: 'one-dark-pro',
      wrap: true,
    },
  },
});
