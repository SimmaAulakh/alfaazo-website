/**
 * KPI builders shared by the admin pages. "Flow" metrics (sign-ups, XP, DAU)
 * compare the selected period with the equal period before it. "Snapshot"
 * metrics (totals, paid users, rates) compare the latest day with the last
 * day before the period started.
 */
import type { DailyAggregate } from "@/lib/aggregates";
import type { Delta } from "@/components/admin/ui/StatTile";
import { avg, lastOf, pctChange, sum, type Windows } from "./metrics";

type Pick = (r: DailyAggregate) => number;

export function flow(w: Windows, range: number, pick: Pick, mode: "sum" | "avg" = "sum") {
  const f = mode === "sum" ? sum : avg;
  const value = f(w.current, pick);
  const prev = f(w.previous, pick);
  const delta: Delta = {
    value: w.hasPrevious ? pctChange(value, prev) : null,
    unit: "%",
    label: `vs prior ${range}d`,
  };
  return { value, delta, trend: w.current.map(pick) };
}

export function snapshot(
  w: Windows,
  range: number,
  latest: DailyAggregate,
  pick: Pick,
  unit: "%" | "pts" = "%",
) {
  const value = pick(latest);
  const before = lastOf(w.previous);
  const base = before ? pick(before) : null;
  const delta: Delta = {
    value:
      base == null ? null : unit === "pts" ? value - base : pctChange(value, base),
    unit,
    label: `vs ${range}d ago`,
  };
  return { value, delta, trend: w.current.map(pick) };
}

export const paidRate = (r: DailyAggregate) =>
  r.totalUsers > 0 ? ((r.paidUsers ?? 0) / r.totalUsers) * 100 : 0;

export const activeRate = (r: DailyAggregate) =>
  r.totalUsers > 0 ? (r.dau / r.totalUsers) * 100 : 0;
