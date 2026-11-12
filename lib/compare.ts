import { APP, PRICE_TEXT, SITE_URL, type StoreRating } from "./appFacts";

// Side-by-side comparison pages (/compare/alfaazo-vs-<app>). Competitor facts
// were checked against each vendor's own pages and the US App Store on the
// date in CHECKED; re-verify before changing a number. Alfaazo's column comes
// from appFacts so it cannot drift from /app and /pricing.

export const CHECKED = "12 November 2026";

export type Row = { label: string; alfaazo: string; other: string };

export type Comparison = {
  slug: string;
  name: string;
  /** "Ling", "Pimsleur", "Duolingo" — used in headings and copy */
  short: string;
  title: string;
  metaTitle: string;
  description: string;
  quickAnswer: string;
  intro: string;
  rows: Row[];
  otherBetter: string[];
  alfaazoBetter: string[];
  pickOther: string;
  pickAlfaazo: string;
  faq: { q: string; a: string }[];
  sources: { label: string; url: string }[];
  related: { label: string; href: string }[];
};

const ALFAAZO = {
  builtFor: "Punjabi only — one language, one course, written for heritage speakers and beginners",
  punjabi: "Indian Punjabi in the Gurmukhi script",
  script: "Yes — every letter and vowel sign with a stroke-by-stroke writing guide, from the first unit",
  audio: "Every word and sentence recorded by a native Punjabi speaker; no synthesised voices",
  size: `${APP.lessons} lessons in ${APP.units} units (two sections), ${APP.vocabulary} words and phrases, ${APP.exercises} exercises`,
  free: `${APP.free.unitsText}, ${APP.free.newLessonsPerDay} new lessons a day (${APP.free.firstDayNewLessons} on day one), with ads`,
  paid: PRICE_TEXT,
  platforms: `iOS ${APP.minIos}+ and Android; no web version`,
  maker: `${APP.developer} at ${APP.studio}; released ${APP.iosReleased.slice(0, 4)}`,
};

export function alfaazoRating(rating: StoreRating | null | undefined) {
  return rating
    ? `${rating.value} from ${rating.count} ratings (${rating.country.toUpperCase()} App Store, live)`
    : "See the App Store listing";
}

