/**
 * Types + reader for the `admin_aggregates` collection in punjabilingo-d02cc.
 * Document shape mirrors computeAggregates() in the backend Cloud Function
 * (punjabi_lingo/functions/index.js). One doc per day, id = "YYYY-MM-DD".
 */
"use client";

import { collection, getDocs, query, orderBy, limit } from "firebase/firestore";
import { plDb } from "./pl-firebase";

export interface StreakDistribution {
  "0": number;
  "1-6": number;
  "7-29": number;
  "30+": number;
}

export type LevelDistribution = Record<string, number>; // "1".."8"

// Exact streak day-count -> user count, sparse. Keys are "0","1","2",… plus an
// optional "90+" overflow bucket for very long streaks.
export type StreakHistogram = Record<string, number>;

export interface LanguageBackground {
  beginner: number;
  basic: number;
  intermediate: number;
  advanced: number;
}

export type LessonCompletion = Record<string, number>; // lessonId -> pct

// Users per onboarding age range (profile.ageRange) -> count. Keys are the
// app's choices ("Under 18", "18-25", … "Over 65", "Prefer not to say") plus
// "Not set" for users who skipped the step.
export type AgeDistribution = Record<string, number>;

/** Display order for the age chart — mirrors the app's onboarding choices. */
export const AGE_RANGE_ORDER = [
  "Under 18",
  "18-25",
  "26-35",
  "36-45",
  "46-55",
  "56-65",
  "Over 65",
  "Prefer not to say",
  "Not set",
];

export interface DailyAggregate {
  date: string;
  totalUsers: number;
  newUsers: number;
  dau: number;
  onboardingCompleteCount: number;
  onboardingCompletePct: number;
  paidUsers?: number;
  avgStreak: number;
  streakDistribution: StreakDistribution;
  streakHistogram?: StreakHistogram;
  levelDistribution: LevelDistribution;
  lessonCompletion: LessonCompletion;
  totalXpEarnedYesterday: number;
  languageBackground: LanguageBackground;
  /** Added Oct 2026 — absent on rows computed before the backend deploy. */
  ageDistribution?: AgeDistribution;
}

const COLLECTION = "admin_aggregates";

/**
 * Reads the latest `days` aggregate docs (one per UTC day) and returns them
 * oldest-first so charts plot left-to-right.
 */
export async function fetchAggregates(days: number): Promise<DailyAggregate[]> {
  const q = query(
    collection(plDb(), COLLECTION),
    orderBy("date", "desc"),
    limit(days),
  );
  const snap = await getDocs(q);
  return snap.docs.map((d) => d.data() as DailyAggregate).reverse();
}
