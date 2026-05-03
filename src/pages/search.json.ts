import { getCollection } from 'astro:content';

export async function GET() {
  const posts = await getCollection('blog', ({ data }) => {
    return data.draft !== true;
  });

  const index = posts.map((post) => ({
    slug: post.slug,
    title: post.data.title,
    description: post.data.description,
    tags: post.data.tags,
    pubDate: post.data.pubDate,
  }));

  return new Response(JSON.stringify(index), {
    status: 200,
    headers: {
      'Content-Type': 'application/json'
    }
  });
}
