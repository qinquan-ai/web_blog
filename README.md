# 覃权 / Qin Quan Blog

独立产品工程师的技术博客 · Astro + Content Collections

## 本地开发

```bash
npm install
npm run dev
```

## 新建文章

在 `src/content/blog/` 下创建 `.md` 或 `.mdx` 文件：

```markdown
---
title: "文章标题"
description: "文章描述"
pubDate: 2026-05-02
tags: ["product", "delivery", "open-source", "video"]
readingTime: "8 min"
draft: false
---

正文内容...
```

## 部署

推送到 GitHub，由 Cloudflare Pages 自动构建部署。
