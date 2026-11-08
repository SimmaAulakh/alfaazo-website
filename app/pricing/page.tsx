import Link from "next/link";
import type { Metadata } from "next";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import StoreButtons from "@/components/StoreButtons";
import { APP, PRICE_TEXT, SITE_URL } from "@/lib/appFacts";

const URL = `${SITE_URL}/pricing`;
const TITLE = "Alfaazo pricing — free plan and Alfaazo Plus";
const DESCRIPTION = `Alfaazo is free to download. The free plan covers ${APP.free.unitsText}; Alfaazo Plus (US$${APP.plus.monthlyUsd}/month, US$${APP.plus.yearlyUsd}/year or US$${APP.plus.lifetimeUsd} lifetime) unlocks all ${APP.lessons} lessons and removes ads.`;

export const metadata: Metadata = {
  title: { absolute: TITLE },
  description: DESCRIPTION,
  alternates: { canonical: URL },
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    url: URL,
    siteName: "Alfaazo",
    type: "website",
    locale: "en_US",
  },
};

const usd = (n: number) => `US$${n % 1 === 0 ? n : n.toFixed(2)}`;

const PLANS = [
  { name: "Monthly", price: usd(APP.plus.monthlyUsd), per: "per month", note: "Renews monthly; cancel any time." },
  { name: "Yearly", price: usd(APP.plus.yearlyUsd), per: "per year", note: `About ${usd(Math.round((APP.plus.yearlyUsd / 12) * 100) / 100)} a month.` },
  { name: "Lifetime", price: usd(APP.plus.lifetimeUsd), per: "one payment", note: "Pay once, keep Plus for good." },
];

const COMPARISON: [string, string, string][] = [
  ["Course units", "Limited — Section 1 and the first two units of Section 2", `Full access — all ${APP.lessons} lessons`],
  ["New lessons a day", `${APP.free.newLessonsPerDay} (${APP.free.firstDayNewLessons} on your first day)`, "Unlimited"],
  ["Start Section 2", "After finishing Section 1", "Straight away"],
  ["Skip ahead within a unit", "—", "Yes"],
  ["Replay finished lessons", "Unlimited", "Unlimited"],
  ["Gurmukhi alphabet guides", "Included", "Included"],
  ["Native-speaker audio", "Included", "Included"],
  ["Ads", "Ad-supported", "No ads"],
];

const FAQ = [
  {
    q: "Is Alfaazo free?",
    a: `Yes, Alfaazo is free to download, and the free plan is a real course: ${APP.free.unitsText}, at ${APP.free.newLessonsPerDay} new lessons a day. It is ad-supported. ${APP.plus.name} is optional.`,
  },
  {
    q: "What does Alfaazo Plus cost?",
    a: PRICE_TEXT,
  },
  {
    q: "What do I get with Alfaazo Plus?",
    a: APP.plus.benefits.join("; ") + ".",
  },
  {
    q: "Does the free plan have ads?",
    a: "Yes. The free plan shows ads between lessons. Alfaazo Plus removes them.",
  },
  {
    q: "How do I cancel Alfaazo Plus?",
    a: "Subscriptions are managed by Apple or Google, not by us: cancel in your Apple ID subscriptions (Settings → your name → Subscriptions) or in Google Play (Payments & subscriptions). The lifetime plan is a one-time purchase with nothing to cancel.",
  },
  {
    q: "Can I restore a purchase on a new phone?",
    a: "Yes. Sign in with the same Apple ID or Google account and tap Restore on the Alfaazo Plus screen in the app.",
  },
];

