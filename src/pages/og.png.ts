import type { APIRoute } from 'astro';
import { generateSiteOgImage } from '../utils/og-templates';

export const GET: APIRoute = async () => {
  const buffer = await generateSiteOgImage();
  return new Response(new Uint8Array(buffer), {
    headers: { 'Content-Type': 'image/png' },
  });
};
