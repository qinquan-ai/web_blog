/**
 * 项目数据 — 唯一真源
 * 新增项目只需在对应分类中添加一个对象即可。
 */

export interface Project {
  name: string;
  description: string;
  link?: string;         // 在线地址
  github?: string;       // GitHub 仓库
  tech?: string[];       // 技术标签
  wip?: boolean;         // 是否在开发中
}

export interface ProjectGroup {
  title: string;
  description?: string;
  projects: Project[];
}

export const PROJECT_GROUPS: ProjectGroup[] = [];