export default function PricingPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        url: URL,
        name: TITLE,
        description: DESCRIPTION,
        about: { "@id": `${SITE_URL}/#app-ios` },
        isPartOf: { "@type": "WebSite", name: "Alfaazo", url: SITE_URL },
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
          { "@type": "ListItem", position: 2, name: "Pricing", item: URL },
        ],
      },
      {
        "@type": "FAQPage",
        mainEntity: FAQ.map((f) => ({
          "@type": "Question",
          name: f.q,
          acceptedAnswer: { "@type": "Answer", text: f.a },
        })),
      },
    ],
  };

  return (
    <div className="min-h-screen bg-cream">
      <Nav />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <main className="max-w-[760px] mx-auto px-6 md:px-10 py-32">
        <nav aria-label="Breadcrumb" className="mb-6">
          <ol className="flex items-center gap-2 text-[0.78rem] text-warm-brown/40">
            <li>
              <Link href="/" className="hover:text-primary transition-colors no-underline">
                Home
              </Link>
            </li>
            <li>/</li>
            <li className="text-warm-brown/60">Pricing</li>
          </ol>
        </nav>

        <h1 className="font-heading text-[clamp(2rem,4vw,2.8rem)] font-black text-primary-dark leading-tight mb-6">
          Alfaazo pricing: free plan and Alfaazo Plus
        </h1>

        <div className="prose-alfaazo">
          <p className="text-[1.1rem] leading-relaxed">
            <strong>
              Alfaazo is free to download on iOS and Android. The free plan includes {APP.free.unitsText}, with {APP.free.newLessonsPerDay} new lessons a day, and is ad-supported. {APP.plus.name} unlocks all {APP.lessons} lessons, removes the daily limit and the ads, and costs {usd(APP.plus.monthlyUsd)} a month, {usd(APP.plus.yearlyUsd)} a year or {usd(APP.plus.lifetimeUsd)} once.
            </strong>
          </p>
          <p className="text-[0.9rem] text-warm-brown/60">
            Prices are the US App Store list prices and vary by country and store. Last checked 9 November 2026.
          </p>

          <h2>Free vs Alfaazo Plus</h2>
          <table>
            <thead>
              <tr>
                <th></th>
                <th>Free</th>
                <th>{APP.plus.name}</th>
              </tr>
            </thead>
            <tbody>
              {COMPARISON.map(([k, f, p]) => (
                <tr key={k}>
                  <th scope="row" className="text-left align-top">{k}</th>
                  <td>{f}</td>
                  <td>{p}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <p className="text-[0.9rem] text-warm-brown/60">
            The free plan above applies to new accounts; earlier accounts keep the rules they signed up with.
          </p>

          <h2>Alfaazo Plus plans</h2>
          <div className="not-prose grid gap-4 sm:grid-cols-3 my-6">
            {PLANS.map((p) => (
              <div key={p.name} className="rounded-2xl border border-primary/12 bg-white/60 p-5">
                <div className="text-[0.72rem] font-semibold uppercase tracking-[0.1em] text-primary/70">{p.name}</div>
                <div className="font-heading text-[1.8rem] font-black text-primary-dark leading-tight mt-2">{p.price}</div>
                <div className="text-[0.8rem] text-warm-brown/60">{p.per}</div>
                <p className="text-[0.85rem] text-warm-brown/70 mt-3 m-0">{p.note}</p>
              </div>
            ))}
          </div>
          <p>
            Plus is bought inside the app through the App Store or Google Play. Every plan unlocks the same things:
          </p>
          <ul>
            {APP.plus.benefits.map((b) => (
              <li key={b}>{b}</li>
            ))}
          </ul>

          <h2>Frequently asked questions</h2>
          {FAQ.map((f) => (
            <div key={f.q}>
              <h3>{f.q}</h3>
              <p>{f.a}</p>
            </div>
          ))}

          <h2>Start free</h2>
          <p>
            Download the app, finish Section 1 and decide about Plus later. Not sure Alfaazo is the right app? Read{" "}
            <Link href="/app">what the app teaches</Link> or our{" "}
            <Link href="/blog/best-app-to-learn-punjabi-2026">comparison of Punjabi learning apps</Link>.
          </p>
          <StoreButtons placement="pricing_page" className="not-prose mt-6" />
        </div>
      </main>
      <Footer />
    </div>
  );
}
