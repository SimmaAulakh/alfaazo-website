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
    "@graph": [
      {
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
            name: meta.title,
            item: `https://alfaazo.com/blog/${slug}`,
          },
        ],
      },
    ],
  };

  // Related posts (exclude current)
  const relatedSlugs = BLOG_SLUGS.filter((s) => s !== slug).slice(0, 3);

  const relatedPosts = await Promise.all(
    relatedSlugs.map(async (s) => {
      const mod = await import(`@/content/blog/${s}.mdx`);
      return { slug: s, ...mod.metadata } as BlogMeta;
    })
  );

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
            <li><Link href="/" className="hover:text-primary transition-colors no-underline">Home</Link></li>
            <li>/</li>
            <li><Link href="/blog" className="hover:text-primary transition-colors no-underline">Blog</Link></li>
            <li>/</li>
            <li className="text-warm-brown/60 truncate max-w-[200px]">{meta.title}</li>
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

        {/* Related Posts */}
        {relatedPosts.length > 0 && (
          <div className="mt-16 pt-10 border-t border-primary/12">
            <h3 className="font-heading text-[1.3rem] font-bold text-primary-dark mb-6">Keep reading</h3>
            <div className="grid gap-4">
              {relatedPosts.map((post) => (
                <Link
                  key={post.slug}
                  href={`/blog/${post.slug}`}
                  className="group block p-5 rounded-2xl bg-light-sand/60 border border-primary/6 no-underline hover:border-primary/15 hover:bg-light-sand transition-all duration-300"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <span className="inline-block px-2 py-0.5 rounded-full bg-primary/10 text-[0.65rem] font-semibold text-primary uppercase tracking-[0.05em] mb-2">
                        {post.tag}
                      </span>
                      <h4 className="text-[0.95rem] font-semibold text-ink group-hover:text-primary transition-colors leading-snug">
                        {post.title}
                      </h4>
                      <p className="text-[0.8rem] text-warm-brown/50 mt-1 line-clamp-1">{post.excerpt}</p>
                    </div>
                    <span className="text-primary/40 group-hover:text-primary group-hover:translate-x-1 transition-all mt-2 text-lg shrink-0">→</span>
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
