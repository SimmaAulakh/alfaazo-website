import Link from "next/link";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";

// UI for notFound() and unmatched URLs. The <title>/robots for a missing post
// or author come from that route's generateMetadata (a plain not-found.tsx
// cannot set metadata; only the experimental global-not-found can).
export default function NotFound() {
  return (
    <div className="min-h-screen bg-cream">
      <Nav />
      <main className="max-w-[720px] mx-auto px-6 md:px-10 py-32 text-center">
        <p className="text-[0.78rem] font-semibold uppercase tracking-[0.12em] text-primary/70 mb-4">
          404
        </p>
        <h1 className="font-heading text-[clamp(2rem,4vw,2.8rem)] font-black text-primary-dark leading-tight mb-4">
          We couldn&rsquo;t find that page
        </h1>
        <p className="text-warm-brown/70 leading-relaxed mb-10">
          The link may be old or mistyped. The journal has every guide we&rsquo;ve
          published, from greetings to Gurmukhi.
        </p>
        <div className="flex flex-wrap justify-center gap-3">
          <Link
            href="/blog"
            className="no-underline inline-flex items-center rounded-full bg-primary text-white font-semibold text-[0.9rem] px-6 py-3 shadow-[0_4px_16px_rgba(103,58,183,0.28)] hover:bg-primary-dark transition-colors"
          >
            Browse the journal
          </Link>
          <Link
            href="/"
            className="no-underline inline-flex items-center rounded-full border border-primary/20 text-primary-dark font-semibold text-[0.9rem] px-6 py-3 hover:bg-primary/5 transition-colors"
          >
            Go home
          </Link>
        </div>
      </main>
      <Footer />
    </div>
  );
}
