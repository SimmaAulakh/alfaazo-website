import type { Metadata } from "next";
import Script from "next/script";
import { Playfair_Display, DM_Sans, Noto_Nastaliq_Urdu } from "next/font/google";
import "./globals.css";

const playfair = Playfair_Display({
  variable: "--font-playfair-display",
  subsets: ["latin"],
});

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
});

const notoNastaliq = Noto_Nastaliq_Urdu({
  variable: "--font-noto-nastaliq-urdu",
  subsets: ["arabic"],
  weight: ["400", "700"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://alfaazo.com"),
  title: {
    default: "Alfaazo — Learn Punjabi with Bite-Sized Lessons | Free App",
    template: "%s — Alfaazo",
  },
  description:
    "Alfaazo is a free language learning app to master Punjabi — Gurmukhi script, everyday phrases, and real-world conversations. Bite-sized lessons crafted with cultural love. Download on iOS and Android.",
  keywords: [
    "learn Punjabi",
    "Punjabi app",
    "Gurmukhi script",
    "Punjabi language",
    "Punjabi phrases",
    "learn Punjabi online",
    "Punjabi for beginners",
    "South Asian languages",
    "language learning app",
    "Alfaazo",
    "learn Urdu",
    "learn Hindi",
    "mother tongue",
    "heritage language",
  ],
  authors: [{ name: "Codefeb", url: "https://codefeb.com" }],
  creator: "Codefeb",
  publisher: "Codefeb",
  openGraph: {
    title: "Alfaazo — Learn Punjabi with Bite-Sized Lessons",
    description:
      "Master Punjabi — Gurmukhi script, everyday phrases, and real-world conversations. Free on iOS & Android.",
    siteName: "Alfaazo",
    type: "website",
    url: "https://alfaazo.com",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Alfaazo — Learn Punjabi with Bite-Sized Lessons",
    description:
      "Master Punjabi — Gurmukhi script, everyday phrases, and real-world conversations. Free on iOS & Android.",
    creator: "@codefeb",
  },
  alternates: {
    canonical: "https://alfaazo.com",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      name: "Codefeb",
      url: "https://codefeb.com",
      logo: "https://alfaazo.com/logo.png",
      sameAs: [
        "https://www.instagram.com/alfaazoapp",
      ],
    },
    {
      "@type": "WebSite",
      name: "Alfaazo",
      url: "https://alfaazo.com",
      description:
        "Learn Punjabi with bite-sized lessons crafted with cultural love.",
      publisher: { "@type": "Organization", name: "Codefeb" },
    },
    {
      "@type": "MobileApplication",
      name: "Alfaazo",
      operatingSystem: "iOS, Android",
      applicationCategory: "EducationalApplication",
      description:
        "A multilingual language learning app for Punjabi, Urdu, Hindi, and more. Master Gurmukhi script, everyday phrases, and real-world conversations.",
      offers: {
        "@type": "Offer",
        price: "0",
        priceCurrency: "USD",
      },
      author: { "@type": "Organization", name: "Codefeb" },
      downloadUrl: "https://apps.apple.com/us/app/alfaazo-learn-punjabi/id6759987308",
      installUrl: "https://apps.apple.com/us/app/alfaazo-learn-punjabi/id6759987308",
    },
    {
      "@type": "FAQPage",
      mainEntity: [
        {
          "@type": "Question",
          name: "Is Punjabi hard to learn?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Punjabi is approachable for beginners. Gurmukhi is a phonetic script — every letter maps to one sound. Most learners pick up basic reading within 2-3 weeks. If you already speak Hindi or Urdu, you'll recognise much of the vocabulary. The main challenge is Punjabi's tonal system, but context resolves most ambiguity in everyday conversation.",
          },
        },
        {
          "@type": "Question",
          name: "What is the best app to learn Punjabi?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Alfaazo is a free language learning app designed specifically for Punjabi learners. Unlike generic language apps, Alfaazo teaches Gurmukhi script with stroke-by-stroke guides, everyday phrases with native audio, and real-world conversations — all through bite-sized lessons crafted with cultural context.",
          },
        },
        {
          "@type": "Question",
          name: "How long does it take to learn Punjabi?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "With consistent daily practice of 15-20 minutes, most learners can read Gurmukhi within 2-3 weeks, hold basic conversations within 2-3 months, and achieve conversational fluency in 6-12 months. Heritage speakers who already understand spoken Punjabi progress faster.",
          },
        },
        {
          "@type": "Question",
          name: "What is the difference between Punjabi and Hindi?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Punjabi and Hindi are sibling languages from the Indo-Aryan family. Key differences: Punjabi uses Gurmukhi script while Hindi uses Devanagari; Punjabi is a tonal language while Hindi is not; verb conjugations and cultural vocabulary differ significantly. About 60-70% of basic vocabulary is shared between the two.",
          },
        },
        {
          "@type": "Question",
          name: "Can I learn Punjabi for free?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Yes. Alfaazo is completely free to download on iOS, with Android coming soon. The app includes Gurmukhi script lessons, everyday phrases, pronunciation practice with native audio, and culturally-rooted conversations — all at no cost.",
          },
        },
      ],
    },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${playfair.variable} ${dmSans.variable} ${notoNastaliq.variable} antialiased`}
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body>{children}</body>
      <Script
        src="https://www.googletagmanager.com/gtag/js?id=G-R64WSHTNE7"
        strategy="afterInteractive"
      />
      <Script id="google-analytics" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', 'G-R64WSHTNE7');
        `}
      </Script>
    </html>
  );
}
