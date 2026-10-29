"use client";

import { useAdminData } from "@/lib/admin/AdminData";
import { getCohortChurnedUsers } from "@/lib/admin-users";
import { fmtDay, fmtInt, fmtPct } from "@/lib/admin/metrics";
import StatTile from "@/components/admin/ui/StatTile";
import ChartCard from "@/components/admin/ui/ChartCard";
import RetentionTable from "@/components/admin/RetentionTable";
import { useUserDrill } from "@/components/admin/useUserDrill";

const KEYS = [
  ["d1", "Day 1"],
  ["d3", "Day 3"],
  ["d7", "Day 7"],
  ["d14", "Day 14"],
  ["d30", "Day 30"],
] as const;

export default function RetentionPage() {
  const { retention, refreshing } = useAdminData();
  const drill = useUserDrill();
  const data = retention.data;

  if (!data && retention.loading) {
    return (
      <div className="flex items-center gap-3 text-adm-muted text-sm py-24 justify-center">
        <div className="h-5 w-5 rounded-full border-2 border-adm-line border-t-adm-accent animate-spin" />
        Computing cohorts…
      </div>
    );
  }
  if (!data) {
    return (
      <p className="text-sm text-delta-down py-12">
        Couldn’t load retention{retention.error ? `: ${retention.error}` : "."}
      </p>
    );
  }

  return (
    <div className="flex flex-col gap-6">
      <section className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-5 gap-3 sm:gap-4">
        {KEYS.map(([k, label]) => {
          const v = data.overall[k];
          const n = data.overall[`${k}n`];
          return (
            <StatTile
              key={k}
              label={`${label} retention`}
              value={v == null ? "—" : fmtPct(v)}
              hint={n ? `${fmtInt(n)} users old enough` : "no users old enough yet"}
            />
          );
        })}
      </section>

      <ChartCard
        title="Retention by signup week"
        description="Share of each weekly cohort that was active again 1, 3, 7, 14 and 30 days after signing up. Click a week to list users who never came back."
        badge="All time · not affected by date range"
        dimmed={refreshing}
        csvName="alfaazo-retention-cohorts"
        table={{
          columns: [
            { key: "week", label: "Signup week" },
            { key: "size", label: "Users", align: "right" },
            ...KEYS.map(([k, label]) => ({
              key: k,
              label,
              align: "right" as const,
              format: (v: unknown) => fmtPct(Number(v)),
            })),
          ],
          rows: [
            { week: "All users", size: data.totalUsers, ...Object.fromEntries(KEYS.map(([k]) => [k, data.overall[k]])) },
            ...data.cohorts.map((c) => ({
              week: c.weekStart,
              size: c.size,
              ...Object.fromEntries(KEYS.map(([k]) => [k, c[k]])),
            })),
          ],
        }}
      >
        {data.cohorts.length === 0 ? (
          <p className="text-sm text-adm-muted py-12 text-center">No cohorts yet.</p>
        ) : (
          <RetentionTable
            data={data}
            onCohortClick={(weekStart, size) =>
              drill.open(`Never returned · week of ${fmtDay(weekStart)} (${size} sign-ups)`, () =>
                getCohortChurnedUsers(weekStart),
              )
            }
          />
        )}
      </ChartCard>
      {drill.modal}
    </div>
  );
}
