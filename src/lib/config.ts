/**
 * 站点配置
 * 所有全局配置集中管理，方便修改
 */

import type { Site, Tag } from './types';

export const SITE: Site = {
  title: 'Qin',
  description: '全栈开发 · AI 基础设施 · 技术笔记本',
  url: 'https://qin-blog.vercel.app',
  github: 'https://github.com/qinquan-ai',
  email: 'qin16778@gmail.com',
  author: 'Qin',
  google: 'mailto:qin16778@gmail.com', // 谷歌邮箱关联
  douyin: '', // 预留：待账号创建后填入完整链接，填入后将自动在页脚显示
  csdn: '', // 预留：待账号创建后填入完整链接，填入后将自动在页脚显示
};

export const TAGS: Tag[] = [
  { name: 'AI', slug: 'ai', color: '#3b82f6' },
  { name: '架构', slug: 'arch', color: '#8b5cf6' },
  { name: '工具', slug: 'tools', color: '#10b981' },
  { name: '踩坑', slug: 'pitfalls', color: '#f59e0b' },
  { name: '效率', slug: 'efficiency', color: '#ec4899' },
];

export function getTagBySlug(slug: string): Tag | undefined {
  return TAGS.find(tag => tag.slug === slug);
}
