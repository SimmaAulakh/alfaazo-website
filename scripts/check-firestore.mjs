/**
 * Check all blog posts in Firestore.
 * Usage: node --env-file=.env.local scripts/check-firestore.mjs
 */
import { initializeApp } from "firebase/app";
import { getFirestore, collection, getDocs, query, where, orderBy } from "firebase/firestore";

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

async function check() {
  // First: get ALL docs (no filter)
  const allSnap = await getDocs(collection(db, "blogs"));
  console.log(`Total documents in 'blogs' collection: ${allSnap.size}\n`);

  allSnap.forEach(doc => {
    const d = doc.data();
    console.log(`  ${doc.id} | published=${d.published} | date=${d.date} | title="${d.title?.substring(0, 50)}..."`);
  });

  // Second: test the filtered query
  console.log("\n--- Filtered query (published=true, ordered by date desc) ---");
  const q = query(
    collection(db, "blogs"),
    where("published", "==", true),
    orderBy("date", "desc")
  );
  const filteredSnap = await getDocs(q);
  console.log(`Filtered results: ${filteredSnap.size}\n`);
  filteredSnap.forEach(doc => {
    const d = doc.data();
    console.log(`  ${doc.id} | date=${d.date}`);
  });

  process.exit(0);
}

check().catch(err => {
  console.error("Error:", err.message);
  process.exit(1);
});
