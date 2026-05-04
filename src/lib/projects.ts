/**
 * 项目数据 — 唯一真源
 * 新增项目只需在对应分类中添加一个对象即可。
 */

export interface Project {
  name: string;
  description: string;
  link?: string;
  github?: string;
  tech?: string[];
  stars: number;
  wip?: boolean;
}

export interface ProjectGroup {
  title: string;
  description?: string;
  projects: Project[];
}

interface GitHubRepo {
  name: string;
  description: string | null;
  html_url: string;
  homepage: string | null;
  topics: string[];
  fork: boolean;
  archived: boolean;
  stargazers_count: number;
}

export async function fetchGitHubProjects(
  username: string
): Promise<ProjectGroup> {
  try {
    const res = await fetch(
      `https://api.github.com/users/${username}/repos?sort=updated&per_page=20&type=owner`,
      {
        headers: {
          Accept: "application/vnd.github+json",
          "User-Agent": "qin-blog",
        },
      }
    );

    if (!res.ok) {
      // eslint-disable-next-line no-console
      console.warn(`GitHub API error: ${res.status}`);
      return { title: "开源项目", projects: [] };
    }

    const repos: GitHubRepo[] = await res.json();

    const projects: Project[] = repos
      .filter(repo => !repo.fork && !repo.archived && repo.description)
      .slice(0, 12)
      .map(repo => ({
        name: repo.name,
        description: repo.description || "",
        github: repo.html_url,
        link: repo.homepage || undefined,
        tech: repo.topics.slice(0, 4),
        stars: repo.stargazers_count,
        wip: false,
      }));

    return { title: "开源项目", projects };
  } catch (e) {
    // eslint-disable-next-line no-console
    console.warn("Failed to fetch GitHub projects:", e);
    return { title: "开源项目", projects: [] };
  }
}

export const PROJECT_GROUPS: ProjectGroup[] = [];
