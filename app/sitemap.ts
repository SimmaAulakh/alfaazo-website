import type { MetadataRoute } from "next";
import { getAllPosts, type BlogPost } from "@/lib/blog";
import { AUTHORS } from "@/lib/authors";

// Real modification dates. Every entry used to carry `new Date()` (the request
// time), which told crawlers the whole site changed every minute and gave them
// no reason to prioritise a post that was actually edited.
const modifiedAt = (p: BlogPost) => new Date(p.updated ?? p.date);
const latestOf = (posts: BlogPost[]) =>
  posts.length
    ? new Date(Math.max(...posts.map((p) => modifiedAt(p).getTime())))
    : undefined;

// Served fresh on every request. Traffic here is crawlers only, and the ISR copy
// was observed staying stale for 14h+ (new posts never appeared until a redeploy),
// which silently delays discovery of every new post. Dynamic is the bulletproof fix.
export const dynamic = "force-dynamic";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = "https://www.alfaazo.com";

  const posts = await getAllPosts();
  const tags = [...new Set(posts.map((p) => p.tag))];
  const latestPost = latestOf(posts);

  return [
    {
      url: baseUrl,
      lastModified: latestPost,
      changeFrequency: "monthly",
      priority: 1,
    },
    {
      url: `${baseUrl}/blog`,
      lastModified: latestPost,
      changeFrequency: "weekly",
      priority: 0.8,
    },
    // Static pages carry no lastModified: we don't track it, and a fake one is
    // worse than none.
    { url: `${baseUrl}/app`, changeFrequency: "monthly", priority: 0.9 },
    { url: `${baseUrl}/pricing`, changeFrequency: "monthly", priority: 0.8 },
    { url: `${baseUrl}/about`, changeFrequency: "monthly", priority: 0.7 },
    { url: `${baseUrl}/contact`, changeFrequency: "monthly", priority: 0.5 },
    { url: `${baseUrl}/privacy`, changeFrequency: "yearly", priority: 0.3 },
    { url: `${baseUrl}/terms`, changeFrequency: "yearly", priority: 0.3 },
    ...tags.map((tag) => ({
      url: `${baseUrl}/blog/tag/${tag}`,
      lastModified: latestOf(posts.filter((p) => p.tag === tag)),
      changeFrequency: "weekly" as const,
      priority: 0.5,
    })),
    ...AUTHORS.map((a) => ({
      url: `${baseUrl}/author/${a.slug}`,
      lastModified: latestOf(posts.filter((p) => p.author === a.name)),
      changeFrequency: "monthly" as const,
      priority: 0.4,
    })),
    ...posts.map((p) => ({
      url: `${baseUrl}/blog/${p.slug}`,
      lastModified: modifiedAt(p),
      changeFrequency: "monthly" as const,
      priority: 0.6,
    })),
  ];
}
