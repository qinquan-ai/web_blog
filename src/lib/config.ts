/**
 * 站点配置
 * 所有全局配置集中管理，方便修改
 */

import type { Site, Tag } from "./types";

export const SITE: Site = {
  title: "交付手记",
  description:
    "记录软件如何从能跑的 Demo，变成能交付、能维护的产品。",
  url: "https://qin-blog.pages.dev",
  github: "https://github.com/qinquan-ai",
  email: "qin16778@gmail.com",
  author: "独立产品工程师",
  google: "mailto:qin16778@gmail.com", // 谷歌邮箱关联
  douyin: "", // 预留：待账号创建后填入完整链接，填入后将自动在页脚显示
  csdn: "", // 预留：待账号创建后填入完整链接，填入后将自动在页脚显示
  dynamicOgImage: true,
  logoMark: "Q",
  editPost: {
    enabled: true,
    text: "在 GitHub 上编辑",
    url: "https://github.com/qinquan-ai/blog/edit/main/",
  },
};

export const SPONSOR = {
  afdian: "https://ifdian.net/a/qinquan-ai",
  github: "",
};

export const TAGS: Tag[] = [
  { name: "AI", slug: "ai", color: "#3b82f6" },
  { name: "架构", slug: "arch", color: "#8b5cf6" },
  { name: "工具", slug: "tools", color: "#10b981" },
  { name: "踩坑", slug: "pitfalls", color: "#f59e0b" },
  { name: "效率", slug: "efficiency", color: "#ec4899" },
  { name: "产品工程", slug: "product", color: "#2563eb" },
  { name: "软件交付", slug: "delivery", color: "#0f766e" },
  { name: "开源", slug: "open-source", color: "#16a34a" },
  { name: "视频", slug: "video", color: "#dc2626" },
];

export function getTagBySlug(slug: string): Tag | undefined {
  return TAGS.find(tag => tag.slug === slug);
}

/**
 * 显式隐藏的 slug 列表（无论 frontmatter 任何状态都不进 dist）。
 * 与 `data.draft === true` 叠加生效，二选一即隐藏。
 * 适用场景：临时下架、敏感内容、客户交付脱敏存档。
 */
export const HIDDEN_SLUGS: readonly string[] = [];

/** 统一过滤：draft 或 HIDDEN_SLUGS 任一命中即不露出。 */
export function isPostVisible(post: { slug: string; data: { draft?: boolean } }): boolean {
  if (HIDDEN_SLUGS.includes(post.slug)) return false;
  if (post.data.draft === true) return false;
  return true;
}
