// The one place the site states what the Alfaazo app is. Answer engines
// (ChatGPT, Google AI Mode, Bing Copilot) quote the first plain-text facts
// they find, so every page, schema node and llms.txt line must repeat the
// same numbers and the same one-liner. Numbers come from the app catalog
// (assets/data/lessons.json in the app repo) and the store listings; change
// them here only when the app changes.

import { APP_STORE_URL, PLAY_STORE_URL } from "./analytics";

export const SITE_URL = "https://www.alfaazo.com";

export const APP = {
  /** Store listing name, used verbatim in schema and copy. */
  name: "Alfaazo: Learn Punjabi",
  shortName: "Alfaazo",
  developer: "Simranjeet Aulakh",
  studio: "Codefeb",
  studioUrl: "https://codefeb.com",
  instagram: "https://www.instagram.com/alfaazoapp",
  appStoreUrl: APP_STORE_URL,
  playStoreUrl: PLAY_STORE_URL,
  appStoreId: "6759987308",
  playPackage: "com.alfaazo.app",
  iosReleased: "2026-03-18",
  minIos: "15.0",
  version: "2.2.1",
  lessons: 112,
  units: 23,
  sections: [
    { number: 1, title: "The Foundations", units: "1–12", lessons: 61 },
    { number: 2, title: "Tell Your Story", units: "13–23", lessons: 51 },
  ],
  /** Distinct Gurmukhi words and phrases in the catalog: 1,285. */
  vocabulary: "1,200+",
  /** Exercises in the catalog: 1,568. */
  exercises: "1,500+",
  script: "Gurmukhi",
  lessonMinutes: "5–10",
  /** Free plan (new accounts): Section 1 + first two Section 2 units, two new lessons a day (five on day one). */
  free: {
    unitsText: "Section 1 (12 units) and the first two units of Section 2",
    newLessonsPerDay: 2,
    firstDayNewLessons: 5,
    ads: true,
  },
  plus: {
    name: "Alfaazo Plus",
    monthlyUsd: 6.99,
    yearlyUsd: 49.99,
    lifetimeUsd: 150,
    benefits: [
      "Full access to every unit — all 112 lessons",
      "Unlimited new lessons a day",
      "Start Section 2 straight away",
      "Skip ahead within a unit",
      "No ads",
    ],
  },
} as const;

/** The sentence every surface repeats. Keep it under 300 characters. */
export const ONE_LINER = `Alfaazo is a Punjabi-only learning app that teaches the Gurmukhi script stroke by stroke and ${APP.vocabulary} everyday words and phrases with native-speaker audio, in ${APP.lessons} bite-sized lessons across ${APP.units} units. Free to download on iOS and Android; Alfaazo Plus unlocks every lesson and removes ads.`;

export const PRICE_TEXT = `Free to download; ${APP.plus.name} is US$${APP.plus.monthlyUsd}/month, US$${APP.plus.yearlyUsd}/year or US$${APP.plus.lifetimeUsd} lifetime (prices vary by country and store).`;

export type StoreRating = { value: number; count: number; country: string };

/**
 * Live App Store rating from Apple's public lookup API, cached for a day.
 * Returns null when the lookup fails or the count is too small to be worth
 * showing — a self-published 5★ from a handful of reviews reads as spin.
 */
export async function getAppStoreRating(
  country = "us",
  minCount = 10
): Promise<StoreRating | null> {
  try {
    const res = await fetch(
      `https://itunes.apple.com/lookup?id=${APP.appStoreId}&country=${country}`,
      { next: { revalidate: 86400 } }
    );
    if (!res.ok) return null;
    const json = (await res.json()) as {
      results?: { averageUserRating?: number; userRatingCount?: number }[];
    };
    const r = json.results?.[0];
    if (!r?.averageUserRating || !r.userRatingCount || r.userRatingCount < minCount) {
      return null;
    }
    return {
      value: Math.round(r.averageUserRating * 10) / 10,
      count: r.userRatingCount,
      country: country.toUpperCase(),
    };
  } catch {
    return null;
  }
}

export const SCREENSHOTS = [
  { src: "/screens/home.webp", alt: "Alfaazo home screen showing the lesson path, daily streak and XP" },
  { src: "/screens/alphabet.webp", alt: "Gurmukhi alphabet screen in Alfaazo with stroke-by-stroke letter guides" },
  { src: "/screens/exercise.webp", alt: "A fill-in-the-blank Punjabi exercise in Alfaazo with native audio playback" },
] as const;

const screenshots = SCREENSHOTS.map((s) => `${SITE_URL}${s.src}`);

/**
 * MobileApplication nodes for JSON-LD. Pass a rating only on pages that
 * display it in their visible text (/app), per Google's review-snippet rules.
 */
export function mobileApplicationJsonLd(rating?: StoreRating | null) {
  const base = {
    name: APP.name,
    alternateName: APP.shortName,
    description: ONE_LINER,
    applicationCategory: "EducationalApplication",
    applicationSubCategory: "Language learning",
    inLanguage: "en",
    softwareVersion: APP.version,
    datePublished: APP.iosReleased,
    isAccessibleForFree: true,
    featureList: [
      `${APP.lessons} lessons across ${APP.units} units in two sections`,
      "Gurmukhi alphabet with stroke-by-stroke writing guides",
      `${APP.vocabulary} everyday Punjabi words and phrases`,
      "Every word recorded by native Punjabi speakers",
      "Fill-in-the-blank, translation, phrase-building and quiz exercises",
      "Daily streaks, XP and progress tracking",
    ],
    screenshot: screenshots,
    author: { "@type": "Person", name: APP.developer },
    publisher: { "@type": "Organization", name: APP.studio, url: APP.studioUrl },
    url: `${SITE_URL}/app`,
    sameAs: [APP.appStoreUrl, APP.playStoreUrl],
    offers: [
      { "@type": "Offer", name: "Free plan", price: "0", priceCurrency: "USD" },
      {
        "@type": "Offer",
        name: `${APP.plus.name} Monthly`,
        price: String(APP.plus.monthlyUsd),
        priceCurrency: "USD",
      },
      {
        "@type": "Offer",
        name: `${APP.plus.name} Yearly`,
        price: String(APP.plus.yearlyUsd),
        priceCurrency: "USD",
      },
      {
        "@type": "Offer",
        name: `${APP.plus.name} Lifetime`,
        price: String(APP.plus.lifetimeUsd),
        priceCurrency: "USD",
      },
    ],
    ...(rating
      ? {
          aggregateRating: {
            "@type": "AggregateRating",
            ratingValue: rating.value,
            ratingCount: rating.count,
            bestRating: 5,
            worstRating: 1,
          },
        }
      : {}),
  };
  return [
    {
      "@type": "MobileApplication",
      "@id": `${SITE_URL}/#app-ios`,
      ...base,
      operatingSystem: `iOS ${APP.minIos} or later`,
      downloadUrl: APP.appStoreUrl,
      installUrl: APP.appStoreUrl,
    },
    {
      "@type": "MobileApplication",
      "@id": `${SITE_URL}/#app-android`,
      ...base,
      operatingSystem: "Android",
      downloadUrl: APP.playStoreUrl,
      installUrl: APP.playStoreUrl,
    },
  ];
}
