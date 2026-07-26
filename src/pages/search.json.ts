import type { APIRoute } from "astro";
import { getCollection } from "astro:content";
import { isPostVisible } from "../lib/config";

export const GET: APIRoute = async () => {
  const posts = await getCollection("blog", isPostVisible);
  const data = posts.map(post => ({
    title: post.data.title,
    description: post.data.description,
    tags: post.data.tags,
    slug: post.slug,
  }));
  return new Response(JSON.stringify(data), {
    headers: { "Content-Type": "application/json" },
  });
};
