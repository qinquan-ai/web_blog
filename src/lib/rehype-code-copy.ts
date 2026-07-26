/* eslint-disable */
/**
 * rehype-code-copy.ts
 * ------------------------------------------------------------
 * Build-time 增强：给 Markdown/MDX 渲染出的每个 <pre>：
 *   1. 外层包一个 <div class="code-block">
 *   2. 内部追加一个 <button class="code-copy" type="button">复制</button>
 *
 * 行为不再依赖运行时的 <script> 包裹逻辑，
 * 复制按钮是真实存在于 HTML 里的元素。
 * click 行为由 ui/components/CodeCopy/CodeCopy.astro 的
 * 委托脚本统一接管。
 * ------------------------------------------------------------
 */

import type { Root, Element } from 'hast';
import { visit, SKIP } from 'unist-util-visit';

interface Options {
  /** 容器类名（默认 'code-block'） */
  className?: string;
  /** 复制按钮类名（默认 'code-copy'） */
  buttonClass?: string;
  /** 复制按钮文本（默认 '复制'） */
  label?: string;
}

export function rehypeCodeCopy(options: Options = {}) {
  const containerClass = options.className ?? 'code-block';
  const buttonClass = options.buttonClass ?? 'code-copy';
  const label = options.label ?? '复制';

  return function transformer(tree: Root) {
    visit(tree, 'element', (node: Element, index, parent) => {
      if (node.tagName !== 'pre' || !parent || typeof index !== 'number') return;
      if (parent.type === 'element' && parent.tagName === 'div' && (parent.properties?.className as string[] | undefined)?.includes(containerClass)) {
        return SKIP; // 已包过
      }

      const button: Element = {
        type: 'element',
        tagName: 'button',
        properties: {
          type: 'button',
          className: [buttonClass],
          'aria-label': '复制代码',
        },
        children: [{ type: 'text', value: label }],
      };

      const wrapper: Element = {
        type: 'element',
        tagName: 'div',
        properties: { className: [containerClass] },
        children: [node, button],
      };

      parent.children[index] = wrapper;
      return [SKIP, index + 1];
    });
  };
}

export default rehypeCodeCopy;
