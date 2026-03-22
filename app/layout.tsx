import type { Metadata } from "next";
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
      logo: "https://alfaazo.com/icon.png",
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
    </html>
  );
}
