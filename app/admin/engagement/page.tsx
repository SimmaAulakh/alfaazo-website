"use client";

import { useState } from "react";
import { useAdminData } from "@/lib/admin/AdminData";
import { activeRate, flow, snapshot } from "@/lib/admin/kpis";
import { avg, fmtCompact, fmtDay, fmtInt, fmtPct } from "@/lib/admin/metrics";
import { getUsersByStreak } from "@/lib/admin-users";
import PageStatus from "@/components/admin/ui/PageStatus";
import StatTile from "@/components/admin/ui/StatTile";
import ChartCard from "@/components/admin/ui/ChartCard";
import { BarsChart, TrendChart, type BarDatum } from "@/components/admin/ui/Charts";
import SummaryCard from "@/components/admin/ui/SummaryCard";
import { useUserDrill } from "@/components/admin/useUserDrill";

function Engagement() {
  const { windows: w, range, latest, refreshing } = useAdminData();
  const drill = useUserDrill();
  const [withZero, setWithZero] = useState(false);
  if (!latest) return null;

  const dau = flow(w, range, (r) => r.dau, "avg");
  const xp = flow(w, range, (r) => r.totalXpEarnedYesterday);
  const streak = snapshot(w, range, latest, (r) => r.avgStreak);
  const rateNow = avg(w.current, activeRate);
  const ratePrev = avg(w.previous, activeRate);
  const peak = w.current.reduce((best, r) => (r.dau > best.dau ? r : best), w.current[0] ?? latest);
  const onStreak = latest.totalUsers - (latest.streakDistribution?.["0"] ?? 0);

  const dauSeries = w.current.map((r) => ({ date: r.date, value: r.dau }));
  const xpBars = w.current.map((r) => ({ label: r.date, value: r.totalXpEarnedYesterday }));

  // Per-day streak histogram, gaps filled with 0, "90+" overflow appended.
  const sh = latest.streakHistogram ?? {};
  const overflow = Object.keys(sh).find((k) => k.endsWith("+"));
  const nums = Object.keys(sh).filter((k) => !k.endsWith("+")).map(Number).filter(Number.isFinite);
  const max = nums.length ? Math.max(...nums) : 0;
  const streakAll: BarDatum[] = Array.from({ length: max + 1 }, (_, i) => ({ label: String(i), value: sh[String(i)] ?? 0 }));
  if (overflow && (sh[overflow] ?? 0) > 0) streakAll.push({ label: overflow, value: sh[overflow] });
  const streakData = withZero ? streakAll : streakAll.filter((d) => d.label !== "0");

  const levelData: BarDatum[] = Array.from({ length: 8 }, (_, i) => ({
    label: `Level ${i + 1}`,
    value: latest.levelDistribution[String(i + 1)] ?? 0,
  }));
  const asOf = `Snapshot · ${fmtDay(latest.date)}`;

  return (
    <div className="flex flex-col gap-6">
      <section className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-6 gap-3 sm:gap-4">
        <StatTile label="Avg daily active" value={fmtCompact(dau.value)} delta={dau.delta} trend={dau.trend} />
        <StatTile label="Busiest day" value={fmtInt(peak.dau)} hint={`active users on ${fmtDay(peak.date)}`} />
        <StatTile
          label="Daily active rate"
          value={fmtPct(rateNow)}
          delta={{ value: w.hasPrevious ? rateNow - ratePrev : null, unit: "pts", label: `vs prior ${range}d` }}
          hint="of all users, per day"
        />
        <StatTile label="XP earned" value={fmtCompact(xp.value)} delta={xp.delta} trend={xp.trend} />
        <StatTile label="Average streak" value={`${streak.value.toFixed(1).replace(/\.0$/, "")} days`} delta={streak.delta} />
        <StatTile
          label="On a streak now"
          value={fmtInt(onStreak)}
          hint={latest.totalUsers ? `${fmtPct((onStreak / latest.totalUsers) * 100)} of users` : undefined}
        />
      </section>

      <section className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <ChartCard
          title="Daily active users"
          description="Learners who completed a lesson or exercise each day."
          dimmed={refreshing}
          csvName={`alfaazo-dau-${range}d`}
          table={{
            columns: [
              { key: "date", label: "Date", format: (v) => fmtDay(String(v)) },
              { key: "value", label: "Active users", align: "right", format: (v) => fmtInt(Number(v)) },
            ],
            rows: dauSeries,
          }}
        >
          <TrendChart data={dauSeries} seriesLabel="active users" format={fmtInt} />
        </ChartCard>
        <ChartCard
          title="XP earned"
          description="Total XP learners earned each day."
          dimmed={refreshing}
          csvName={`alfaazo-xp-${range}d`}
          table={{
            columns: [
              { key: "label", label: "Date", format: (v) => fmtDay(String(v)) },
              { key: "value", label: "XP", align: "right", format: (v) => fmtInt(Number(v)) },
            ],
            rows: xpBars,
          }}
        >
          <BarsChart data={xpBars} seriesLabel="XP" labelFormat={fmtDay} format={fmtInt} minTickGap={24} />
        </ChartCard>
      </section>

      <ChartCard
        title="Current streaks"
        description="Users by the length of their current streak, in days. Click a bar to see who they are."
        badge={asOf}
        dimmed={refreshing}
        csvName="alfaazo-streaks"
        actions={
          <label className="flex items-center gap-2 text-xs text-adm-ink-2 cursor-pointer select-none">
            <input
              type="checkbox"
              checked={withZero}
              onChange={(e) => setWithZero(e.target.checked)}
              className="accent-adm-accent"
            />
            Show 0-day
          </label>
        }
        table={{
          columns: [
            { key: "label", label: "Streak (days)" },
            { key: "value", label: "Users", align: "right", format: (v) => fmtInt(Number(v)) },
          ],
          rows: streakAll,
        }}
      >
        <BarsChart
          data={streakData}
          seriesLabel="users"
          format={fmtInt}
          labelFormat={(l) => (l.endsWith("+") ? l : `${l}d`)}
          minTickGap={8}
          onBarClick={(d) => {
            if (d.value <= 0) return;
            const days = d.label.endsWith("+") ? 90 : Number(d.label);
            drill.open(`Users on a ${d.label}-day streak`, () => getUsersByStreak(days));
          }}
        />
      </ChartCard>

      <section className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <ChartCard
          className="lg:col-span-2"
          title="Levels"
          description="Users by their current level in the app."
          badge={asOf}
          dimmed={refreshing}
          csvName="alfaazo-levels"
          table={{
            columns: [
              { key: "label", label: "Level" },
              { key: "value", label: "Users", align: "right", format: (v) => fmtInt(Number(v)) },
            ],
            rows: levelData,
          }}
        >
          <BarsChart data={levelData} seriesLabel="users" format={fmtInt} height={220} />
        </ChartCard>
        <SummaryCard
          title="Streak groups"
          rows={[
            ["No streak", "0"],
            ["1–6 days", "1-6"],
            ["7–29 days", "7-29"],
            ["30+ days", "30+"],
          ].map(([label, key]) => {
            const n = latest.streakDistribution?.[key as keyof typeof latest.streakDistribution] ?? 0;
            return {
              label,
              value: fmtInt(n),
              sub: latest.totalUsers ? `${fmtPct((n / latest.totalUsers) * 100)} of users` : undefined,
            };
          })}
          note={`Snapshot · ${fmtDay(latest.date)}`}
        />
      </section>
      {drill.modal}
    </div>
  );
}

export default function EngagementPage() {
  return (
    <PageStatus>
      <Engagement />
    </PageStatus>
  );
}
