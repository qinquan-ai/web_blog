import type { APIRoute } from 'astro';
import { getCollection } from 'astro:content';

export const GET: APIRoute = async () => {
  const posts = await getCollection('blog', ({ data }) => !data.draft);
  const data = posts.map(post => ({
    title: post.data.title,
    description: post.data.description,
    tags: post.data.tags,
    slug: post.slug,
  }));
  return new Response(JSON.stringify(data), {
    headers: { 'Content-Type': 'application/json' },
  });
};
