"use client";

import type { RetentionResult } from "@/lib/retention";

interface RetentionTableProps {
  data: RetentionResult | null;
  loading: boolean;
  error: string | null;
  /** When set, cohort rows are clickable (to drill into churned users). */
  onCohortClick?: (weekStart: string, size: number) => void;
}

/** Format "YYYY-MM-DD" → "Apr 7". */
function fmtWeek(iso: string): string {
  const [y, m, d] = iso.split("-").map(Number);
  const date = new Date(Date.UTC(y, m - 1, d));
  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    timeZone: "UTC",
  });
}

/** Green cell whose intensity scales with the retention %. */
function cellStyle(pct: number | null): React.CSSProperties {
  if (pct == null) return {};
  const alpha = Math.min(0.32, (pct / 100) * 0.32 + 0.04);
  return { backgroundColor: `rgba(76, 175, 80, ${alpha})` };
}

function Cell({ pct, n }: { pct: number | null; n: number }) {
  return (
    <td
      className="px-3 py-2 text-center text-xs tabular-nums"
      style={cellStyle(pct)}
      title={n > 0 ? `${n} mature user${n === 1 ? "" : "s"}` : "Not enough time elapsed yet"}
    >
      {pct == null ? (
        <span className="text-text-secondary">—</span>
      ) : (
        <span className="font-semibold text-primary-dark">{pct}%</span>
      )}
    </td>
  );
}

export default function RetentionTable({
  data,
  loading,
  error,
  onCohortClick,
}: RetentionTableProps) {
  const clickable = Boolean(onCohortClick);
  return (
    <div className="rounded-2xl bg-surface border border-primary/10 p-5 shadow-sm">
      <h3 className="text-sm font-semibold text-primary-dark mb-1">
        Retention by signup week
      </h3>
      <p className="text-xs text-text-secondary mb-4">
        % of each weekly cohort active 1 / 3 / 7 / 14 / 30 days after signing up.
        “—” means not enough time has passed yet.
        {clickable ? " Click a cohort row to list users who never returned." : ""}
      </p>

      {loading ? (
        <div className="flex items-center gap-3 text-text-secondary text-sm py-6 justify-center">
          <div className="h-5 w-5 rounded-full border-2 border-primary/30 border-t-primary animate-spin" />
          Computing cohorts…
        </div>
      ) : error ? (
        <p className="text-sm text-streak-orange py-4">{error}</p>
      ) : !data || data.cohorts.length === 0 ? (
        <p className="text-sm text-text-secondary py-4">No cohort data yet.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="text-text-secondary">
                <th className="px-3 py-2 text-left font-medium">Cohort</th>
                <th className="px-3 py-2 text-right font-medium">Users</th>
                <th className="px-3 py-2 text-center font-medium">D1</th>
                <th className="px-3 py-2 text-center font-medium">D3</th>
                <th className="px-3 py-2 text-center font-medium">D7</th>
                <th className="px-3 py-2 text-center font-medium">D14</th>
                <th className="px-3 py-2 text-center font-medium">D30</th>
              </tr>
            </thead>
            <tbody>
              {/* Pooled headline row */}
              <tr className="border-y border-primary/10 bg-primary/[0.03] font-medium">
                <td className="px-3 py-2 text-left text-primary-dark">All users</td>
                <td className="px-3 py-2 text-right tabular-nums text-warm-brown">
                  {data.totalUsers}
                </td>
                <Cell pct={data.overall.d1} n={data.overall.d1n} />
                <Cell pct={data.overall.d3} n={data.overall.d3n} />
                <Cell pct={data.overall.d7} n={data.overall.d7n} />
                <Cell pct={data.overall.d14} n={data.overall.d14n} />
                <Cell pct={data.overall.d30} n={data.overall.d30n} />
              </tr>
              {data.cohorts.map((c) => (
                <tr
                  key={c.weekStart}
                  onClick={
                    onCohortClick
                      ? () => onCohortClick(c.weekStart, c.size)
                      : undefined
                  }
                  className={`border-b border-primary/5${
                    clickable ? " cursor-pointer hover:bg-primary/[0.04]" : ""
                  }`}
                >
                  <td className="px-3 py-2 text-left text-warm-brown">
                    {fmtWeek(c.weekStart)}
                  </td>
                  <td className="px-3 py-2 text-right tabular-nums text-warm-brown">
                    {c.size}
                  </td>
                  <Cell pct={c.d1} n={c.d1n} />
                  <Cell pct={c.d3} n={c.d3n} />
                  <Cell pct={c.d7} n={c.d7n} />
                  <Cell pct={c.d14} n={c.d14n} />
                  <Cell pct={c.d30} n={c.d30n} />
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
