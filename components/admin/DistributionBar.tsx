"use client";

import type { ComponentProps } from "react";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Cell,
} from "recharts";

interface DistributionBarProps {
  title: string;
  /** Ordered buckets to plot. */
  data: Array<{ label: string; value: number }>;
  color?: string;
  /** When set, bars become clickable and call this with the bucket label. */
  onBarClick?: (label: string, value: number) => void;
}

export default function DistributionBar({
  title,
  data,
  color = "var(--color-primary)",
  onBarClick,
}: DistributionBarProps) {
  const clickable = Boolean(onBarClick);
  return (
    <div className="rounded-2xl bg-surface border border-primary/10 p-5 shadow-sm">
      <h3 className="text-sm font-semibold text-primary-dark mb-4">{title}</h3>
      <div className={`h-56 ${clickable ? "cursor-pointer" : ""}`}>
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={data}
            margin={{ top: 4, right: 8, bottom: 0, left: -4 }}
            onClick={
              onBarClick
                ? (((state: { activeLabel?: string }) => {
                    const label = state?.activeLabel;
                    if (label == null) return;
                    const found = data.find((d) => d.label === label);
                    onBarClick(String(label), found?.value ?? 0);
                  }) as unknown as ComponentProps<typeof BarChart>["onClick"])
                : undefined
            }
          >
            <CartesianGrid strokeDasharray="3 3" stroke="var(--color-primary)" opacity={0.08} vertical={false} />
            <XAxis
              dataKey="label"
              tick={{ fontSize: 11, fill: "var(--color-text-secondary)" }}
            />
            <YAxis
              tick={{ fontSize: 11, fill: "var(--color-text-secondary)" }}
              allowDecimals={false}
              width={48}
            />
            <Tooltip
              cursor={{ fill: "rgba(103,58,183,0.06)" }}
              contentStyle={{
                borderRadius: 12,
                border: "1px solid rgba(103,58,183,0.15)",
                fontSize: 12,
              }}
            />
            <Bar
              dataKey="value"
              radius={[6, 6, 0, 0]}
              isAnimationActive={false}
            >
              {data.map((_, i) => (
                <Cell key={i} fill={color} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
