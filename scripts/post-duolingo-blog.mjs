/**
 * Post the Duolingo vs Alfaazo comparison blog to Firestore.
 * Usage: node --env-file=.env.local scripts/post-duolingo-blog.mjs
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
  slug: "does-duolingo-teach-punjabi-best-alternatives",
  title: "Does Duolingo Teach Punjabi? Best Alternatives in 2026",
  excerpt:
    "Duolingo does not offer Punjabi. Here are the best free alternatives to learn Punjabi in 2026, including apps purpose-built for Gurmukhi script and everyday conversations.",
  date: "2026-05-13",
  tag: "Beginner",
  readTime: "7 min",
  author: "Alfaazo",
  published: true,
  content: `
<h2>Does Duolingo Have Punjabi?</h2>
<p>No. <strong>Duolingo does not offer a Punjabi course</strong> and has not announced plans to add one. As of 2026, Duolingo covers Hindi and over 40 other languages, but Punjabi is not among them. This leaves millions of Punjabi learners — heritage speakers, language enthusiasts, and diaspora families — without support from the world's most popular language app.</p>
<p>If you have been searching for "Duolingo Punjabi" or "learn Punjabi on Duolingo," you are not alone. It is one of the most requested languages in Duolingo's community forums, but there is no timeline for its release.</p>
<p>The good news? There are dedicated alternatives that do a better job for Punjabi than a generic platform ever could.</p>

<h2>Why Duolingo Doesn't Offer Punjabi</h2>
<p>Duolingo prioritises languages with the largest global demand and commercial potential. While Punjabi has over 150 million speakers worldwide — making it the 10th most spoken language on Earth — most of those speakers are concentrated in specific regions (Punjab in India and Pakistan) and diaspora communities (Canada, UK, US, Australia).</p>
<p>There is also a technical challenge. Punjabi uses <strong>Gurmukhi script</strong>, which requires specialised teaching tools — stroke-by-stroke writing guides, proper character rendering, and an understanding of Punjabi's unique tonal system. A generic language app template does not handle these well.</p>
<p>This is exactly why purpose-built Punjabi apps exist.</p>

<h2>The Best Free Alternative: Alfaazo</h2>
<p><strong><a href="https://alfaazo.com">Alfaazo</a></strong> is a free language learning app designed specifically for Punjabi. Unlike generic language platforms, every feature in Alfaazo was built from the ground up for Punjabi learners:</p>

<h3>Gurmukhi Script from Day One</h3>
<p>Alfaazo teaches all 35 Gurmukhi letters with <strong>stroke-by-stroke writing guides</strong> — you see exactly how to form each character, hear its pronunciation from a native speaker, and practice until it sticks. This is something Duolingo's template-based approach cannot replicate for a script like Gurmukhi.</p>

<h3>Everyday Phrases with Native Audio</h3>
<p>Learn phrases you will actually use — greetings, family conversations, ordering food, asking for directions. Every phrase includes native Punjabi pronunciation, not text-to-speech.</p>

<h3>Cultural Context Built In</h3>
<p>Language without culture is just vocabulary lists. Alfaazo weaves in Punjabi proverbs (<em>akhaan</em>), food vocabulary tied to real dishes like makki di roti and sarson da saag, festival greetings for Vaisakhi and Lohri, and social customs that give the language meaning.</p>

<h3>Bite-Sized Lessons</h3>
<p>Each lesson takes 5-10 minutes — designed for busy schedules and daily consistency. The app tracks your streaks and progress so you stay motivated.</p>

<h3>Completely Free</h3>
<p>Alfaazo is free on both <a href="https://apps.apple.com/us/app/alfaazo-learn-punjabi/id6759987308">iOS</a> and <a href="https://play.google.com/store/apps/details?id=com.alfaazo.app">Android</a>. No premium tier, no paywalled content.</p>

<h2>Alfaazo vs Duolingo: Side-by-Side</h2>
<p>Here is how the two compare for someone wanting to learn Punjabi:</p>

<table>
<thead>
<tr><th>Feature</th><th>Duolingo</th><th>Alfaazo</th></tr>
</thead>
<tbody>
<tr><td>Punjabi course available</td><td>No</td><td><strong>Yes</strong></td></tr>
<tr><td>Gurmukhi script lessons</td><td>N/A</td><td><strong>Stroke-by-stroke guides</strong></td></tr>
<tr><td>Native pronunciation audio</td><td>N/A</td><td><strong>Yes</strong></td></tr>
<tr><td>Cultural context</td><td>N/A</td><td><strong>Proverbs, food, festivals</strong></td></tr>
<tr><td>Price</td><td>Free (with ads/premium)</td><td><strong>Free (no ads)</strong></td></tr>
<tr><td>iOS app</td><td>Yes</td><td><strong>Yes</strong></td></tr>
<tr><td>Android app</td><td>Yes</td><td><strong>Yes</strong></td></tr>
<tr><td>Bite-sized lessons</td><td>Yes</td><td><strong>Yes</strong></td></tr>
<tr><td>Built specifically for Punjabi</td><td>No</td><td><strong>Yes</strong></td></tr>
</tbody>
</table>

<h2>Other Alternatives Worth Knowing</h2>
<p>While Alfaazo is the most comprehensive free option, here are other resources that can supplement your learning:</p>

<h3>YouTube</h3>
<p>Search for "learn Punjabi for beginners" and you will find channels covering the alphabet, phrases, and grammar. The downside is a lack of structured progression — it is easy to jump between videos without a clear path. Best used alongside an app like Alfaazo for structured learning.</p>

<h3>Language Exchange Apps (Tandem, HelloTalk)</h3>
<p>These connect you with native Punjabi speakers who want to practice English. You teach them, they teach you. Great for conversational practice once you have the basics down.</p>

<h3>Punjabi Music and Media</h3>
<p>Listening to Punjabi music trains your ear. Artists like AP Dhillon, Diljit Dosanjh, and Karan Aujla make it enjoyable. Look up lyrics in Gurmukhi to combine listening with reading practice.</p>

<h2>Who Is Alfaazo For?</h2>
<p>Alfaazo is built for two main groups:</p>
<ul>
<li><strong>Heritage speakers</strong> — second-generation and third-generation Punjabis who grew up hearing the language at home but never learned to read Gurmukhi or speak fluently. Alfaazo helps you reconnect with your mother tongue.</li>
<li><strong>New learners</strong> — anyone interested in Punjabi from scratch, whether for a relationship, travel, career, or pure curiosity. The app assumes zero prior knowledge.</li>
</ul>

<h2>How to Get Started</h2>
<p>If you came here looking for Duolingo Punjabi, the answer is that it does not exist — but something better does. Here is how to start:</p>
<ol>
<li><strong>Download Alfaazo</strong> for free on <a href="https://apps.apple.com/us/app/alfaazo-learn-punjabi/id6759987308">iOS</a> or <a href="https://play.google.com/store/apps/details?id=com.alfaazo.app">Android</a></li>
<li><strong>Start with Gurmukhi</strong> — learn the first 10 letters in your first session</li>
<li><strong>Practise 10-15 minutes daily</strong> — consistency matters more than intensity</li>
<li><strong>Supplement with music and videos</strong> — immerse yourself outside the app</li>
<li><strong>Speak from day one</strong> — even talking to yourself builds confidence</li>
</ol>
<p>Most learners can read basic Gurmukhi within 2-3 weeks and hold simple conversations within 2-3 months. Heritage speakers who already understand spoken Punjabi progress even faster.</p>

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
  console.log(
    "\nIf permission denied, enable writes in Firestore rules temporarily."
  );
  process.exit(1);
});
