import { getAllPosts } from "@/lib/blog";
import { buildLlmsFullTxt } from "@/lib/llms";

// /llms-full.txt — every published article with summary and FAQ answers.
export const revalidate = 3600;

export async function GET() {
  const posts = await getAllPosts();
  return new Response(buildLlmsFullTxt(posts), {
    headers: { "content-type": "text/plain; charset=utf-8" },
  });
}
