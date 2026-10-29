"use client";

import { useAdminData } from "@/lib/admin/AdminData";
import { flow, snapshot } from "@/lib/admin/kpis";
import { fmtCompact, fmtDay, fmtInt, fmtPct } from "@/lib/admin/metrics";
import { getPaidUsers } from "@/lib/admin-users";
import PageStatus from "@/components/admin/ui/PageStatus";
import StatTile from "@/components/admin/ui/StatTile";
import ChartCard from "@/components/admin/ui/ChartCard";
import SummaryCard from "@/components/admin/ui/SummaryCard";
import { BarsChart, TrendChart } from "@/components/admin/ui/Charts";
import { useUserDrill } from "@/components/admin/useUserDrill";

function pct(v: number | null | undefined) {
  return v == null ? "—" : fmtPct(v);
}

function Overview() {
  const { windows: w, range, latest, retention, completion, refreshing } = useAdminData();
  const drill = useUserDrill();
  if (!latest) return null;

  const total = snapshot(w, range, latest, (r) => r.totalUsers);
  const signups = flow(w, range, (r) => r.newUsers);
  const dau = flow(w, range, (r) => r.dau, "avg");
  const onboarding = snapshot(w, range, latest, (r) => r.onboardingCompletePct, "pts");
  const paid = snapshot(w, range, latest, (r) => r.paidUsers ?? 0);
  const xp = flow(w, range, (r) => r.totalXpEarnedYesterday);

  const dauSeries = w.current.map((r) => ({ date: r.date, value: r.dau }));
  const signupBars = w.current.map((r) => ({ label: r.date, value: r.newUsers }));
  const o = retention.data?.overall;
  const c = completion.data;

  return (
    <div className="flex flex-col gap-6">
      <section className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-6 gap-3 sm:gap-4">
        <StatTile label="Total users" value={fmtCompact(total.value)} delta={total.delta} trend={total.trend} />
        <StatTile label="New sign-ups" value={fmtCompact(signups.value)} delta={signups.delta} trend={signups.trend} />
        <StatTile label="Avg daily active" value={fmtCompact(dau.value)} delta={dau.delta} trend={dau.trend} />
        <StatTile label="Onboarded" value={fmtPct(onboarding.value)} delta={onboarding.delta} hint={`${fmtInt(latest.onboardingCompleteCount)} users`} />
        <StatTile
          label="Paid users"
          value={fmtCompact(paid.value)}
          delta={paid.delta}
          trend={paid.trend}
          onClick={() => drill.open("Paid users", getPaidUsers)}
        />
        <StatTile label="XP earned" value={fmtCompact(xp.value)} delta={xp.delta} trend={xp.trend} />
      </section>

      <section className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <ChartCard
          className="lg:col-span-2"
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
        <SummaryCard
          title="Retention"
          href="/admin/retention"
          linkLabel="Cohorts"
          rows={[
            { label: "Day 1", value: pct(o?.d1), sub: o ? `${fmtInt(o.d1n)} users old enough` : undefined },
            { label: "Day 7", value: pct(o?.d7), sub: o ? `${fmtInt(o.d7n)} users old enough` : undefined },
            { label: "Day 30", value: pct(o?.d30), sub: o ? `${fmtInt(o.d30n)} users old enough` : undefined },
          ]}
          note={
            retention.error
              ? `Couldn’t load retention: ${retention.error}`
              : "Share of all users active again that many days after signing up."
          }
        />
      </section>

      <section className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <ChartCard
          className="lg:col-span-2"
          title="New sign-ups"
          description="Accounts created per day."
          dimmed={refreshing}
          csvName={`alfaazo-signups-${range}d`}
          table={{
            columns: [
              { key: "label", label: "Date", format: (v) => fmtDay(String(v)) },
              { key: "value", label: "Sign-ups", align: "right", format: (v) => fmtInt(Number(v)) },
            ],
            rows: signupBars,
          }}
        >
          <BarsChart data={signupBars} seriesLabel="sign-ups" labelFormat={fmtDay} format={fmtInt} minTickGap={24} />
        </ChartCard>
        <SummaryCard
          title="Course progress"
          href="/admin/learning"
          linkLabel="Lessons"
          rows={[
            { label: "Lessons in the course", value: c ? fmtInt(c.totalLessons) : "—" },
            { label: "Finished every lesson", value: c ? fmtInt(c.completedAllCount) : "—" },
            { label: "Within 5 of finishing", value: c ? fmtInt(c.nearDoneCount) : "—" },
          ]}
          note={completion.error ? `Couldn’t load course progress: ${completion.error}` : undefined}
        />
      </section>
      {drill.modal}
    </div>
  );
}

export default function AdminOverviewPage() {
  return (
    <PageStatus>
      <Overview />
    </PageStatus>
  );
}
