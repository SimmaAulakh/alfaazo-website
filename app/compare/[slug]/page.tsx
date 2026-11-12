import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import StoreButtons from "@/components/StoreButtons";
import { APP, SITE_URL, getAppStoreRating } from "@/lib/appFacts";
import { CHECKED, COMPARISONS, COMPARE_URL, alfaazoRating, getComparison } from "@/lib/compare";

// One page per competitor. The quick answer is the first body text so answer
// engines quote the verdict; the table and the two "better" lists carry the
// facts, with the competitor's strengths listed first.
export const revalidate = 86400;
export const dynamicParams = false;

export function generateStaticParams() {
  return COMPARISONS.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const c = getComparison(slug);
  if (!c) return { title: "Page not found", robots: { index: false, follow: true } };
  const url = `${COMPARE_URL}/${c.slug}`;
  return {
    title: { absolute: `${c.metaTitle} — Alfaazo` },
    description: c.description,
    alternates: { canonical: url },
    openGraph: { title: c.title, description: c.description, url, siteName: "Alfaazo", type: "article", locale: "en_US" },
    twitter: { card: "summary_large_image", title: c.title, description: c.description },
  };
}

export default async function ComparisonPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const c = getComparison(slug);
  if (!c) notFound();

  const rating = await getAppStoreRating();
  const url = `${COMPARE_URL}/${c.slug}`;
  const rows = c.rows.map((r) => ({ ...r, alfaazo: r.alfaazo === "__RATING__" ? alfaazoRating(rating) : r.alfaazo }));

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        "@id": `${url}#webpage`,
        url,
        name: c.title,
        description: c.description,
        dateModified: "2026-11-12",
        about: { "@id": `${SITE_URL}/#app-ios` },
        isPartOf: { "@type": "WebSite", name: "Alfaazo", url: SITE_URL },
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
          { "@type": "ListItem", position: 2, name: "Compare", item: COMPARE_URL },
          { "@type": "ListItem", position: 3, name: c.name, item: url },
        ],
      },
      {
        "@type": "FAQPage",
        mainEntity: c.faq.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
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
            <li><Link href="/compare" className="hover:text-primary transition-colors no-underline">Compare</Link></li>
            <li>/</li>
            <li className="text-warm-brown/60">{c.name}</li>
          </ol>
        </nav>

        <h1 className="font-heading text-[clamp(2rem,4vw,2.8rem)] font-black text-primary-dark leading-tight mb-6">
          {c.title}
        </h1>

        <div className="quick-answer mb-10 p-5 md:p-6 rounded-2xl bg-primary/5 border-l-4 border-primary/40">
          <p className="m-0 mb-2 text-[0.7rem] font-semibold uppercase tracking-[0.1em] text-primary">Quick answer</p>
          <p className="m-0 text-[1.05rem] text-ink leading-relaxed">{c.quickAnswer}</p>
        </div>

        <div className="prose-alfaazo">
          <p>{c.intro}</p>
          <p className="text-[0.9rem] text-warm-brown/60">
            <em>Disclosure: Alfaazo is our app. Facts about {c.short} come from its own pages and the US App Store, checked on {CHECKED}, and are linked at the end; if something is out of date, <Link href="/contact">tell us</Link> and we will fix it.</em>
          </p>

          <StoreButtons placement="compare_page" className="not-prose my-8" />

          <h2>Alfaazo vs {c.short}: side by side</h2>
          <table>
            <thead>
              <tr>
                <th scope="col" className="text-left">Feature</th>
                <th scope="col" className="text-left">Alfaazo</th>
                <th scope="col" className="text-left">{c.short}</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((r) => (
                <tr key={r.label}>
                  <th scope="row" className="text-left align-top whitespace-nowrap">{r.label}</th>
                  <td className="align-top">{r.alfaazo}</td>
                  <td className="align-top">{r.other}</td>
                </tr>
              ))}
            </tbody>
          </table>

          <h2>Where {c.short} is better</h2>
          <ul>{c.otherBetter.map((s) => <li key={s}>{s}</li>)}</ul>

          <h2>Where Alfaazo is better</h2>
          <ul>{c.alfaazoBetter.map((s) => <li key={s}>{s}</li>)}</ul>

          <h2>Which should you pick?</h2>
          <p><strong>Pick {c.short} if</strong> {c.pickOther}</p>
          <p><strong>Pick Alfaazo if</strong> {c.pickAlfaazo}</p>

          <h2>Frequently asked questions</h2>
          {c.faq.map((f) => (
            <div key={f.q}>
              <h3>{f.q}</h3>
              <p>{f.a}</p>
            </div>
          ))}

          <h2>Read next</h2>
          <ul>
            {c.related.map((r) => <li key={r.href}><Link href={r.href}>{r.label}</Link></li>)}
            {COMPARISONS.filter((o) => o.slug !== c.slug).map((o) => (
              <li key={o.slug}><Link href={`/compare/${o.slug}`}>{o.name} for Punjabi</Link></li>
            ))}
            <li><Link href="/app">What Alfaazo teaches: the full fact sheet</Link></li>
            <li><Link href="/pricing">Alfaazo pricing: free plan vs Plus</Link></li>
          </ul>

          <h2>Sources</h2>
          <ul>
            {c.sources.map((s) => (
              <li key={s.url}><a href={s.url} target="_blank" rel="noopener noreferrer">{s.label}</a></li>
            ))}
          </ul>
          <p className="text-[0.9rem] text-warm-brown/60">Checked {CHECKED}. Prices are US list prices and vary by country and store; Alfaazo&rsquo;s current version is {APP.version}.</p>

          <h2>Try Alfaazo</h2>
          <p>Free to download on iPhone, iPad and Android, with {APP.free.unitsText} at no cost.</p>
          <StoreButtons placement="compare_page" className="not-prose mt-6" />
        </div>
      </main>
      <Footer />
    </div>
  );
}
