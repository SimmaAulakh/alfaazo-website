import { db } from "./firebase";
import {
  collection,
  getDocs,
  doc,
  getDoc,
  query,
  where,
  orderBy,
  limit,
} from "firebase/firestore";

export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  date: string;
  tag: string;
  readTime: string;
  author: string;
  published: boolean;
}

const COLLECTION = "blogs";

export async function getAllPosts(): Promise<BlogPost[]> {
  const q = query(
    collection(db, COLLECTION),
    where("published", "==", true),
    orderBy("date", "desc")
  );
  const snapshot = await getDocs(q);
  return snapshot.docs.map((d) => ({ slug: d.id, ...d.data() }) as BlogPost);
}

export async function getPostBySlug(
  slug: string
): Promise<BlogPost | null> {
  const ref = doc(db, COLLECTION, slug);
  const snap = await getDoc(ref);
  if (!snap.exists()) return null;
  const data = snap.data();
  if (!data.published) return null;
  return { slug: snap.id, ...data } as BlogPost;
}

export async function getRecentPosts(count: number): Promise<BlogPost[]> {
  const q = query(
    collection(db, COLLECTION),
    where("published", "==", true),
    orderBy("date", "desc"),
    limit(count)
  );
  const snapshot = await getDocs(q);
  return snapshot.docs.map((d) => ({ slug: d.id, ...d.data() }) as BlogPost);
}

export async function getAllSlugs(): Promise<string[]> {
  const posts = await getAllPosts();
  return posts.map((p) => p.slug);
}
