"use client";

function trackClick(label: string) {
  if (typeof window !== "undefined" && typeof window.gtag === "function") {
    window.gtag("event", "click", {
      event_category: "download",
      event_label: label,
    });
  }
}

export default function CTA() {
  return (
    <section className="py-20 px-6 md:px-12 relative">
      <div className="max-w-[1200px] mx-auto">
        <div className="relative rounded-[28px] overflow-hidden px-8 md:px-16 py-20 geo-pattern" style={{ background: "linear-gradient(135deg, #1A0A3E 0%, #2D1660 30%, #512DA8 60%, #4A1FA0 100%)" }}>
          {/* Decorative elements */}
          <div className="absolute top-6 left-8 w-16 h-16 rounded-full border border-white/10" />
          <div className="absolute bottom-10 right-12 w-24 h-24 rounded-full border border-white/5" />
          <span
            className="absolute top-1/2 right-[8%] -translate-y-1/2 font-urdu text-[12rem] text-white/[0.03] select-none leading-none"
            aria-hidden="true"
          >
            ਅ
          </span>

          <div className="relative z-10 flex flex-col items-center text-center gap-8">
            <div className="max-w-[500px]">
              <div className="text-4xl mb-5 animate-float" style={{ animationDuration: "5s" }}>🪷</div>
              <h2 className="font-heading text-[clamp(2rem,4vw,2.8rem)] font-black text-white mb-4 leading-[1.1] tracking-tight">
                Start your journey
                <br />
                with Alfaazo today
              </h2>
              <p className="text-[0.95rem] text-white/70 leading-relaxed">
                Free to download. Begin with Punjabi — more languages dropping soon.
              </p>
            </div>

            <div className="flex flex-col items-center gap-5">
              <div className="flex gap-3 flex-wrap justify-center">
                <a
                  href="https://apps.apple.com/us/app/alfaazo-learn-punjabi/id6759987308"
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => trackClick("app_store_cta")}
                  className="group flex items-center gap-3 pl-5 pr-7 py-3 rounded-2xl bg-white text-primary-dark no-underline transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_8px_30px_rgba(255,255,255,0.25)] shadow-[0_4px_16px_rgba(255,255,255,0.1)]"
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" className="opacity-80 group-hover:opacity-100 transition-opacity">
                    <path d="M18.71,19.5C17.88,20.5 17,21.4 15.66,21.41C14.32,21.42 13.87,20.6 12.37,20.6C10.87,20.6 10.37,21.39 9.1,21.42C7.79,21.45 6.8,20.44 5.96,19.47C4.25,17.47 2.94,13.87 4.72,11.42C5.59,10.21 6.94,9.45 8.4,9.43C9.68,9.41 10.89,10.31 11.66,10.31C12.43,10.31 13.91,9.22 15.46,9.39C16.13,9.42 17.83,9.67 18.95,11.25C18.86,11.3 16.58,12.62 16.61,15.41C16.64,18.72 19.53,19.79 19.56,19.8C19.53,19.87 19.16,21.14 18.71,19.5ZM13,3.5C13.73,2.67 14.94,2.04 15.94,2C16.07,3.17 15.6,4.35 14.9,5.19C14.21,6.04 13.07,6.7 11.95,6.61C11.8,5.46 12.36,4.26 13,3.5Z" />
                  </svg>
                  <div>
                    <div className="text-[0.6rem] opacity-60 uppercase tracking-[0.08em] leading-none">Download on the</div>
                    <div className="text-[0.95rem] font-semibold leading-tight">App Store</div>
                  </div>
                </a>

                <a
                  href="https://forms.gle/SQL24Ukak68iB6Ur9"
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => trackClick("play_store_waitlist_cta")}
                  className="group flex items-center gap-3 pl-5 pr-7 py-3 rounded-2xl bg-white/10 text-white no-underline border border-white/20 transition-all duration-300 hover:-translate-y-0.5 hover:bg-white/15"
                >
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor" className="opacity-70 group-hover:opacity-100 transition-opacity">
                    <path d="M3,20.5V3.5C3,2.91 3.34,2.39 3.84,2.15L13.69,12L3.84,21.85C3.34,21.61 3,21.09 3,20.5M16.81,15.12L6.05,21.34L14.54,12.85L16.81,15.12M20.16,10.81C20.5,11.08 20.75,11.5 20.75,12C20.75,12.5 20.53,12.9 20.18,13.18L17.89,14.5L15.39,12L17.89,9.5L20.16,10.81M6.05,2.66L16.81,8.88L14.54,11.15L6.05,2.66Z" />
                  </svg>
                  <div>
                    <div className="text-[0.6rem] opacity-70 uppercase tracking-[0.08em] leading-none">Coming soon on</div>
                    <div className="text-[0.95rem] font-semibold leading-tight">Google Play</div>
                  </div>
                  <span className="text-[0.55rem] font-semibold bg-xp-gold text-primary-dark px-2 py-0.5 rounded-full uppercase tracking-wider">Beta</span>
                </a>
              </div>
              <span className="text-[0.72rem] text-white/50 tracking-wide">Join the Android waitlist for early access</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
