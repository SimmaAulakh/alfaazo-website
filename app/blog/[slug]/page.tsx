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

  // Auto-generate keywords from title and tag
  const titleWords = post.title.toLowerCase().split(/[\s—:,]+/).filter(w => w.length > 3);
  const keywords = [
    "learn Punjabi",
    "Punjabi app",
    "Alfaazo",
    post.tag,
    ...titleWords,
  ];

  return {
    title: post.title,
    description: post.excerpt,
    keywords,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: "article",
      publishedTime: post.date,
      modifiedTime: post.date,
      authors: [post.author],
      url: `https://www.alfaazo.com/blog/${slug}`,
      siteName: "Alfaazo",
      locale: "en_US",
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.excerpt,
    },
    alternates: {
      canonical: `https://www.alfaazo.com/blog/${slug}`,
    },
  };
}

function stripHtml(html: string): string {
  return html
    .replace(/<[^>]+>/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&nbsp;/g, " ")
    .replace(/\s+/g, " ")
    .replace(/ ([.,!?;:])/g, "$1")
    .trim();
}

// Pulls FAQ question/answer pairs out of a post's HTML so they can be emitted as
// FAQPage structured data. Expects the house convention:
//   <h2>Frequently Asked Questions</h2> <h3>Question</h3> <p>Answer</p> ...
// Posts without that section simply yield no pairs (and no FAQ schema).
function extractFaqs(html: string): { question: string; answer: string }[] {
  const section = html.match(
    /<h2[^>]*>\s*Frequently Asked Questions\s*<\/h2>([\s\S]*?)(?=<h2[\s>]|$)/i
  );
  if (!section) return [];

  const faqs: { question: string; answer: string }[] = [];
  const pair = /<h3[^>]*>([\s\S]*?)<\/h3>([\s\S]*?)(?=<h3[\s>]|$)/gi;
  let match: RegExpExecArray | null;
  while ((match = pair.exec(section[1])) !== null) {
    const question = stripHtml(match[1]);
    const answer = stripHtml(match[2]);
    if (question && answer) faqs.push({ question, answer });
  }
  return faqs;
}

// Pulls ordered steps out of a "step-by-step" section so procedural posts can
// emit HowTo structured data. Convention: a heading containing "step by step"
// (or "step-by-step") followed by an <ol>; each <li> becomes a step. Posts
// without that pattern yield nothing (and no HowTo schema).
function extractHowToSteps(html: string): string[] {
  const section = html.match(
    /<h[23][^>]*>[^<]*step[\s-]?by[\s-]?step[^<]*<\/h[23]>([\s\S]*?)(?=<h2[\s>]|$)/i
  );
  if (!section) return [];

  const ol = section[1].match(/<ol[^>]*>([\s\S]*?)<\/ol>/i);
  if (!ol) return [];

  const steps: string[] = [];
  const li = /<li[^>]*>([\s\S]*?)<\/li>/gi;
  let match: RegExpExecArray | null;
  while ((match = li.exec(ol[1])) !== null) {
    const text = stripHtml(match[1]);
    if (text) steps.push(text);
  }
  return steps;
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
        image: `https://www.alfaazo.com/blog/${slug}/opengraph-image`,
        datePublished: post.date,
        dateModified: post.date,
        author: {
          "@type": "Person",
          name: post.author,
        },
        publisher: {
          "@type": "Organization",
          name: "Alfaazo",
          url: "https://www.alfaazo.com",
          logo: {
            "@type": "ImageObject",
            url: "https://www.alfaazo.com/logo.png",
          },
        },
        mainEntityOfPage: `https://www.alfaazo.com/blog/${slug}`,
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            name: "Home",
            item: "https://www.alfaazo.com",
          },
          {
            "@type": "ListItem",
            position: 2,
            name: "Blog",
            item: "https://www.alfaazo.com/blog",
          },
          {
            "@type": "ListItem",
            position: 3,
            name: post.title,
            item: `https://www.alfaazo.com/blog/${slug}`,
          },
        ],
      },
    ],
  };

  const faqs = extractFaqs(post.content);
  if (faqs.length > 0) {
    (articleJsonLd["@graph"] as Record<string, unknown>[]).push({
      "@type": "FAQPage",
      mainEntity: faqs.map((faq) => ({
        "@type": "Question",
        name: faq.question,
        acceptedAnswer: {
          "@type": "Answer",
          text: faq.answer,
        },
      })),
    });
  }

  const howToSteps = extractHowToSteps(post.content);
  if (howToSteps.length > 1) {
    (articleJsonLd["@graph"] as Record<string, unknown>[]).push({
      "@type": "HowTo",
      name: post.title,
      step: howToSteps.map((text, i) => ({
        "@type": "HowToStep",
        position: i + 1,
        text,
      })),
    });
  }

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
            <span>By {post.author}</span>
            <span>&middot;</span>
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

        {/* Excerpt Summary */}
        {post.excerpt && (
          <div className="mb-10 p-5 rounded-2xl bg-primary/5 border-l-4 border-primary/40">
            <p className="text-[0.95rem] text-warm-brown/70 leading-relaxed m-0 italic">
              {post.excerpt}
            </p>
          </div>
        )}

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
