import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getAllSlugs, getPostBySlug, getRecentPosts } from "@/lib/blog";

export const revalidate = 300;

export async function generateStaticParams() {
  const slugs = await getAllSlugs();
  return slugs.map((slug) => ({ slug }));
}

export const dynamicParams = true;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  if (!post) return {};

  return {
    title: post.title,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: "article",
      publishedTime: post.date,
      authors: ["Codefeb"],
      url: `https://alfaazo.com/blog/${slug}`,
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.excerpt,
    },
    alternates: {
      canonical: `https://alfaazo.com/blog/${slug}`,
    },
  };
}

export default async function BlogPost({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  if (!post) notFound();

  const allRecent = await getRecentPosts(4);
  const relatedPosts = allRecent.filter((p) => p.slug !== slug).slice(0, 3);

  const articleJsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Article",
        headline: post.title,
        description: post.excerpt,
        datePublished: post.date,
        author: {
          "@type": "Organization",
          name: "Codefeb",
          url: "https://codefeb.com",
        },
        publisher: {
          "@type": "Organization",
          name: "Alfaazo",
          url: "https://alfaazo.com",
          logo: {
            "@type": "ImageObject",
            url: "https://alfaazo.com/logo.png",
          },
        },
        mainEntityOfPage: `https://alfaazo.com/blog/${slug}`,
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            name: "Home",
            item: "https://alfaazo.com",
          },
          {
            "@type": "ListItem",
            position: 2,
            name: "Blog",
            item: "https://alfaazo.com/blog",
          },
          {
            "@type": "ListItem",
            position: 3,
            name: post.title,
            item: `https://alfaazo.com/blog/${slug}`,
          },
        ],
      },
    ],
  };

  return (
    <div className="min-h-screen bg-cream">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
      />
      <article className="max-w-[720px] mx-auto px-6 md:px-10 py-32">
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
            <li className="text-warm-brown/60 truncate max-w-[200px]">
              {post.title}
            </li>
          </ol>
        </nav>

        {/* Header */}
        <div className="mb-12">
          <Link
            href="/blog"
            className="text-primary text-sm font-medium hover:text-primary-light transition-colors no-underline"
          >
            &larr; Back to journal
          </Link>

          <div className="mt-8 mb-4">
            <span className="inline-block px-3 py-1 rounded-full bg-primary/12 text-[0.72rem] font-semibold text-primary uppercase tracking-[0.06em]">
              {post.tag}
            </span>
          </div>

          <h1 className="font-heading text-[clamp(2rem,4vw,2.8rem)] font-black text-primary-dark leading-tight mb-4">
            {post.title}
          </h1>

          <div className="flex gap-4 text-sm text-warm-brown/50">
            <span>
              {new Date(post.date).toLocaleDateString("en-US", {
                month: "long",
                day: "numeric",
                year: "numeric",
              })}
            </span>
            <span>&middot;</span>
            <span>{post.readTime} read</span>
          </div>
        </div>

        {/* Blog Content */}
        <div
          className="prose-alfaazo"
          dangerouslySetInnerHTML={{ __html: post.content }}
        />

        {/* Related Posts */}
        {relatedPosts.length > 0 && (
          <div className="mt-16 pt-10 border-t border-primary/12">
            <h3 className="font-heading text-[1.3rem] font-bold text-primary-dark mb-6">
              Keep reading
            </h3>
            <div className="grid gap-4">
              {relatedPosts.map((rp) => (
                <Link
                  key={rp.slug}
                  href={`/blog/${rp.slug}`}
                  className="group block p-5 rounded-2xl bg-light-sand/60 border border-primary/6 no-underline hover:border-primary/15 hover:bg-light-sand transition-all duration-300"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <span className="inline-block px-2 py-0.5 rounded-full bg-primary/10 text-[0.65rem] font-semibold text-primary uppercase tracking-[0.05em] mb-2">
                        {rp.tag}
                      </span>
                      <h4 className="text-[0.95rem] font-semibold text-ink group-hover:text-primary transition-colors leading-snug">
                        {rp.title}
                      </h4>
                      <p className="text-[0.8rem] text-warm-brown/50 mt-1 line-clamp-1">
                        {rp.excerpt}
                      </p>
                    </div>
                    <span className="text-primary/40 group-hover:text-primary group-hover:translate-x-1 transition-all mt-2 text-lg shrink-0">
                      →
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* Footer nav */}
        <div className="mt-10 pt-8 border-t border-primary/12 text-center">
          <Link
            href="/blog"
            className="text-primary font-medium hover:text-primary-light transition-colors no-underline"
          >
            &larr; More from the journal
          </Link>
        </div>
      </article>
    </div>
  );
}
