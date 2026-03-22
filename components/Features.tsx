const features = [
  {
    icon: "📦",
    title: "Modular Language Packs",
    desc: "Download only the languages you want. Start with Punjabi, add Urdu, Hindi, and more as you grow.",
    accent: "from-primary/10 to-primary/5",
  },
  {
    icon: "🎯",
    title: "Bite-Sized Lessons",
    desc: "Learn in 5-minute sessions that fit into your chai break. Vocabulary, phrases, and script practice.",
    accent: "from-xp-gold/10 to-xp-gold/5",
  },
  {
    icon: "🔊",
    title: "Native Pronunciation",
    desc: "Hear words spoken the way they sound in real conversations — not textbook robot-speak.",
    accent: "from-muted-sage/15 to-muted-sage/5",
  },
  {
    icon: "🪷",
    title: "Culturally Rooted",
    desc: "Lessons woven with cultural context — proverbs, food, festivals, and everyday life.",
    accent: "from-blush/40 to-blush/10",
  },
  {
    icon: "📝",
    title: "Script Mastery",
    desc: "Learn Gurmukhi, Shahmukhi, and Devanagari with guided stroke-by-stroke writing practice.",
    accent: "from-primary-light/10 to-primary-light/5",
  },
  {
    icon: "🏆",
    title: "Track Your Journey",
    desc: "Streaks, progress maps, and gentle reminders to keep you consistent without pressure.",
    accent: "from-streak-orange/10 to-streak-orange/5",
  },
];

export default function Features() {
  return (
    <section id="features" className="py-28 px-6 md:px-12 relative">
      <div className="max-w-[1200px] mx-auto">
        {/* Section header — editorial style */}
        <div className="flex items-end justify-between mb-16 gap-8 flex-wrap">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="h-[1px] w-8 bg-gradient-to-r from-primary to-transparent" />
              <span className="text-primary text-[0.72rem] font-semibold tracking-[0.18em] uppercase">
                Features
              </span>
            </div>
            <h2 className="font-heading text-[clamp(2.2rem,4vw,3.2rem)] font-black text-ink leading-[1.05] tracking-tight">
              Learn with
              <br />
              <span className="text-primary">intention</span>
            </h2>
          </div>
          <p className="text-[0.95rem] text-warm-brown/60 max-w-[360px] leading-relaxed">
            Every feature is designed to make learning your mother tongue feel
            natural and joyful.
          </p>
        </div>

        {/* Bento grid — varied sizes for visual interest */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {features.map((f, i) => (
            <div
              key={i}
              className={`group relative p-8 rounded-2xl bg-gradient-to-br ${f.accent} border border-black/[0.04] transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_16px_48px_rgba(103,58,183,0.08)] animate-fadeInUp ${
                i === 0 ? "lg:col-span-2 lg:row-span-1" : ""
              }`}
              style={{ animationDelay: `${i * 0.08}s` }}
            >
              <div className="flex items-start gap-5">
                <div className="text-[1.8rem] shrink-0 mt-0.5">{f.icon}</div>
                <div>
                  <h3 className="font-heading text-[1.15rem] font-bold text-ink mb-2 group-hover:text-primary-dark transition-colors duration-300">
                    {f.title}
                  </h3>
                  <p className="text-[0.88rem] leading-[1.7] text-warm-brown/65">
                    {f.desc}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
