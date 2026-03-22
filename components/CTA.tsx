export default function CTA() {
  return (
    <section className="py-20 px-6 md:px-12 relative">
      <div className="max-w-[1200px] mx-auto">
        <div className="relative rounded-[28px] overflow-hidden bg-gradient-to-br from-[#2D1660] via-primary-dark to-[#4A1FA0] px-8 md:px-16 py-20 geo-pattern">
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

            <div className="flex flex-col items-center gap-4">
              <a
                href="#"
                className="inline-block px-10 py-4 rounded-2xl bg-xp-gold text-primary-dark no-underline font-bold text-[1rem] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_8px_30px_rgba(255,179,0,0.4)] shadow-[0_4px_16px_rgba(255,179,0,0.25)] tracking-wide"
              >
                Download Free
              </a>
              <span className="text-[0.72rem] text-white/50 tracking-wide">iOS & Android</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
