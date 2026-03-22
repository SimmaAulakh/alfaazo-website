import type { Metadata } from "next";
import Link from "next/link";
import ContactForm from "./ContactForm";

export const metadata: Metadata = {
  title: "Contact Us",
  description:
    "Get in touch with the Alfaazo team. Questions, feedback, or partnership inquiries — we'd love to hear from you.",
  alternates: {
    canonical: "https://alfaazo.com/contact",
  },
};

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-cream">
      <div className="max-w-[720px] mx-auto px-6 md:px-10 py-32">
        {/* Header */}
        <div className="mb-12 animate-fadeInUp">
          <Link
            href="/"
            className="text-primary text-sm font-medium hover:text-primary-light transition-colors no-underline"
          >
            &larr; Back to home
          </Link>

          <h1 className="font-heading text-[clamp(2rem,4vw,3rem)] font-black text-primary-dark leading-tight mt-8 mb-4">
            Get in touch
          </h1>
          <p className="text-[1.05rem] text-warm-brown/70 leading-relaxed max-w-[500px]">
            Have a question, feedback, or want to collaborate? Send us a message
            and we&apos;ll get back to you.
          </p>
        </div>

        {/* Contact Form */}
        <div className="mb-16 animate-fadeInUp" style={{ animationDelay: "0.1s" }}>
          <ContactForm />
        </div>

        {/* Instagram */}
        <div className="mb-16 animate-fadeInUp" style={{ animationDelay: "0.2s" }}>
          <a
            href="https://instagram.com/alfaazoapp"
            target="_blank"
            rel="noopener noreferrer"
            className="group no-underline flex items-center gap-5 p-6 rounded-2xl bg-white border border-black/[0.06] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_12px_40px_rgba(103,58,183,0.08)]"
          >
            <div className="w-12 h-12 rounded-xl bg-primary/8 flex items-center justify-center text-primary shrink-0 group-hover:bg-primary/12 transition-colors">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <rect x="2" y="2" width="20" height="20" rx="5" />
                <circle cx="12" cy="12" r="5" />
                <circle cx="17.5" cy="6.5" r="1.5" fill="currentColor" stroke="none" />
              </svg>
            </div>
            <div>
              <div className="text-[0.72rem] font-semibold text-primary uppercase tracking-[0.08em] mb-1">
                Instagram
              </div>
              <div className="font-heading font-bold text-[1.1rem] text-primary-dark mb-1 group-hover:text-primary transition-colors">
                @alfaazoapp
              </div>
              <div className="text-[0.85rem] text-warm-brown/50">
                Follow us for updates and language tips
              </div>
            </div>
          </a>
        </div>

        {/* FAQ-style section */}
        <div className="mb-16">
          <h2 className="font-heading text-[1.4rem] font-bold text-primary-dark mb-6">
            Common questions
          </h2>

          <div className="flex flex-col gap-4">
            {[
              {
                q: "Is Alfaazo free to use?",
                a: "Yes! Alfaazo is completely free to download and use. We believe language learning should be accessible to everyone.",
              },
              {
                q: "When will other languages be available?",
                a: "Punjabi is live now. Urdu and Hindi are in development — join our waitlist to get notified when they launch.",
              },
              {
                q: "I found a bug or have a suggestion",
                a: "We appreciate your feedback! Use the form above to send us a message with details and we'll look into it.",
              },
              {
                q: "Can I contribute translations or content?",
                a: "We'd love community contributions! Send us a message and we'll share how you can help.",
              },
            ].map((faq, i) => (
              <div
                key={i}
                className="p-6 rounded-2xl bg-light-sand/60 border border-primary/[0.04]"
              >
                <h3 className="font-heading font-bold text-[1rem] text-primary-dark mb-2">
                  {faq.q}
                </h3>
                <p className="text-[0.9rem] text-warm-brown/65 leading-relaxed m-0">
                  {faq.a}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Footer CTA */}
        <div className="text-center pt-8 border-t border-primary/8">
          <p className="text-[0.9rem] text-warm-brown/50 mb-4">
            Want to try Alfaazo?
          </p>
          <a
            href="https://apps.apple.com/us/app/alfaazo-learn-punjabi/id6759987308"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block px-8 py-3 rounded-2xl bg-primary text-white no-underline font-semibold text-[0.95rem] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_8px_30px_rgba(103,58,183,0.35)]"
          >
            Download on the App Store
          </a>
        </div>
      </div>
    </div>
  );
}
