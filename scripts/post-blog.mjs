/**
 * Post a single blog to Firestore.
 * Usage: node --env-file=.env.local scripts/post-blog.mjs
 */

import { initializeApp } from "firebase/app";
import { getFirestore, doc, setDoc } from "firebase/firestore";

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

const post = {
  slug: "learn-punjabi-in-2026",
  title: "Learn Punjabi in 2026 — The Complete Guide to Getting Started",
  excerpt: "Everything you need to know about learning Punjabi in 2026 — from the best apps and resources to a step-by-step plan for beginners.",
  date: "2026-04-29",
  tag: "Beginner",
  readTime: "8 min",
  author: "Alfaazo",
  published: true,
  content: `
<h2>2026 Is the Best Time to Start Learning Punjabi</h2>
<p>Punjabi is booming. It's the 10th most spoken language in the world with over 125 million native speakers. Punjabi music artists like AP Dhillon, Diljit Dosanjh, and Karan Aujla are topping global charts. The Punjabi diaspora — from Toronto to Melbourne to Birmingham — is more connected than ever. And for the first time, there are genuinely good free tools to learn the language on your phone.</p>
<p>If you've been thinking about learning Punjabi, this is your sign. Here's everything you need to get started in 2026.</p>

<h2>Why Learn Punjabi?</h2>
<p>People come to Punjabi for different reasons, and all of them are valid:</p>
<ul>
<li><strong>Heritage connection</strong> — You grew up hearing Punjabi at home but never learned to read or write it. Maybe your grandparents speak it, and you want to have deeper conversations before that window closes.</li>
<li><strong>Cultural appreciation</strong> — You love Punjabi music, food, or cinema and want to experience it in the original language, not through translations.</li>
<li><strong>Relationships</strong> — Your partner, in-laws, or close friends are Punjabi speakers, and you want to connect with them on their terms.</li>
<li><strong>Career</strong> — Punjabi-English bilingualism is a real asset in healthcare, social work, law, and government — especially in Canada, the UK, and parts of the US.</li>
<li><strong>Curiosity</strong> — You just think it's a beautiful language. That's reason enough.</li>
</ul>

<h2>What Makes Punjabi Unique?</h2>
<p>Before you dive in, here are a few things that make Punjabi special:</p>

<h3>Gurmukhi Script</h3>
<p>Punjabi in India is written in <strong>Gurmukhi</strong> — a script created in the 16th century by Guru Angad Dev Ji specifically for the Punjabi language. It has 35 base consonants and is fully phonetic: every letter maps to exactly one sound. No silent letters, no irregular spellings. This makes it far easier to learn to read than English. Most beginners can read basic Gurmukhi within 2-3 weeks of practice.</p>

<h3>Tonal Language</h3>
<p>Punjabi is one of the few South Asian languages with tones — the pitch of your voice can change a word's meaning. For example, "ਕੋੜਾ" with a low tone means "whip," while "ਕੋਰਾ" with a level tone means "blank." Don't let this intimidate you — context resolves most ambiguity in everyday conversation, and tones become intuitive with exposure.</p>

<h3>Shared Vocabulary</h3>
<p>If you already speak Hindi or Urdu, you'll recognise 60-70% of basic Punjabi vocabulary. Even English has borrowed Punjabi words — "loot," "jungle," and "cot" all have Punjabi or closely related origins.</p>

<h2>The Best Way to Learn Punjabi in 2026</h2>
<p>Based on what actually works for modern learners, here's a proven approach:</p>

<h3>Step 1: Master Gurmukhi Script (Weeks 1-3)</h3>
<p>Start here. Don't skip this. Learning romanized Punjabi (writing Punjabi sounds in English letters) creates a crutch that will slow you down later. Gurmukhi is your foundation — once you can read it, every other step becomes easier.</p>
<p>The <strong>Alfaazo app</strong> teaches every Gurmukhi letter with stroke-by-stroke writing guides, pronunciation audio from native speakers, and interactive practice. It's free, and it's designed specifically for this purpose. <a href="https://apps.apple.com/us/app/alfaazo-learn-punjabi/id6759987308">Download it here</a>.</p>

<h3>Step 2: Learn Your First 100 Words (Weeks 3-6)</h3>
<p>Focus on words you'll actually use every day:</p>
<ul>
<li><strong>ਸਤ ਸ੍ਰੀ ਅਕਾਲ</strong> (Sat Sri Akaal) — the universal Punjabi greeting</li>
<li><strong>ਧੰਨਵਾਦ</strong> (Dhannvaad) — thank you</li>
<li><strong>ਪਾਣੀ</strong> (Paani) — water</li>
<li><strong>ਰੋਟੀ</strong> (Roti) — bread</li>
<li><strong>ਘਰ</strong> (Ghar) — home</li>
<li><strong>ਚੰਗਾ</strong> (Changa) — good</li>
<li><strong>ਕਿੰਨਾ</strong> (Kinna) — how much</li>
<li><strong>ਮੈਂ</strong> (Main) — I/me</li>
</ul>
<p>Alfaazo organizes vocabulary by practical themes — greetings, family, food, daily routine — so you build useful knowledge from day one.</p>

<h3>Step 3: Think in Phrases (Weeks 6-12)</h3>
<p>Words in isolation are hard to remember. Phrases stick because they carry meaning, emotion, and grammar structure all at once. Instead of just learning "ਖਾਣਾ" (food), learn "ਖਾਣਾ ਖਾ ਲਿਆ?" (Have you eaten?) — a question you'll hear in every Punjabi household, every day.</p>
<p>Some essential phrases to master early:</p>
<ul>
<li><strong>ਕਿਦਾਂ?</strong> (Kidaan?) — What's up? / How are you? (casual)</li>
<li><strong>ਤੁਸੀਂ ਕਿੱਥੇ ਜਾ ਰਹੇ ਹੋ?</strong> — Where are you going?</li>
<li><strong>ਮੈਨੂੰ ਸਮਝ ਨਹੀਂ ਆਈ</strong> — I didn't understand</li>
<li><strong>ਹੌਲੀ ਬੋਲੋ</strong> — Speak slowly</li>
<li><strong>ਇਹ ਕੀ ਹੈ?</strong> — What is this?</li>
</ul>

<h3>Step 4: Immerse Yourself (Ongoing)</h3>
<p>Create a Punjabi environment around yourself, even if you don't live in Punjab:</p>
<ul>
<li><strong>Music:</strong> Listen to Punjabi songs on Spotify — start with slower tracks where you can pick out words you know</li>
<li><strong>Videos:</strong> Watch Punjabi YouTube channels with subtitles. Cooking channels are great because the vocabulary is practical and repetitive.</li>
<li><strong>Social media:</strong> Follow Punjabi meme pages and content creators on Instagram — you'll learn slang and modern usage naturally</li>
<li><strong>Labels:</strong> Put Gurmukhi sticky notes on objects in your home</li>
<li><strong>Phone:</strong> Change your phone's language to Punjabi for constant passive exposure</li>
</ul>

<h3>Step 5: Speak Early and Often</h3>
<p>Don't wait until you're "ready" — you never will be. Start speaking from week one. Even talking to yourself counts. Narrate your actions: "ਮੈਂ ਚਾਹ ਬਣਾ ਰਿਹਾ ਹਾਂ" (I'm making tea). Greet family members in Punjabi. Every word spoken builds muscle memory and confidence.</p>

<h2>The Best Free Resources to Learn Punjabi in 2026</h2>

<h3>Alfaazo (App — iOS, Android coming soon)</h3>
<p>The best dedicated Punjabi learning app available today. Teaches Gurmukhi from scratch, builds vocabulary through themed lessons, and uses bite-sized sessions you can complete in 5-10 minutes. Completely free, no hidden paywalls. Built by a team that understands Punjabi isn't just a language — it's a culture.</p>

<h3>YouTube</h3>
<p>Great for supplementary learning. Search for "learn Punjabi for beginners" and you'll find channels covering everything from alphabet lessons to full conversations. The downside is the lack of structure — it's easy to jump between videos without a clear learning path.</p>

<h3>Punjabi Music</h3>
<p>Not traditionally a "learning resource," but genuinely effective. Listening to Punjabi songs trains your ear for rhythm, pronunciation, and common phrases. Look up lyrics in Gurmukhi to practice reading.</p>

<h3>Language Exchange Communities</h3>
<p>Platforms like Tandem and HelloTalk connect you with native Punjabi speakers who want to practice English. You teach them, they teach you. Free and effective.</p>

<h2>How Long Does It Take to Learn Punjabi?</h2>
<p>With 15-20 minutes of daily practice:</p>
<ul>
<li><strong>2-3 weeks:</strong> Read Gurmukhi, know basic greetings</li>
<li><strong>2-3 months:</strong> Hold simple conversations, introduce yourself, ask and answer basic questions</li>
<li><strong>6 months:</strong> Discuss everyday topics, understand most casual spoken Punjabi</li>
<li><strong>12 months:</strong> Comfortable conversational fluency for daily life</li>
</ul>
<p>Heritage speakers who already understand spoken Punjabi will progress significantly faster — often reaching reading fluency within weeks.</p>

<h2>Common Mistakes to Avoid</h2>
<ul>
<li><strong>Skipping Gurmukhi:</strong> Romanization is a dead end. Invest the 2-3 weeks upfront.</li>
<li><strong>Cramming instead of being consistent:</strong> 15 minutes daily beats 2 hours on the weekend.</li>
<li><strong>Only studying, never speaking:</strong> Language lives in conversation, not flashcards.</li>
<li><strong>Perfectionism:</strong> Making mistakes is how you learn. Native speakers will appreciate your effort, not judge your grammar.</li>
</ul>

<h2>Start Today</h2>
<p>You don't need to be perfect. You don't need to be "good at languages." You just need to start. Download <a href="https://apps.apple.com/us/app/alfaazo-learn-punjabi/id6759987308">Alfaazo for free</a>, open your first lesson, and take the first step toward a language that connects you to 125 million people, centuries of poetry, and maybe even your own roots.</p>
<p>ਆਓ ਸ਼ੁਰੂ ਕਰੀਏ — Let's begin.</p>
  `.trim(),
};

async function upload() {
  const { slug, ...data } = post;
  console.log(`Uploading: "${post.title}"...`);
  await setDoc(doc(db, "blogs", slug), data);
  console.log(`✓ Published: /blog/${slug}`);
  console.log("It will appear on the website within 5 minutes.");
  process.exit(0);
}

upload().catch((err) => {
  console.error("Failed:", err.message);
  console.log("\nIf permission denied, enable writes in Firestore rules temporarily.");
  process.exit(1);
});
