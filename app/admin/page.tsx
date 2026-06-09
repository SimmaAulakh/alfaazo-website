"use client";

import { useState } from "react";
import { useAggregates, latest, compact } from "@/lib/aggregates";
import { getUsersByStreak, type StreakUser } from "@/lib/admin-users";
import Scorecard from "@/components/admin/Scorecard";
import TrendLineChart from "@/components/admin/TrendLineChart";
import DistributionBar from "@/components/admin/DistributionBar";
import LessonCompletionList from "@/components/admin/LessonCompletionList";
import UserListModal from "@/components/admin/UserListModal";

interface StreakDrill {
  label: string;
  loading: boolean;
  error: string | null;
  users: StreakUser[];
  truncated: boolean;
}

export default function AdminDashboardPage() {
  const { data, loading, error } = useAggregates(30);
  const newest = latest(data);
  const [drill, setDrill] = useState<StreakDrill | null>(null);

  async function openStreakUsers(label: string, value: number) {
    if (value <= 0) return; // empty bucket — nothing to show
    const streak = label.endsWith("+") ? 90 : Number(label);
    setDrill({ label, loading: true, error: null, users: [], truncated: false });
    try {
      const res = await getUsersByStreak(streak);
      setDrill({
        label,
        loading: false,
        error: null,
        users: res.users,
        truncated: res.truncated,
      });
    } catch (e) {
      setDrill({
        label,
        loading: false,
        error: e instanceof Error ? e.message : "Failed to load users",
        users: [],
        truncated: false,
      });
    }
  }

  if (loading) {
    return <p className="text-sm text-text-secondary">Loading metrics…</p>;
  }
  if (error) {
    return (
      <div className="rounded-2xl bg-surface border border-streak-orange/30 p-6">
        <p className="text-sm font-semibold text-streak-orange mb-1">
          Couldn’t load analytics
        </p>
        <p className="text-xs text-text-secondary break-words">{error}</p>
        <p className="text-xs text-text-secondary mt-3">
          Check that the punjabilingo-d02cc web config and admin uid env vars are
          set, and that the admin_aggregates Firestore rule allows your uid.
        </p>
      </div>
    );
  }
  if (!newest) {
    return (
      <p className="text-sm text-text-secondary">
        No aggregates yet. Run the backfill function or wait for tonight’s
        scheduled run.
      </p>
    );
  }

  const trend = data.map((d) => ({
    date: d.date,
    DAU: d.dau,
    Signups: d.newUsers,
    "Onboarding %": d.onboardingCompletePct,
  }));

  // Per-value streak histogram (0, 1, 2, …). Auto-sizes to the max streak
  // present, fills gaps with 0, and appends the "90+" overflow bucket if any.
  const sh = newest.streakHistogram ?? {};
  const overflowKey = Object.keys(sh).find((k) => k.endsWith("+"));
  const numericKeys = Object.keys(sh)
    .filter((k) => !k.endsWith("+"))
    .map(Number)
    .filter((n) => Number.isFinite(n));
  const maxStreak = numericKeys.length ? Math.max(...numericKeys) : 0;
  const streakData: Array<{ label: string; value: number }> = Array.from(
    { length: maxStreak + 1 },
    (_, i) => ({ label: String(i), value: sh[String(i)] ?? 0 }),
  );
  if (overflowKey && (sh[overflowKey] ?? 0) > 0) {
    streakData.push({ label: overflowKey, value: sh[overflowKey] });
  }

  const levelData = Array.from({ length: 8 }, (_, i) => {
    const lvl = String(i + 1);
    return { label: `L${lvl}`, value: newest.levelDistribution[lvl] ?? 0 };
  });

  const sparkDau = data.map((d) => d.dau);
  const sparkSignups = data.map((d) => d.newUsers);
  const sparkXp = data.map((d) => d.totalXpEarnedYesterday);

  return (
    <div className="flex flex-col gap-8">
      <div>
        <h1 className="font-heading text-2xl font-bold text-primary-dark">
          Dashboard
        </h1>
        <p className="text-xs text-text-secondary mt-1">
          Latest data: {newest.date} · UTC reporting day · {data.length}-day
          window
        </p>
      </div>

      {/* Scorecards */}
      <section className="grid grid-cols-2 lg:grid-cols-5 gap-4">
        <Scorecard label="Total users" value={compact(newest.totalUsers)} />
        <Scorecard
          label="New signups"
          value={newest.newUsers}
          sparkline={sparkSignups}
          accent="var(--color-secondary)"
          hint="yesterday"
        />
        <Scorecard
          label="DAU"
          value={newest.dau}
          sparkline={sparkDau}
          accent="var(--color-primary)"
          hint="yesterday"
        />
        <Scorecard
          label="Onboarding"
          value={`${newest.onboardingCompletePct}%`}
          hint={`${newest.onboardingCompleteCount} complete`}
        />
        <Scorecard
          label="XP earned"
          value={compact(newest.totalXpEarnedYesterday)}
          sparkline={sparkXp}
          accent="var(--color-xp-gold)"
          hint="yesterday"
        />
      </section>

      {/* Trends */}
      <section className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <TrendLineChart
          title="DAU & new signups (30 days)"
          data={trend}
          series={[
            { key: "DAU", label: "DAU", color: "var(--color-primary)" },
            { key: "Signups", label: "New signups", color: "var(--color-secondary)" },
          ]}
        />
        <TrendLineChart
          title="Onboarding completion % (30 days)"
          data={trend}
          series={[
            {
              key: "Onboarding %",
              label: "Onboarding %",
              color: "var(--color-soft-gold)",
            },
          ]}
        />
      </section>

      {/* Streak histogram — full width; click a bar to see those users */}
      <section>
        <DistributionBar
          title={`Streak distribution (per day) · ${newest.avgStreak} avg · click a bar for users`}
          data={streakData}
          color="var(--color-streak-orange)"
          onBarClick={openStreakUsers}
        />
      </section>

      {/* Level distribution */}
      <section>
        <DistributionBar
          title="Level distribution"
          data={levelData}
          color="var(--color-primary)"
        />
      </section>

      <section>
        <LessonCompletionList
          title="Top 10 lessons by completion rate"
          completion={newest.lessonCompletion}
        />
      </section>

      {/* Avg streak + language background as a small strip */}
      <section className="grid grid-cols-2 lg:grid-cols-5 gap-4">
        <Scorecard label="Avg streak" value={newest.avgStreak} hint="days" />
        <Scorecard label="Beginner" value={newest.languageBackground.beginner} />
        <Scorecard label="Basic" value={newest.languageBackground.basic} />
        <Scorecard
          label="Intermediate"
          value={newest.languageBackground.intermediate}
        />
        <Scorecard label="Advanced" value={newest.languageBackground.advanced} />
      </section>

      <p className="text-xs text-text-secondary border-t border-primary/10 pt-4">
        <strong>Data quality:</strong> DAU, new signups, and XP earned are
        time-windowed and historically accurate. Snapshot metrics (totals,
        onboarding %, streak / level / language distributions, lesson completion)
        reflect the state at the time each day was computed; backfilled past days
        show today’s state for those fields.
      </p>

      <UserListModal
        open={drill !== null}
        title={
          drill
            ? `Users on a ${drill.label}-day streak`
            : ""
        }
        loading={drill?.loading ?? false}
        error={drill?.error ?? null}
        users={drill?.users ?? []}
        truncated={drill?.truncated}
        onClose={() => setDrill(null)}
      />
    </div>
  );
}
