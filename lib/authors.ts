export interface Author {
  slug: string;
  name: string;
  role: string;
  /** A few sentences of bio. Shown on the author page and used as Person.description. */
  bio: string;
  /** Profile URLs (LinkedIn, X, Instagram, etc.) — the strongest E-E-A-T signal. */
  sameAs?: string[];
  /** Absolute or site-relative image URL for the author's headshot. */
  image?: string;
}

// Known blog authors. The blog byline + Article author link here by matching
// post.author to Author.name, so keep `name` exactly equal to the Firestore
// `author` field. (Currently every post is authored by Simranjeet Aulakh.)
export const AUTHORS: Author[] = [
  {
    slug: "simranjeet-aulakh",
    name: "Simranjeet Aulakh",
    role: "Founder, Alfaazo",
    bio: "Simranjeet Aulakh is the founder of Alfaazo, a free app for learning Punjabi. After seeing how easily the language slips away from second- and third-generation Punjabis growing up abroad, Simranjeet built Alfaazo to make the Gurmukhi script and everyday Punjabi approachable for a new generation. On the Alfaazo journal, Simranjeet writes about Punjabi script, vocabulary, phrases, and the culture woven through the language.",
    sameAs: [],
  },
];

export function getAuthorByName(name: string): Author | undefined {
  return AUTHORS.find((a) => a.name === name);
}

export function getAuthorBySlug(slug: string): Author | undefined {
  return AUTHORS.find((a) => a.slug === slug);
}
