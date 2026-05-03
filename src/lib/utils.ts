/**
 * 工具函数
 */

import type { CollectionEntry } from 'astro:content';

/**
 * 格式化日期为中文显示（列表页用）
 * 输出示例：2026/05/02
 */
export function formatDate(date: Date): string {
  return date.toLocaleDateString('zh-CN', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  });
}

/**
 * 格式化日期为完整中文显示（文章详情页用）
 * 输出示例：2026年5月2日
 */
export function formatDateFull(date: Date): string {
  return date.toLocaleDateString('zh-CN', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

/**
 * 生成 canonical URL
 */
export function getCanonicalUrl(path: string, baseUrl: string): string {
  return new URL(path, baseUrl).toString();
}

/**
 * 为文章列表注入动态阅读时间（通过 remark 插件计算）
 * 用法：const posts = await enrichPostsWithReadingTime(rawPosts);
 */
export async function enrichPostsWithReadingTime(
  posts: CollectionEntry<'blog'>[]
) {
  return Promise.all(
    posts.map(async (post) => {
      const { remarkPluginFrontmatter } = await post.render();
      return {
        ...post,
        readingTime: (remarkPluginFrontmatter.readingTime as string) || post.data.readingTime || '5 min',
      };
    })
  );
}
