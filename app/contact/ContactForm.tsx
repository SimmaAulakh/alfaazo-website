"use client";

import { useState, type FormEvent } from "react";

export default function ContactForm() {
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("sending");

    const form = e.currentTarget;
    const data = new FormData(form);

    try {
      const res = await fetch("https://formsubmit.co/ajax/252a5e90d28070066cbc842a06f4d62d", {
        method: "POST",
        headers: { Accept: "application/json" },
        body: data,
      });

      if (res.ok) {
        setStatus("sent");
        form.reset();
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  }

  if (status === "sent") {
    return (
      <div className="p-8 rounded-2xl bg-white border border-primary/10 text-center">
        <div className="text-4xl mb-4">✓</div>
        <h3 className="font-heading font-bold text-[1.2rem] text-primary-dark mb-2">
          Message sent!
        </h3>
        <p className="text-[0.9rem] text-warm-brown/60 mb-6">
          Thanks for reaching out. We&apos;ll get back to you soon.
        </p>
        <button
          onClick={() => setStatus("idle")}
          className="text-primary font-medium text-[0.9rem] bg-transparent border-none cursor-pointer hover:text-primary-light transition-colors"
        >
          Send another message
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-5">
      {/* Honeypot for spam */}
      <input type="text" name="_honey" className="hidden" />
      {/* Disable captcha page */}
      <input type="hidden" name="_captcha" value="false" />
      {/* Subject line */}
      <input type="hidden" name="_subject" value="New message from alfaazo.com" />

      <div className="flex flex-col sm:flex-row gap-4">
        <div className="flex-1">
          <label
            htmlFor="name"
            className="block text-[0.78rem] font-semibold text-warm-brown/60 uppercase tracking-[0.06em] mb-2"
          >
            Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            required
            placeholder="Your name"
            className="w-full px-4 py-3 rounded-xl bg-white border border-primary/10 text-[0.95rem] text-ink placeholder:text-warm-brown/30 outline-none transition-all duration-300 focus:border-primary/30 focus:shadow-[0_0_0_3px_rgba(103,58,183,0.08)]"
          />
        </div>
        <div className="flex-1">
          <label
            htmlFor="email"
            className="block text-[0.78rem] font-semibold text-warm-brown/60 uppercase tracking-[0.06em] mb-2"
          >
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            required
            placeholder="you@example.com"
            className="w-full px-4 py-3 rounded-xl bg-white border border-primary/10 text-[0.95rem] text-ink placeholder:text-warm-brown/30 outline-none transition-all duration-300 focus:border-primary/30 focus:shadow-[0_0_0_3px_rgba(103,58,183,0.08)]"
          />
        </div>
      </div>

      <div>
        <label
          htmlFor="message"
          className="block text-[0.78rem] font-semibold text-warm-brown/60 uppercase tracking-[0.06em] mb-2"
        >
          Message
        </label>
        <textarea
          id="message"
          name="message"
          required
          rows={5}
          placeholder="How can we help?"
          className="w-full px-4 py-3 rounded-xl bg-white border border-primary/10 text-[0.95rem] text-ink placeholder:text-warm-brown/30 outline-none transition-all duration-300 focus:border-primary/30 focus:shadow-[0_0_0_3px_rgba(103,58,183,0.08)] resize-vertical min-h-[120px]"
        />
      </div>

      {status === "error" && (
        <p className="text-red-500 text-[0.85rem] m-0">
          Something went wrong. Please try again or email us directly.
        </p>
      )}

      <button
        type="submit"
        disabled={status === "sending"}
        className="self-start px-8 py-3 rounded-2xl bg-primary text-white font-semibold text-[0.95rem] border-none cursor-pointer transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_8px_30px_rgba(103,58,183,0.35)] disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:translate-y-0 disabled:hover:shadow-none"
      >
        {status === "sending" ? "Sending..." : "Send message"}
      </button>
    </form>
  );
}
