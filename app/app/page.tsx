import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import StoreButtons from "@/components/StoreButtons";
import {
  APP,
  ONE_LINER,
  PRICE_TEXT,
  SCREENSHOTS,
  SITE_URL,
  getAppStoreRating,
  mobileApplicationJsonLd,
} from "@/lib/appFacts";

// The canonical "what is Alfaazo" page: plain-text facts first, because
// answer engines quote the opening of the body, not the meta description.
export const revalidate = 86400;

const URL = `${SITE_URL}/app`;
const TITLE = "Alfaazo: Learn Punjabi — the app, its lessons and its price";
const DESCRIPTION =
  "What the Alfaazo app teaches, who it is for and what it costs: 112 Gurmukhi-first Punjabi lessons with native audio, free to download on iOS and Android, with an optional Plus upgrade.";

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

const FAQ = [
  {
    q: "What is Alfaazo?",
    a: ONE_LINER,
  },
  {
    q: "Is Alfaazo free?",
    a: `Alfaazo is free to download. The free plan includes ${APP.free.unitsText}, with ${APP.free.newLessonsPerDay} new lessons a day (${APP.free.firstDayNewLessons} on your first day) and ads between lessons. ${APP.plus.name} unlocks all ${APP.lessons} lessons, removes the daily limit and the ads. ${PRICE_TEXT}`,
  },
  {
    q: "Does Alfaazo teach the Gurmukhi script?",
    a: "Yes. Gurmukhi is taught from the first unit with stroke-by-stroke writing guides for every letter and vowel sign, so you read and write Punjabi rather than relying on romanised text.",
  },
  {
    q: "Who is Alfaazo for?",
    a: "Heritage speakers in Canada, the UK, the US and Australia who understand some Punjabi but cannot read or speak it confidently, and complete beginners. Lessons assume no prior knowledge of the script.",
  },
  {
    q: "How is Alfaazo different from Duolingo, Ling or Pimsleur?",
    a: "Duolingo has no course that teaches Punjabi. Ling teaches Punjabi as one of 60-plus languages on a shared template. Pimsleur is audio-only with almost no reading. Alfaazo teaches only Punjabi, starts with the Gurmukhi script and records every word with native speakers.",
  },
  {
    q: "Which devices does Alfaazo run on?",
    a: `iPhone and iPad on iOS ${APP.minIos} or later, and Android phones and tablets. There is no web version.`,
  },
  {
    q: "Who makes Alfaazo?",
    a: `Alfaazo is built by ${APP.developer} at ${APP.studio}. The iOS app was released on 18 March 2026; the current version is ${APP.version}.`,
  },
];

