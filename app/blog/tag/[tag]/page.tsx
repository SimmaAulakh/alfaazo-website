import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getPostsByTag, getAllTags } from "@/lib/blog";

export const revalidate = 300;

const TAG_META: Record<string, { title: string; description: string }> = {
  Beginner: {
    title: "Punjabi for Beginners — Tips & Guides",
    description:
      "Beginner-friendly guides for learning Punjabi. Start with Gurmukhi script, essential phrases, and foundational lessons from Alfaazo.",
  },
  Culture: {
    title: "Punjabi Culture & Language Insights",
    description:
      "Explore Punjabi culture through language — proverbs, festivals, food, and traditions that bring the language to life.",
  },
  Script: {
    title: "Gurmukhi Script — Reading & Writing Guides",
    description:
      "Learn to read and write Gurmukhi script. Stroke-by-stroke guides, alphabet breakdowns, and practice tips from Alfaazo.",
  },
};

const TAG_GRADIENTS: Record<string, string> = {
  Beginner: "from-primary to-primary-light",
  Culture: "from-primary-dark to-muted-sage",
  Script: "from-warm-brown to-blush",
};

export async function generateStaticParams() {
  const tags = await getAllTags();
  return tags.map((tag) => ({ tag }));
}

export const dynamicParams = true;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ tag: string }>;
}): Promise<Metadata> {
  const { tag } = await params;
  const meta = TAG_META[tag];

  return {
    title: meta?.title ?? `${tag} — Alfaazo Blog`,
    description:
      meta?.description ??
      `Browse ${tag} articles about learning Punjabi on the Alfaazo blog.`,
    alternates: {
      canonical: `https://alfaazo.com/blog/tag/${tag}`,
    },
    openGraph: {
      title: meta?.title ?? `${tag} — Alfaazo Blog`,
      description:
        meta?.description ??
        `Browse ${tag} articles about learning Punjabi.`,
      url: `https://alfaazo.com/blog/tag/${tag}`,
      siteName: "Alfaazo",
      type: "website",
    },
  };
}

export default async function TagPage({
  params,
}: {
  params: Promise<{ tag: string }>;
}) {
  const { tag } = await params;
  const posts = await getPostsByTag(tag);

  if (posts.length === 0) notFound();

  const allTags = await getAllTags();

  return (
    <div className="min-h-screen bg-cream">
      <div className="max-w-[1000px] mx-auto px-6 md:px-10 py-32">
        {/* Breadcrumb */}
        <nav aria-label="Breadcrumb" className="mb-6">
          <ol className="flex items-center gap-2 text-[0.78rem] text-warm-brown/40">
            <li>
              <Link
                href="/"
                className="hover:text-primary transition-colors no-underline"
              >
                Home
              </Link>
            </li>
            <li>/</li>
            <li>
              <Link
                href="/blog"
                className="hover:text-primary transition-colors no-underline"
              >
                Blog
              </Link>
            </li>
            <li>/</li>
            <li className="text-warm-brown/60">{tag}</li>
          </ol>
        </nav>

        <div className="text-center mb-12">
          <span className="inline-block px-4 py-1.5 rounded-full bg-primary/10 text-[0.72rem] font-semibold text-primary uppercase tracking-[0.08em] mb-4">
            {tag}
          </span>
          <h1 className="font-heading text-[clamp(1.8rem,3.5vw,2.6rem)] font-black text-primary-dark mb-4">
            {TAG_META[tag]?.title ?? `${tag} Articles`}
          </h1>
          <p className="text-[1rem] text-warm-brown/65 max-w-[460px] mx-auto">
            {posts.length} {posts.length === 1 ? "article" : "articles"} in this
            category
          </p>
        </div>

        {/* Tag filter pills */}
        <div className="flex justify-center gap-2 mb-12 flex-wrap">
          <Link
            href="/blog"
            className="no-underline px-4 py-1.5 rounded-full text-[0.8rem] font-medium border border-primary/15 text-warm-brown/60 hover:text-primary hover:border-primary/30 transition-all"
          >
            All
          </Link>
          {allTags.map((t) => (
            <Link
              key={t}
              href={`/blog/tag/${t}`}
              className={`no-underline px-4 py-1.5 rounded-full text-[0.8rem] font-medium transition-all ${
                t === tag
                  ? "bg-primary text-white border border-primary"
                  : "border border-primary/15 text-warm-brown/60 hover:text-primary hover:border-primary/30"
              }`}
            >
              {t}
            </Link>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-7">
          {posts.map((p, i) => (
            <Link
              key={p.slug}
              href={`/blog/${p.slug}`}
              className="no-underline"
            >
              <article
                className="rounded-[20px] overflow-hidden bg-white border border-black/[0.06] transition-all duration-400 hover:-translate-y-1.5 hover:shadow-[0_16px_48px_rgba(103,58,183,0.1)] animate-fadeInUp"
                style={{ animationDelay: `${i * 0.12}s` }}
              >
                <div
                  className={`h-1.5 bg-gradient-to-r ${TAG_GRADIENTS[p.tag] || "from-primary to-primary-light"}`}
                />
                <div className="p-8 px-7">
                  <div className="inline-block px-3 py-1 rounded-full bg-light-sand text-[0.72rem] font-semibold text-primary uppercase tracking-[0.06em] mb-4">
                    {p.tag}
                  </div>
                  <h2 className="font-heading text-[1.2rem] font-bold text-primary-dark leading-[1.35] mb-3">
                    {p.title}
                  </h2>
                  <p className="text-[0.88rem] leading-[1.6] text-warm-brown/70 mb-5">
                    {p.excerpt}
                  </p>
                  <div className="flex justify-between items-center text-[0.78rem] text-warm-brown/50">
                    <span>
                      {new Date(p.date).toLocaleDateString("en-US", {
                        month: "short",
                        year: "numeric",
                      })}
                    </span>
                    <span>{p.readTime} read</span>
                  </div>
                </div>
              </article>
            </Link>
          ))}
        </div>

        <div className="text-center mt-16">
          <Link
            href="/blog"
            className="text-primary font-medium hover:text-primary-light transition-colors no-underline"
          >
            &larr; All articles
          </Link>
        </div>
      </div>
    </div>
  );
}
