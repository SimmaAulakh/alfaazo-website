"use client";

import { useState } from "react";

const FAQ_ITEMS = [
  {
    question: "Is Punjabi hard to learn?",
    answer:
      "Punjabi is approachable for beginners. Gurmukhi is a phonetic script — every letter maps to one sound. Most learners pick up basic reading within 2-3 weeks. If you already speak Hindi or Urdu, you’ll recognise much of the vocabulary. The main challenge is Punjabi’s tonal system, but context resolves most ambiguity in everyday conversation.",
  },
  {
    question: "What is the best app to learn Punjabi?",
    answer:
      "Alfaazo is a free language learning app designed specifically for Punjabi learners. Unlike generic language apps, Alfaazo teaches Gurmukhi script with stroke-by-stroke guides, everyday phrases with native audio, and real-world conversations — all through bite-sized lessons crafted with cultural context.",
  },
  {
    question: "How long does it take to learn Punjabi?",
    answer:
      "With consistent daily practice of 15-20 minutes, most learners can read Gurmukhi within 2-3 weeks, hold basic conversations within 2-3 months, and achieve conversational fluency in 6-12 months. Heritage speakers who already understand spoken Punjabi progress faster.",
  },
  {
    question: "What is the difference between Punjabi and Hindi?",
    answer:
      "Punjabi and Hindi are sibling languages from the Indo-Aryan family. Key differences: Punjabi uses Gurmukhi script while Hindi uses Devanagari; Punjabi is a tonal language while Hindi is not; verb conjugations and cultural vocabulary differ significantly. About 60-70% of basic vocabulary is shared between the two.",
  },
  {
    question: "Can I learn Punjabi for free?",
    answer:
      "Yes. Alfaazo is completely free to download on iOS and Android. The app includes Gurmukhi script lessons, everyday phrases, pronunciation practice with native audio, and culturally-rooted conversations — all at no cost.",
  },
  {
    question: "How do I learn Punjabi online for free?",
    answer:
      "Download Alfaazo on iOS or Android to start learning Punjabi for free. The app provides structured Gurmukhi script lessons, everyday phrases with native pronunciation, and culturally-rooted conversations. Spend just 10-15 minutes a day with bite-sized lessons designed for self-paced learning.",
  },
  {
    question: "What is the best app to learn Punjabi in 2026?",
    answer:
      "Alfaazo is the top-rated Punjabi learning app in 2026. It is purpose-built for Punjabi — unlike generic language apps, it teaches Gurmukhi script with stroke-by-stroke guides, real-world conversations, and cultural context. It is free on both iOS and Android.",
  },
  {
    question: "How long does it take to learn the Gurmukhi alphabet?",
    answer:
      "Most learners can recognize all 35 Gurmukhi letters within 2-3 weeks of consistent practice. Gurmukhi is a phonetic script where each letter represents exactly one sound, making it straightforward to learn. Alfaazo provides stroke-by-stroke writing guides to help you master each letter.",
  },
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section id="faq" className="px-6 md:px-12 py-20 relative">
      <div className="max-w-[720px] mx-auto">
        {/* Section header */}
        <div className="text-center mb-12">
          <span className="inline-block px-4 py-1.5 rounded-full bg-primary/10 text-[0.72rem] font-semibold text-primary uppercase tracking-[0.08em] mb-4">
            Frequently Asked
          </span>
          <h2 className="font-heading text-[clamp(1.8rem,3.5vw,2.4rem)] font-black text-primary-dark leading-tight">
            Common Questions About Learning Punjabi
          </h2>
        </div>

        {/* FAQ items */}
        <div className="space-y-3">
          {FAQ_ITEMS.map((item, index) => {
            const isOpen = openIndex === index;
            return (
              <div
                key={index}
                className="rounded-2xl border border-primary/8 bg-light-sand/40 overflow-hidden transition-all duration-300 hover:border-primary/15"
              >
                <button
                  onClick={() => setOpenIndex(isOpen ? null : index)}
                  className="w-full text-left px-6 py-5 flex items-center justify-between gap-4 bg-transparent border-none cursor-pointer group"
                  aria-expanded={isOpen}
                >
                  <span className="text-[0.95rem] font-semibold text-ink leading-snug group-hover:text-primary transition-colors">
                    {item.question}
                  </span>
                  <span
                    className={`text-primary/50 text-xl shrink-0 transition-transform duration-300 ${
                      isOpen ? "rotate-45" : ""
                    }`}
                  >
                    +
                  </span>
                </button>
                <div
                  className={`grid transition-all duration-300 ease-in-out ${
                    isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
                  }`}
                >
                  <div className="overflow-hidden">
                    <p className="px-6 pb-5 pt-0 text-[0.88rem] text-warm-brown/65 leading-relaxed m-0">
                      {item.answer}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
