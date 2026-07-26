/**
 * post-layout.ts — 博客文章页交互行为
 *
 * 三个 init 函数：阅读进度 / TOC 抽屉 / 标题锚点。
 * 拆出来是为了让 PostLayout.astro 保持在 ~250 行以内。
 */

export function initReadingProgress(): void {
  const bar = document.getElementById("reading-progress");
  if (!bar) return;
  const update = () => {
    const scrollTop = window.scrollY;
    const docHeight =
      document.documentElement.scrollHeight - window.innerHeight;
    const progress = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
    bar.style.width = progress + "%";
  };
  window.addEventListener("scroll", update, { passive: true });
  update();
}

export function addHeadingLinks(): void {
  const headings = document.querySelectorAll(
    ".prose h2, .prose h3, .prose h4"
  );
  headings.forEach(heading => {
    if (!heading.id) return;
    const anchor = document.createElement("a");
    anchor.href = "#" + heading.id;
    anchor.className = "heading-anchor";
    anchor.setAttribute("aria-label", "链接到本节");
    anchor.innerHTML =
      '<svg viewBox="0 0 24 24" width="16" height="16" aria-hidden="true" focusable="false">' +
      '<path fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" ' +
      'd="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />' +
      '<path fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" ' +
      'd="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />' +
      "</svg>";
    heading.appendChild(anchor);
  });
}

export function initTocDrawer(): void {
  const fab = document.getElementById("toc-fab");
  const drawer = document.getElementById("toc-drawer");
  const backdrop = document.getElementById("toc-drawer-backdrop");
  const closeBtn = document.getElementById("toc-drawer-close");
  if (!fab || !drawer) return;

  const open = () => {
    if (window.innerWidth >= 1100) return;
    drawer.classList.add("is-open");
    drawer.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";
  };
  const close = () => {
    drawer.classList.remove("is-open");
    drawer.setAttribute("aria-hidden", "true");
    document.body.style.overflow = "";
  };

  fab.addEventListener("click", open);
  backdrop?.addEventListener("click", close);
  closeBtn?.addEventListener("click", close);

  window.addEventListener("resize", () => {
    if (window.innerWidth >= 1100 && drawer.classList.contains("is-open")) {
      close();
    }
  });
}