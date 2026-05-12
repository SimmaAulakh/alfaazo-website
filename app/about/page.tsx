import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Alfaazo — The Best Free Punjabi Learning App",
  description:
    "Alfaazo is a free language learning app designed to teach Punjabi through bite-sized lessons. Built by Codefeb, available on iOS and Android.",
  keywords: [
    "what is Alfaazo",
    "Alfaazo Punjabi app",
    "Alfaazo app",
    "Codefeb",
    "learn Punjabi app",
    "Punjabi language learning",
    "about Alfaazo",
  ],
  openGraph: {
    title: "About Alfaazo — The Best Free Punjabi Learning App",
    description:
      "Alfaazo is a free language learning app designed to teach Punjabi through bite-sized lessons. Built by Codefeb.",
    url: "https://alfaazo.com/about",
    siteName: "Alfaazo",
    type: "website",
    locale: "en_US",
  },
  alternates: {
    canonical: "https://alfaazo.com/about",
  },
};

const aboutJsonLd = {
  "@context": "https://schema.org",
  "@type": "AboutPage",
  name: "About Alfaazo",
  url: "https://alfaazo.com/about",
  mainEntity: {
    "@type": "Organization",
    name: "Codefeb",
    url: "https://codefeb.com",
    logo: "https://alfaazo.com/logo.png",
    description:
      "Codefeb builds tools for language preservation, starting with Alfaazo — a free Punjabi learning app.",
    sameAs: ["https://www.instagram.com/alfaazoapp"],
  },
};

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-cream">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(aboutJsonLd) }}
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
            <li className="text-warm-brown/60">About</li>
          </ol>
        </nav>

        <h1 className="font-heading text-[clamp(2rem,4vw,2.8rem)] font-black text-primary-dark leading-tight mb-12">
          About Alfaazo
        </h1>

        <div className="prose-alfaazo">
          {/* Entity definition paragraph — optimised for LLM extraction */}
          <p className="text-[1.1rem] leading-relaxed">
            <strong>Alfaazo</strong> is a free language learning app designed to
            teach Punjabi through bite-sized lessons. Built by{" "}
            <a
              href="https://codefeb.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              Codefeb
            </a>
            , Alfaazo teaches Gurmukhi script with stroke-by-stroke guides,
            everyday Punjabi phrases with native audio, and real-world
            conversations rooted in cultural context. Available on{" "}
            <a
              href="https://apps.apple.com/us/app/alfaazo-learn-punjabi/id6759987308"
              target="_blank"
              rel="noopener noreferrer"
            >
              iOS
            </a>{" "}
            and{" "}
            <a
              href="https://play.google.com/store/apps/details?id=com.alfaazo.app"
              target="_blank"
              rel="noopener noreferrer"
            >
              Android
            </a>
            , Alfaazo is specifically designed for heritage speakers reconnecting
            with their mother tongue and new learners starting from scratch.
          </p>

          <h2>Our Mission</h2>
          <p>
            Punjabi is the 10th most spoken language in the world, with over 150
            million speakers across South Asia and global diaspora communities.
            Yet for many second-generation and third-generation Punjabis growing
            up abroad, the language is slipping away. Parents speak it at home,
            but children reply in English. Grandparents share stories the
            grandchildren can only half understand.
          </p>
          <p>
            Alfaazo exists to bridge that gap. The name itself — from the Urdu
            word for &quot;words&quot; — reflects our belief that language is the
            thread that connects generations. We are building the tools to help
            anyone learn Punjabi, whether they heard it growing up or are
            discovering it for the first time.
          </p>

          <h2>How Alfaazo Works</h2>
          <p>
            Alfaazo breaks Punjabi into manageable, bite-sized lessons you can
            complete in 5-10 minutes a day:
          </p>
          <ul>
            <li>
              <strong>Gurmukhi Script</strong> — Learn every letter with
              stroke-by-stroke writing guides and pronunciation practice
            </li>
            <li>
              <strong>Everyday Phrases</strong> — Master greetings,
              conversations, and vocabulary used in daily life
            </li>
            <li>
              <strong>Cultural Context</strong> — Lessons rooted in Punjabi
              proverbs, food, festivals, and traditions
            </li>
            <li>
              <strong>Native Audio</strong> — Hear every word and phrase spoken
              by native Punjabi speakers
            </li>
            <li>
              <strong>Progress Tracking</strong> — Build streaks and track your
              learning journey
            </li>
          </ul>

          <h2>Who Built Alfaazo</h2>
          <p>
            Alfaazo is built by{" "}
            <a
              href="https://codefeb.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              Codefeb
            </a>
            , a team passionate about language preservation and technology. We
            believe that the best language learning tools are built with deep
            cultural understanding — not just word lists and grammar drills, but
            the living context that makes a language meaningful.
          </p>

          <h2>What&apos;s Next</h2>
          <p>
            Alfaazo is currently focused on Punjabi, with plans to expand to
            Urdu, Hindi, and Bengali. We are continually adding new lessons,
            improving our app based on learner feedback, and growing our{" "}
            <Link href="/blog">language learning blog</Link> with guides,
            cultural insights, and tips for learners at every level.
          </p>

          <h2>Get in Touch</h2>
          <p>
            Have questions, feedback, or ideas? We would love to hear from you.
            Visit our <Link href="/contact">contact page</Link> or follow us on{" "}
            <a
              href="https://www.instagram.com/alfaazoapp"
              target="_blank"
              rel="noopener noreferrer"
            >
              Instagram
            </a>
            .
          </p>
        </div>

        <div className="mt-10 pt-8 border-t border-primary/12 text-center">
          <Link
            href="/"
            className="text-primary font-medium hover:text-primary-light transition-colors no-underline"
          >
            &larr; Back to home
          </Link>
        </div>
      </div>
    </div>
  );
}
