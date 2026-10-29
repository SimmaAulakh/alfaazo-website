"use client";

import { useAdminData } from "@/lib/admin/AdminData";
import { paidRate, snapshot } from "@/lib/admin/kpis";
import { fmtDay, fmtInt, fmtPct, lastOf } from "@/lib/admin/metrics";
import { getPaidUsers } from "@/lib/admin-users";
import PageStatus from "@/components/admin/ui/PageStatus";
import StatTile from "@/components/admin/ui/StatTile";
import ChartCard from "@/components/admin/ui/ChartCard";
import { TrendChart } from "@/components/admin/ui/Charts";
import { useUserDrill } from "@/components/admin/useUserDrill";

const dateCol = { key: "date", label: "Date", format: (v: unknown) => fmtDay(String(v)) };

function Revenue() {
  const { windows: w, range, latest, refreshing } = useAdminData();
  const drill = useUserDrill();
  if (!latest) return null;

  const paid = snapshot(w, range, latest, (r) => r.paidUsers ?? 0);
  const rate = snapshot(w, range, latest, paidRate, "pts");
  const before = lastOf(w.previous);
  const netNew = before ? (latest.paidUsers ?? 0) - (before.paidUsers ?? 0) : null;

  const paidSeries = w.current.map((r) => ({ date: r.date, value: r.paidUsers ?? 0 }));
  const rateSeries = w.current.map((r) => ({ date: r.date, value: Number(paidRate(r).toFixed(2)) }));

  return (
    <div className="flex flex-col gap-6">
      <section className="grid grid-cols-2 xl:grid-cols-3 gap-3 sm:gap-4">
        <StatTile
          label="Paid users"
          value={fmtInt(paid.value)}
          delta={paid.delta}
          trend={paid.trend}
          onClick={() => drill.open("Paid users", getPaidUsers)}
        />
        <StatTile
          label="Paid conversion"
          value={fmtPct(rate.value, 2)}
          delta={rate.delta}
          hint="paid users ÷ all users"
        />
        <StatTile
          label={`Net new paid · ${range} days`}
          value={netNew == null ? "—" : `${netNew > 0 ? "+" : ""}${fmtInt(netNew)}`}
          hint={netNew == null ? "not enough history yet" : "change in paid users over the period"}
        />
      </section>

      <section className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <ChartCard
          title="Paid users"
          description="Users with an active subscription at the end of each day."
          dimmed={refreshing}
          csvName={`alfaazo-paid-users-${range}d`}
          table={{ columns: [dateCol, { key: "value", label: "Paid users", align: "right", format: (v) => fmtInt(Number(v)) }], rows: paidSeries }}
        >
          <TrendChart data={paidSeries} seriesLabel="paid users" format={fmtInt} />
        </ChartCard>
        <ChartCard
          title="Paid conversion"
          description="Paid users as a share of all users, each day."
          dimmed={refreshing}
          csvName={`alfaazo-paid-conversion-${range}d`}
          table={{ columns: [dateCol, { key: "value", label: "Conversion", align: "right", format: (v) => fmtPct(Number(v), 2) }], rows: rateSeries }}
        >
          <TrendChart data={rateSeries} seriesLabel="converted" format={(v) => fmtPct(v, 2)} percent />
        </ChartCard>
      </section>
      <p className="text-xs text-adm-muted">
        Subscription status is synced from RevenueCat into each user record. Revenue amounts are in the RevenueCat dashboard.
      </p>
      {drill.modal}
    </div>
  );
}

export default function RevenuePage() {
  return (
    <PageStatus>
      <Revenue />
    </PageStatus>
  );
}
