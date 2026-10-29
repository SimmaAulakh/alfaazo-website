/**
 * Pure helpers for slicing the daily admin_aggregates rows into the selected
 * date range and the equal-length period before it, and for computing deltas.
 */
import type { DailyAggregate } from "@/lib/aggregates";

export const RANGE_OPTIONS = [7, 14, 30, 90] as const;
export type RangeDays = (typeof RANGE_OPTIONS)[number];

/** Rows to fetch: two full windows of the widest range, so 90-day deltas work. */
export const FETCH_DAYS = 180;

/** "YYYY-MM-DD" shifted by n days (UTC). */
export function addDays(iso: string, n: number): string {
  const d = new Date(`${iso}T00:00:00Z`);
  d.setUTCDate(d.getUTCDate() + n);
  return d.toISOString().slice(0, 10);
}

export interface Windows {
  /** Rows inside the selected range, oldest first. */
  current: DailyAggregate[];
  /** Rows in the equal-length period just before it, oldest first. */
  previous: DailyAggregate[];
  /** True when the previous period is fully covered by data. */
  hasPrevious: boolean;
  start: string;
  end: string;
}

export function sliceWindows(rows: DailyAggregate[], days: number): Windows {
  if (rows.length === 0) {
    return { current: [], previous: [], hasPrevious: false, start: "", end: "" };
  }
  const end = rows[rows.length - 1].date;
  const start = addDays(end, -(days - 1));
  const prevStart = addDays(start, -days);
  const current = rows.filter((r) => r.date >= start && r.date <= end);
  const previous = rows.filter((r) => r.date >= prevStart && r.date < start);
  // Require most of the previous period so a half-empty window can't fake a delta.
  const hasPrevious = previous.length >= Math.ceil(days * 0.8);
  return { current, previous, hasPrevious, start, end };
}

export function sum(rows: DailyAggregate[], f: (r: DailyAggregate) => number): number {
  return rows.reduce((n, r) => n + (f(r) || 0), 0);
}

export function avg(rows: DailyAggregate[], f: (r: DailyAggregate) => number): number {
  return rows.length ? sum(rows, f) / rows.length : 0;
}

/** Relative change in %, or null when there is no meaningful base. */
export function pctChange(current: number, previous: number): number | null {
  if (!Number.isFinite(previous) || previous === 0) return null;
  return ((current - previous) / previous) * 100;
}

/** Last row of a list, or null. */
export function lastOf<T>(rows: T[]): T | null {
  return rows.length ? rows[rows.length - 1] : null;
}

/** "2026-10-28" → "Oct 28". */
export function fmtDay(iso: string): string {
  if (!iso) return "";
  return new Date(`${iso}T00:00:00Z`).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    timeZone: "UTC",
  });
}

/** Whole numbers with separators: 12840 → "12,840". */
export function fmtInt(n: number): string {
  return Math.round(n).toLocaleString("en-US");
}

/** Compact for tiles and axes: 1284 → "1.3K", 1_500_000 → "1.5M". */
export function fmtCompact(n: number): string {
  const abs = Math.abs(n);
  if (abs >= 1_000_000) return `${(n / 1_000_000).toFixed(1).replace(/\.0$/, "")}M`;
  if (abs >= 10_000) return `${Math.round(n / 1_000)}K`;
  if (abs >= 1_000) return `${(n / 1_000).toFixed(1).replace(/\.0$/, "")}K`;
  return fmtInt(n);
}

export function fmtPct(n: number, digits = 1): string {
  return `${n.toFixed(digits).replace(/\.0$/, "")}%`;
}

/** Display names for lesson ids: "lesson_s2_went_came" → "Went came (S2)". */
export function prettyLesson(id: string): string {
  let s = id.replace(/^lesson_/, "");
  let suffix = "";
  const m = s.match(/^s(\d+)_(.*)$/);
  if (m) {
    suffix = ` (S${m[1]})`;
    s = m[2];
  }
  if (/^\d+$/.test(s)) return `Lesson ${s}${suffix}`;
  const words = s.replace(/_/g, " ");
  return words.charAt(0).toUpperCase() + words.slice(1) + suffix;
}
