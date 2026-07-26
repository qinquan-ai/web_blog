/**
 * UI 原语桶入口
 *
 * 设计约定（来自 debug_board 的 ui/component 约定）：
 *   - 每个原语有自己的目录：ComponentName/ComponentName.astro + ComponentName.css
 *   - 业务代码一律走本桶，不直接深引用
 *   - 未来同一原语可多套实现/多套主题，再在桶内做选择
 *
 * 注意：Button / Breadcrumb / BackLink 三个老原语本次未做独立目录，
 * 仍以平铺形式保留在本目录根，方便后续按需迁移。
 */

export { default as CodeBlock } from './CodeBlock/CodeBlock.astro';
export { default as CodeCopy } from './CodeCopy/CodeCopy.astro';