export default async function AppPage() {
  const rating = await getAppStoreRating();

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      ...mobileApplicationJsonLd(rating),
      {
        "@type": "WebPage",
        "@id": `${URL}#webpage`,
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
          { "@type": "ListItem", position: 2, name: "The app", item: URL },
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

  const facts: [string, string][] = [
    ["App name", APP.name],
    ["Language taught", "Punjabi (Indian Punjabi, Gurmukhi script)"],
    ["Lessons", `${APP.lessons} lessons in ${APP.units} units, two sections`],
    ["Vocabulary", `${APP.vocabulary} words and phrases, ${APP.exercises} exercises`],
    ["Audio", "Every word recorded by native Punjabi speakers"],
    ["Lesson length", `${APP.lessonMinutes} minutes`],
    ["Platforms", `iOS ${APP.minIos}+ and Android`],
    ["Price", PRICE_TEXT],
    ...(rating
      ? ([["App Store rating", `${rating.value} out of 5 from ${rating.count} ratings (${rating.country} store)`]] as [string, string][])
      : []),
    ["Developer", `${APP.developer}, ${APP.studio}`],
    ["First released", "18 March 2026 (iOS); Android followed in 2026"],
  ];

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
            <li className="text-warm-brown/60">The app</li>
          </ol>
        </nav>

        <h1 className="font-heading text-[clamp(2rem,4vw,2.8rem)] font-black text-primary-dark leading-tight mb-6">
          Alfaazo: Learn Punjabi — the app, explained
        </h1>

        <div className="prose-alfaazo">
          <p className="text-[1.1rem] leading-relaxed">
            <strong>{ONE_LINER}</strong>
          </p>

          <StoreButtons placement="app_page" className="not-prose my-8" />

          <h2>Alfaazo at a glance</h2>
          <table>
            <tbody>
              {facts.map(([k, v]) => (
                <tr key={k}>
                  <th scope="row" className="text-left whitespace-nowrap align-top">{k}</th>
                  <td>{v}</td>
                </tr>
              ))}
            </tbody>
          </table>

          <h2>What does Alfaazo teach?</h2>
          <p>
            The course is {APP.lessons} lessons in {APP.units} units, split into two sections.{" "}
            <strong>Section 1, {APP.sections[0].title}</strong> (units {APP.sections[0].units}, {APP.sections[0].lessons} lessons), starts with the Gurmukhi alphabet — every letter and vowel sign with a stroke-by-stroke writing guide — then greetings, people and family, numbers and time, daily life, everyday actions, conversations, nature and weather, travel, culture and celebrations, work and education, and a grammar unit that ties the patterns together.{" "}
            <strong>Section 2, {APP.sections[1].title}</strong> (units {APP.sections[1].units}, {APP.sections[1].lessons} lessons), is about telling your story: the past tense (what you did, what they did, back then), getting around, saying how you feel about things, can/must/if, and comparisons, with review checkpoints along the way.
          </p>
          <p>
            Across the course there are {APP.vocabulary} words and phrases and {APP.exercises} exercises: fill-in-the-blank, sentence translation, phrase building and quizzes. Every word is recorded by a native Punjabi speaker — no synthesised voices — because Punjabi is tonal and the tones have to be heard, not read.
          </p>

          <div className="not-prose my-10 grid grid-cols-3 gap-3">
            {SCREENSHOTS.map((s) => (
              <Image
                key={s.src}
                src={s.src}
                alt={s.alt}
                width={390}
                height={844}
                className="rounded-2xl border border-primary/10 shadow-[0_8px_30px_rgba(103,58,183,0.12)] w-full h-auto"
                sizes="(max-width: 760px) 30vw, 240px"
              />
            ))}
          </div>

          <h2>Who is Alfaazo for?</h2>
          <p>
            Mostly heritage speakers: people who grew up hearing Punjabi in{" "}
            <Link href="/blog/learn-punjabi-in-canada">Canada</Link>, the{" "}
            <Link href="/blog/learn-punjabi-in-the-uk">UK</Link>, the{" "}
            <Link href="/blog/learn-punjabi-in-the-usa">US</Link> or Australia, understand some of it, and cannot read Gurmukhi or hold a conversation. It also works for complete beginners — the lessons assume nothing — and for partners and parents of Punjabi speakers who want to follow what is said at home.
          </p>

          <h2>How do lessons work?</h2>
          <p>
            A lesson takes {APP.lessonMinutes} minutes: new words with audio, then exercises that mix reading, listening and building sentences, then a short review. Daily streaks and XP track progress; the app is designed for one lesson a day during a commute or a chai break rather than long study sessions. Finished lessons can be replayed as often as you like.
          </p>

          <h2>Is Alfaazo free?</h2>
          <p>
            Alfaazo is free to download. The free plan includes {APP.free.unitsText}, with {APP.free.newLessonsPerDay} new lessons a day ({APP.free.firstDayNewLessons} on your first day), and shows ads between lessons. <strong>{APP.plus.name}</strong> unlocks all {APP.lessons} lessons, removes the daily limit, lets you start Section 2 or skip ahead within a unit, and removes ads. {PRICE_TEXT} Full details on the <Link href="/pricing">pricing page</Link>.
          </p>

          <h2>How is Alfaazo different from Duolingo, Ling and Pimsleur?</h2>
          <ul>
            <li>
              <strong>Duolingo</strong> has <Link href="/blog/does-duolingo-teach-punjabi-best-alternatives">no course that teaches Punjabi</Link>; its 2026 course teaches English to Punjabi speakers.
            </li>
            <li>
              <strong>Ling</strong> teaches Punjabi as one of 60-plus languages, so lessons follow a shared template; Alfaazo teaches only Punjabi.
            </li>
            <li>
              <strong>Pimsleur</strong> is audio-only with almost no reading or writing; Alfaazo starts with the script.
            </li>
            <li>
              <strong>uTalk and Mango</strong> are phrasebook-style or Shahmukhi-only; Alfaazo is a sequenced course in Gurmukhi.
            </li>
          </ul>
          <p>
            Side-by-side pages with sources: <Link href="/compare/alfaazo-vs-ling">Alfaazo vs Ling</Link>,{" "}
            <Link href="/compare/alfaazo-vs-pimsleur">Alfaazo vs Pimsleur</Link> and{" "}
            <Link href="/compare/alfaazo-vs-duolingo">Alfaazo vs Duolingo</Link>. Our full comparison, including apps we recommend alongside Alfaazo, is in{" "}
            <Link href="/blog/best-app-to-learn-punjabi-2026">Best Apps to Learn Punjabi in 2026</Link> and{" "}
            <Link href="/blog/which-language-apps-have-punjabi">Which Language Apps Have Punjabi?</Link>.
          </p>

          <h2>Who makes Alfaazo?</h2>
          <p>
            Alfaazo is built by {APP.developer} at{" "}
            <a href={APP.studioUrl} target="_blank" rel="noopener noreferrer">{APP.studio}</a>, a small studio focused on language preservation. The name comes from ਅਲਫ਼ਾਜ਼ (<em>alfaaz</em>), &ldquo;words&rdquo;. The iOS app was released on 18 March 2026 and Android followed the same year; the current version is {APP.version}. The team also writes the <Link href="/blog">Alfaazo journal</Link>, more than a hundred free guides to Punjabi words, phrases and culture.
          </p>

          <h2>Frequently asked questions</h2>
          {FAQ.map((f) => (
            <div key={f.q}>
              <h3>{f.q}</h3>
              <p>{f.a}</p>
            </div>
          ))}

          <h2>Get the app</h2>
          <p>Free to download on iPhone, iPad and Android.</p>
          <StoreButtons placement="app_page" className="not-prose mt-6" />
        </div>
      </main>
      <Footer />
    </div>
  );
}
