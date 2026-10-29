/**
 * Types + reader for the `admin_aggregates` collection in punjabilingo-d02cc.
 * Document shape mirrors computeAggregates() in the backend Cloud Function
 * (punjabi_lingo/functions/index.js). One doc per day, id = "YYYY-MM-DD".
 */
"use client";

import { useEffect, useState } from "react";
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

interface AggregatesState {
  data: DailyAggregate[]; // oldest → newest (chart-friendly)
  loading: boolean;
  error: string | null;
}

const COLLECTION = "admin_aggregates";

/**
 * Reads the latest `days` aggregate docs once and returns them oldest-first so
 * charts can plot left-to-right. Single read per mount (no live subscription —
 * the data only changes once a day).
 */
export function useAggregates(days = 30): AggregatesState {
  const [state, setState] = useState<AggregatesState>({
    data: [],
    loading: true,
    error: null,
  });

  useEffect(() => {
    let cancelled = false;

    (async () => {
      try {
        const q = query(
          collection(plDb(), COLLECTION),
          orderBy("date", "desc"),
          limit(days),
        );
        const snap = await getDocs(q);
        const rows = snap.docs.map((d) => d.data() as DailyAggregate);
        rows.reverse(); // desc -> asc (oldest first)
        if (!cancelled) setState({ data: rows, loading: false, error: null });
      } catch (err) {
        if (!cancelled) {
          setState({
            data: [],
            loading: false,
            error: err instanceof Error ? err.message : "Failed to load data",
          });
        }
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [days]);

  return state;
}

/** The most recent aggregate row, or null if none. */
export function latest(data: DailyAggregate[]): DailyAggregate | null {
  return data.length > 0 ? data[data.length - 1] : null;
}

/** Format a number compactly: 1234 -> "1.2k", 1500000 -> "1.5M". */
export function compact(n: number): string {
  if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(1)}M`;
  if (n >= 1_000) return `${(n / 1_000).toFixed(1)}k`;
  return String(n);
}
