import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import {
  APP,
  ONE_LINER,
  PRICE_TEXT,
  SCREENSHOTS,
  SITE_URL,
  getAppStoreRating,
} from "@/lib/appFacts";

// Press kit: boilerplate copy, checked facts, founder, downloadable assets and
// how to reach us. Everything numeric comes from appFacts so it matches /app.
export const revalidate = 86400;

const URL = `${SITE_URL}/press`;
const TITLE = "Alfaazo press kit — facts, boilerplate, logo and screenshots";
const DESCRIPTION =
  "Press kit for Alfaazo, the Punjabi learning app: one-line and 100-word boilerplate, checked facts, founder details, logo and screenshots free to use in coverage, and how to request a review copy.";
const UPDATED = "12 November 2026";

export const metadata: Metadata = {
  title: { absolute: TITLE },
  description: DESCRIPTION,
  alternates: { canonical: URL },
  openGraph: { title: TITLE, description: DESCRIPTION, url: URL, siteName: "Alfaazo", type: "website", locale: "en_US" },
};

const BOILERPLATE_100 = `Alfaazo is a Punjabi-only language-learning app for iOS and Android. It teaches the Gurmukhi script stroke by stroke from the first lesson, then ${APP.vocabulary} everyday words and phrases across ${APP.lessons} bite-sized lessons in ${APP.units} units, every one recorded by native Punjabi speakers. It is built for heritage speakers in Canada, the UK, the United States and Australia who understand Punjabi but cannot read or speak it with confidence, and for complete beginners. Alfaazo is free to download, with ${APP.free.unitsText} available at no cost; ${APP.plus.name} unlocks the full course. It is made by ${APP.developer} at ${APP.studio} and was released in March 2026.`;

const ASSETS = [
  { href: "/logo.png", label: "Alfaazo logo, 1024 × 1024 (PNG)", note: "The A-mark with the wordmark on a light lavender background. Vector and transparent versions on request." },
  { href: "/icon-512.png", label: "App icon, 512 × 512 (PNG)", note: "The rounded A-mark as it appears on the App Store and Google Play." },
  ...SCREENSHOTS.map((s) => ({ href: s.src, label: `Screenshot: ${s.alt} (WebP)`, note: "iPhone screenshot in a device frame." })),
];

