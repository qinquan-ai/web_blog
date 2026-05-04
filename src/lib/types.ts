/**
 * 类型定义
 */

export interface Site {
  title: string;
  description: string;
  url: string;
  github: string;
  email: string;
  author: string;
  google?: string;
  douyin?: string;
  csdn?: string;
  dynamicOgImage?: boolean;
  editPost?: {
    enabled: boolean;
    text: string;
    url: string;
  };
}

export interface Tag {
  name: string;
  slug: string;
  color: string;
}

export interface Post {
  title: string;
  description: string;
  pubDate: Date;
  updatedDate?: Date;
  tags: string[];
  readingTime: string;
  draft: boolean;
}
