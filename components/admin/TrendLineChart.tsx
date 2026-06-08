"use client";

import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";

interface SeriesDef {
  key: string;
  label: string;
  color: string;
}

interface TrendLineChartProps {
  title: string;
  /** Each row must have a `date` plus the keys referenced in `series`. */
  data: Array<Record<string, string | number>>;
  series: SeriesDef[];
}

export default function TrendLineChart({
  title,
  data,
  series,
}: TrendLineChartProps) {
  return (
    <div className="rounded-2xl bg-surface border border-primary/10 p-5 shadow-sm">
      <h3 className="text-sm font-semibold text-primary-dark mb-4">{title}</h3>
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data} margin={{ top: 4, right: 8, bottom: 0, left: -4 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="var(--color-primary)" opacity={0.08} />
            <XAxis
              dataKey="date"
              tick={{ fontSize: 11, fill: "var(--color-text-secondary)" }}
              tickFormatter={(d: string) => d.slice(5)}
              minTickGap={24}
            />
            <YAxis
              tick={{ fontSize: 11, fill: "var(--color-text-secondary)" }}
              allowDecimals={false}
              width={48}
            />
            <Tooltip
              contentStyle={{
                borderRadius: 12,
                border: "1px solid rgba(103,58,183,0.15)",
                fontSize: 12,
              }}
            />
            <Legend wrapperStyle={{ fontSize: 12 }} />
            {series.map((s) => (
              <Line
                key={s.key}
                type="monotone"
                dataKey={s.key}
                name={s.label}
                stroke={s.color}
                strokeWidth={2}
                dot={false}
                isAnimationActive={false}
              />
            ))}
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
