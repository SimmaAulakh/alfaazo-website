import Link from "next/link";

const posts = [
  {
    tag: "Beginner",
    title: "10 Essential Punjabi Phrases Every Beginner Should Know",
    excerpt:
      "Start your Punjabi journey with the everyday phrases that locals actually use — from greetings to bargaining at the market.",
    date: "Mar 2026",
    readTime: "5 min",
    slug: "10-essential-punjabi-phrases",
    accentColor: "bg-primary",
  },
  {
    tag: "Culture",
    title: "Why Learning Your Mother Tongue Matters in 2026",
    excerpt:
      "In a globalized world, reconnecting with your heritage language is more than nostalgia — it's identity.",
    date: "Mar 2026",
    readTime: "7 min",
    slug: "why-learning-mother-tongue-matters",
    accentColor: "bg-muted-sage",
  },
  {
    tag: "Script",
    title: "Gurmukhi vs Shahmukhi: Understanding Punjabi's Two Scripts",
    excerpt:
      "The same language, two beautiful writing systems. Here's how they work and why both matter.",
    date: "Coming Soon",
    readTime: "6 min",
    slug: "gurmukhi-vs-shahmukhi",
    accentColor: "bg-xp-gold",
  },
];

export default function BlogSection() {
  return (
    <section id="blog" className="py-28 px-6 md:px-12 relative">
      {/* Divider */}
      <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-primary/15 to-transparent" />

      <div className="max-w-[1200px] mx-auto">
        {/* Header */}
        <div className="flex items-end justify-between mb-14 gap-8 flex-wrap">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="h-[1px] w-8 bg-gradient-to-r from-primary to-transparent" />
              <span className="text-primary text-[0.72rem] font-semibold tracking-[0.18em] uppercase">
                Journal
              </span>
            </div>
            <h2 className="font-heading text-[clamp(2.2rem,4vw,3.2rem)] font-black text-ink leading-[1.05] tracking-tight">
              From the
              <br />
              <span className="italic text-primary">Alfaazo</span> journal
            </h2>
          </div>
          <Link
            href="/blog"
            className="text-[0.85rem] text-primary font-medium no-underline hover:text-primary-dark transition-colors flex items-center gap-1.5"
          >
            View all
            <span className="text-lg leading-none">&rarr;</span>
          </Link>
        </div>

        {/* Featured + cards grid */}
        <div className="grid grid-cols-1 lg:grid-cols-[1.3fr_1fr] gap-4">
          {/* Featured post — large */}
          <Link href={`/blog/${posts[0].slug}`} className="no-underline">
            <article
              className="group h-full rounded-2xl overflow-hidden bg-surface border border-black/[0.04] transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_20px_60px_rgba(103,58,183,0.08)] animate-fadeInUp"
            >
              {/* Accent bar */}
              <div className={`h-1 ${posts[0].accentColor}`} />
              <div className="p-10">
                <div className="inline-block px-3 py-1 rounded-full bg-primary/8 text-[0.7rem] font-semibold text-primary uppercase tracking-[0.08em] mb-6">
                  {posts[0].tag}
                </div>
                <h3 className="font-heading text-[1.5rem] font-bold text-ink leading-[1.3] mb-4 group-hover:text-primary-dark transition-colors duration-300">
                  {posts[0].title}
                </h3>
                <p className="text-[0.95rem] leading-[1.7] text-warm-brown/60 mb-8">
                  {posts[0].excerpt}
                </p>
                <div className="flex justify-between items-center text-[0.78rem] text-warm-brown/40">
                  <span>{posts[0].date}</span>
                  <span>{posts[0].readTime} read</span>
                </div>
              </div>
            </article>
          </Link>

          {/* Smaller posts stack */}
          <div className="flex flex-col gap-4">
            {posts.slice(1).map((p, i) => (
              <Link
                key={i}
                href={`/blog/${p.slug}`}
                className="no-underline"
              >
                <article
                  className="group rounded-2xl overflow-hidden bg-surface border border-black/[0.04] transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_16px_48px_rgba(103,58,183,0.08)] animate-fadeInUp"
                  style={{ animationDelay: `${(i + 1) * 0.1}s` }}
                >
                  <div className={`h-1 ${p.accentColor}`} />
                  <div className="p-7">
                    <div className="flex items-center gap-3 mb-3">
                      <span className="inline-block px-2.5 py-0.5 rounded-full bg-primary/8 text-[0.65rem] font-semibold text-primary uppercase tracking-[0.08em]">
                        {p.tag}
                      </span>
                      <span className="text-[0.72rem] text-warm-brown/35">{p.readTime} read</span>
                    </div>
                    <h3 className="font-heading text-[1.05rem] font-bold text-ink leading-[1.35] mb-2 group-hover:text-primary-dark transition-colors duration-300">
                      {p.title}
                    </h3>
                    <p className="text-[0.82rem] leading-[1.6] text-warm-brown/55">
                      {p.excerpt}
                    </p>
                  </div>
                </article>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
