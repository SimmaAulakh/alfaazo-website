import { getAllPosts } from "@/lib/blog";
import { buildLlmsTxt } from "@/lib/llms";

// /llms.txt — generated from the live post list (see lib/llms.ts).
// Cached for an hour; /api/revalidate refreshes it on publish.
export const revalidate = 3600;

export async function GET() {
  const posts = await getAllPosts();
  return new Response(buildLlmsTxt(posts), {
    headers: { "content-type": "text/plain; charset=utf-8" },
  });
}
