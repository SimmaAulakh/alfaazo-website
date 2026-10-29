"use client";

import { useAdminData } from "@/lib/admin/AdminData";
import { AGE_RANGE_ORDER, type LanguageBackground } from "@/lib/aggregates";
import { fmtDay, fmtInt, fmtPct } from "@/lib/admin/metrics";
import PageStatus from "@/components/admin/ui/PageStatus";
import StatTile from "@/components/admin/ui/StatTile";
import ChartCard from "@/components/admin/ui/ChartCard";
import { BarsChart, type BarDatum } from "@/components/admin/ui/Charts";

const NO_ANSWER = new Set(["Prefer not to say", "Not set"]);
const AGE_LABEL: Record<string, string> = {
  "Over 65": "65+",
  "Prefer not to say": "Declined",
  "Not set": "Skipped",
};
const LEVELS: Array<[keyof LanguageBackground, string]> = [
  ["beginner", "Beginner"],
  ["basic", "Basic"],
  ["intermediate", "Intermediate"],
  ["advanced", "Advanced"],
];

function Audience() {
  const { latest, refreshing } = useAdminData();
  if (!latest) return null;
  const asOf = `Snapshot · ${fmtDay(latest.date)}`;
  const total = latest.totalUsers;
  const share = (n: number) => (total > 0 ? (n / total) * 100 : 0);

  const ages = latest.ageDistribution;
  const ageKeys = ages
    ? [...AGE_RANGE_ORDER, ...Object.keys(ages).filter((k) => !AGE_RANGE_ORDER.includes(k))]
    : [];
  const ageData: BarDatum[] = ageKeys.map((k) => ({
    label: AGE_LABEL[k] ?? k,
    value: ages?.[k] ?? 0,
    muted: NO_ANSWER.has(k),
  }));
  const answered = ages
    ? Object.entries(ages).filter(([k]) => !NO_ANSWER.has(k)).reduce((n, [, v]) => n + v, 0)
    : 0;
  const top = ages
    ? Object.entries(ages)
        .filter(([k]) => !NO_ANSWER.has(k))
        .sort((a, b) => b[1] - a[1])[0]
    : undefined;

  const lb = latest.languageBackground;
  const lbTotal = lb.beginner + lb.basic + lb.intermediate + lb.advanced;
  const lbData: BarDatum[] = LEVELS.map(([k, label]) => ({ label, value: lb[k] }));
  const lbTop = [...lbData].sort((a, b) => b.value - a.value)[0];

  return (
    <div className="flex flex-col gap-6">
      <section className="grid grid-cols-2 xl:grid-cols-4 gap-3 sm:gap-4">
        <StatTile label="Total users" value={fmtInt(total)} hint={`as of ${fmtDay(latest.date)}`} />
        <StatTile
          label="Gave their age"
          value={ages ? fmtPct(share(answered)) : "—"}
          hint={ages ? `${fmtInt(answered)} users` : "not computed yet"}
        />
        <StatTile
          label="Largest age group"
          value={top && top[1] > 0 ? (AGE_LABEL[top[0]] ?? top[0]) : "—"}
          hint={top && top[1] > 0 ? `${fmtInt(top[1])} users · ${fmtPct(answered ? (top[1] / answered) * 100 : 0)} of answers` : undefined}
        />
        <StatTile
          label="Most common level"
          value={lbTotal > 0 ? lbTop.label : "—"}
          hint={lbTotal > 0 ? `${fmtInt(lbTop.value)} users · self-reported Punjabi` : undefined}
        />
      </section>

      <section className="grid grid-cols-1 xl:grid-cols-5 gap-4">
        <ChartCard
          className="xl:col-span-3"
          title="Users by age range"
          description="From the onboarding question. Gray bars are users who declined or skipped it."
          badge={asOf}
          dimmed={refreshing}
          csvName="alfaazo-age-ranges"
          table={
            ages
              ? {
                  columns: [
                    { key: "label", label: "Age range" },
                    { key: "value", label: "Users", align: "right", format: (v) => fmtInt(Number(v)) },
                    { key: "share", label: "Share", align: "right", format: (v) => fmtPct(Number(v)) },
                  ],
                  rows: ageData.map((d) => ({ label: d.label, value: d.value, share: share(d.value) })),
                }
              : undefined
          }
        >
          {ages ? (
            <BarsChart data={ageData} seriesLabel="users" format={fmtInt} height={260} />
          ) : (
            <p className="text-sm text-adm-muted py-16 text-center">
              Age data appears after the nightly aggregate job runs with the updated function.
            </p>
          )}
        </ChartCard>
        <ChartCard
          className="xl:col-span-2"
          title="Punjabi background"
          description="How learners rated their Punjabi when they joined."
          badge={asOf}
          dimmed={refreshing}
          csvName="alfaazo-language-background"
          table={{
            columns: [
              { key: "label", label: "Level" },
              { key: "value", label: "Users", align: "right", format: (v) => fmtInt(Number(v)) },
              { key: "share", label: "Share of answers", align: "right", format: (v) => fmtPct(Number(v)) },
            ],
            rows: lbData.map((d) => ({ ...d, share: lbTotal ? (d.value / lbTotal) * 100 : 0 })),
          }}
        >
          <BarsChart data={lbData} seriesLabel="users" format={fmtInt} height={260} />
        </ChartCard>
      </section>
    </div>
  );
}

export default function AudiencePage() {
  return (
    <PageStatus>
      <Audience />
    </PageStatus>
  );
}
