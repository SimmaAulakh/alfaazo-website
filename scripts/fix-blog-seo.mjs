/**
 * Batch-update all blog posts in Firestore to fix SEO length issues
 * flagged by Bing Webmaster Tools.
 *
 * Targets:
 * - Titles: <= 55 chars (so rendered "title — Alfaazo" stays <= 65)
 * - Excerpts: 120-160 chars (Bing's sweet spot)
 *
 * Usage: node --env-file=.env.local scripts/fix-blog-seo.mjs
 */

import { initializeApp } from "firebase/app";
import { getFirestore, doc, updateDoc } from "firebase/firestore";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// slug -> updates (only fields that need changing)
const updates = {
  // ───── Title rewrites ─────
  "best-app-to-learn-punjabi-2026": {
    title: "Best App to Learn Punjabi in 2026",
  },
  "decoding-the-basics-ten-essential-phrases-in-punjabi-for-beginners": {
    title: "Decoding Punjabi: 10 Phrases for Daily Life",
    excerpt:
      "Get a head start in your Punjabi learning journey with 10 essential phrases used in daily life. Perfect for beginners ready to speak from day one.",
  },
  "discovering-punjabi-through-the-magic-of-must-know-phrases": {
    title: "Discovering Punjabi: Must-Know Phrases",
  },
  "dive-into-daily-punjabi-top-10-essential-phrases-for-beginners": {
    title: "Daily Punjabi: Top 10 Phrases for Beginners",
  },
  "does-duolingo-teach-punjabi-best-alternatives": {
    excerpt:
      "Duolingo does not offer Punjabi. Here are the best free alternatives in 2026 — apps purpose-built for Gurmukhi script and conversations.",
  },
  "flirting-with-basics-a-fun-filled-dive-into-common-punjabi-phrases": {
    title: "Common Punjabi Phrases: A Fun Beginner's Guide",
  },
  "getting-familiar-with-punjabi-a-beginners-guide-to-common-greetings-and-phrases":
    {
      title: "Beginner's Guide: Punjabi Greetings & Phrases",
    },
  "getting-started-with-punjabi-greetings-say-hello-like-a-pro": {
    title: "Punjabi Greetings: Say Hello like a Pro",
    excerpt:
      "Discover Punjabi through its warm greetings and phrases. Learn to hold simple conversations and gain a deeper understanding of the culture.",
  },
  "grasping-the-basics-top-10-useful-phrases-in-punjabi-for-beginners": {
    title: "10 Useful Punjabi Phrases You'll Actually Use",
  },
  "gurmukhi-vs-shahmukhi": {
    title: "Gurmukhi vs Shahmukhi: Punjabi's Two Scripts",
    excerpt:
      "The same language, two beautiful writing systems. Here's how Gurmukhi and Shahmukhi work, when each is used, and why both matter to Punjabi.",
  },
  "how-to-learn-punjabi-fast": {
    title: "How to Learn Punjabi Fast: 7 Proven Tips",
    excerpt:
      "Want to learn Punjabi quickly? These 7 science-backed strategies will help you make real progress in weeks, not years. Start today with proven methods.",
  },
  "how-to-say-thank-you-in-punjabi": {
    title: "How to Say Thank You in Punjabi + 15 Phrases",
  },
  "how-to-write-your-name-in-punjabi": {
    title: "How to Write Your Name in Punjabi (Gurmukhi)",
  },
  "journey-through-basic-punjabi-ten-essential-phrases-for-new-learners": {
    title: "Journey into Punjabi: 10 Phrases to Start With",
    excerpt:
      "Embark on your Punjabi learning adventure with 10 vital phrases displayed in an engaging, interactive way for new learners ready to begin today.",
  },
  "learn-punjabi-for-beginners-where-to-start": {
    excerpt:
      "Complete beginner's roadmap to learning Punjabi. No prior knowledge needed — just start here with this step-by-step guide for 2026.",
  },
  "learn-punjabi-in-2026": {
    title: "Learn Punjabi in 2026: Complete Beginner's Guide",
  },
  "learn-punjabi-online-free-complete-guide": {
    title: "Learn Punjabi Online for Free: 2026 Guide",
  },
  "master-the-5-essential-punjabi-phrases-for-smooth-interaction": {
    title: "5 Essential Punjabi Phrases for Smooth Talk",
  },
  "mastering-basic-punjabi-phrases-a-starters-guide": {
    excerpt:
      "Master essential Punjabi phrases every beginner should know. Learn common expressions, pronunciations, and cultural contexts in this engaging guide.",
  },
  "mastering-basic-punjabi-phrases-for-effective-communication": {
    title: "Basic Punjabi Phrases for Communication",
  },
  "mastering-everyday-conversations-in-punjabi-essential-phrases-for-beginners":
    {
      title: "Everyday Punjabi Conversations: Essential Phrases",
    },
  "mastering-everyday-greetings-in-punjabi--an-absolute-beginners-guide": {
    title: "Everyday Punjabi Greetings: A Beginner's Guide",
  },
  "mastering-the-basics-common-punjabi-phrases-for-daily-use": {
    title: "Common Punjabi Phrases for Daily Use",
    excerpt:
      "Kickstart your Punjabi language journey with essential everyday phrases. Learn the basics for greetings, food, family, and daily conversations.",
  },
  "punjabi-family-words-relationships": {
    title: "Punjabi Family Words: 30+ Relationship Names",
  },
  "punjabi-greetings-hello-goodbye": {
    excerpt:
      "From Sat Sri Akal to Ki haal hai — learn the most common Punjabi greetings for every situation, with cultural context and pronunciation tips.",
  },
  "punjabi-numbers-1-100-counting-guide": {
    title: "Punjabi Numbers 1-100: Counting Guide",
  },
  "sat-sri-akaal-meaning-and-origin": {
    title: "Sat Sri Akaal: Meaning, Origin & When to Use It",
  },
  "unlocking-the-beauty-of-punjabi-a-beginners-guide-to-common-phrases": {
    title: "Beginner's Guide to Common Punjabi Phrases",
  },
  "unlocking-the-beauty-of-punjabi-script-a-beginners-guide-to-gurmukhi": {
    title: "Punjabi Gurmukhi Script: A Beginner's Guide",
  },
  "unlocking-the-charm-of-punjabi-top-10-essential-phrases-for-beginners": {
    title: "Unlock Punjabi: Top 10 Beginner Phrases",
    excerpt:
      "Master 10 essential Punjabi phrases to dive into the vibrant culture. Build confidence in your language learning journey, starting today.",
  },
  "why-learn-punjabi-in-2026": {
    title: "Why Learn Punjabi in 2026? 8 Surprising Reasons",
  },
  "why-learning-mother-tongue-matters": {
    excerpt:
      "In a globalized world, reconnecting with your heritage language is more than nostalgia — it's identity, culture, and connection to your roots.",
  },
};

async function run() {
  const slugs = Object.keys(updates);
  console.log(`\nApplying SEO fixes to ${slugs.length} blog posts...\n`);

  let ok = 0;
  let failed = 0;

  for (const slug of slugs) {
    try {
      await updateDoc(doc(db, "blogs", slug), updates[slug]);
      console.log(`  ✓ /blog/${slug}`);
      ok++;
    } catch (err) {
      console.error(`  ✗ /blog/${slug} — ${err.message}`);
      failed++;
    }
  }

  console.log(`\n${ok} updated, ${failed} failed.`);
  console.log("Changes will appear on the website within 5 minutes (ISR).\n");
  process.exit(failed > 0 ? 1 : 0);
}

run().catch((err) => {
  console.error("Failed:", err.message);
  process.exit(1);
});
