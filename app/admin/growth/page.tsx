"use client";

import { useAdminData } from "@/lib/admin/AdminData";
import { flow, snapshot } from "@/lib/admin/kpis";
import { fmtCompact, fmtDay, fmtInt, fmtPct } from "@/lib/admin/metrics";
import PageStatus from "@/components/admin/ui/PageStatus";
import StatTile from "@/components/admin/ui/StatTile";
import ChartCard from "@/components/admin/ui/ChartCard";
import { BarsChart, TrendChart } from "@/components/admin/ui/Charts";

const dateCol = { key: "date", label: "Date", format: (v: unknown) => fmtDay(String(v)) };

function Growth() {
  const { windows: w, range, latest, refreshing } = useAdminData();
  if (!latest) return null;

  const total = snapshot(w, range, latest, (r) => r.totalUsers);
  const signups = flow(w, range, (r) => r.newUsers);
  const perDay = flow(w, range, (r) => r.newUsers, "avg");
  const onboarding = snapshot(w, range, latest, (r) => r.onboardingCompletePct, "pts");

  const totalSeries = w.current.map((r) => ({ date: r.date, value: r.totalUsers }));
  const signupBars = w.current.map((r) => ({ label: r.date, value: r.newUsers }));
  const onbSeries = w.current.map((r) => ({ date: r.date, value: r.onboardingCompletePct }));

  return (
    <div className="flex flex-col gap-6">
      <section className="grid grid-cols-2 xl:grid-cols-4 gap-3 sm:gap-4">
        <StatTile label="Total users" value={fmtCompact(total.value)} delta={total.delta} trend={total.trend} />
        <StatTile label="New sign-ups" value={fmtCompact(signups.value)} delta={signups.delta} trend={signups.trend} />
        <StatTile label="Sign-ups per day" value={perDay.value.toFixed(1).replace(/\.0$/, "")} delta={perDay.delta} hint="daily average" />
        <StatTile
          label="Onboarded"
          value={fmtPct(onboarding.value)}
          delta={onboarding.delta}
          hint={`${fmtInt(latest.onboardingCompleteCount)} of ${fmtInt(latest.totalUsers)} users`}
        />
      </section>

      <section className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <ChartCard
          title="Total users"
          description="All accounts at the end of each day."
          dimmed={refreshing}
          csvName={`alfaazo-total-users-${range}d`}
          table={{ columns: [dateCol, { key: "value", label: "Users", align: "right", format: (v) => fmtInt(Number(v)) }], rows: totalSeries }}
        >
          <TrendChart data={totalSeries} seriesLabel="users" format={fmtInt} />
        </ChartCard>
        <ChartCard
          title="New sign-ups"
          description="Accounts created per day."
          dimmed={refreshing}
          csvName={`alfaazo-signups-${range}d`}
          table={{
            columns: [{ ...dateCol, key: "label" }, { key: "value", label: "Sign-ups", align: "right", format: (v) => fmtInt(Number(v)) }],
            rows: signupBars,
          }}
        >
          <BarsChart data={signupBars} seriesLabel="sign-ups" labelFormat={fmtDay} format={fmtInt} minTickGap={24} />
        </ChartCard>
      </section>

      <ChartCard
        title="Onboarding completion"
        description="Share of all users who have finished onboarding, measured each day."
        dimmed={refreshing}
        csvName={`alfaazo-onboarding-${range}d`}
        table={{ columns: [dateCol, { key: "value", label: "Completed", align: "right", format: (v) => fmtPct(Number(v)) }], rows: onbSeries }}
      >
        <TrendChart data={onbSeries} seriesLabel="completed onboarding" format={(v) => fmtPct(v)} percent fullScale height={220} />
      </ChartCard>
    </div>
  );
}

export default function GrowthPage() {
  return (
    <PageStatus>
      <Growth />
    </PageStatus>
  );
}