export default async function PressPage() {
  const rating = await getAppStoreRating();

  const facts: [string, string][] = [
    ["Name", APP.name],
    ["What it is", "A Punjabi-only language-learning app that teaches the Gurmukhi script and everyday Punjabi with native-speaker audio"],
    ["Course", `${APP.lessons} lessons in ${APP.units} units; ${APP.vocabulary} words and phrases; ${APP.exercises} exercises; lessons of ${APP.lessonMinutes} minutes`],
    ["Who it is for", "Heritage speakers in the Punjabi diaspora, partners and parents of Punjabi speakers, and complete beginners"],
    ["Price", PRICE_TEXT],
    ["Platforms", `iOS ${APP.minIos}+ (iPhone and iPad) and Android`],
    ["Released", "18 March 2026 (iOS); Android in 2026"],
    ["Current version", APP.version],
    ...(rating ? ([["App Store rating", `${rating.value} out of 5 from ${rating.count} ratings (${rating.country.toUpperCase()} store, updated daily)`]] as [string, string][]) : []),
    ["Developer", `${APP.developer}, ${APP.studio}`],
    ["Website", SITE_URL],
    ["App Store", `https://apps.apple.com/us/app/alfaazo-learn-punjabi/id${APP.appStoreId}`],
    ["Google Play", `https://play.google.com/store/apps/details?id=${APP.playPackage}`],
  ];

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      { "@type": "WebPage", "@id": `${URL}#webpage`, url: URL, name: TITLE, description: DESCRIPTION, dateModified: "2026-11-12", about: { "@id": `${SITE_URL}/#app-ios` }, isPartOf: { "@type": "WebSite", name: "Alfaazo", url: SITE_URL } },
      { "@type": "BreadcrumbList", itemListElement: [ { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL }, { "@type": "ListItem", position: 2, name: "Press", item: URL } ] },
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
            <li className="text-warm-brown/60">Press</li>
          </ol>
        </nav>

        <h1 className="font-heading text-[clamp(2rem,4vw,2.8rem)] font-black text-primary-dark leading-tight mb-6">
          Alfaazo press kit
        </h1>

        <div className="prose-alfaazo">
          <p className="text-[1.1rem] leading-relaxed"><strong>{ONE_LINER}</strong></p>
          <p>
            This page has everything a journalist, blogger, teacher or podcaster needs to write about Alfaazo: boilerplate you can paste, facts we have checked, who makes it, assets you are free to use, and how to get a review copy. Last updated {UPDATED}. For anything else, <Link href="/contact">contact us</Link>.
          </p>

          <h2>Boilerplate</h2>
          <h3>One sentence</h3>
          <p>Alfaazo is a Punjabi-only app that teaches the Gurmukhi script and everyday Punjabi in {APP.lessons} bite-sized lessons with native-speaker audio, free to download on iOS and Android.</p>
          <h3>Short (about 50 words)</h3>
          <p>{ONE_LINER}</p>
          <h3>Long (about 100 words)</h3>
          <p>{BOILERPLATE_100}</p>

          <h2>Fast facts</h2>
          <table>
            <tbody>
              {facts.map(([k, v]) => (
                <tr key={k}>
                  <th scope="row" className="text-left whitespace-nowrap align-top">{k}</th>
                  <td className="break-words">{v}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <p>The full description of the course is on <Link href="/app">the app page</Link>; the free plan and prices are on <Link href="/pricing">the pricing page</Link>; comparisons with Ling, Pimsleur and Duolingo are on <Link href="/compare">the compare pages</Link>.</p>

          <h2>Why Punjabi, and why now</h2>
          <ul>
            <li>Punjabi is one of the ten most spoken languages in the world, with large communities in Canada, the UK, the United States and Australia, yet none of the big general-purpose apps teaches it: <Link href="/blog/does-duolingo-teach-punjabi-best-alternatives">Duolingo</Link>, <Link href="/blog/does-babbel-have-punjabi">Babbel</Link>, <Link href="/blog/does-rosetta-stone-have-punjabi">Rosetta Stone</Link> and <Link href="/blog/does-busuu-have-punjabi">Busuu</Link> all have no Punjabi course.</li>
            <li>The typical learner is not a tourist but a second- or third-generation Punjabi who understands the language at home and cannot read a line of Gurmukhi, a text from a grandparent or a sign in a gurdwara. Alfaazo starts with the script for that reason.</li>
            <li>Every word in the app is recorded by a native speaker because Punjabi is a tonal language; synthesised voices teach the tones wrong.</li>
            <li>Alongside the app, the <Link href="/blog">Alfaazo journal</Link> publishes free, in-depth guides to Punjabi words, grammar, script and culture, more than a hundred so far, from <Link href="/blog/punjabi-grammar-for-beginners">grammar for beginners</Link> to <Link href="/blog/punjabi-wedding-traditions-explained">wedding traditions</Link>.</li>
          </ul>

          <h2>Who makes Alfaazo</h2>
          <p>
            Alfaazo is built by {APP.developer}, founder of <a href={APP.studioUrl} target="_blank" rel="noopener noreferrer">{APP.studio}</a>, a small studio focused on language preservation. The name comes from ਅਲਫ਼ਾਜ਼ (<em>alfaaz</em>), &ldquo;words&rdquo;. {APP.developer} is available for interviews and comment on Punjabi learning, heritage languages in the diaspora and building for a language the large apps have skipped; <Link href="/contact">get in touch</Link>. More on <Link href="/about">the about page</Link>.
          </p>

          <h2>Review copies</h2>
          <p>
            Journalists, reviewers, teachers and community organisations can request a free {APP.plus.name} code to review the full course. Tell us who you are and where the review will appear through the <Link href="/contact">contact form</Link>; we usually reply within two working days.
          </p>

          <h2>Logo and screenshots</h2>
          <p>These files are free to use in coverage of Alfaazo. Please do not alter the logo or icon, and do not use them to imply endorsement of another product.</p>
          <div className="not-prose my-8 grid grid-cols-3 gap-3">
            {SCREENSHOTS.map((s) => (
              <Image key={s.src} src={s.src} alt={s.alt} width={390} height={844} className="rounded-2xl border border-primary/10 shadow-[0_8px_30px_rgba(103,58,183,0.12)] w-full h-auto" sizes="(max-width: 760px) 30vw, 240px" />
            ))}
          </div>
          <table>
            <thead><tr><th scope="col" className="text-left">File</th><th scope="col" className="text-left">Notes</th></tr></thead>
            <tbody>
              {ASSETS.map((a) => (
                <tr key={a.href}>
                  <td><a href={a.href} download>{a.label}</a></td>
                  <td>{a.note}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <p>Need a different size, a vector logo or more screens? <Link href="/contact">Ask us</Link>.</p>

          <h2>Contact</h2>
          <p>
            Press and partnership enquiries: the <Link href="/contact">contact form</Link>, or a message to{" "}
            <a href="https://www.instagram.com/alfaazoapp" target="_blank" rel="noopener noreferrer">@alfaazoapp on Instagram</a>. For facts in this kit, the check date is {UPDATED}; if you need a figure confirmed before publication, ask and we will confirm it in writing.
          </p>
        </div>
      </main>
      <Footer />
    </div>
  );
}
