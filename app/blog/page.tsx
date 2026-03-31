import Link from "next/link";
import type { Metadata } from "next";
import { getAllPosts } from "@/lib/blog";

export const revalidate = 300; // revalidate every 5 minutes

export const metadata: Metadata = {
  title: "Blog — Learn Punjabi Tips & Language Insights",
  description:
    "Tips, stories, and insights about learning Punjabi — Gurmukhi script guides, essential phrases, cultural context, and more from the Alfaazo journal.",
  alternates: {
    canonical: "https://alfaazo.com/blog",
  },
  openGraph: {
    title: "The Alfaazo Journal — Punjabi Language Tips & Insights",
    description:
      "Tips, stories, and insights about learning Punjabi and other South Asian languages.",
    url: "https://alfaazo.com/blog",
  },
};

const TAG_GRADIENTS: Record<string, string> = {
  Beginner: "from-primary to-primary-light",
  Culture: "from-primary-dark to-muted-sage",
  Script: "from-warm-brown to-blush",
};

export default async function BlogPage() {
  const posts = await getAllPosts();

  return (
    <div className="min-h-screen bg-cream">
      <div className="max-w-[1000px] mx-auto px-6 md:px-10 py-32">
        <div className="text-center mb-16">
          <h1 className="font-heading text-[clamp(2rem,4vw,3rem)] font-black text-primary-dark mb-4">
            The <span className="italic text-primary">Alfaazo</span> Journal
          </h1>
          <p className="text-[1.05rem] text-warm-brown/75 max-w-[460px] mx-auto">
            Tips, stories, and insights to fuel your language learning journey.
          </p>
        </div>

        {posts.length === 0 ? (
          <p className="text-center text-warm-brown/50">
            No posts yet — check back soon!
          </p>
        ) : (
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
        )}

        <div className="text-center mt-16">
          <Link
            href="/"
            className="text-primary font-medium hover:text-primary-light transition-colors"
          >
            &larr; Back to home
          </Link>
        </div>
      </div>
    </div>
  );
}
