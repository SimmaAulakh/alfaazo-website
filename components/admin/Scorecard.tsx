"use client";

import { ResponsiveContainer, LineChart, Line } from "recharts";

interface ScorecardProps {
  label: string;
  value: string | number;
  /** Optional 30-day series for a sparkline under the value. */
  sparkline?: number[];
  /** Tailwind color class for the sparkline stroke, e.g. "var(--color-primary)". */
  accent?: string;
  hint?: string;
}

export default function Scorecard({
  label,
  value,
  sparkline,
  accent = "var(--color-primary)",
  hint,
}: ScorecardProps) {
  const sparkData = sparkline?.map((v, i) => ({ i, v })) ?? [];

  return (
    <div className="rounded-2xl bg-surface border border-primary/10 p-5 shadow-sm flex flex-col gap-1">
      <span className="text-xs font-medium uppercase tracking-wide text-text-secondary">
        {label}
      </span>
      <span className="text-3xl font-bold text-primary-dark leading-tight">
        {value}
      </span>
      {hint && <span className="text-xs text-text-secondary">{hint}</span>}
      {sparkData.length > 1 && (
        <div className="h-10 mt-2 -mb-1">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={sparkData}>
              <Line
                type="monotone"
                dataKey="v"
                stroke={accent}
                strokeWidth={2}
                dot={false}
                isAnimationActive={false}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      )}
    </div>
  );
}
