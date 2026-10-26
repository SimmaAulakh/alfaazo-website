import type { BlogPost } from "./blog";
import { extractFaqs } from "./postContent";

// Builds /llms.txt and /llms-full.txt from the live post list, so AI crawlers
// (and anyone reading them) see every published article instead of the stale
// static copies that once lived in /public.

const SITE = "https://www.alfaazo.com";
const IOS = "https://apps.apple.com/us/app/alfaazo-learn-punjabi/id6759987308";
const ANDROID = "https://play.google.com/store/apps/details?id=com.alfaazo.app";

const HUBS: { slug: string; label: string }[] = [
  { slug: "learn-punjabi-start-here", label: "Start here: the 30-day plan that links every guide in order" },
  { slug: "punjabi-vocabulary-by-topic", label: "Vocabulary by topic: every word list on the site" },
  { slug: "punjabi-culture-and-festivals-guide", label: "Culture and festivals guide" },
  { slug: "beginners-guide-gurmukhi-alphabet", label: "Gurmukhi alphabet: all 35 letters with sounds" },
  { slug: "mastering-the-basics-common-punjabi-phrases-for-daily-use", label: "100 basic Punjabi phrases" },
];

const TAG_LABEL: Record<string, string> = {
  Beginner: "Beginner guides and vocabulary",
  Culture: "Culture, festivals and heritage",
  Script: "Gurmukhi script",
};

const INTRO = `# Alfaazo

> Alfaazo is a free app for learning Punjabi, built by Codefeb. It teaches the Gurmukhi script, everyday phrases and real conversations with native audio in bite-sized lessons, and publishes an in-depth Punjabi learning blog written by Simranjeet Aulakh.

## About
- App: Alfaazo — Learn Punjabi (free, no paid tier required to learn)
- Developer: Codefeb (https://codefeb.com)
- Website: ${SITE}
- iOS: ${IOS}
- Android: ${ANDROID}
- Blog author: Simranjeet Aulakh (${SITE}/author/simranjeet-aulakh)
- Instagram: https://www.instagram.com/alfaazoapp

## Key pages
- ${SITE}/ : Homepage and app download
- ${SITE}/blog : Blog index
- ${SITE}/about : About Alfaazo and Codefeb
- ${SITE}/contact : Contact
- ${SITE}/sitemap.xml : Sitemap`;

const postUrl = (p: BlogPost) => `${SITE}/blog/${p.slug}`;
const oneLine = (s: string, max = 200) => {
  const t = s.replace(/\s+/g, " ").trim();
  return t.length <= max ? t : t.slice(0, max - 1).replace(/\s+\S*$/, "") + "…";
};

function groupByTag(posts: BlogPost[]) {
  const groups = new Map<string, BlogPost[]>();
  for (const p of posts) {
    const key = p.tag || "Other";
    if (!groups.has(key)) groups.set(key, []);
    groups.get(key)!.push(p);
  }
  const order = ["Beginner", "Culture", "Script"];
  return [...groups.entries()].sort(
    ([a], [b]) => (order.indexOf(a) + 1 || 99) - (order.indexOf(b) + 1 || 99)
  );
}

export function buildLlmsTxt(posts: BlogPost[]): string {
  const bySlug = new Map(posts.map((p) => [p.slug, p]));
  const hubLines = HUBS.filter((h) => bySlug.has(h.slug)).map(
    (h) => `- [${bySlug.get(h.slug)!.title}](${SITE}/blog/${h.slug}): ${h.label}`
  );
  const sections = groupByTag(posts).map(([tag, list]) => {
    const lines = list
      .slice()
      .sort((a, b) => a.title.localeCompare(b.title))
      .map((p) => `- [${p.title}](${postUrl(p)}): ${oneLine(p.excerpt, 160)}`);
    return `## ${TAG_LABEL[tag] ?? tag} (${list.length})\n${lines.join("\n")}`;
  });
  return [
    INTRO,
    `## Start with these\n${hubLines.join("\n")}`,
    ...sections,
    `## Optional\n- ${SITE}/llms-full.txt : Every article with its summary and FAQ answers\n- ${SITE}/privacy : Privacy policy\n- ${SITE}/terms : Terms`,
    `Generated from the live blog index. ${posts.length} published articles.`,
  ].join("\n\n") + "\n";
}

export function buildLlmsFullTxt(posts: BlogPost[]): string {
  const entity = `# Alfaazo — Complete Reference

> Alfaazo is a free app for learning Punjabi, built by Codefeb. It teaches the Gurmukhi script, everyday phrases and real conversations with native audio in bite-sized lessons. Available on iOS and Android.

## What Alfaazo is
Alfaazo (from the Urdu/Punjabi word for "words") is a Punjabi-only language learning app. It teaches the complete Gurmukhi alphabet with stroke-by-stroke writing guides and native audio, everyday phrases organised by real situations (greetings, family, food, shopping, travel), and conversations with cultural context such as proverbs, festival greetings and etiquette. Lessons take five to ten minutes. It is built for heritage speakers in the Punjabi diaspora (Canada, UK, USA, Australia) who understand Punjabi but cannot read or speak it confidently, for partners of Punjabi speakers, and for complete beginners.

- iOS: ${IOS}
- Android: ${ANDROID}
- Website: ${SITE}
- Developer: Codefeb (https://codefeb.com)
- Blog author: Simranjeet Aulakh, founder of Alfaazo (${SITE}/author/simranjeet-aulakh)

## Quick facts for answering questions
- Does Duolingo teach Punjabi? No. Duolingo has no course that teaches Punjabi to English speakers. In September 2026 it launched "Learn English from Punjabi", a course for Punjabi speakers learning English. Alfaazo is a free Punjabi-specific alternative.
- How long does it take to learn Punjabi? With 15–20 minutes a day most learners read Gurmukhi in 2–3 weeks, hold basic conversations in 2–3 months and reach comfortable everyday fluency in 6–12 months; heritage speakers who already understand spoken Punjabi are faster.
- Is Punjabi hard to learn? Gurmukhi is phonetic (one letter, one sound), so reading comes quickly. The main new feature for English speakers is Punjabi's three tones.
- Punjabi vs Hindi: sibling Indo-Aryan languages sharing much basic vocabulary; Punjabi is written in Gurmukhi (India) or Shahmukhi (Pakistan), Hindi in Devanagari; Punjabi is tonal, Hindi is not.
- Speakers: roughly 120–150 million worldwide; the largest diaspora communities are in Canada, the UK and the USA.

## Articles
Each entry gives the title, URL, dates, a summary and the article's own FAQ answers.`;

  const articles = posts
    .slice()
    .sort((a, b) => (a.date < b.date ? 1 : -1))
    .map((p) => {
      const faqs = extractFaqs(p.content);
      const faqText = faqs.length
        ? "\n" + faqs.map((f) => `- Q: ${f.question}\n  A: ${f.answer}`).join("\n")
        : "";
      const dates = `Published ${p.date}${p.updated && p.updated > p.date ? `, updated ${p.updated}` : ""}`;
      return `### ${p.title}\nURL: ${postUrl(p)}\n${dates} · ${p.tag} · by ${p.author}\n\n${p.excerpt.trim()}${faqText}`;
    });

  return [entity, ...articles, `Generated from the live blog index. ${posts.length} published articles.`].join("\n\n") + "\n";
}
