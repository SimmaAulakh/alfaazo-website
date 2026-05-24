/**
 * Audit all blog posts in Firestore for SEO length issues.
 * - Titles: full rendered title = "<post.title> — Alfaazo" should be <= 65 chars
 * - Descriptions: post.excerpt should be 120-160 chars
 *
 * Usage: node --env-file=.env.local scripts/audit-blog-seo.mjs
 */

import { initializeApp } from "firebase/app";
import { getFirestore, collection, getDocs } from "firebase/firestore";

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

// Bing/Google sweet spots
const TITLE_SUFFIX = " — Alfaazo";
const TITLE_MAX = 65; // Bing's title length sweet spot
const EXCERPT_MIN = 120;
const EXCERPT_MAX = 160;

async function audit() {
  const snap = await getDocs(collection(db, "blogs"));
  const issues = [];
  let total = 0;

  snap.forEach((doc) => {
    total++;
    const d = doc.data();
    const slug = doc.id;
    const fullTitle = (d.title || "") + TITLE_SUFFIX;
    const excerpt = d.excerpt || "";
    const titleIssue = fullTitle.length > TITLE_MAX;
    const excerptTooLong = excerpt.length > EXCERPT_MAX;
    const excerptTooShort = excerpt.length < EXCERPT_MIN;

    if (titleIssue || excerptTooLong || excerptTooShort) {
      issues.push({
        slug,
        title: d.title,
        titleFullLen: fullTitle.length,
        excerpt,
        excerptLen: excerpt.length,
        titleIssue,
        excerptTooLong,
        excerptTooShort,
      });
    }
  });

  console.log(`\nAudited ${total} blog posts.`);
  console.log(`Found ${issues.length} with SEO issues.\n`);

  issues.forEach((i) => {
    console.log(`\n━━━ /blog/${i.slug} ━━━`);
    if (i.titleIssue) {
      console.log(`  ❌ TITLE: ${i.titleFullLen} chars (max ${TITLE_MAX})`);
      console.log(`     "${i.title}"`);
    }
    if (i.excerptTooLong) {
      console.log(`  ❌ EXCERPT: ${i.excerptLen} chars (max ${EXCERPT_MAX})`);
      console.log(`     "${i.excerpt}"`);
    }
    if (i.excerptTooShort) {
      console.log(`  ⚠️  EXCERPT: ${i.excerptLen} chars (min ${EXCERPT_MIN})`);
      console.log(`     "${i.excerpt}"`);
    }
  });

  console.log("\n");
  process.exit(0);
}

audit().catch((err) => {
  console.error("Failed:", err.message);
  process.exit(1);
});
