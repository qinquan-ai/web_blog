import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import { remarkReadingTime } from './remark-reading-time.mjs';
import {
  transformerNotationDiff,
  transformerNotationHighlight,
  transformerNotationWordHighlight,
} from '@shikijs/transformers';
import { rehypeCodeCopy } from './src/lib/rehype-code-copy';

export default defineConfig({
  site: 'https://blog.qinquan-ai.com',
  integrations: [
    mdx(),
    sitemap(),
  ],
  markdown: {
    remarkPlugins: [remarkReadingTime],
    rehypePlugins: [rehypeCodeCopy],
    shikiConfig: {
      // 双主题：亮色使用 github-light，暗色使用 one-dark-pro
      // 站点主题由 [data-theme] 控制，CodeBlock.css 切显示版本
      themes: {
        light: 'github-light',
        dark: 'one-dark-pro',
      },
      wrap: true,
      transformers: [
        transformerNotationDiff(),
        transformerNotationHighlight(),
        transformerNotationWordHighlight(),
      ],
    },
  },
  vite: {
    optimizeDeps: {
      exclude: ['@resvg/resvg-js'],
    },
  },
});
