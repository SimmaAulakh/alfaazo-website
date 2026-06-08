"use client";

import { useAggregates, latest, compact } from "@/lib/aggregates";
import Scorecard from "@/components/admin/Scorecard";
import TrendLineChart from "@/components/admin/TrendLineChart";
import DistributionBar from "@/components/admin/DistributionBar";
import LessonCompletionList from "@/components/admin/LessonCompletionList";

export default function AdminDashboardPage() {
  const { data, loading, error } = useAggregates(30);
  const newest = latest(data);

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

  const streakData = [
    { label: "0", value: newest.streakDistribution["0"] ?? 0 },
    { label: "1-6", value: newest.streakDistribution["1-6"] ?? 0 },
    { label: "7-29", value: newest.streakDistribution["7-29"] ?? 0 },
    { label: "30+", value: newest.streakDistribution["30+"] ?? 0 },
  ];

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

      {/* Distributions */}
      <section className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <DistributionBar
          title="Streak distribution"
          data={streakData}
          color="var(--color-streak-orange)"
        />
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
    </div>
  );
}
