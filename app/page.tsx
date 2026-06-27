import type { Metadata } from "next";
import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import Features from "@/components/Features";
import Languages from "@/components/Languages";
import BlogSection from "@/components/BlogSection";
import CTA from "@/components/CTA";
import FAQ from "@/components/FAQ";
import Footer from "@/components/Footer";
import { FAQ_ITEMS } from "@/lib/faqItems";

export const metadata: Metadata = {
  title: {
    absolute: "Alfaazo — Best App to Learn Punjabi | Free on iOS & Android",
  },
  description:
    "The best free app to learn Punjabi. Master Gurmukhi script, everyday phrases, and real conversations with native audio. Free on iOS & Android.",
  keywords: [
    "learn Punjabi",
    "best app to learn Punjabi",
    "Punjabi learning app",
    "learn Punjabi online free",
    "how to learn Punjabi",
    "Gurmukhi alphabet",
    "Gurmukhi script",
    "learn Gurmukhi",
    "Punjabi language app for beginners",
    "learn Gurmukhi script",
    "Punjabi vocabulary app",
    "heritage language learning",
    "south asian language app",
    "Punjabi phrases",
    "learn Punjabi fast",
    "Punjabi app 2026",
    "Alfaazo",
    "Alfaazo app",
    "Punjabi for beginners",
    "is Punjabi hard to learn",
    "Punjabi vs Hindi",
    "free Punjabi app",
    "Punjabi language course",
    "learn Punjabi alphabet",
  ],
  openGraph: {
    title: "Alfaazo — Best App to Learn Punjabi | Free on iOS & Android",
    description:
      "Master Punjabi — Gurmukhi script, everyday phrases, and real-world conversations. Bite-sized lessons crafted with cultural love. Free on iOS & Android.",
    url: "https://www.alfaazo.com",
    siteName: "Alfaazo",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Alfaazo — Best App to Learn Punjabi",
    description:
      "Master Punjabi — Gurmukhi script, everyday phrases, and real-world conversations. Free on iOS & Android.",
    creator: "@codefeb",
  },
};

export default function Home() {
  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: FAQ_ITEMS.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: { "@type": "Answer", text: item.answer },
    })),
  };

  return (
    <div className="grain-overlay">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <Nav />
      <Hero />
      <Features />
      <Languages />
      <BlogSection />
      <FAQ />
      <CTA />
      <Footer />
    </div>
  );
}
