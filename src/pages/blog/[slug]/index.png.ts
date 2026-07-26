import type { APIRoute, GetStaticPaths } from "astro";
import { getCollection } from "astro:content";
import { generatePostOgImage } from "../../../utils/og-templates";

export const getStaticPaths: GetStaticPaths = async () => {
  const posts = await getCollection("blog", ({ data }) => !data.draft);
  return posts.map(post => ({
    params: { slug: post.slug },
    props: {
      title: post.data.title,
      description: post.data.description,
    },
  }));
};

export const GET: APIRoute = async ({ props }) => {
  const { title, description } = props as {
    title: string;
    description: string;
  };
  const buffer = await generatePostOgImage(title, description);
  return new Response(new Uint8Array(buffer), {
    headers: { "Content-Type": "image/png" },
  });
};
