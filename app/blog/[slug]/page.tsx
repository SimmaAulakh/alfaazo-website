import Link from "next/link";
import type { Metadata } from "next";

interface BlogMeta {
  title: string;
  excerpt: string;
  date: string;
  tag: string;
  readTime: string;
  slug: string;
}

const BLOG_SLUGS = [
  "10-essential-punjabi-phrases",
  "why-learning-mother-tongue-matters",
  "gurmukhi-vs-shahmukhi",
  "how-to-say-thank-you-in-punjabi",
  "beginners-guide-gurmukhi-alphabet",
  "punjabi-greetings-hello-goodbye",
  "is-punjabi-hard-to-learn",
  "punjabi-vs-hindi-difference",
];

export function generateStaticParams() {
  return BLOG_SLUGS.map((slug) => ({ slug }));
}

export const dynamicParams = false;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const mod = await import(`@/content/blog/${slug}.mdx`);
  const meta: BlogMeta = mod.metadata;

  return {
    title: meta.title,
    description: meta.excerpt,
    openGraph: {
      title: meta.title,
      description: meta.excerpt,
      type: "article",
      publishedTime: meta.date,
      authors: ["Codefeb"],
      url: `https://alfaazo.com/blog/${slug}`,
    },
    twitter: {
      card: "summary_large_image",
      title: meta.title,
      description: meta.excerpt,
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
  const { default: Post, metadata } = await import(
    `@/content/blog/${slug}.mdx`
  );
  const meta: BlogMeta = metadata;

  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: meta.title,
    description: meta.excerpt,
    datePublished: meta.date,
    author: {
      "@type": "Organization",
      name: "Codefeb",
      url: "https://codefeb.com",
    },
    publisher: {
      "@type": "Organization",
      name: "Alfaazo",
      url: "https://alfaazo.com",
    },
    mainEntityOfPage: `https://alfaazo.com/blog/${slug}`,
  };

  return (
    <div className="min-h-screen bg-cream">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
      />
      <article className="max-w-[720px] mx-auto px-6 md:px-10 py-32">
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
              {meta.tag}
            </span>
          </div>

          <h1 className="font-heading text-[clamp(2rem,4vw,2.8rem)] font-black text-primary-dark leading-tight mb-4">
            {meta.title}
          </h1>

          <div className="flex gap-4 text-sm text-warm-brown/50">
            <span>
              {new Date(meta.date).toLocaleDateString("en-US", {
                month: "long",
                day: "numeric",
                year: "numeric",
              })}
            </span>
            <span>&middot;</span>
            <span>{meta.readTime} read</span>
          </div>
        </div>

        {/* MDX Content */}
        <div className="prose-alfaazo">
          <Post />
        </div>

        {/* Footer nav */}
        <div className="mt-16 pt-8 border-t border-primary/12 text-center">
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
