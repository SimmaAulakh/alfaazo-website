/**
 * Fix blog slugs with colons — copy to clean slug, delete old.
 * Usage: node --env-file=.env.local scripts/fix-slugs.mjs
 */
import { initializeApp } from "firebase/app";
import { getFirestore, doc, getDoc, setDoc, deleteDoc } from "firebase/firestore";

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

const fixes = [
  {
    old: "journey-through-basic-punjabi:-ten-essential-phrases-for-new-learners",
    new: "journey-through-basic-punjabi-ten-essential-phrases-for-new-learners",
  },
  {
    old: "grasping-the-basics:-top-10-useful-phrases-in-punjabi-for-beginners",
    new: "grasping-the-basics-top-10-useful-phrases-in-punjabi-for-beginners",
  },
  {
    old: "dive-into-daily-punjabi:-top-10-essential-phrases-for-beginners",
    new: "dive-into-daily-punjabi-top-10-essential-phrases-for-beginners",
  },
];

async function fixSlugs() {
  for (const { old: oldSlug, new: newSlug } of fixes) {
    const oldRef = doc(db, "blogs", oldSlug);
    const snap = await getDoc(oldRef);
    if (!snap.exists()) {
      console.log(`  ⚠ Not found: ${oldSlug}`);
      continue;
    }
    await setDoc(doc(db, "blogs", newSlug), snap.data());
    await deleteDoc(oldRef);
    console.log(`  ✓ ${oldSlug.substring(0, 40)}... → ${newSlug.substring(0, 40)}...`);
  }
  console.log("\nDone!");
  process.exit(0);
}

fixSlugs().catch(err => {
  console.error("Failed:", err.message);
  process.exit(1);
});
