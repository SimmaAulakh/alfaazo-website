"use client";

import type { RetentionCohort, RetentionResult } from "@/lib/retention";

/** Dataviz sequential blue, light → dark (steps 100…600). */
const RAMP = ["#cde2fb", "#b7d3f6", "#9ec5f4", "#86b6ef", "#6da7ec", "#5598e7", "#3987e5", "#2a78d6", "#256abf", "#1c5cab", "#184f95"];
/** Retention at or above this fills the darkest step. */
const CAP = 60;

function stepFor(pct: number): number {
  return Math.min(RAMP.length - 1, Math.round((Math.min(pct, CAP) / CAP) * (RAMP.length - 1)));
}

const MILESTONES = ["d1", "d3", "d7", "d14", "d30"] as const;
type Milestone = (typeof MILESTONES)[number];

function fmtWeek(iso: string): string {
  return new Date(`${iso}T00:00:00Z`).toLocaleDateString("en-US", { month: "short", day: "numeric", timeZone: "UTC" });
}

function HeatCell({ pct, n }: { pct: number | null; n: number }) {
  if (pct == null) {
    return (
      <td className="px-1 py-1" title="Not enough time has passed yet">
        <div className="h-9 rounded-md bg-adm-page grid place-items-center text-xs text-adm-muted">—</div>
      </td>
    );
  }
  const step = stepFor(pct);
  return (
    <td className="px-1 py-1" title={`${pct}% of ${n} user${n === 1 ? "" : "s"} old enough`}>
      <div
        className="h-9 rounded-md grid place-items-center text-xs font-semibold tabular-nums"
        style={{ backgroundColor: RAMP[step], color: step >= 7 ? "#ffffff" : "#0b0b0b" }}
      >
        {pct}%
      </div>
    </td>
  );
}

export default function RetentionTable({
  data,
  onCohortClick,
}: {
  data: RetentionResult;
  onCohortClick?: (weekStart: string, size: number) => void;
}) {
  const row = (label: React.ReactNode, size: number, m: Pick<RetentionCohort, `${Milestone}` | `${Milestone}n`>, key: string, onClick?: () => void, strong?: boolean) => (
    <tr
      key={key}
      onClick={onClick}
      tabIndex={onClick ? 0 : undefined}
      onKeyDown={onClick ? (e) => (e.key === "Enter" || e.key === " ") && (e.preventDefault(), onClick()) : undefined}
      className={onClick ? "cursor-pointer hover:bg-adm-hover focus-visible:outline-2 focus-visible:outline-adm-accent" : ""}
    >
      <th scope="row" className={`px-3 py-1 text-left text-sm whitespace-nowrap ${strong ? "font-semibold text-adm-ink" : "font-normal text-adm-ink-2"}`}>
        {label}
      </th>
      <td className="px-3 py-1 text-right text-sm tabular-nums text-adm-ink-2">{size.toLocaleString("en-US")}</td>
      {MILESTONES.map((k) => (
        <HeatCell key={k} pct={m[k]} n={m[`${k}n`]} />
      ))}
    </tr>
  );

  return (
    <div className="flex flex-col gap-3">
      <div className="overflow-x-auto">
        <table className="w-full min-w-[560px] border-collapse">
          <thead>
            <tr className="text-xs text-adm-ink-2">
              <th scope="col" className="px-3 py-2 text-left font-medium">Signup week</th>
              <th scope="col" className="px-3 py-2 text-right font-medium">Users</th>
              {["Day 1", "Day 3", "Day 7", "Day 14", "Day 30"].map((h) => (
                <th key={h} scope="col" className="px-1 py-2 text-center font-medium">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {row("All users", data.totalUsers, data.overall, "all", undefined, true)}
            {data.cohorts.map((c) =>
              row(fmtWeek(c.weekStart), c.size, c, c.weekStart, onCohortClick ? () => onCohortClick(c.weekStart, c.size) : undefined),
            )}
          </tbody>
        </table>
      </div>
      <div className="flex items-center gap-2 text-[11px] text-adm-muted" aria-hidden="true">
        <span>0%</span>
        <span className="flex h-2 w-40 rounded-full overflow-hidden">
          {RAMP.map((c) => (
            <span key={c} className="flex-1" style={{ backgroundColor: c }} />
          ))}
        </span>
        <span>{CAP}%+</span>
      </div>
    </div>
  );
}
