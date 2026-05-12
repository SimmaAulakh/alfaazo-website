/**
 * Add SEO-targeted blog posts to Firestore.
 * Usage: node --env-file=.env.local scripts/add-seo-blogs.mjs
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

const posts = [
  {
    slug: "best-app-to-learn-punjabi-2026",
    title: "Best App to Learn Punjabi in 2026 — Why Alfaazo Stands Out",
    excerpt: "Looking for the best Punjabi learning app? Here's why Alfaazo is the top choice for beginners and heritage speakers in 2026.",
    date: "2026-03-30",
    tag: "Beginner",
    readTime: "6 min",
    author: "Alfaazo",
    published: true,
    content: `
<h2>Why Most Language Apps Fail Punjabi Learners</h2>
<p>If you've ever tried learning Punjabi on a mainstream language app, you've probably noticed the problem: Punjabi is either missing entirely, buried as an afterthought, or taught without any cultural context. Apps like Duolingo don't offer Punjabi at all. Others that claim to teach it often skip Gurmukhi script — the very foundation of written Punjabi.</p>
<p>That's exactly why <strong>Alfaazo</strong> was built. It's not a generic language app with Punjabi bolted on. It was designed from the ground up specifically for Punjabi learners.</p>

<h2>What Makes Alfaazo the Best Punjabi Learning App?</h2>

<h3>1. Gurmukhi Script from Day One</h3>
<p>Most Punjabi resources rely on romanized text (transliteration), which creates a crutch that's hard to break. Alfaazo teaches you to read and write Gurmukhi from your very first lesson. Each letter comes with stroke-by-stroke guides, so you build real literacy — not just pronunciation tricks.</p>

<h3>2. Bite-Sized Lessons That Fit Your Life</h3>
<p>Every lesson in Alfaazo takes just 5-10 minutes. Whether you're on your commute, waiting in line, or winding down before bed, you can squeeze in meaningful practice without rearranging your schedule. Consistency matters more than marathon study sessions, and Alfaazo is built for exactly that.</p>

<h3>3. Real Phrases, Not Textbook Sentences</h3>
<p>You won't find "the cat is under the table" in Alfaazo. Instead, you'll learn phrases Punjabi speakers actually use — greetings like <strong>ਸਤ ਸ੍ਰੀ ਅਕਾਲ</strong> (Sat Sri Akaal), casual check-ins like <strong>ਕਿਦਾਂ?</strong> (Kidaan?), and everyday vocabulary rooted in real conversations.</p>

<h3>4. Cultural Context Built In</h3>
<p>Language doesn't exist in a vacuum. Alfaazo weaves in cultural notes — why certain phrases are used in specific situations, the significance of Gurmukhi in Sikh heritage, and how Punjabi varies across regions. You're not just memorizing words; you're understanding a culture.</p>

<h3>5. Completely Free</h3>
<p>No paywall, no premium tier hiding the good content. Alfaazo is free to download and free to use. Every lesson, every script guide, every phrase — available to everyone.</p>

<h2>Who Is Alfaazo For?</h2>
<p>Alfaazo works for a wide range of learners:</p>
<ul>
<li><strong>Heritage speakers</strong> who understand spoken Punjabi but can't read or write Gurmukhi</li>
<li><strong>Complete beginners</strong> starting from zero with no prior exposure</li>
<li><strong>Parents</strong> who want to teach their children Punjabi alongside English</li>
<li><strong>Partners and friends</strong> of Punjabi speakers who want to connect through language</li>
<li><strong>Travelers</strong> planning trips to Punjab who want to go beyond tourist basics</li>
</ul>

<h2>How Alfaazo Compares to Other Options</h2>
<p>There are a few ways people try to learn Punjabi today. Here's how they compare:</p>
<p><strong>YouTube videos</strong> are great for exposure but lack structure. You can watch hours of content without a clear learning path. <strong>Tutors</strong> offer personalized instruction but cost $20-50 per hour and require scheduling. <strong>Textbooks</strong> provide structure but no audio, no interactivity, and they gather dust quickly.</p>
<p>Alfaazo combines the structure of a textbook, the audio quality of a tutor, and the convenience of an app — at no cost.</p>

<h2>Download Alfaazo Today</h2>
<p>Alfaazo is available now on iOS, with Android coming soon. Whether you're reconnecting with your roots or discovering Punjabi for the first time, Alfaazo gives you everything you need to start reading, speaking, and understanding Punjabi — one bite-sized lesson at a time.</p>
<p><a href="https://apps.apple.com/us/app/alfaazo-learn-punjabi/id6759987308">Download Alfaazo free on the App Store →</a></p>
    `.trim(),
  },
  {
    slug: "learn-punjabi-online-free-complete-guide",
    title: "How to Learn Punjabi Online for Free — A Complete 2026 Guide",
    excerpt: "A practical roadmap for learning Punjabi online without spending a penny. From apps to YouTube channels to community resources.",
    date: "2026-03-29",
    tag: "Beginner",
    readTime: "8 min",
    author: "Alfaazo",
    published: true,
    content: `
<h2>Yes, You Can Learn Punjabi Online — For Free</h2>
<p>Ten years ago, learning Punjabi meant finding a tutor, buying textbooks, or being lucky enough to grow up in a Punjabi-speaking household. Today, everything you need is available online, and most of it is free. The challenge isn't access — it's knowing where to start and how to structure your learning.</p>
<p>This guide lays out a practical, step-by-step approach to learning Punjabi online without spending anything.</p>

<h2>Step 1: Learn the Gurmukhi Alphabet First</h2>
<p>This is non-negotiable. Gurmukhi is a phonetic script — every letter maps to exactly one sound. Once you learn the 35 base characters, you can sound out any Punjabi word, even if you don't know what it means yet. This is a massive advantage over scripts like English where spelling and pronunciation often disagree.</p>
<p>The <strong>Alfaazo app</strong> teaches Gurmukhi with stroke-by-stroke writing guides and audio for each letter. It's the fastest way to build script literacy, and it's completely free.</p>
<p>Expect to spend about 2-3 weeks on this step if you practice 15 minutes a day.</p>

<h2>Step 2: Build Core Vocabulary</h2>
<p>Start with the 200 most common Punjabi words. These cover roughly 60% of everyday conversation. Focus on categories that matter to your daily life:</p>
<ul>
<li><strong>Greetings and basics:</strong> ਸਤ ਸ੍ਰੀ ਅਕਾਲ, ਧੰਨਵਾਦ, ਹਾਂ, ਨਹੀਂ</li>
<li><strong>Family:</strong> ਮਾਂ (mother), ਪਿਤਾ (father), ਭੈਣ (sister), ਭਰਾ (brother)</li>
<li><strong>Food:</strong> ਰੋਟੀ (bread), ਪਾਣੀ (water), ਚਾਹ (tea), ਸਬਜ਼ੀ (vegetables)</li>
<li><strong>Numbers:</strong> ਇੱਕ, ਦੋ, ਤਿੰਨ, ਚਾਰ, ਪੰਜ (1-5)</li>
<li><strong>Everyday verbs:</strong> ਆਉਣਾ (to come), ਜਾਣਾ (to go), ਖਾਣਾ (to eat), ਪੀਣਾ (to drink)</li>
</ul>
<p>Alfaazo organizes vocabulary by practical themes so you learn words you'll actually use, not random lists.</p>

<h2>Step 3: Practice with Phrases, Not Just Words</h2>
<p>Isolated words are hard to remember. Phrases stick because they carry context and emotion. Instead of memorizing "ਕਿੱਥੇ" (where) alone, learn "ਤੁਸੀਂ ਕਿੱਥੇ ਜਾ ਰਹੇ ਹੋ?" (Where are you going?) — a question you'll hear and use constantly.</p>
<p>The Alfaazo blog has articles covering <a href="/blog/10-essential-punjabi-phrases">essential Punjabi phrases</a> and <a href="/blog/punjabi-greetings-hello-goodbye">common greetings</a> to get you started.</p>

<h2>Step 4: Listen to Punjabi Every Day</h2>
<p>Passive listening trains your ear even when you're not actively studying. Try these free resources:</p>
<ul>
<li><strong>Punjabi music</strong> on Spotify or YouTube — start with slower tracks where you can catch words</li>
<li><strong>Punjabi news channels</strong> — even if you understand 10%, your brain is processing sentence structure</li>
<li><strong>Punjabi podcasts</strong> — search for beginner-friendly ones on any podcast app</li>
<li><strong>Bollywood and Pollywood movies</strong> with subtitles — entertainment plus learning</li>
</ul>

<h2>Step 5: Speak from Day One</h2>
<p>Don't wait until you feel "ready." Start speaking on day one, even if it's just repeating phrases to yourself. If you have Punjabi-speaking family or friends, practice with them — they'll be thrilled. If not, language exchange communities online can connect you with native speakers.</p>

<h2>Step 6: Stay Consistent with an App</h2>
<p>The biggest reason people fail at language learning isn't lack of talent — it's lack of consistency. An app like Alfaazo solves this by giving you structured, bite-sized lessons you can complete in 5-10 minutes. Do one lesson a day, every day, and you'll be surprised how quickly things click.</p>

<h2>A Realistic Timeline</h2>
<p>Here's what to expect with 15-20 minutes of daily practice:</p>
<ul>
<li><strong>Week 1-3:</strong> Read Gurmukhi letters, recognize basic words</li>
<li><strong>Month 1-2:</strong> Introduce yourself, ask simple questions, count to 100</li>
<li><strong>Month 3-6:</strong> Hold basic conversations, understand common phrases when spoken slowly</li>
<li><strong>Month 6-12:</strong> Conversational fluency — discuss daily topics, understand most spoken Punjabi</li>
</ul>

<h2>Start Today</h2>
<p>The best time to start learning Punjabi was years ago. The second best time is today. Download <a href="https://apps.apple.com/us/app/alfaazo-learn-punjabi/id6759987308">Alfaazo for free on iOS</a> and start your first lesson in under a minute.</p>
    `.trim(),
  },
  {
    slug: "how-to-learn-punjabi-fast",
    title: "How to Learn Punjabi Fast — 7 Proven Tips That Actually Work",
    excerpt: "Want to learn Punjabi quickly? These science-backed strategies will help you make real progress in weeks, not years.",
    date: "2026-03-28",
    tag: "Beginner",
    readTime: "7 min",
    author: "Alfaazo",
    published: true,
    content: `
<h2>Can You Really Learn Punjabi Fast?</h2>
<p>Let's be honest: no app or method will make you fluent overnight. But you can absolutely accelerate your learning and make meaningful progress in weeks rather than months. The key is working smarter, not harder. These seven strategies are backed by language acquisition research and tested by real Punjabi learners.</p>

<h2>1. Start with Gurmukhi, Not Romanization</h2>
<p>This might feel counterintuitive — wouldn't it be faster to use English letters? Actually, no. Romanization creates bad pronunciation habits and an extra translation step your brain has to process forever. Gurmukhi is phonetic: each letter = one sound. Learn it first and everything else becomes easier.</p>
<p>The <strong>Alfaazo app</strong> teaches all 35 Gurmukhi characters with stroke-by-stroke guides. Most learners finish the alphabet in 2-3 weeks with just 15 minutes a day.</p>

<h2>2. Use Spaced Repetition</h2>
<p>Your brain forgets new information on a predictable curve. Spaced repetition fights this by showing you words just before you'd forget them. The result: you memorize vocabulary in a fraction of the time compared to brute-force repetition.</p>
<p>Alfaazo builds spaced repetition into its lesson structure, so you're always reviewing at the optimal interval without having to manage flashcards manually.</p>

<h2>3. Learn the 100 Most Common Words First</h2>
<p>In any language, a small number of words account for a huge percentage of daily speech. In Punjabi, the 100 most common words cover roughly 50% of everyday conversation. Learn these first:</p>
<ul>
<li>Pronouns: ਮੈਂ (I), ਤੂੰ (you informal), ਤੁਸੀਂ (you formal), ਉਹ (he/she/they)</li>
<li>Common verbs: ਹੈ (is), ਕਰਨਾ (to do), ਜਾਣਾ (to go), ਆਉਣਾ (to come)</li>
<li>Question words: ਕੀ (what), ਕੌਣ (who), ਕਿੱਥੇ (where), ਕਦੋਂ (when)</li>
<li>Connectors: ਤੇ (and), ਪਰ (but), ਕਿਉਂਕਿ (because)</li>
</ul>

<h2>4. Think in Phrases, Not Words</h2>
<p>Don't memorize "ਖਾਣਾ" (food) in isolation. Learn "ਖਾਣਾ ਖਾ ਲਿਆ?" (Have you eaten?) — a phrase you'll hear multiple times a day in any Punjabi household. Phrases give you context, grammar patterns, and cultural insight all at once.</p>

<h2>5. Immerse Yourself (Even Without Going to Punjab)</h2>
<p>Create a Punjabi bubble around yourself:</p>
<ul>
<li>Change your phone language to Punjabi</li>
<li>Listen to Punjabi music during commutes</li>
<li>Watch one Punjabi YouTube video a day</li>
<li>Follow Punjabi meme pages on Instagram</li>
<li>Label items in your home with Gurmukhi sticky notes</li>
</ul>
<p>You don't need to live in Punjab to surround yourself with the language. Every small exposure adds up.</p>

<h2>6. Speak from Week One</h2>
<p>Most learners wait too long to start speaking. They want to be "ready." But speaking is how you get ready. Start by greeting family members in Punjabi. Narrate simple actions to yourself: "ਮੈਂ ਚਾਹ ਬਣਾ ਰਿਹਾ ਹਾਂ" (I'm making tea). Say things out loud even if no one is listening — your mouth needs the muscle memory.</p>

<h2>7. Be Consistent, Not Intense</h2>
<p>A 15-minute daily session beats a 2-hour weekend cramming session every time. Language learning is like exercise — frequency matters more than duration. This is where an app like Alfaazo shines: it's designed for short, daily sessions that build on each other.</p>

<h2>How Fast Is "Fast"?</h2>
<p>With daily 15-20 minute practice using these strategies:</p>
<ul>
<li><strong>2 weeks:</strong> Read all Gurmukhi letters, know 20+ common words</li>
<li><strong>1 month:</strong> Introduce yourself, understand basic greetings, count to 20</li>
<li><strong>3 months:</strong> Hold simple conversations, understand spoken Punjabi at slow speed</li>
<li><strong>6 months:</strong> Discuss everyday topics, understand most casual conversations</li>
</ul>
<p>These aren't magic numbers — your mileage will vary. But with the right tools and consistency, Punjabi is very learnable. Start with <a href="https://apps.apple.com/us/app/alfaazo-learn-punjabi/id6759987308">Alfaazo</a> and see how far you get in your first month.</p>
    `.trim(),
  },
  {
    slug: "learn-punjabi-for-beginners-where-to-start",
    title: "Learn Punjabi for Beginners — Where to Start in 2026",
    excerpt: "Complete beginner's roadmap to learning Punjabi. No prior knowledge needed — just start here.",
    date: "2026-03-27",
    tag: "Beginner",
    readTime: "7 min",
    author: "Alfaazo",
    published: true,
    content: `
<h2>So You Want to Learn Punjabi</h2>
<p>Welcome. Whether you're a heritage speaker who grew up hearing Punjabi but never learned to read it, or a complete outsider drawn to the language, this guide will give you a clear starting point. No jargon, no overwhelm — just a practical path forward.</p>

<h2>Why Punjabi?</h2>
<p>Punjabi is the 10th most spoken language in the world, with over 125 million native speakers. It's the language of one of the world's richest literary traditions, a vibrant music industry, and a global diaspora spanning Canada, the UK, Australia, and the United States. Learning Punjabi connects you to all of this.</p>
<p>It's also more approachable than you might think. Gurmukhi, the script used for Punjabi, is fully phonetic — there are no silent letters, no irregular spellings. What you see is what you say.</p>

<h2>The Three Pillars of Beginning Punjabi</h2>

<h3>Pillar 1: Script (Gurmukhi)</h3>
<p>Gurmukhi has 35 base consonants and a set of vowel signs. That might sound like a lot, but compared to Chinese characters (thousands) or Japanese (three separate scripts), it's very manageable. Most beginners learn to read Gurmukhi in 2-3 weeks.</p>
<p>Start with the <strong>Alfaazo app</strong>, which teaches each letter with stroke-by-stroke writing guides, pronunciation audio, and practice exercises. It's free and designed specifically for this purpose.</p>

<h3>Pillar 2: Vocabulary</h3>
<p>Your first 100 words should be things you encounter daily. Don't start with abstract concepts — start with your kitchen, your family, your routine:</p>
<ul>
<li><strong>ਰੋਟੀ</strong> (roti — bread) — you'll say this every day</li>
<li><strong>ਪਾਣੀ</strong> (paani — water) — one of the first words every learner needs</li>
<li><strong>ਘਰ</strong> (ghar — home) — because "ਘਰ ਚੱਲੀਏ?" (shall we go home?) is universal</li>
<li><strong>ਸ਼ੁਕਰੀਆ</strong> (shukriya — thank you) — politeness opens every door</li>
</ul>

<h3>Pillar 3: Listening</h3>
<p>Your ears need to adjust to Punjabi's rhythm and tones. Start with slow, clear speech — the Alfaazo app provides native audio for every word and phrase. Then gradually expose yourself to natural-speed Punjabi through music, videos, and conversations.</p>

<h2>Common Mistakes Beginners Make</h2>
<p><strong>Skipping Gurmukhi:</strong> Relying on romanization feels easier at first but creates a ceiling you'll hit hard later. Invest the 2-3 weeks upfront.</p>
<p><strong>Trying to learn everything at once:</strong> You don't need to master tones, grammar, and all vocabulary simultaneously. Focus on script → basic vocabulary → simple phrases → grammar (in that order).</p>
<p><strong>Not speaking early enough:</strong> Even repeating phrases to yourself builds the neural pathways for speaking. Don't wait until you feel "ready."</p>
<p><strong>Inconsistency:</strong> Ten minutes every day is better than an hour once a week. Language learning is a daily habit, not a project.</p>

<h2>Your First Week Plan</h2>
<p><strong>Day 1-2:</strong> Download Alfaazo. Learn the first 10 Gurmukhi letters. Practice writing each one.</p>
<p><strong>Day 3-4:</strong> Learn the next 10 letters. Review the first 10. Start noticing Gurmukhi in signs, social media, or music videos.</p>
<p><strong>Day 5-6:</strong> Learn the remaining letters. Begin connecting letters into simple words.</p>
<p><strong>Day 7:</strong> Review all letters. Try reading 5 simple Punjabi words. Celebrate — you've just learned an entire script in a week.</p>

<h2>What Comes After the Basics?</h2>
<p>Once you can read Gurmukhi and know 50-100 words, you'll start recognizing words in songs, understanding fragments of conversations, and reading simple texts. This is when learning gets exciting — every day brings small wins.</p>
<p>Continue with Alfaazo's structured lessons, supplement with Punjabi music and videos, and try to use your Punjabi in real conversations whenever possible. The path from beginner to conversational is shorter than you think.</p>
<p><a href="https://apps.apple.com/us/app/alfaazo-learn-punjabi/id6759987308">Download Alfaazo free and start your first lesson →</a></p>
    `.trim(),
  },
  {
    slug: "why-learn-punjabi-in-2026",
    title: "Why Learn Punjabi in 2026? 8 Reasons That Go Beyond Heritage",
    excerpt: "Punjabi isn't just a heritage language — it's a gateway to culture, career opportunities, and a global community of 125 million speakers.",
    date: "2026-03-26",
    tag: "Culture",
    readTime: "6 min",
    author: "Alfaazo",
    published: true,
    content: `
<h2>Punjabi Is Having a Moment</h2>
<p>Punjabi music dominates global charts. Punjabi cuisine is everywhere. Punjabi diaspora communities are thriving in Canada, the UK, Australia, and the US. If you've been thinking about learning Punjabi, 2026 is the year to start. Here are eight compelling reasons.</p>

<h2>1. Connect with 125 Million Speakers Worldwide</h2>
<p>Punjabi is the 10th most spoken language on Earth. It's an official language in India (Punjab state) and Pakistan (Punjab province), and it's widely spoken across the global diaspora. Learning Punjabi opens doors to relationships, communities, and conversations that English alone can't.</p>

<h2>2. Preserve Your Heritage</h2>
<p>For millions of second and third-generation Punjabis, the language is slipping away. You might understand when your grandparents speak, but can you read Gurmukhi? Can your children? Learning Punjabi isn't just personal — it's an act of cultural preservation that bridges generations.</p>

<h2>3. Understand Punjabi Music and Poetry</h2>
<p>From Sidhu Moose Wala to AP Dhillon, Punjabi music is a global phenomenon. But lyrics in translation lose their soul. When you understand Punjabi, you hear the wordplay, the cultural references, the raw emotion that makes the music powerful. The same goes for classical Punjabi poetry — Bulleh Shah, Waris Shah, Amrita Pritam — literature that rewards you for reading it in the original.</p>

<h2>4. Career Advantages</h2>
<p>In fields like healthcare, social work, law, education, and government services, Punjabi speakers are in demand — especially in Canada (where Punjabi is the third most spoken language), the UK, and parts of the US. Bilingualism is a professional asset, and Punjabi-English bilingualism is increasingly valuable.</p>

<h2>5. Travel Deeper</h2>
<p>Tourist Punjabi is not the same as real Punjabi. When you visit the Golden Temple, walk through the streets of Amritsar, or eat at a dhaba in rural Punjab, speaking the language transforms the experience. Locals open up. Doors open. Prices drop. Experiences deepen.</p>

<h2>6. It's More Accessible Than Ever</h2>
<p>A decade ago, learning Punjabi meant expensive tutors or dusty textbooks. Today, apps like <strong>Alfaazo</strong> make it possible to learn Gurmukhi script, everyday phrases, and real-world conversations — for free, on your phone, in 10 minutes a day. The barriers are gone.</p>

<h2>7. Cognitive Benefits</h2>
<p>Learning any language improves memory, problem-solving, and multitasking abilities. But learning a language with a different script — like Gurmukhi — provides additional cognitive exercise. You're not just learning new words; you're training your brain to process information in an entirely new visual system.</p>

<h2>8. Because It's Beautiful</h2>
<p>Punjabi is an expressive, musical, emotional language. It has words for feelings that English can't capture. The tonal system gives it a melodic quality. Gurmukhi script has an elegant, flowing aesthetic. Learning Punjabi is its own reward — it's simply a beautiful language.</p>

<h2>Where to Start</h2>
<p>The best way to begin is with Gurmukhi script. Once you can read the letters, everything else — vocabulary, phrases, grammar — falls into place more naturally. <a href="https://apps.apple.com/us/app/alfaazo-learn-punjabi/id6759987308">Download Alfaazo for free</a> and start your first lesson today. Your future self will thank you.</p>
    `.trim(),
  },
];

async function addPosts() {
  console.log(`Adding ${posts.length} SEO blog posts to Firestore...\n`);

  for (const { slug, ...data } of posts) {
    await setDoc(doc(db, "blogs", slug), data);
    console.log(`  ✓ ${slug}`);
  }

  console.log("\nDone! Posts will appear on the site within 5 minutes.");
  process.exit(0);
}

addPosts().catch((err) => {
  console.error("Failed:", err);
  process.exit(1);
});
