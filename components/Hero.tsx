"use client";

import Image from "next/image";

function trackClick(label: string) {
  if (typeof window !== "undefined" && typeof window.gtag === "function") {
    window.gtag("event", "click", {
      event_category: "download",
      event_label: label,
    });
  }
}

// Framed app screenshots from the design kit (transparent corners, 640×1356 web copies).
const SCREENS = {
  home: {
    src: "/screens/home.webp",
    alt: "Alfaazo home screen: a five-day streak, 40 of 60 XP for the day, and the Your Journey lesson units with Alfie the mascot",
  },
  exercise: {
    src: "/screens/exercise.webp",
    alt: "Alfaazo lesson exercise asking which word means Hello, with Sat Sri Akaal in Gurmukhi marked correct",
  },
  alphabet: {
    src: "/screens/alphabet.webp",
    alt: "Alfaazo Punjabi alphabet screen showing the 35 Gurmukhi letters with their names and audio buttons",
  },
};

export default function Hero() {
  return (
    <section
      id="hero"
      className="min-h-screen flex items-center relative overflow-hidden"
    >
      {/* Large decorative Gurmukhi — the hero visual */}
      <div className="absolute -right-[5%] top-1/2 -translate-y-1/2 select-none pointer-events-none" aria-hidden="true">
        <span
          className="font-urdu text-[clamp(18rem,35vw,28rem)] text-primary/[0.04] leading-none block animate-float"
          style={{ animationDuration: "10s" }}
        >
          ਪ
        </span>
      </div>

      {/* Subtle gradient orbs */}
      <div className="absolute top-[15%] right-[10%] w-[400px] h-[400px] rounded-full bg-[radial-gradient(circle,rgba(103,58,183,0.06)_0%,transparent_65%)] blur-xl" />
      <div className="absolute bottom-[10%] left-[5%] w-[300px] h-[300px] rounded-full bg-[radial-gradient(circle,rgba(255,179,0,0.05)_0%,transparent_65%)] blur-xl" />

      {/* Floating Gurmukhi characters */}
      <span
        className="font-urdu text-[2.5rem] text-primary/[0.08] absolute top-[20%] right-[22%] select-none animate-float"
        style={{ animationDuration: "8s", animationDelay: "1s" }}
        aria-hidden="true"
      >ੳ</span>
      <span
        className="font-urdu text-[2rem] text-xp-gold/[0.1] absolute top-[65%] right-[15%] select-none animate-float"
        style={{ animationDuration: "9s", animationDelay: "2s" }}
        aria-hidden="true"
      >ੲ</span>
      <span
        className="font-urdu text-[2.2rem] text-primary/[0.06] absolute bottom-[25%] left-[12%] select-none animate-float"
        style={{ animationDuration: "7s", animationDelay: "0.5s" }}
        aria-hidden="true"
      >ਸ</span>

      {/* Content */}
      <div className="w-full max-w-[1200px] mx-auto px-6 md:px-12 pt-28 pb-10 md:py-0 grid md:grid-cols-[1fr_auto] items-center gap-12">
        <div className="animate-fadeInUp">
          {/* Eyebrow */}
          <div className="flex items-center gap-3 mb-8">
            <div className="h-[1px] w-8 bg-gradient-to-r from-primary to-transparent" />
            <span className="text-primary text-[0.72rem] font-semibold tracking-[0.18em] uppercase">
              Punjabi is live — more languages coming soon
            </span>
          </div>

          <h1 className="font-heading text-[clamp(3rem,6.5vw,5rem)] font-black leading-[0.95] text-ink mb-8 tracking-tight">
            Learn Punjabi,
            <br />
            <span className="text-primary">own your roots.</span>
          </h1>

          <p className="text-[1.1rem] leading-[1.8] text-warm-brown/75 max-w-[480px] mb-10">
            <strong className="text-ink">Alfaazo</strong> — from{" "}
            <em className="text-primary/80">alfaaz</em> (ਅਲਫ਼ਾਜ਼), meaning
            &ldquo;words.&rdquo; Master Gurmukhi script, everyday phrases, and
            real-world Punjabi through bite-sized lessons crafted with cultural love.
          </p>

          {/* Download buttons */}
          <div id="download" className="flex gap-3 flex-wrap">
            <a
              href="https://apps.apple.com/us/app/alfaazo-learn-punjabi/id6759987308"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => trackClick("app_store_hero")}
              className="group flex items-center gap-3 pl-5 pr-7 py-3 rounded-2xl bg-ink text-white no-underline transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_8px_30px_rgba(33,33,33,0.25)] shadow-[0_4px_16px_rgba(33,33,33,0.15)]"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="white" className="opacity-90 group-hover:opacity-100 transition-opacity">
                <path d="M18.71,19.5C17.88,20.5 17,21.4 15.66,21.41C14.32,21.42 13.87,20.6 12.37,20.6C10.87,20.6 10.37,21.39 9.1,21.42C7.79,21.45 6.8,20.44 5.96,19.47C4.25,17.47 2.94,13.87 4.72,11.42C5.59,10.21 6.94,9.45 8.4,9.43C9.68,9.41 10.89,10.31 11.66,10.31C12.43,10.31 13.91,9.22 15.46,9.39C16.13,9.42 17.83,9.67 18.95,11.25C18.86,11.3 16.58,12.62 16.61,15.41C16.64,18.72 19.53,19.79 19.56,19.8C19.53,19.87 19.16,21.14 18.71,19.5ZM13,3.5C13.73,2.67 14.94,2.04 15.94,2C16.07,3.17 15.6,4.35 14.9,5.19C14.21,6.04 13.07,6.7 11.95,6.61C11.8,5.46 12.36,4.26 13,3.5Z" />
              </svg>
              <div>
                <div className="text-[0.6rem] opacity-70 uppercase tracking-[0.08em] leading-none">
                  Download on the
                </div>
                <div className="text-[0.95rem] font-semibold leading-tight">App Store</div>
              </div>
            </a>

            <a
              href="https://play.google.com/store/apps/details?id=com.alfaazo.app"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => trackClick("play_store_hero")}
              className="group flex items-center gap-3 pl-5 pr-7 py-3 rounded-2xl bg-primary/15 text-primary no-underline transition-all duration-300 hover:-translate-y-0.5 hover:bg-primary/20 border border-primary/20"
            >
              <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor" className="opacity-75 group-hover:opacity-100 transition-opacity">
                <path d="M3,20.5V3.5C3,2.91 3.34,2.39 3.84,2.15L13.69,12L3.84,21.85C3.34,21.61 3,21.09 3,20.5M16.81,15.12L6.05,21.34L14.54,12.85L16.81,15.12M20.16,10.81C20.5,11.08 20.75,11.5 20.75,12C20.75,12.5 20.53,12.9 20.18,13.18L17.89,14.5L15.39,12L17.89,9.5L20.16,10.81M6.05,2.66L16.81,8.88L14.54,11.15L6.05,2.66Z" />
              </svg>
              <div>
                <div className="text-[0.6rem] opacity-70 uppercase tracking-[0.08em] leading-none">
                  Get it on
                </div>
                <div className="text-[0.95rem] font-semibold leading-tight">Google Play</div>
              </div>
            </a>
          </div>
        </div>

        {/* Right side — app screenshots: home screen in front, exercise and alphabet behind */}
        <div
          role="group"
          aria-label="Screenshots of the Alfaazo app"
          className="relative mx-auto w-full max-w-[340px] md:max-w-none md:w-[220px] lg:w-[320px] xl:w-[460px] aspect-[9/10] animate-fadeIn"
          style={{ animationDelay: "0.3s" }}
        >
          {/* Soft glow behind the phones */}
          <div
            className="absolute inset-x-[8%] top-[6%] bottom-[4%] rounded-full bg-[radial-gradient(ellipse_at_center,rgba(103,58,183,0.16)_0%,transparent_68%)] blur-2xl"
            aria-hidden="true"
          />

          {/* Left — exercise */}
          <div className="absolute left-0 top-[11%] w-[39%] -rotate-6 origin-bottom">
            <div className="animate-float" style={{ animationDuration: "9s", animationDelay: "0.8s" }}>
              <Image
                src={SCREENS.exercise.src}
                alt={SCREENS.exercise.alt}
                width={640}
                height={1356}
                sizes="(max-width: 767px) 133px, (max-width: 1023px) 86px, (max-width: 1279px) 125px, 180px"
                className="w-full h-auto"
                style={{ filter: "drop-shadow(0 22px 36px rgba(81,45,168,0.22))" }}
              />
            </div>
          </div>

          {/* Right — alphabet */}
          <div className="absolute right-0 top-[11%] w-[39%] rotate-6 origin-bottom">
            <div className="animate-float" style={{ animationDuration: "11s", animationDelay: "1.6s" }}>
              <Image
                src={SCREENS.alphabet.src}
                alt={SCREENS.alphabet.alt}
                width={640}
                height={1356}
                sizes="(max-width: 767px) 133px, (max-width: 1023px) 86px, (max-width: 1279px) 125px, 180px"
                className="w-full h-auto"
                style={{ filter: "drop-shadow(0 22px 36px rgba(81,45,168,0.22))" }}
              />
            </div>
          </div>

          {/* Centre — home (the hero image) */}
          <div className="absolute left-1/2 top-0 w-[49%] -translate-x-1/2">
            <div className="animate-float" style={{ animationDuration: "10s" }}>
              <Image
                src={SCREENS.home.src}
                alt={SCREENS.home.alt}
                width={640}
                height={1356}
                priority
                sizes="(max-width: 767px) 167px, (max-width: 1023px) 108px, (max-width: 1279px) 157px, 226px"
                className="w-full h-auto"
                style={{ filter: "drop-shadow(0 30px 56px rgba(81,45,168,0.32))" }}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