export const COMPARISONS: Comparison[] = [
  {
    slug: "alfaazo-vs-ling",
    name: "Alfaazo vs Ling",
    short: "Ling",
    title: "Alfaazo vs Ling for Learning Punjabi (2026): Which App Should You Pick?",
    metaTitle: "Alfaazo vs Ling for Punjabi (2026)",
    description:
      "Alfaazo and Ling compared for learning Punjabi: Gurmukhi teaching, audio, course size, free plans, price (US$49.99 vs US$89.99 a year), platforms and ratings, checked November 2026.",
    quickAnswer:
      "Pick Alfaazo if Punjabi is the language you want: it is built only for Punjabi, teaches Gurmukhi stroke by stroke from the first lesson, records every word with native speakers, gives you 14 units free and costs US$49.99 a year. Pick Ling if you want one subscription for several languages, a web app and game-style drills across 80 languages; Ling Pro is US$89.99 a year and the free tier is the first two units.",
    intro:
      "Ling and Alfaazo are the two structured, lesson-by-lesson apps that teach Indian Punjabi in Gurmukhi, so this is the comparison most learners actually have to make. Ling is a Thai company's 80-language platform on which Punjabi is one course; Alfaazo is a Punjabi-only app built by a Punjabi developer. Below is a fact-by-fact table, where each app is honestly better, and who should pick which.",
    rows: [
      { label: "Built for", alfaazo: ALFAAZO.builtFor, other: "80 languages from one company; Punjabi is one course on a shared lesson template" },
      { label: "Punjabi taught", alfaazo: ALFAAZO.punjabi, other: "Indian Punjabi in Gurmukhi" },
      { label: "Teaches the Gurmukhi script", alfaazo: ALFAAZO.script, other: "Yes — its Punjabi page says the app guides you through Gurmukhi step by step" },
      { label: "Audio", alfaazo: ALFAAZO.audio, other: "Lessons written and reviewed by native speakers; audio in lessons and a speaking game" },
      { label: "Course size", alfaazo: ALFAAZO.size, other: "Not published for Punjabi; units of vocabulary and phrases taught through mini-games, dialogues and flashcards" },
      { label: "Free plan", alfaazo: ALFAAZO.free, other: "The first 2 units of any language, with ads" },
      { label: "Paid plan", alfaazo: ALFAAZO.paid, other: "Ling Pro US$89.99 a year for all 80 languages; monthly and 6-month plans also sold; 7-day free trial on the yearly plan only" },
      { label: "Platforms", alfaazo: ALFAAZO.platforms, other: "iOS, Android, and a web app for Pro subscribers" },
      { label: "Maker and age", alfaazo: ALFAAZO.maker, other: "Simya Solutions, Chiang Mai, Thailand; founded 2016; 5M+ learners" },
      { label: "US App Store rating", alfaazo: "__RATING__", other: `4.6 from 16,941 ratings (${CHECKED})` },
      { label: "Best for", alfaazo: "Heritage speakers and beginners who want to read Gurmukhi and sound right", other: "Learners who like games and may learn more than one language" },
    ],
    otherBetter: [
      "One subscription covers 80 languages, so a family learning Punjabi and Thai, or a learner who switches languages, pays once.",
      "A web app for Pro subscribers; Alfaazo is phone and tablet only.",
      "A far longer track record: founded 2016, 5M+ learners, 17,000 iOS ratings against Alfaazo's few dozen in its first year.",
      "More drill formats (dialogue game, sentence sorting, speaking game) if you enjoy variety for its own sake.",
      "A 7-day free trial on the yearly plan.",
    ],
    alfaazoBetter: [
      "Punjabi-only content: proverbs, festivals, family terms and etiquette written for Punjabi, not translated from a template shared with 79 other languages.",
      "Gurmukhi from lesson one with stroke-by-stroke writing guides, so you read real Punjabi rather than romanised text.",
      "Every word recorded by a native speaker — Punjabi is tonal, and the tones have to be heard.",
      `A much bigger free plan: ${APP.free.unitsText} against Ling's first two units.`,
      `Price: US$${APP.plus.yearlyUsd} a year against US$89.99, with a US$${APP.plus.lifetimeUsd} lifetime option Ling does not offer.`,
      `A published, sequenced course (${APP.lessons} lessons, two sections, grammar units) rather than an unstated number of vocabulary units.`,
    ],
    pickOther:
      "You want to learn several languages on one subscription, you study on a laptop, or you specifically enjoy Ling's game formats and have already tried its free units.",
    pickAlfaazo:
      "Punjabi is the language you want, you want to read and write Gurmukhi, you care about native pronunciation, or you want the lower price and the larger free plan.",
    faq: [
      { q: "Is Ling or Alfaazo better for Punjabi?", a: "Alfaazo is better if Punjabi is your only target: it is built just for Punjabi, teaches Gurmukhi from the first lesson with stroke guides, records every word with native speakers, offers 14 free units and costs US$49.99 a year. Ling is better if you want one subscription (US$89.99 a year) for several of its 80 languages or a web app." },
      { q: "Does Ling teach Gurmukhi?", a: "Yes. Ling's Punjabi page says the app guides you through the Gurmukhi script step by step. Alfaazo also teaches Gurmukhi, from the first unit, with a stroke-by-stroke writing guide for every letter and vowel sign." },
      { q: "Which is cheaper, Ling or Alfaazo?", a: `Alfaazo. Alfaazo Plus is US$${APP.plus.monthlyUsd} a month, US$${APP.plus.yearlyUsd} a year or US$${APP.plus.lifetimeUsd} for life; Ling Pro is US$89.99 a year (covering all 80 languages). Both apps are free to download, and Alfaazo's free plan (14 units) is larger than Ling's (2 units). Prices vary by country.` },
      { q: "Can I use both?", a: "Yes, and some learners do: Alfaazo for the course and the script, Ling's free units for extra vocabulary games. If you are paying for one, pick the one whose free tier you actually kept opening." },
    ],
    sources: [
      { label: "Ling fact sheet (llms.txt)", url: "https://ling-app.com/llms.txt" },
      { label: "Ling Punjabi course page", url: "https://ling-app.com/learn-language/punjabi/" },
      { label: "Ling on the App Store", url: "https://apps.apple.com/us/app/id1403783779" },
      { label: "Alfaazo on the App Store", url: "https://apps.apple.com/us/app/id6759987308" },
    ],
    related: [
      { label: "Best apps to learn Punjabi in 2026", href: "/blog/best-app-to-learn-punjabi-2026" },
      { label: "Which language apps have Punjabi?", href: "/blog/which-language-apps-have-punjabi" },
    ],
  },
  {
    slug: "alfaazo-vs-pimsleur",
    name: "Alfaazo vs Pimsleur",
    short: "Pimsleur",
    title: "Alfaazo vs Pimsleur for Learning Punjabi (2026): Audio Course or Full Course?",
    metaTitle: "Alfaazo vs Pimsleur for Punjabi (2026)",
    description:
      "Alfaazo and Pimsleur Punjabi compared: Pimsleur is 30 audio-only lessons of Eastern Punjabi with no script; Alfaazo is a 112-lesson Gurmukhi-first course. Price, free plans, ratings, checked November 2026.",
    quickAnswer:
      "They do different jobs. Pimsleur Punjabi is one level of 30 half-hour audio lessons that teach you to speak and understand basic Eastern Punjabi hands-free, with no reading or writing. Alfaazo is a 112-lesson course that teaches the Gurmukhi script, 1,200+ words and everyday conversation on your phone, free to download with an optional Plus plan. Pick Pimsleur for the car, Alfaazo to read and write, and many learners use both.",
    intro:
      "Pimsleur is the oldest name in audio language courses, and its Punjabi programme is the one serious hands-free option for the language. Alfaazo is a screen-based course that starts with the Gurmukhi script. They overlap on speaking practice and nowhere else, so the question is less which is better than which job you need done.",
    rows: [
      { label: "Built for", alfaazo: ALFAAZO.builtFor, other: "Speaking and listening by ear, using the Pimsleur spaced-recall method; 50+ languages" },
      { label: "Punjabi taught", alfaazo: ALFAAZO.punjabi, other: "Eastern Punjabi as spoken in India, audio only" },
      { label: "Teaches the Gurmukhi script", alfaazo: ALFAAZO.script, other: "No — there is no reading or writing component for Punjabi" },
      { label: "Audio", alfaazo: ALFAAZO.audio, other: "Studio-recorded native speakers; each lesson is a 30-minute guided conversation" },
      { label: "Course size", alfaazo: ALFAAZO.size, other: "Level 1 only: 30 lessons, about 15 hours. No Level 2 for Punjabi" },
      { label: "Free plan", alfaazo: ALFAAZO.free, other: "One free lesson" },
      { label: "Paid plan", alfaazo: ALFAAZO.paid, other: `Premium subscription for one language (monthly), or Level 1 bought outright at a list price of US$150 (${CHECKED}); 30-day money-back guarantee` },
      { label: "Platforms", alfaazo: ALFAAZO.platforms, other: "iOS, Android and web; lessons play with the screen off" },
      { label: "Maker and age", alfaazo: ALFAAZO.maker, other: "Simon & Schuster; the method dates from the 1960s" },
      { label: "US App Store rating", alfaazo: "__RATING__", other: `4.7 from 30,834 ratings, all languages (${CHECKED})` },
      { label: "Best for", alfaazo: "Learners who want to read, write and speak Punjabi with a daily phone lesson", other: "Commuters and listeners who want to speak basic Punjabi hands-free" },
    ],
    otherBetter: [
      "Hands-free: you can do a whole lesson while driving, walking or cooking. Alfaazo needs the screen.",
      "A proven spaced-recall method that makes you produce full sentences out loud from the first lesson.",
      "Thirty minutes of guided speaking per lesson, more than any phone app gives you.",
      "Simon & Schuster's catalogue, support and refund policy.",
    ],
    alfaazoBetter: [
      "It teaches you to read and write: Gurmukhi from the first unit with stroke-by-stroke guides. Pimsleur Punjabi has no script at all, so Pimsleur-only learners cannot read a sign, a text from family or a line of Gurbani.",
      `Course depth: ${APP.lessons} lessons across ${APP.units} units against 30 lessons in a single level, with no Level 2 published for Punjabi.`,
      `Vocabulary breadth: ${APP.vocabulary} words and phrases organised by topic (family, food, festivals, travel, work), where Pimsleur's audio format can hold a few hundred.`,
      `Price: free to download with ${APP.free.unitsText} at no cost; Plus is US$${APP.plus.yearlyUsd} a year or US$${APP.plus.lifetimeUsd} for life, against a US$150 list price for Pimsleur's single level.`,
      "Cultural content written for Punjabi: proverbs, festival greetings, etiquette.",
    ],
    pickOther:
      "You spend an hour a day in the car or on foot, you only want to speak and understand, and reading Gurmukhi is not a goal.",
    pickAlfaazo:
      "You want to read and write Punjabi, you prefer five-to-ten-minute lessons on your phone, you want more than 30 lessons, or you want a free plan to start with. If you can afford both, Pimsleur in the car and Alfaazo at home is a strong combination.",
    faq: [
      { q: "Does Pimsleur teach Punjabi?", a: "Yes. Pimsleur Punjabi is a single level of 30 audio lessons of about 30 minutes each, teaching Eastern Punjabi as spoken in India. It is audio only: there is no Gurmukhi reading or writing component." },
      { q: "Is Pimsleur or Alfaazo better for Punjabi?", a: "Pimsleur is better for hands-free speaking practice; Alfaazo is better for learning to read and write Gurmukhi, for vocabulary breadth and for depth (112 lessons against 30). Many learners use Pimsleur in the car and Alfaazo on the phone." },
      { q: "How much does Pimsleur Punjabi cost?", a: `Pimsleur sells Punjabi as a monthly Premium subscription for one language or as Level 1 bought outright at a list price of US$150 (checked ${CHECKED}), with a 30-day money-back guarantee and one free lesson. Alfaazo is free to download; Alfaazo Plus is US$${APP.plus.monthlyUsd} a month, US$${APP.plus.yearlyUsd} a year or US$${APP.plus.lifetimeUsd} for life.` },
      { q: "Can I learn to read Punjabi with Pimsleur?", a: "No. Pimsleur Punjabi has no reading component. To read Gurmukhi, use an app that teaches the script, such as Alfaazo, alongside it, or start with the free Gurmukhi alphabet guide on this site." },
    ],
    sources: [
      { label: "Pimsleur Punjabi", url: "https://www.pimsleur.com/learn-punjabi" },
      { label: "Pimsleur Punjabi products and prices", url: "https://pimsleur.com/learn-punjabi/all-products" },
      { label: "Pimsleur on the App Store", url: "https://apps.apple.com/us/app/id1405735469" },
      { label: "Alfaazo on the App Store", url: "https://apps.apple.com/us/app/id6759987308" },
    ],
    related: [
      { label: "Best apps to learn Punjabi in 2026", href: "/blog/best-app-to-learn-punjabi-2026" },
      { label: "Gurmukhi alphabet: all 35 letters", href: "/blog/beginners-guide-gurmukhi-alphabet" },
    ],
  },
  {
    slug: "alfaazo-vs-duolingo",
    name: "Alfaazo vs Duolingo",
    short: "Duolingo",
    title: "Alfaazo vs Duolingo for Punjabi (2026): Duolingo Doesn't Teach It — Here's the Difference",
    metaTitle: "Alfaazo vs Duolingo for Punjabi (2026)",
    description:
      "Duolingo has no course that teaches Punjabi; its 2026 course teaches English to Punjabi speakers. What that means, and how Alfaazo's Punjabi course compares on script, audio, lessons and price.",
    quickAnswer:
      "Duolingo cannot be used to learn Punjabi: it has no course that teaches Punjabi to English speakers or anyone else. The course it launched on 7 September 2026, 'Learn English from Punjabi', teaches English to Punjabi speakers. Alfaazo is a Punjabi-only course of 112 lessons that teaches the Gurmukhi script and 1,200+ words with native audio, free to download on iOS and Android with an optional Plus plan.",
    intro:
      "This is the comparison people search for most and the one with the shortest answer. Duolingo is the most-downloaded education app in the world and teaches 40-plus languages, but Punjabi is not one of them, so for a Punjabi learner the choice is not Duolingo versus Alfaazo but Alfaazo (or another app that teaches Punjabi) versus nothing. The table shows exactly what each app offers a Punjabi learner.",
    rows: [
      { label: "Built for", alfaazo: ALFAAZO.builtFor, other: "40+ languages for a mass audience; the most-downloaded education app" },
      { label: "Punjabi taught", alfaazo: ALFAAZO.punjabi, other: "None. 'Learn English from Punjabi' (launched 7 September 2026) teaches English to Punjabi speakers, with instructions in Gurmukhi" },
      { label: "Teaches the Gurmukhi script", alfaazo: ALFAAZO.script, other: "No (the English course assumes you already read it)" },
      { label: "Audio", alfaazo: ALFAAZO.audio, other: "Synthesised voices in most courses; not applicable for Punjabi" },
      { label: "Course size", alfaazo: ALFAAZO.size, other: "No Punjabi course" },
      { label: "Free plan", alfaazo: ALFAAZO.free, other: "Free with ads and a hearts system" },
      { label: "Paid plan", alfaazo: ALFAAZO.paid, other: "Super Duolingo subscription (removes ads and limits); price varies by country" },
      { label: "Platforms", alfaazo: ALFAAZO.platforms, other: "iOS, Android and web" },
      { label: "Maker and age", alfaazo: ALFAAZO.maker, other: "Duolingo, Inc., Pittsburgh; app since 2012" },
      { label: "US App Store rating", alfaazo: "__RATING__", other: `4.7 from 5.58 million ratings, all languages (${CHECKED})` },
      { label: "Best for", alfaazo: "Anyone who wants to learn Punjabi", other: "Spanish, French, Japanese and other big languages; Punjabi speakers learning English" },
    ],
    otherBetter: [
      "For almost any other language: enormous courses, a web version, stories, leagues and a decade of polish.",
      "For Punjabi speakers who want to learn English: its September 2026 course is free and in Gurmukhi.",
      "Brand and habit: if your streak keeps you learning, that counts for something.",
    ],
    alfaazoBetter: [
      "It teaches Punjabi, which Duolingo does not.",
      "Gurmukhi from the first unit with stroke-by-stroke writing guides.",
      "Native-speaker recordings on every word, where Duolingo mostly uses synthesised voices.",
      "Punjabi cultural content: proverbs, festivals, family terms, etiquette.",
      `${APP.free.unitsText} free, then US$${APP.plus.yearlyUsd} a year or US$${APP.plus.lifetimeUsd} for life if you want everything.`,
    ],
    pickOther:
      "You are learning a language Duolingo teaches, or you are a Punjabi speaker learning English.",
    pickAlfaazo:
      "You want to learn Punjabi. If you liked Duolingo's short daily lessons and streaks, Alfaazo's format will feel familiar; it adds the script and native audio.",
    faq: [
      { q: "Does Duolingo have Punjabi?", a: "No. Duolingo has no course that teaches Punjabi. On 7 September 2026 it launched 'Learn English from Punjabi', which teaches English to Punjabi speakers; it does not teach Punjabi to anyone." },
      { q: "Is there a Duolingo for Punjabi?", a: "The closest equivalents are the Punjabi-specific apps: Alfaazo (Gurmukhi-first, 112 lessons, native audio, free to download) is the most Duolingo-like in format, with short daily lessons and streaks. Ling, Pimsleur, uTalk and Mango Languages also teach Punjabi." },
      { q: "Will Duolingo add Punjabi for English speakers?", a: "Duolingo has not announced one. It has added an English course for Punjabi speakers (2026), which suggests it has Punjabi-speaking staff and data, but no Punjabi-for-English-speakers course exists or has been scheduled." },
      { q: "Is Alfaazo free like Duolingo?", a: `Alfaazo is free to download, with ${APP.free.unitsText} available at no cost and ads between lessons, like Duolingo's free tier. Alfaazo Plus (US$${APP.plus.monthlyUsd} a month, US$${APP.plus.yearlyUsd} a year or US$${APP.plus.lifetimeUsd} lifetime) unlocks all ${APP.lessons} lessons and removes ads.` },
    ],
    sources: [
      { label: "Duolingo courses for Punjabi speakers", url: "https://www.duolingo.com/courses/pa" },
      { label: "Duolingo on the App Store", url: "https://apps.apple.com/us/app/id570060128" },
      { label: "Alfaazo on the App Store", url: "https://apps.apple.com/us/app/id6759987308" },
    ],
    related: [
      { label: "Does Duolingo have Punjabi? The full story", href: "/blog/does-duolingo-teach-punjabi-best-alternatives" },
      { label: "Best apps to learn Punjabi in 2026", href: "/blog/best-app-to-learn-punjabi-2026" },
    ],
  },
];

export const COMPARE_URL = `${SITE_URL}/compare`;

export function getComparison(slug: string): Comparison | undefined {
  return COMPARISONS.find((c) => c.slug === slug);
}
