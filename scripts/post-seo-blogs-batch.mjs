/**
 * Batch-upload 4 SEO-targeted educational blog posts to Firestore.
 * Usage: node --env-file=.env.local scripts/post-seo-blogs-batch.mjs
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
  // =================================================================
  // POST 1 — How to Write Your Name in Punjabi (Gurmukhi)
  // =================================================================
  {
    slug: "how-to-write-your-name-in-punjabi",
    title: "How to Write Your Name in Punjabi (Gurmukhi) — Step-by-Step Guide",
    excerpt:
      "Learn how to write your name in Punjabi using the Gurmukhi script. Step-by-step guide with worked examples for English, South Asian, and Western names.",
    date: "2026-05-19",
    tag: "Script",
    readTime: "8 min",
    author: "Alfaazo",
    published: true,
    content: `
<h2>How to Write Your Name in Punjabi</h2>
<p>To write your name in Punjabi, you spell it out phonetically in the <strong>Gurmukhi script</strong> — Punjabi's writing system. Gurmukhi is fully phonetic, so once you know what each letter sounds like, you can write any name (yours, your friend's, your favourite singer's) by sounding it out and matching each sound to a Gurmukhi letter.</p>
<p>This guide walks you through the process in three simple steps and shows worked examples for common names.</p>

<h2>Why Write Your Name in Gurmukhi?</h2>
<p>There are a few reasons writing your name in Gurmukhi matters:</p>
<ul>
<li><strong>Personal identity</strong> — Seeing your name in your heritage script is genuinely emotional, especially for second and third generation Punjabis</li>
<li><strong>Cultural respect</strong> — Signing a card or gift in Gurmukhi shows effort and warmth that goes a long way in Punjabi families</li>
<li><strong>Learning foundation</strong> — Your own name is the easiest, most memorable way to learn Gurmukhi letters because you already know how it sounds</li>
<li><strong>Tattoos and art</strong> — Many people want their name in Gurmukhi for jewellery, calligraphy, or tattoos</li>
</ul>

<h2>Three Things to Know About Gurmukhi First</h2>
<p>Before you start writing, three quick basics:</p>
<ol>
<li><strong>Gurmukhi has 35 base consonants.</strong> Each letter makes one specific sound. There are no silent letters and no irregular spellings.</li>
<li><strong>Vowel sounds use marks called <em>matras</em>.</strong> These attach above, below, or beside a consonant — they tell you how to pronounce it.</li>
<li><strong>You write left to right.</strong> Just like English. The top horizontal line (<em>sirorekha</em>) connects letters within a word.</li>
</ol>

<h2>Step 1: Break Your Name Into Sounds</h2>
<p>Forget how your name is spelled in English. Focus on how it <em>sounds</em>. Say it out loud, slowly, and break it into syllables.</p>
<p>Examples:</p>
<ul>
<li><strong>Sarah</strong> → SA + RA (two syllables, no silent 'h')</li>
<li><strong>John</strong> → JA + N (one syllable)</li>
<li><strong>Amrit</strong> → A + M + RIT</li>
<li><strong>Maya</strong> → MA + YA</li>
<li><strong>David</strong> → DAY + VID</li>
</ul>

<h2>Step 2: Match Each Sound to a Gurmukhi Letter</h2>
<p>Here's a starter reference for the most common sounds you'll need for names:</p>

<table>
<thead>
<tr><th>Sound</th><th>Gurmukhi Letter</th><th>Example</th></tr>
</thead>
<tbody>
<tr><td>A (as in "father")</td><td>ਅ</td><td>Anil → ਅਨਿਲ</td></tr>
<tr><td>K</td><td>ਕ</td><td>Karan → ਕਰਨ</td></tr>
<tr><td>G</td><td>ਗ</td><td>Geeta → ਗੀਤਾ</td></tr>
<tr><td>J</td><td>ਜ</td><td>John → ਜੌਨ</td></tr>
<tr><td>T (soft)</td><td>ਤ</td><td>Tina → ਤੀਨਾ</td></tr>
<tr><td>D (soft)</td><td>ਦ</td><td>David → ਡੇਵਿਡ</td></tr>
<tr><td>N</td><td>ਨ</td><td>Nina → ਨੀਨਾ</td></tr>
<tr><td>P</td><td>ਪ</td><td>Priya → ਪ੍ਰਿਆ</td></tr>
<tr><td>M</td><td>ਮ</td><td>Maya → ਮਾਯਾ</td></tr>
<tr><td>R</td><td>ਰ</td><td>Ravi → ਰਵੀ</td></tr>
<tr><td>L</td><td>ਲ</td><td>Lily → ਲਿਲੀ</td></tr>
<tr><td>S</td><td>ਸ</td><td>Sarah → ਸਾਰਾ</td></tr>
<tr><td>H</td><td>ਹ</td><td>Hari → ਹਰੀ</td></tr>
<tr><td>V/W</td><td>ਵ</td><td>Vivek → ਵਿਵੇਕ</td></tr>
<tr><td>Y</td><td>ਯ</td><td>Yash → ਯਸ਼</td></tr>
</tbody>
</table>

<h2>Step 3: Add Vowel Marks (Matras)</h2>
<p>Consonants in Gurmukhi carry an implicit "a" sound. To change the vowel, add a matra:</p>

<table>
<thead>
<tr><th>Vowel Sound</th><th>Matra</th><th>Example with ਕ (K)</th></tr>
</thead>
<tbody>
<tr><td>aa (long a)</td><td>ਾ</td><td>ਕਾ (kaa)</td></tr>
<tr><td>i (short)</td><td>ਿ</td><td>ਕਿ (ki)</td></tr>
<tr><td>ee (long)</td><td>ੀ</td><td>ਕੀ (kee)</td></tr>
<tr><td>u (short)</td><td>ੁ</td><td>ਕੁ (ku)</td></tr>
<tr><td>oo (long)</td><td>ੂ</td><td>ਕੂ (koo)</td></tr>
<tr><td>e (as in "they")</td><td>ੇ</td><td>ਕੇ (ke)</td></tr>
<tr><td>o (as in "go")</td><td>ੋ</td><td>ਕੋ (ko)</td></tr>
</tbody>
</table>

<h2>Worked Examples</h2>

<h3>Writing "Sarah" (ਸਾਰਾ)</h3>
<ol>
<li>Break it down: SAA + RAA</li>
<li>S = ਸ, add aa-matra → ਸਾ</li>
<li>R = ਰ, add aa-matra → ਰਾ</li>
<li>Combine: <strong>ਸਾਰਾ</strong></li>
</ol>

<h3>Writing "Amrit" (ਅੰਮ੍ਰਿਤ)</h3>
<ol>
<li>Break it down: A + M + RIT</li>
<li>A = ਅ (standalone vowel)</li>
<li>M = ਮ (with a nasal mark)</li>
<li>R + I + T = ਰਿਤ</li>
<li>Combine: <strong>ਅੰਮ੍ਰਿਤ</strong></li>
</ol>

<h3>Writing "Maya" (ਮਾਯਾ)</h3>
<ol>
<li>Break it down: MAA + YAA</li>
<li>M = ਮ + aa-matra → ਮਾ</li>
<li>Y = ਯ + aa-matra → ਯਾ</li>
<li>Combine: <strong>ਮਾਯਾ</strong></li>
</ol>

<h2>Common Challenges</h2>
<ul>
<li><strong>Sounds that don't exist in English</strong> — Punjabi has aspirated consonants (kh, gh, ph) that English doesn't always distinguish. Stick to the closest match.</li>
<li><strong>Sounds that don't exist in Punjabi</strong> — Some English sounds (like "th" in "thanks") need approximation. Most people use ਥ.</li>
<li><strong>Double consonants</strong> — Use a special mark called <em>addak</em> (ੱ) before the doubled letter. "Annie" becomes ਐੱਨੀ.</li>
</ul>

<h2>Practice Yourself</h2>
<p>Try writing these three names using the tables above, then check your work by typing them into a Gurmukhi keyboard or showing a Punjabi friend:</p>
<ol>
<li><strong>Emma</strong> (hint: EM + MAA, with addak for the double M)</li>
<li><strong>Liam</strong> (LI + AM)</li>
<li>Your own name</li>
</ol>

<h2>Learn Gurmukhi Properly with Alfaazo</h2>
<p>Reading a guide is a great start, but writing Gurmukhi by hand — with proper stroke order — is what makes it stick. <a href="https://www.alfaazo.com">Alfaazo</a> is a free app that teaches every Gurmukhi letter with stroke-by-stroke writing guides, native pronunciation audio, and interactive practice. You can be writing your full name confidently within a week.</p>
<p>Download free on <a href="https://apps.apple.com/us/app/alfaazo-learn-punjabi/id6759987308">iOS</a> or <a href="https://play.google.com/store/apps/details?id=com.alfaazo.app">Android</a> and start with the Gurmukhi alphabet lessons today.</p>
<p>ਆਓ ਸ਼ੁਰੂ ਕਰੀਏ — Let's begin.</p>
    `.trim(),
  },

  // =================================================================
  // POST 2 — Punjabi Numbers 1-100
  // =================================================================
  {
    slug: "punjabi-numbers-1-100-counting-guide",
    title: "Punjabi Numbers 1-100: Complete Counting Guide with Pronunciation",
    excerpt:
      "Master Punjabi numbers from 1 to 100 with Gurmukhi script, pronunciation guides, and real-world examples for shopping, age, and daily conversation.",
    date: "2026-05-19",
    tag: "Beginner",
    readTime: "7 min",
    author: "Alfaazo",
    published: true,
    content: `
<h2>How to Count in Punjabi</h2>
<p>Punjabi numbers from 1 to 10 are <strong>ikk, do, tinn, chaar, panj, chhe, satt, atth, nau, dass</strong>. After 10, Punjabi numbers follow patterns similar to Hindi, with unique compound forms from 11 to 99. This guide walks you through every number you need from 1 to 100, with Gurmukhi script and pronunciation.</p>

<h2>Why Learn Punjabi Numbers?</h2>
<p>Numbers come up constantly in everyday conversation — telling someone your age, asking how much something costs at a Punjabi sweet shop, ordering food, telling time, counting kids and grandkids. They're some of the highest-frequency words you'll ever use, which makes them a great early win when you're learning the language.</p>

<h2>Punjabi Numbers 1-10</h2>
<p>These are the foundation. Memorise these first — every other number builds on them.</p>

<table>
<thead>
<tr><th>Number</th><th>Gurmukhi</th><th>Word</th><th>Pronunciation</th></tr>
</thead>
<tbody>
<tr><td>1</td><td>ਇੱਕ</td><td>Ikk</td><td>ick (rhymes with "tick")</td></tr>
<tr><td>2</td><td>ਦੋ</td><td>Do</td><td>doh</td></tr>
<tr><td>3</td><td>ਤਿੰਨ</td><td>Tinn</td><td>tinn (soft t)</td></tr>
<tr><td>4</td><td>ਚਾਰ</td><td>Chaar</td><td>chaar</td></tr>
<tr><td>5</td><td>ਪੰਜ</td><td>Panj</td><td>punj</td></tr>
<tr><td>6</td><td>ਛੇ</td><td>Chhe</td><td>chhay</td></tr>
<tr><td>7</td><td>ਸੱਤ</td><td>Satt</td><td>sutt</td></tr>
<tr><td>8</td><td>ਅੱਠ</td><td>Atth</td><td>uth</td></tr>
<tr><td>9</td><td>ਨੌਂ</td><td>Nau</td><td>now</td></tr>
<tr><td>10</td><td>ਦਸ</td><td>Dass</td><td>duss</td></tr>
</tbody>
</table>

<h2>Punjabi Numbers 11-20</h2>
<p>The teens are where Punjabi gets tricky — they don't follow a clean pattern. You have to memorise them individually, just like English speakers memorise "eleven, twelve, thirteen."</p>

<table>
<thead>
<tr><th>Number</th><th>Gurmukhi</th><th>Word</th><th>Pronunciation</th></tr>
</thead>
<tbody>
<tr><td>11</td><td>ਗਿਆਰਾਂ</td><td>Giaaran</td><td>gee-yaa-ran</td></tr>
<tr><td>12</td><td>ਬਾਰਾਂ</td><td>Baaran</td><td>baa-ran</td></tr>
<tr><td>13</td><td>ਤੇਰਾਂ</td><td>Teran</td><td>tay-ran</td></tr>
<tr><td>14</td><td>ਚੌਦਾਂ</td><td>Chaudan</td><td>chow-dan</td></tr>
<tr><td>15</td><td>ਪੰਦਰਾਂ</td><td>Pandran</td><td>pun-drun</td></tr>
<tr><td>16</td><td>ਸੋਲਾਂ</td><td>Solan</td><td>so-lan</td></tr>
<tr><td>17</td><td>ਸਤਾਰਾਂ</td><td>Sataran</td><td>su-taa-ran</td></tr>
<tr><td>18</td><td>ਅਠਾਰਾਂ</td><td>Atharan</td><td>u-thaa-ran</td></tr>
<tr><td>19</td><td>ਉੱਨੀ</td><td>Unni</td><td>un-nee</td></tr>
<tr><td>20</td><td>ਵੀਹ</td><td>Veeh</td><td>vee</td></tr>
</tbody>
</table>

<h2>The Tens (20, 30, 40… 100)</h2>
<p>Each "round" number has its own word. Learn these and you'll be able to construct any number from 21 to 99.</p>

<table>
<thead>
<tr><th>Number</th><th>Gurmukhi</th><th>Word</th></tr>
</thead>
<tbody>
<tr><td>20</td><td>ਵੀਹ</td><td>Veeh</td></tr>
<tr><td>30</td><td>ਤੀਹ</td><td>Teeh</td></tr>
<tr><td>40</td><td>ਚਾਲੀ</td><td>Chaali</td></tr>
<tr><td>50</td><td>ਪੰਜਾਹ</td><td>Panjaah</td></tr>
<tr><td>60</td><td>ਸੱਠ</td><td>Sath</td></tr>
<tr><td>70</td><td>ਸੱਤਰ</td><td>Sattar</td></tr>
<tr><td>80</td><td>ਅੱਸੀ</td><td>Assi</td></tr>
<tr><td>90</td><td>ਨੱਬੇ</td><td>Nabbe</td></tr>
<tr><td>100</td><td>ਸੌ</td><td>Sau</td></tr>
</tbody>
</table>

<h2>How to Form Compound Numbers (21-99)</h2>
<p>Here's where Punjabi differs slightly from English. Compound numbers like 21, 35, or 47 are usually <strong>fused words</strong>, not "twenty-one" style two-word constructions. Some examples:</p>

<table>
<thead>
<tr><th>Number</th><th>Gurmukhi</th><th>Word</th></tr>
</thead>
<tbody>
<tr><td>21</td><td>ਇੱਕੀ</td><td>Ikki</td></tr>
<tr><td>22</td><td>ਬਾਈ</td><td>Baai</td></tr>
<tr><td>25</td><td>ਪੰਝੀ</td><td>Panjhi</td></tr>
<tr><td>30</td><td>ਤੀਹ</td><td>Teeh</td></tr>
<tr><td>35</td><td>ਪੈਂਤੀ</td><td>Painti</td></tr>
<tr><td>40</td><td>ਚਾਲੀ</td><td>Chaali</td></tr>
<tr><td>45</td><td>ਪੰਤਾਲੀ</td><td>Pantaali</td></tr>
<tr><td>50</td><td>ਪੰਜਾਹ</td><td>Panjaah</td></tr>
<tr><td>55</td><td>ਪਚਵੰਜਾ</td><td>Pachvanja</td></tr>
<tr><td>75</td><td>ਪਚੱਤਰ</td><td>Pachattar</td></tr>
<tr><td>99</td><td>ਨੜਿੰਨਵੇਂ</td><td>Narinwen</td></tr>
</tbody>
</table>

<p><strong>Honest tip:</strong> Native Punjabi speakers (especially in the diaspora) sometimes use the English number for the second digit — "panj-and-twenty" style — when the proper word slips their mind. So don't stress about memorising all 99 fused forms. Focus on multiples of ten and the 1-10 pattern, and you'll be understood.</p>

<h2>100 and Beyond</h2>
<ul>
<li><strong>100</strong> = ਸੌ (Sau)</li>
<li><strong>200</strong> = ਦੋ ਸੌ (Do Sau)</li>
<li><strong>500</strong> = ਪੰਜ ਸੌ (Panj Sau)</li>
<li><strong>1,000</strong> = ਹਜ਼ਾਰ (Hazaar)</li>
<li><strong>100,000</strong> = ਲੱਖ (Lakh) — South Asian numbering uses lakh, not "hundred thousand"</li>
<li><strong>10,000,000</strong> = ਕਰੋੜ (Crore)</li>
</ul>

<h2>Real-World Use Cases</h2>

<h3>Telling Someone Your Age</h3>
<p>"I am 25 years old" = <strong>ਮੈਂ ਪੰਝੀ ਸਾਲ ਦਾ ਹਾਂ</strong> (Main panjhi saal da haan)</p>

<h3>Asking the Price</h3>
<p>"How much?" = <strong>ਕਿੰਨੇ ਦਾ?</strong> (Kinne da?). Then they'll reply with a number like "Panjah" (50) or "Sau" (100).</p>

<h3>Counting Family Members</h3>
<p>"We have three children" = <strong>ਸਾਡੇ ਤਿੰਨ ਬੱਚੇ ਹਨ</strong> (Saade tinn bachche han)</p>

<h2>Cultural Note: Counting in Punjabi Shops</h2>
<p>If you walk into a Punjabi sweet shop or fabric store in Punjab — or any diaspora neighbourhood like Brampton, Southall, or Yuba City — you'll hear numbers flying back and forth in rapid Punjabi. Learning even basic counting unlocks the whole experience: bargaining, ordering by weight, paying without confusion. It's one of the fastest ways to feel like an insider.</p>

<h2>Practice Punjabi Numbers Daily with Alfaazo</h2>
<p>Memorising number tables is great, but you need to <em>hear</em> them in real speech to internalise them. <a href="https://www.alfaazo.com">Alfaazo</a> drills you on numbers with native audio, real-world scenarios (shopping, telling time, age), and bite-sized practice you can do in 5 minutes a day.</p>
<p>Free on <a href="https://apps.apple.com/us/app/alfaazo-learn-punjabi/id6759987308">iOS</a> and <a href="https://play.google.com/store/apps/details?id=com.alfaazo.app">Android</a>.</p>
    `.trim(),
  },

  // =================================================================
  // POST 3 — Sat Sri Akaal Meaning & Origin
  // =================================================================
  {
    slug: "sat-sri-akaal-meaning-and-origin",
    title: "Sat Sri Akaal: Meaning, Origin & When to Use This Punjabi Greeting",
    excerpt:
      "Sat Sri Akaal is the universal Punjabi greeting meaning 'God is the Ultimate Truth.' Learn its Sikh origin, proper pronunciation, and when to use it.",
    date: "2026-05-19",
    tag: "Culture",
    readTime: "5 min",
    author: "Alfaazo",
    published: true,
    content: `
<h2>What Does Sat Sri Akaal Mean?</h2>
<p><strong>Sat Sri Akaal</strong> (ਸਤ ਸ੍ਰੀ ਅਕਾਲ) is the most common Punjabi greeting, used by Sikhs worldwide. It literally means <strong>"God (Akaal) is the Ultimate (Sri) Truth (Sat)"</strong> — a declaration that the timeless, eternal God is the only true reality. It functions as both "hello" and "goodbye" in Punjabi conversation.</p>

<h2>Word-by-Word Breakdown</h2>
<table>
<thead>
<tr><th>Word</th><th>Meaning</th></tr>
</thead>
<tbody>
<tr><td><strong>Sat</strong> (ਸਤ)</td><td>Truth, true, eternal</td></tr>
<tr><td><strong>Sri</strong> (ਸ੍ਰੀ)</td><td>An honorific meaning "great" or "respected" — like "Mr." but more reverent</td></tr>
<tr><td><strong>Akaal</strong> (ਅਕਾਲ)</td><td>The timeless one; God beyond time. Comes from <em>kaal</em> (time) + <em>a-</em> (without)</td></tr>
</tbody>
</table>
<p>Together, the phrase affirms a core Sikh belief: that God (Akaal Purakh) is beyond birth, death, and time — and that this truth is the highest reality.</p>

<h2>Where Does Sat Sri Akaal Come From?</h2>
<p>The greeting traces back to <strong>Guru Gobind Singh Ji</strong> (the tenth Sikh Guru) in the late 17th century. He introduced the phrase as a battle cry and rallying greeting, replacing earlier Hindu-style greetings with one that centred Sikh theology. The full form is:</p>
<p><strong>ਜੋ ਬੋਲੇ ਸੋ ਨਿਹਾਲ, ਸਤ ਸ੍ਰੀ ਅਕਾਲ</strong></p>
<p><em>"Jo bole so nihaal, Sat Sri Akaal"</em> — "Whoever utters [this phrase] shall be blessed: God is the Ultimate Truth."</p>
<p>You'll hear this full call-and-response at Gurdwaras (Sikh temples), weddings, and other religious gatherings. The leader calls "Jo bole so nihaal" and the congregation responds with "Sat Sri Akaal!"</p>

<h2>How to Pronounce Sat Sri Akaal</h2>
<p>Phonetically: <strong>SUTT SREE UH-KAAL</strong></p>
<ul>
<li><strong>Sat</strong> rhymes with "but" — short, clipped vowel</li>
<li><strong>Sri</strong> is one quick syllable, almost "shree"</li>
<li><strong>Akaal</strong> has stress on the second syllable: a-KAAL (long "aa")</li>
</ul>

<h2>When to Use Sat Sri Akaal</h2>
<p>It works in almost any situation where you'd say "hello" in English:</p>
<ul>
<li>Greeting elders or family members</li>
<li>Answering the phone</li>
<li>Walking into a Gurdwara or Punjabi home</li>
<li>Starting a conversation with anyone Punjabi/Sikh</li>
<li>Ending a call or saying goodbye</li>
<li>Formal occasions like weddings, festivals, and ceremonies</li>
</ul>
<p>Unlike "hi" or "hello" in English, it carries spiritual weight — but it's used casually too, just like "namaste" in Hindi.</p>

<h2>Common Responses</h2>
<p>The standard reply is simply to repeat the greeting back:</p>
<p><strong>Sat Sri Akaal</strong> → <strong>Sat Sri Akaal Ji</strong> (the "Ji" adds respect)</p>
<p>You can also respond with:</p>
<ul>
<li><strong>Sat Sri Akaal Ji</strong> — "Hello, with respect"</li>
<li><strong>Waheguru Ji Ka Khalsa, Waheguru Ji Ki Fateh</strong> — a more formal Sikh greeting used in religious contexts</li>
</ul>

<h2>When NOT to Use Sat Sri Akaal</h2>
<p>The phrase is specifically Sikh in origin and tone. While many non-Sikh Punjabis use it (especially in the diaspora), some contexts call for alternatives:</p>
<ul>
<li><strong>With Hindu Punjabi families:</strong> "Namaste" or "Sasriakal" may feel more comfortable, though Sat Sri Akaal is widely accepted</li>
<li><strong>With Muslim Punjabis (Pakistan):</strong> Use "Assalam-o-Alaikum" — the standard Muslim greeting</li>
<li><strong>Very casual settings with peers:</strong> A simple "Kidaan?" ("what's up?") feels more natural among friends</li>
</ul>

<h2>Other Common Punjabi Greetings</h2>
<table>
<thead>
<tr><th>Greeting</th><th>Meaning</th><th>When to Use</th></tr>
</thead>
<tbody>
<tr><td>Sat Sri Akaal</td><td>God is Truth</td><td>Sikh contexts, formal, universal</td></tr>
<tr><td>Kidaan?</td><td>What's up?</td><td>Casual, with friends</td></tr>
<tr><td>Kee haal hai?</td><td>How are you?</td><td>Anyone, semi-formal</td></tr>
<tr><td>Tusi kivein ho?</td><td>How are you? (formal)</td><td>Elders, formal situations</td></tr>
<tr><td>Namaste</td><td>I bow to you</td><td>Hindu contexts, formal</td></tr>
</tbody>
</table>

<h2>Cultural Etiquette</h2>
<p>When greeting elders with "Sat Sri Akaal," it's customary to:</p>
<ul>
<li>Add "Ji" at the end as a sign of respect</li>
<li>Fold your hands together (slight bow) for grandparents or religious figures</li>
<li>Touch their feet if entering their home for the first time after a long absence — though this is increasingly optional in modern diaspora families</li>
</ul>

<h2>Learn Authentic Punjabi Greetings with Alfaazo</h2>
<p>Greetings are just the start. <a href="https://www.alfaazo.com">Alfaazo</a> teaches you how to navigate Punjabi conversation from "Sat Sri Akaal" through full daily dialogue — with native audio, cultural context, and bite-sized lessons. Free on <a href="https://apps.apple.com/us/app/alfaazo-learn-punjabi/id6759987308">iOS</a> and <a href="https://play.google.com/store/apps/details?id=com.alfaazo.app">Android</a>.</p>
<p><strong>Sat Sri Akaal Ji</strong> — and welcome to your Punjabi learning journey.</p>
    `.trim(),
  },

  // =================================================================
  // POST 4 — Punjabi Family Words
  // =================================================================
  {
    slug: "punjabi-family-words-relationships",
    title: "Punjabi Family Words: Mother, Father, Brother & 30+ Relationship Names",
    excerpt:
      "Complete guide to Punjabi family vocabulary — parents, siblings, grandparents, aunts, uncles, and in-laws. With Gurmukhi script and pronunciation.",
    date: "2026-05-19",
    tag: "Beginner",
    readTime: "8 min",
    author: "Alfaazo",
    published: true,
    content: `
<h2>Family Vocabulary in Punjabi</h2>
<p>Punjabi has more specific words for family relationships than English does — it distinguishes your mother's side from your father's side, your spouse's siblings from your siblings, and so on. This guide covers the 30+ most important family terms with Gurmukhi script and pronunciation.</p>

<h2>Why Family Vocabulary Matters in Punjabi</h2>
<p>Family is the centre of Punjabi culture. You rarely meet someone in a Punjabi household without quickly being told who they are — your "chacha ji" (paternal uncle), your "mami" (maternal uncle's wife), your "nani" (maternal grandmother). Getting these terms right shows respect and earns you instant warmth from elders. For heritage speakers reconnecting with the language, family words are often the most emotionally rewarding place to start.</p>

<h2>Immediate Family</h2>

<table>
<thead>
<tr><th>Relationship</th><th>Gurmukhi</th><th>Word</th><th>Pronunciation</th></tr>
</thead>
<tbody>
<tr><td>Mother</td><td>ਮਾਂ</td><td>Maa</td><td>maa</td></tr>
<tr><td>Mother (affectionate)</td><td>ਮੰਮੀ</td><td>Mummy</td><td>mum-mee</td></tr>
<tr><td>Father</td><td>ਪਿਤਾ</td><td>Pita</td><td>pi-taa</td></tr>
<tr><td>Father (affectionate)</td><td>ਪਾਪਾ / ਡੈਡੀ</td><td>Papa / Daddy</td><td>paa-paa / dad-dee</td></tr>
<tr><td>Parents</td><td>ਮਾਪੇ</td><td>Maape</td><td>maa-pay</td></tr>
<tr><td>Older brother</td><td>ਭਰਾ / ਭਾ ਜੀ</td><td>Bhra / Bha ji</td><td>buh-ra / baa-jee</td></tr>
<tr><td>Younger brother</td><td>ਛੋਟਾ ਭਰਾ</td><td>Chhota Bhra</td><td>chho-ta buh-ra</td></tr>
<tr><td>Older sister</td><td>ਭੈਣ / ਭੈਣ ਜੀ</td><td>Bhain / Bhain ji</td><td>bhain</td></tr>
<tr><td>Younger sister</td><td>ਛੋਟੀ ਭੈਣ</td><td>Chhoti Bhain</td><td>chho-tee bhain</td></tr>
<tr><td>Husband</td><td>ਪਤੀ</td><td>Pati</td><td>puh-tee</td></tr>
<tr><td>Wife</td><td>ਪਤਨੀ</td><td>Patni</td><td>put-nee</td></tr>
<tr><td>Son</td><td>ਪੁੱਤਰ / ਮੁੰਡਾ</td><td>Puttar / Munda</td><td>put-tar / moon-da</td></tr>
<tr><td>Daughter</td><td>ਧੀ / ਕੁੜੀ</td><td>Dhee / Kuri</td><td>dhee / koo-ree</td></tr>
</tbody>
</table>
<p><strong>Note on age:</strong> Punjabi distinguishes older from younger siblings. The older brother (Bha ji) and older sister (Bhain ji) are addressed with "ji" as a sign of respect. Younger siblings are addressed by name.</p>

<h2>Grandparents — Maternal vs Paternal Matters</h2>
<p>Unlike English's generic "grandmother" and "grandfather," Punjabi uses completely different words depending on which side of the family the grandparent is from.</p>

<table>
<thead>
<tr><th>Relationship</th><th>Gurmukhi</th><th>Word</th></tr>
</thead>
<tbody>
<tr><td>Paternal grandfather (father's father)</td><td>ਦਾਦਾ</td><td>Dada</td></tr>
<tr><td>Paternal grandmother (father's mother)</td><td>ਦਾਦੀ</td><td>Dadi</td></tr>
<tr><td>Maternal grandfather (mother's father)</td><td>ਨਾਨਾ</td><td>Nana</td></tr>
<tr><td>Maternal grandmother (mother's mother)</td><td>ਨਾਨੀ</td><td>Nani</td></tr>
</tbody>
</table>
<p>The respectful form adds "ji" — so "Dadi ji" or "Nani ji" — when addressing them directly.</p>

<h2>Aunts and Uncles</h2>
<p>This is where Punjabi gets very specific. There are <strong>eight different words</strong> for aunts and uncles depending on (a) which side of the family they come from and (b) whether they're related by blood or marriage.</p>

<h3>Father's Side</h3>
<table>
<thead>
<tr><th>Relationship</th><th>Gurmukhi</th><th>Word</th></tr>
</thead>
<tbody>
<tr><td>Father's older brother</td><td>ਤਾਇਆ</td><td>Taya</td></tr>
<tr><td>Father's older brother's wife</td><td>ਤਾਈ</td><td>Tai</td></tr>
<tr><td>Father's younger brother</td><td>ਚਾਚਾ</td><td>Chacha</td></tr>
<tr><td>Father's younger brother's wife</td><td>ਚਾਚੀ</td><td>Chachi</td></tr>
<tr><td>Father's sister</td><td>ਭੂਆ</td><td>Bhua</td></tr>
<tr><td>Father's sister's husband</td><td>ਫੁੱਫੜ</td><td>Phuphar</td></tr>
</tbody>
</table>

<h3>Mother's Side</h3>
<table>
<thead>
<tr><th>Relationship</th><th>Gurmukhi</th><th>Word</th></tr>
</thead>
<tbody>
<tr><td>Mother's brother</td><td>ਮਾਮਾ</td><td>Mama</td></tr>
<tr><td>Mother's brother's wife</td><td>ਮਾਮੀ</td><td>Mami</td></tr>
<tr><td>Mother's sister</td><td>ਮਾਸੀ</td><td>Masi</td></tr>
<tr><td>Mother's sister's husband</td><td>ਮਾਸੜ</td><td>Masar</td></tr>
</tbody>
</table>

<p><strong>Why so many words?</strong> Punjabi (and broader South Asian) family culture has historically maintained close ties with both sides of the family, and the specific relationship affects social etiquette — who you can joke with, who you defer to, who has authority in certain situations. The vocabulary reflects that complexity.</p>

<h2>In-Laws</h2>
<p>Marriage brings a whole new set of relationship terms.</p>

<table>
<thead>
<tr><th>Relationship</th><th>Gurmukhi</th><th>Word</th></tr>
</thead>
<tbody>
<tr><td>Father-in-law</td><td>ਸਹੁਰਾ</td><td>Sauhura</td></tr>
<tr><td>Mother-in-law</td><td>ਸੱਸ</td><td>Sass</td></tr>
<tr><td>Husband's older brother</td><td>ਜੇਠ</td><td>Jeth</td></tr>
<tr><td>Husband's younger brother</td><td>ਦਿਉਰ</td><td>Diyor</td></tr>
<tr><td>Husband's sister</td><td>ਨਣਦ</td><td>Nanad</td></tr>
<tr><td>Wife's brother</td><td>ਸਾਲਾ</td><td>Sala</td></tr>
<tr><td>Wife's sister</td><td>ਸਾਲੀ</td><td>Sali</td></tr>
<tr><td>Son-in-law</td><td>ਜਵਾਈ</td><td>Jawai</td></tr>
<tr><td>Daughter-in-law</td><td>ਨੂੰਹ</td><td>Nooh</td></tr>
</tbody>
</table>

<h2>Children and Grandchildren</h2>

<table>
<thead>
<tr><th>Relationship</th><th>Gurmukhi</th><th>Word</th></tr>
</thead>
<tbody>
<tr><td>Children (general)</td><td>ਬੱਚੇ</td><td>Bachche</td></tr>
<tr><td>Grandson (son's son)</td><td>ਪੋਤਾ</td><td>Pota</td></tr>
<tr><td>Granddaughter (son's daughter)</td><td>ਪੋਤੀ</td><td>Poti</td></tr>
<tr><td>Grandson (daughter's son)</td><td>ਦੋਹਤਾ</td><td>Dohta</td></tr>
<tr><td>Granddaughter (daughter's daughter)</td><td>ਦੋਹਤੀ</td><td>Dohti</td></tr>
</tbody>
</table>

<h2>How to Address Elders Respectfully</h2>
<p>A few simple rules go a long way:</p>
<ul>
<li><strong>Add "ji"</strong> after the relationship word to show respect: "Mummy ji," "Papa ji," "Dadi ji," "Mama ji"</li>
<li><strong>Use "tusi" (formal you)</strong> instead of "tu" (informal) when speaking to anyone older</li>
<li><strong>Never use first names</strong> for elders. Always use the relationship term.</li>
</ul>

<h2>Common Phrases Using Family Words</h2>
<ul>
<li><strong>ਮਾਂ ਕਿੱਥੇ ਹੈ?</strong> (Maa kithe hai?) — "Where is mom?"</li>
<li><strong>ਮੇਰੇ ਦੋ ਭਰਾ ਹਨ</strong> (Mere do bhra han) — "I have two brothers"</li>
<li><strong>ਨਾਨੀ ਜੀ ਨੂੰ ਮਿਲਣ ਚੱਲੀਏ</strong> (Nani ji nu milan challiye) — "Let's go visit grandma"</li>
<li><strong>ਮੇਰੇ ਚਾਚਾ ਜੀ ਡਾਕਟਰ ਹਨ</strong> (Mere chacha ji doctor han) — "My uncle is a doctor"</li>
</ul>

<h2>For Heritage Speakers: Reconnecting Through Family Words</h2>
<p>If you grew up hearing Punjabi at home but never fully learned to speak it, family vocabulary is the perfect entry point. You probably already recognise "mummy," "papa," "nani," and "dadi" — you just don't know the structure behind them. Once you can name every relative properly and use them in simple sentences, you've crossed the biggest hurdle: feeling confident enough to speak with your grandparents.</p>

<h2>Practice Punjabi Family Vocabulary with Alfaazo</h2>
<p>Memorising tables only gets you so far. <a href="https://www.alfaazo.com">Alfaazo</a> drills family vocabulary with native audio, family-tree exercises, and real conversation scenarios — so the words stick where it matters: in real conversation with your loved ones.</p>
<p>Free on <a href="https://apps.apple.com/us/app/alfaazo-learn-punjabi/id6759987308">iOS</a> and <a href="https://play.google.com/store/apps/details?id=com.alfaazo.app">Android</a>. Start with the Family lesson — it takes 5 minutes.</p>
    `.trim(),
  },
];

async function uploadAll() {
  console.log(`\nUploading ${posts.length} blog posts to Firestore...\n`);
  for (const post of posts) {
    const { slug, ...data } = post;
    console.log(`  → "${post.title}"`);
    await setDoc(doc(db, "blogs", slug), data);
    console.log(`    ✓ Published: /blog/${slug}\n`);
  }
  console.log("All posts uploaded successfully.");
  console.log("They will appear on the website within 5 minutes (ISR revalidation).");
  process.exit(0);
}

uploadAll().catch((err) => {
  console.error("Failed:", err.message);
  console.log(
    "\nIf permission denied, enable writes in Firestore rules temporarily."
  );
  process.exit(1);
});
