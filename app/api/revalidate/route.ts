import { timingSafeEqual } from "node:crypto";
import { revalidatePath } from "next/cache";
import type { NextRequest } from "next/server";

// On-demand revalidation for the blog. Publishing goes straight into Firestore,
// so nothing in the build knows a post was added or changed; the pages that LIST
// posts (homepage journal section, /blog, sitemap, tag + author pages) would
// otherwise only refresh on their ISR timer — or, for the homepage, never until a
// redeploy. The publish scripts call this endpoint right after writing a post.
//
// POST /api/revalidate  (header x-revalidate-secret: <REVALIDATE_SECRET>)
// body: { "slugs": ["some-post-slug", ...] }   (optional — changed/added posts)

const LIST_PATHS = ["/", "/blog", "/sitemap.xml"];

function secretMatches(provided: string | null): boolean {
  const expected = process.env.REVALIDATE_SECRET;
  if (!expected || !provided) return false;
  const a = Buffer.from(provided);
  const b = Buffer.from(expected);
  return a.length === b.length && timingSafeEqual(a, b);
}

export async function POST(request: NextRequest) {
  const provided =
    request.headers.get("x-revalidate-secret") ??
    request.nextUrl.searchParams.get("secret");
  if (!secretMatches(provided)) {
    return Response.json(
      { revalidated: false, message: "Unauthorized" },
      { status: 401 }
    );
  }

  let slugs: string[] = [];
  try {
    const body = await request.json();
    if (Array.isArray(body?.slugs)) {
      slugs = body.slugs.filter(
        (s: unknown) => typeof s === "string" && /^[a-z0-9-]+$/.test(s)
      );
    }
  } catch {
    // No/invalid JSON body is fine — just refresh the listing pages.
  }

  const literalPaths = [...LIST_PATHS, ...slugs.map((s) => `/blog/${s}`)];
  for (const path of literalPaths) revalidatePath(path);
  // Dynamic routes need the pattern + type (see revalidatePath docs).
  revalidatePath("/blog/tag/[tag]", "page");
  revalidatePath("/author/[slug]", "page");

  return Response.json({
    revalidated: true,
    paths: [...literalPaths, "/blog/tag/[tag]", "/author/[slug]"],
    now: Date.now(),
  });
}
