/**
 * code-copy.ts — 全站代码块复制按钮行为
 *
 * 来源：CodeCopy.astro 的 inline <script>。
 * 这里以 plain JS 模块导出，挂到全局供 rehype 注入的 .code-copy 使用。
 *
 * 行为契约：
 *   - 一切 <pre> 必须被 rehype 包入 .code-block；
 *   - button 上加一个 click handler，写剪贴板、改文字为「已复制」。
 */

type BindableRoot = ParentNode & Document;

function bind(root: BindableRoot): void {
  root.querySelectorAll<HTMLElement>(".code-block").forEach((block) => {
    const tagged = block as HTMLElement & { __codeCopyBound?: boolean };
    if (tagged.__codeCopyBound) return;
    tagged.__codeCopyBound = true;

    block.addEventListener("click", async (e) => {
      const target = e.target instanceof Element ? e.target : null;
      const btn = target?.closest(".code-copy") as HTMLButtonElement | null;
      if (!btn) return;

      const code = block.querySelector<HTMLElement>("pre code");
      if (!code) return;

      try {
        await navigator.clipboard.writeText(code.innerText);
        const original = btn.textContent ?? "复制";
        btn.textContent = "已复制";
        btn.classList.add("is-copied");
        setTimeout(() => {
          btn.textContent = original;
          btn.classList.remove("is-copied");
        }, 2000);
      } catch (err) {
        console.error("Failed to copy", err);
      }
    });
  });
}

bind(document);
document.addEventListener("astro:page-load", () => bind(document));