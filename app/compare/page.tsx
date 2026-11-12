import Link from "next/link";
import type { Metadata } from "next";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import { SITE_URL } from "@/lib/appFacts";
import { CHECKED, COMPARISONS, COMPARE_URL } from "@/lib/compare";

export const revalidate = 86400;

const TITLE = "Alfaazo compared with Ling, Pimsleur and Duolingo for Punjabi";
const DESCRIPTION =
  "Side-by-side comparisons of Alfaazo with the other apps people consider for Punjabi: Ling, Pimsleur and Duolingo. Script, audio, course size, free plans, prices and ratings, checked November 2026.";

export const metadata: Metadata = {
  title: { absolute: `${TITLE} — Alfaazo` },
  description: DESCRIPTION,
  alternates: { canonical: COMPARE_URL },
  openGraph: { title: TITLE, description: DESCRIPTION, url: COMPARE_URL, siteName: "Alfaazo", type: "website", locale: "en_US" },
};

export default function ComparePage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      { "@type": "CollectionPage", "@id": `${COMPARE_URL}#webpage`, url: COMPARE_URL, name: TITLE, description: DESCRIPTION, isPartOf: { "@type": "WebSite", name: "Alfaazo", url: SITE_URL } },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
          { "@type": "ListItem", position: 2, name: "Compare", item: COMPARE_URL },
        ],
      },
      {
        "@type": "ItemList",
        itemListElement: COMPARISONS.map((c, i) => ({ "@type": "ListItem", position: i + 1, name: c.name, url: `${COMPARE_URL}/${c.slug}` })),
      },
    ],
  };

  return (
    <div className="min-h-screen bg-cream">
      <Nav />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <main className="max-w-[760px] mx-auto px-6 md:px-10 py-32">
        <nav aria-label="Breadcrumb" className="mb-6">
          <ol className="flex items-center gap-2 text-[0.78rem] text-warm-brown/40">
            <li><Link href="/" className="hover:text-primary transition-colors no-underline">Home</Link></li>
            <li>/</li>
            <li className="text-warm-brown/60">Compare</li>
          </ol>
        </nav>
        <h1 className="font-heading text-[clamp(2rem,4vw,2.8rem)] font-black text-primary-dark leading-tight mb-6">
          Alfaazo compared with the other Punjabi apps
        </h1>
        <div className="prose-alfaazo">
          <p className="text-[1.1rem] leading-relaxed">
            <strong>Three honest, fact-by-fact comparisons</strong> of Alfaazo with the apps people weigh it against for Punjabi. Each page has a side-by-side table, where the other app is better, where Alfaazo is better, and who should pick which. Alfaazo is our app, so we have put the competitor&rsquo;s strengths first and linked every source; facts were checked on {CHECKED}.
          </p>
          <ul>
            {COMPARISONS.map((c) => (
              <li key={c.slug}>
                <strong><Link href={`/compare/${c.slug}`}>{c.name} for Punjabi</Link></strong> — {c.quickAnswer.split(". ")[0]}.
              </li>
            ))}
          </ul>
          <p>
            For the full field, including uTalk, Mango Languages, Bluebird and Memrise, read{" "}
            <Link href="/blog/best-app-to-learn-punjabi-2026">the best apps to learn Punjabi in 2026</Link> and{" "}
            <Link href="/blog/which-language-apps-have-punjabi">which language apps have Punjabi</Link>. What Alfaazo itself teaches is on <Link href="/app">the app page</Link>; prices are on <Link href="/pricing">the pricing page</Link>.
          </p>
        </div>
      </main>
      <Footer />
    </div>
  );
}
