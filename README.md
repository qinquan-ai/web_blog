# Qin Blog

个人技术博客 · Astro + Content Layer

## 本地开发

```bash
npm install
npm run dev
```

## 新建文章

在 `src/content/blog/` 下创建 `.md` 文件：

```markdown
---
title: "文章标题"
description: "文章描述"
pubDate: 2026-05-02
tags: ["ai", "arch", "tools", "pitfalls", "efficiency"]
readingTime: "8 min"
---

正文内容...
```

## 部署

推送到 GitHub，Vercel 自动构建部署。
