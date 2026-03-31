/**
 * Migration script: Reads existing MDX blog posts and uploads them to Firestore.
 *
 * Usage: node scripts/migrate-to-firestore.mjs
 *
 * Requires .env.local to be loaded. Run with:
 *   node --env-file=.env.local scripts/migrate-to-firestore.mjs
 */

import { initializeApp } from "firebase/app";
import { getFirestore, doc, setDoc } from "firebase/firestore";
import { readFileSync, readdirSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const blogDir = join(__dirname, "..", "content", "blog");

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

function parseMDX(filePath) {
  const raw = readFileSync(filePath, "utf-8");

  // Extract metadata from `export const metadata = { ... }`
  const metaMatch = raw.match(
    /export\s+const\s+metadata\s*=\s*(\{[\s\S]*?\n\})/
  );
  if (!metaMatch) {
    console.warn(`  ⚠ No metadata found, skipping`);
    return null;
  }

  // eslint-disable-next-line no-eval
  const metadata = eval(`(${metaMatch[1]})`);

  // Content is everything after the metadata block
  const content = raw
    .slice(raw.indexOf(metaMatch[0]) + metaMatch[0].length)
    .trim();

  // Convert markdown to basic HTML
  const html = markdownToHtml(content);

  return { ...metadata, content: html, published: true, author: "Alfaazo" };
}

function markdownToHtml(md) {
  let html = md;

  // Headers
  html = html.replace(/^### (.+)$/gm, "<h3>$1</h3>");
  html = html.replace(/^## (.+)$/gm, "<h2>$1</h2>");
  html = html.replace(/^# (.+)$/gm, "<h1>$1</h1>");

  // Bold and italic
  html = html.replace(/\*\*\*(.+?)\*\*\*/g, "<strong><em>$1</em></strong>");
  html = html.replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>");
  html = html.replace(/\*(.+?)\*/g, "<em>$1</em>");

  // Links
  html = html.replace(
    /\[(.+?)\]\((.+?)\)/g,
    '<a href="$2" target="_blank" rel="noopener noreferrer">$1</a>'
  );

  // Unordered lists
  html = html.replace(/^- (.+)$/gm, "<li>$1</li>");
  html = html.replace(/((?:<li>.*<\/li>\n?)+)/g, "<ul>$1</ul>");

  // Paragraphs — wrap non-tag lines
  const lines = html.split("\n\n");
  html = lines
    .map((block) => {
      block = block.trim();
      if (!block) return "";
      if (block.startsWith("<")) return block;
      return `<p>${block}</p>`;
    })
    .filter(Boolean)
    .join("\n");

  // Clean up newlines inside paragraphs
  html = html.replace(/<p>\n/g, "<p>");
  html = html.replace(/\n<\/p>/g, "</p>");

  return html;
}

async function migrate() {
  const files = readdirSync(blogDir).filter(
    (f) => f.endsWith(".mdx") || f.endsWith(".md")
  );

  console.log(`Found ${files.length} blog posts to migrate.\n`);

  for (const file of files) {
    const filePath = join(blogDir, file);
    console.log(`Processing: ${file}`);

    const data = parseMDX(filePath);
    if (!data) continue;

    const { slug, ...rest } = data;
    await setDoc(doc(db, "blogs", slug), rest);
    console.log(`  ✓ Uploaded: ${slug}`);
  }

  console.log("\nMigration complete!");
  process.exit(0);
}

migrate().catch((err) => {
  console.error("Migration failed:", err);
  process.exit(1);
});
