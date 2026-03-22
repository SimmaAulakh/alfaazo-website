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
      <div className="w-full max-w-[1200px] mx-auto px-6 md:px-12 grid md:grid-cols-[1fr_auto] items-center gap-12">
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
              href="#"
              className="group flex items-center gap-3 pl-5 pr-7 py-3 rounded-2xl bg-primary text-white no-underline transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_8px_30px_rgba(103,58,183,0.35)] shadow-[0_4px_16px_rgba(103,58,183,0.2)]"
            >
              <svg width="22" height="22" viewBox="0 0 24 24" fill="white" className="opacity-90 group-hover:opacity-100 transition-opacity">
                <path d="M3,20.5V3.5C3,2.91 3.34,2.39 3.84,2.15L13.69,12L3.84,21.85C3.34,21.61 3,21.09 3,20.5M16.81,15.12L6.05,21.34L14.54,12.85L16.81,15.12M20.16,10.81C20.5,11.08 20.75,11.5 20.75,12C20.75,12.5 20.53,12.9 20.18,13.18L17.89,14.5L15.39,12L17.89,9.5L20.16,10.81M6.05,2.66L16.81,8.88L14.54,11.15L6.05,2.66Z" />
              </svg>
              <div>
                <div className="text-[0.6rem] opacity-70 uppercase tracking-[0.08em] leading-none">
                  Get it on
                </div>
                <div className="text-[0.95rem] font-semibold leading-tight">Google Play</div>
              </div>
            </a>

            <a
              href="#"
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
          </div>
        </div>

        {/* Right side — Gurmukhi script art element (visible on desktop) */}
        <div className="hidden md:flex flex-col items-center gap-3 animate-fadeIn" style={{ animationDelay: "0.4s" }}>
          <div className="relative">
            <div className="w-[200px] h-[200px] rounded-3xl bg-gradient-to-br from-primary/8 to-primary/3 border border-primary/10 flex items-center justify-center backdrop-blur-sm">
              <span className="font-urdu text-[6rem] text-primary/60 leading-none select-none">ਪ</span>
            </div>
            <div className="absolute -bottom-3 -right-3 w-[200px] h-[200px] rounded-3xl border border-xp-gold/15 -z-10" />
          </div>
          <span className="text-[0.7rem] text-warm-brown/40 tracking-[0.1em] uppercase mt-2">Punjabi</span>
        </div>
      </div>
    </section>
  );
}
