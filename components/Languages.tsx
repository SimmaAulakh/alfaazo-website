const langs = [
  {
    name: "Punjabi",
    script: "ਪੰਜਾਬੀ",
    nativeChar: "ਅ",
    status: "Available",
    color: "text-primary",
    borderColor: "border-primary/20",
    bgHover: "group-hover:bg-primary/5",
    statusColor: "text-secondary",
  },
  {
    name: "Urdu",
    script: "اردو",
    nativeChar: "ا",
    status: "Coming Soon",
    color: "text-primary-dark",
    borderColor: "border-primary-dark/15",
    bgHover: "group-hover:bg-primary-dark/5",
    statusColor: "text-warm-brown/40",
  },
  {
    name: "Hindi",
    script: "हिन्दी",
    nativeChar: "अ",
    status: "Coming Soon",
    color: "text-muted-sage",
    borderColor: "border-muted-sage/20",
    bgHover: "group-hover:bg-muted-sage/5",
    statusColor: "text-warm-brown/40",
  },
  {
    name: "Bengali",
    script: "বাংলা",
    nativeChar: "অ",
    status: "Planned",
    color: "text-xp-gold",
    borderColor: "border-xp-gold/20",
    bgHover: "group-hover:bg-xp-gold/5",
    statusColor: "text-warm-brown/30",
  },
];

export default function Languages() {
  return (
    <section
      id="languages"
      className="py-28 px-6 md:px-12 relative"
    >
      {/* Full-width divider */}
      <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-primary/15 to-transparent" />

      <div className="max-w-[1200px] mx-auto">
        <div className="grid md:grid-cols-[1fr_1.5fr] gap-16 items-start">
          {/* Left — section text */}
          <div className="md:sticky md:top-32">
            <div className="flex items-center gap-3 mb-4">
              <div className="h-[1px] w-8 bg-gradient-to-r from-primary to-transparent" />
              <span className="text-primary text-[0.72rem] font-semibold tracking-[0.18em] uppercase">
                Languages
              </span>
            </div>
            <h2 className="font-heading text-[clamp(2.2rem,4vw,3.2rem)] font-black text-ink leading-[1.05] tracking-tight mb-5">
              One app,
              <br />
              <span className="text-primary">many tongues</span>
            </h2>
            <p className="text-[0.95rem] text-warm-brown/60 leading-relaxed max-w-[380px]">
              Download the languages you care about. We&rsquo;re starting with
              Punjabi and expanding across South Asia.
            </p>
          </div>

          {/* Right — language cards */}
          <div className="grid grid-cols-2 gap-4">
            {langs.map((l, i) => (
              <div
                key={i}
                className={`group relative py-10 px-6 rounded-2xl bg-surface border ${l.borderColor} transition-all duration-400 hover:-translate-y-1 hover:shadow-[0_12px_40px_rgba(0,0,0,0.06)] ${l.bgHover} animate-fadeInUp overflow-hidden`}
                style={{ animationDelay: `${i * 0.1}s` }}
              >
                {/* Large background character */}
                <span
                  className={`absolute -right-3 -bottom-4 font-urdu text-[7rem] ${l.color} opacity-[0.04] select-none leading-none transition-opacity duration-400 group-hover:opacity-[0.08]`}
                  aria-hidden="true"
                >
                  {l.nativeChar}
                </span>

                <div className="relative z-10 text-center">
                  <div className={`font-urdu text-[2.4rem] ${l.color} mb-3 leading-none`}>
                    {l.script}
                  </div>
                  <div className="font-heading text-[1.1rem] font-bold text-ink mb-2">
                    {l.name}
                  </div>
                  <div className={`text-[0.7rem] font-semibold uppercase tracking-[0.1em] ${l.statusColor}`}>
                    {l.status}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
