import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { AUTHORS, getAuthorBySlug } from "@/lib/authors";
import { getAllPosts } from "@/lib/blog";

export const revalidate = 300;

export function generateStaticParams() {
  return AUTHORS.map((a) => ({ slug: a.slug }));
}

export const dynamicParams = false;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const author = getAuthorBySlug(slug);
  if (!author) return {};

  const url = `https://www.alfaazo.com/author/${author.slug}`;
  return {
    title: `${author.name} — ${author.role}`,
    description: author.bio,
    alternates: { canonical: url },
    openGraph: {
      title: `${author.name} — Alfaazo`,
      description: author.bio,
      url,
      siteName: "Alfaazo",
      type: "profile",
      locale: "en_US",
    },
  };
}

export default async function AuthorPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const author = getAuthorBySlug(slug);
  if (!author) notFound();

  const posts = (await getAllPosts())
    .filter((p) => p.author === author.name)
    .slice(0, 6);

  const profileJsonLd = {
    "@context": "https://schema.org",
    "@type": "ProfilePage",
    mainEntity: {
      "@type": "Person",
      name: author.name,
      url: `https://www.alfaazo.com/author/${author.slug}`,
      jobTitle: author.role,
      description: author.bio,
      worksFor: {
        "@type": "Organization",
        name: "Alfaazo",
        url: "https://www.alfaazo.com",
      },
      ...(author.sameAs && author.sameAs.length
        ? { sameAs: author.sameAs }
        : {}),
      ...(author.image ? { image: author.image } : {}),
    },
  };

  return (
    <div className="min-h-screen bg-cream">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(profileJsonLd) }}
      />

      <div className="max-w-[720px] mx-auto px-6 md:px-10 py-32">
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
            <li className="text-warm-brown/60">{author.name}</li>
          </ol>
        </nav>

        <p className="text-primary text-sm font-semibold uppercase tracking-[0.08em] mb-3">
          {author.role}
        </p>
        <h1 className="font-heading text-[clamp(2rem,4vw,2.8rem)] font-black text-primary-dark leading-tight mb-6">
          {author.name}
        </h1>

        <div className="prose-alfaazo">
          <p className="text-[1.1rem] leading-relaxed">{author.bio}</p>
        </div>

        {author.sameAs && author.sameAs.length > 0 && (
          <div className="mt-6 flex flex-wrap gap-4">
            {author.sameAs.map((link) => (
              <a
                key={link}
                href={link}
                target="_blank"
                rel="noopener noreferrer me"
                className="text-primary text-sm font-medium hover:text-primary-light transition-colors"
              >
                {new URL(link).hostname.replace(/^www\./, "")}
              </a>
            ))}
          </div>
        )}

        {/* Latest articles by this author */}
        {posts.length > 0 && (
          <div className="mt-14 pt-10 border-t border-primary/12">
            <h2 className="font-heading text-[1.3rem] font-bold text-primary-dark mb-6">
              Latest articles by {author.name}
            </h2>
            <div className="grid gap-4">
              {posts.map((p) => (
                <Link
                  key={p.slug}
                  href={`/blog/${p.slug}`}
                  className="group block p-5 rounded-2xl bg-light-sand/60 border border-primary/6 no-underline hover:border-primary/15 hover:bg-light-sand transition-all duration-300"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <span className="inline-block px-2 py-0.5 rounded-full bg-primary/10 text-[0.65rem] font-semibold text-primary uppercase tracking-[0.05em] mb-2">
                        {p.tag}
                      </span>
                      <h3 className="text-[0.95rem] font-semibold text-ink group-hover:text-primary transition-colors leading-snug">
                        {p.title}
                      </h3>
                      <p className="text-[0.8rem] text-warm-brown/50 mt-1 line-clamp-1">
                        {p.excerpt}
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

        <div className="mt-10 pt-8 border-t border-primary/12 text-center">
          <Link
            href="/blog"
            className="text-primary font-medium hover:text-primary-light transition-colors no-underline"
          >
            &larr; Back to the journal
          </Link>
        </div>
      </div>
    </div>
  );
}
