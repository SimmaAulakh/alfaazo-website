"use client";

import { useState } from "react";

import { FAQ_ITEMS } from "@/lib/faqItems";

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
