"use client";

import Icon from "./Icon";

export interface Delta {
  /** Signed change. `unit` says whether it is a relative % or percentage points. */
  value: number | null;
  unit: "%" | "pts" | "abs";
  /** Comparison label, e.g. "vs previous 30 days". */
  label: string;
  /** Whether an increase is good news (colours the delta). Default true. */
  upIsGood?: boolean;
}

interface StatTileProps {
  label: string;
  value: string;
  delta?: Delta;
  /** Secondary line under the value. */
  hint?: string;
  /** Daily series for a sparkline (oldest → newest). */
  trend?: number[];
  onClick?: () => void;
  actionLabel?: string;
}

function DeltaBadge({ d }: { d: Delta }) {
  if (d.value == null || !Number.isFinite(d.value)) {
    return <span className="text-xs text-adm-muted">No comparison yet</span>;
  }
  const v = d.value;
  const flat = Math.abs(v) < 0.05;
  const good = flat ? null : (v > 0) === (d.upIsGood ?? true);
  const tone = flat ? "text-adm-ink-2" : good ? "text-delta-up" : "text-delta-down";
  const mag =
    d.unit === "%"
      ? `${Math.abs(v).toFixed(1).replace(/\.0$/, "")}%`
      : d.unit === "pts"
        ? `${Math.abs(v).toFixed(1).replace(/\.0$/, "")} pts`
        : Math.abs(Math.round(v)).toLocaleString("en-US");
  return (
    <span className="flex flex-wrap items-center gap-x-1.5 gap-y-0.5 text-xs">
      <span className={`inline-flex items-center gap-0.5 font-semibold whitespace-nowrap ${tone}`}>
        {!flat && <Icon name={v > 0 ? "up" : "down"} size={13} />}
        {flat ? "No change" : `${v > 0 ? "+" : "−"}${mag}`}
      </span>
      <span className="text-adm-muted whitespace-nowrap">{d.label}</span>
    </span>
  );
}

/** Tiny sparkline: muted line, current value as an accent dot. */
function Sparkline({ data }: { data: number[] }) {
  if (data.length < 2) return null;
  const w = 72;
  const h = 28;
  const min = Math.min(...data);
  const max = Math.max(...data);
  const span = max - min || 1;
  const pts = data.map((v, i) => [
    (i / (data.length - 1)) * (w - 6) + 3,
    h - 4 - ((v - min) / span) * (h - 8),
  ]);
  const d = pts.map(([x, y], i) => `${i ? "L" : "M"}${x.toFixed(1)},${y.toFixed(1)}`).join("");
  const [lx, ly] = pts[pts.length - 1];
  return (
    <svg width={w} height={h} viewBox={`0 0 ${w} ${h}`} aria-hidden="true">
      <path d={d} fill="none" stroke="var(--color-viz-gray)" strokeWidth={1.5} strokeLinejoin="round" strokeLinecap="round" />
      <circle cx={lx} cy={ly} r={3} fill="var(--color-viz-1)" stroke="var(--color-adm-surface)" strokeWidth={1.5} />
    </svg>
  );
}

export default function StatTile({
  label,
  value,
  delta,
  hint,
  trend,
  onClick,
  actionLabel,
}: StatTileProps) {
  const body = (
    <>
      <div className="flex items-start justify-between gap-2">
        <span className="text-[13px] font-medium text-adm-ink-2 truncate" title={label}>{label}</span>
        {onClick && (
          <span className="text-[11px] font-medium text-adm-accent opacity-0 group-hover:opacity-100 group-focus-visible:opacity-100 transition-opacity">
            {actionLabel ?? "View users"}
          </span>
        )}
      </div>
      <div className="flex items-end justify-between gap-3 mt-2">
        <span className="text-[28px] leading-none font-semibold text-adm-ink tracking-tight">
          {value}
        </span>
        {trend && <Sparkline data={trend} />}
      </div>
      <div className="mt-3 min-h-4 flex flex-col gap-0.5">
        {delta && <DeltaBadge d={delta} />}
        {hint && <span className="text-xs text-adm-muted">{hint}</span>}
      </div>
    </>
  );
  const base =
    "group text-left rounded-xl bg-adm-surface border border-adm-line p-4 flex flex-col";
  return onClick ? (
    <button
      type="button"
      onClick={onClick}
      className={`${base} cursor-pointer transition-colors hover:border-adm-accent/50 focus-visible:outline-2 focus-visible:outline-adm-accent`}
    >
      {body}
    </button>
  ) : (
    <div className={base}>{body}</div>
  );
}
