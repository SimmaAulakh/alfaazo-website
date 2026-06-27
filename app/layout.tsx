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
  metadataBase: new URL("https://www.alfaazo.com"),
  title: {
    default: "Alfaazo — Learn Punjabi with Bite-Sized Lessons | Free App",
    template: "%s — Alfaazo",
  },
  description:
    "Free app to learn Punjabi. Master Gurmukhi script, everyday phrases, and conversations with native audio. Bite-sized lessons. iOS & Android.",
  keywords: [
    "learn Punjabi",
    "best app to learn Punjabi",
    "Punjabi learning app",
    "learn Punjabi online free",
    "Gurmukhi script",
    "Punjabi language",
    "Punjabi phrases",
    "learn Punjabi for beginners",
    "how to learn Punjabi",
    "learn Punjabi fast",
    "Punjabi app 2026",
    "Alfaazo",
    "Alfaazo app",
    "learn Gurmukhi",
    "Punjabi alphabet",
    "Punjabi greetings",
    "is Punjabi hard to learn",
    "Punjabi vs Hindi",
    "language learning app",
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
    url: "https://www.alfaazo.com",
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
    canonical: "https://www.alfaazo.com",
  },
  itunes: {
    appId: "6759987308",
    appArgument: "https://www.alfaazo.com",
  },
  appLinks: {
    ios: {
      url: "https://www.alfaazo.com",
      app_store_id: "6759987308",
    },
    android: {
      package: "com.alfaazo.app",
      app_name: "Alfaazo",
    },
    web: {
      url: "https://www.alfaazo.com",
      should_fallback: true,
    },
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
      logo: "https://www.alfaazo.com/logo.png",
      sameAs: [
        "https://www.instagram.com/alfaazoapp",
      ],
      contactPoint: {
        "@type": "ContactPoint",
        contactType: "customer support",
        url: "https://www.alfaazo.com/contact",
      },
    },
    {
      "@type": "WebSite",
      name: "Alfaazo",
      url: "https://www.alfaazo.com",
      inLanguage: "en",
      description:
        "Learn Punjabi with bite-sized lessons crafted with cultural love.",
      publisher: { "@type": "Organization", name: "Codefeb" },
      potentialAction: {
        "@type": "SearchAction",
        target: "https://www.alfaazo.com/blog?q={search_term_string}",
        "query-input": "required name=search_term_string",
      },
    },
    {
      "@type": "Course",
      name: "Learn Punjabi with Alfaazo",
      description:
        "Free Punjabi language course covering Gurmukhi script, everyday phrases, and real-world conversations through bite-sized lessons.",
      provider: { "@type": "Organization", name: "Codefeb" },
      isAccessibleForFree: true,
      inLanguage: "en",
      teaches: "Punjabi language",
      availableLanguage: "pa",
      url: "https://www.alfaazo.com",
    },
    {
      "@type": "MobileApplication",
      name: "Alfaazo — Learn Punjabi",
      operatingSystem: "iOS",
      applicationCategory: "EducationalApplication",
      description:
        "The best app to learn Punjabi. Master Gurmukhi script, everyday phrases, and real-world conversations with bite-sized lessons.",
      offers: {
        "@type": "Offer",
        price: "0",
        priceCurrency: "USD",
      },
      author: { "@type": "Organization", name: "Codefeb" },
      downloadUrl: "https://apps.apple.com/us/app/alfaazo-learn-punjabi/id6759987308",
      installUrl: "https://apps.apple.com/us/app/alfaazo-learn-punjabi/id6759987308",
      aggregateRating: {
        "@type": "AggregateRating",
        ratingValue: "5",
        ratingCount: "1",
      },
    },
    {
      "@type": "MobileApplication",
      name: "Alfaazo — Learn Punjabi",
      operatingSystem: "Android",
      applicationCategory: "EducationalApplication",
      description:
        "The best app to learn Punjabi. Master Gurmukhi script, everyday phrases, and real-world conversations with bite-sized lessons.",
      offers: {
        "@type": "Offer",
        price: "0",
        priceCurrency: "USD",
      },
      author: { "@type": "Organization", name: "Codefeb" },
      downloadUrl: "https://play.google.com/store/apps/details?id=com.alfaazo.app",
      installUrl: "https://play.google.com/store/apps/details?id=com.alfaazo.app",
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
