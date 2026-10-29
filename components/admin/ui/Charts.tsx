"use client";

/**
 * The two chart forms the console uses, both single-series (one hue, so no
 * legend box — the card title names the series):
 *  - TrendChart: a daily line with a 10% area wash and a crosshair tooltip.
 *  - BarsChart: columns ≤24px wide, 4px rounded tops, per-bar hover tooltip;
 *    optional per-bar gray for "no answer" buckets and click-through.
 */
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  BarChart,
  Bar,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";
import { fmtCompact, fmtDay } from "@/lib/admin/metrics";

const AXIS_TICK = { fontSize: 11, fill: "var(--color-adm-muted)" };

/** Clean 0-based ticks (≈4 steps of 1/2/2.5/5 × 10ⁿ) covering `max`. */
function niceTicks(max: number): number[] {
  if (!(max > 0)) return [0, 1];
  const raw = max / 4;
  const mag = 10 ** Math.floor(Math.log10(raw));
  const step = [1, 2, 2.5, 5, 10].map((m) => m * mag).find((st) => st >= raw) ?? 10 * mag;
  const ticks: number[] = [];
  for (let v = 0; v < max + step * 0.999; v += step) ticks.push(Number(v.toPrecision(6)));
  return ticks;
}

/** "0.5" → "0.5%"; trims float noise. */
function pctTick(v: number): string {
  return `${Number(v.toPrecision(4))}%`;
}

interface TipProps {
  active?: boolean;
  payload?: Array<{ value?: number | string }>;
  label?: string | number;
  seriesLabel: string;
  format: (v: number) => string;
  labelFormat?: (l: string) => string;
}

/** Value leads, label follows; keyed with a short line of the series colour. */
function Tip({ active, payload, label, seriesLabel, format, labelFormat }: TipProps) {
  if (!active || !payload?.length) return null;
  const v = Number(payload[0].value);
  return (
    <div className="rounded-lg bg-adm-surface border border-adm-line shadow-lg px-3 py-2 text-xs">
      <div className="text-adm-muted mb-1">{labelFormat ? labelFormat(String(label)) : String(label)}</div>
      <div className="flex items-center gap-2">
        <span className="inline-block w-3 h-0.5 rounded-full bg-viz-1" />
        <span className="text-sm font-semibold text-adm-ink tabular-nums">{format(v)}</span>
        <span className="text-adm-ink-2">{seriesLabel}</span>
      </div>
    </div>
  );
}

interface TrendChartProps {
  data: Array<{ date: string; value: number }>;
  seriesLabel: string;
  format?: (v: number) => string;
  height?: number;
  /** Format y-axis ticks as percentages. */
  percent?: boolean;
  /** Pin the y-axis to 0–100 (for rates that span the full scale). */
  fullScale?: boolean;
}

export function TrendChart({
  data,
  seriesLabel,
  format = (v) => fmtCompact(v),
  height = 240,
  percent,
  fullScale,
}: TrendChartProps) {
  if (data.length === 0) return <Empty height={height} />;
  // Percent axes that don't span 0–100 get rounded steps (0, 0.5, 1, 1.5%…).
  const pctTicks =
    percent && !fullScale ? niceTicks(Math.max(...data.map((d) => d.value))) : undefined;
  return (
    <div style={{ height }}>
      <ResponsiveContainer width="100%" height="100%" initialDimension={{ width: 320, height }}>
        <AreaChart data={data} margin={{ top: 8, right: 8, bottom: 0, left: 0 }}>
          <CartesianGrid vertical={false} stroke="var(--color-viz-grid)" strokeWidth={1} />
          <XAxis
            dataKey="date"
            tick={AXIS_TICK}
            tickFormatter={fmtDay}
            tickLine={false}
            axisLine={{ stroke: "var(--color-viz-axis)" }}
            minTickGap={28}
          />
          <YAxis
            tick={AXIS_TICK}
            tickFormatter={(v: number) => (percent ? pctTick(v) : fmtCompact(v))}
            tickLine={false}
            axisLine={false}
            width={44}
            allowDecimals={Boolean(percent && !fullScale)}
            domain={
              fullScale ? [0, 100] : pctTicks ? [0, pctTicks[pctTicks.length - 1]] : [0, "auto"]
            }
            ticks={fullScale ? [0, 25, 50, 75, 100] : pctTicks}
          />
          <Tooltip
            cursor={{ stroke: "var(--color-adm-muted)", strokeWidth: 1 }}
            content={<Tip seriesLabel={seriesLabel} format={format} labelFormat={fmtDay} />}
          />
          <Area
            type="monotone"
            dataKey="value"
            stroke="var(--color-viz-1)"
            strokeWidth={2}
            fill="var(--color-viz-1)"
            fillOpacity={0.1}
            dot={false}
            activeDot={{ r: 4, fill: "var(--color-viz-1)", stroke: "var(--color-adm-surface)", strokeWidth: 2 }}
            isAnimationActive={false}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}

export interface BarDatum {
  label: string;
  value: number;
  /** Render in the neutral gray (e.g. "no answer" buckets). */
  muted?: boolean;
}

interface BarsChartProps {
  data: BarDatum[];
  seriesLabel: string;
  format?: (v: number) => string;
  /** Format for the x-axis/tooltip label (dates use fmtDay). */
  labelFormat?: (l: string) => string;
  /** Longer label for the tooltip only (defaults to labelFormat). */
  tooltipLabel?: (l: string) => string;
  /** Values are percentages: % ticks on rounded steps. */
  percent?: boolean;
  height?: number;
  onBarClick?: (d: BarDatum) => void;
  minTickGap?: number;
}

export function BarsChart({
  data,
  seriesLabel,
  format = (v) => fmtCompact(v),
  labelFormat,
  tooltipLabel,
  percent,
  height = 240,
  onBarClick,
  minTickGap = 4,
}: BarsChartProps) {
  if (data.length === 0) return <Empty height={height} />;
  const pctTicks = percent ? niceTicks(Math.max(...data.map((d) => d.value))) : undefined;
  return (
    <div style={{ height }} className={onBarClick ? "cursor-pointer" : ""}>
      <ResponsiveContainer width="100%" height="100%" initialDimension={{ width: 320, height }}>
        <BarChart data={data} margin={{ top: 8, right: 8, bottom: 0, left: 0 }} barCategoryGap={2}>
          <CartesianGrid vertical={false} stroke="var(--color-viz-grid)" strokeWidth={1} />
          <XAxis
            dataKey="label"
            tick={AXIS_TICK}
            tickFormatter={labelFormat}
            tickLine={false}
            axisLine={{ stroke: "var(--color-viz-axis)" }}
            interval="preserveStartEnd"
            minTickGap={minTickGap}
          />
          <YAxis
            tick={AXIS_TICK}
            tickFormatter={(v: number) => (percent ? pctTick(v) : fmtCompact(v))}
            tickLine={false}
            axisLine={false}
            width={44}
            allowDecimals={Boolean(percent)}
            domain={pctTicks ? [0, pctTicks[pctTicks.length - 1]] : undefined}
            ticks={pctTicks}
          />
          <Tooltip
            cursor={{ fill: "var(--color-adm-hover)" }}
            content={
              <Tip seriesLabel={seriesLabel} format={format} labelFormat={tooltipLabel ?? labelFormat} />
            }
          />
          <Bar
            dataKey="value"
            radius={[4, 4, 0, 0]}
            maxBarSize={24}
            isAnimationActive={false}
            onClick={
              onBarClick
                ? (entry: { payload?: BarDatum }) => entry?.payload && onBarClick(entry.payload)
                : undefined
            }
          >
            {data.map((d, i) => (
              <Cell key={i} fill={d.muted ? "var(--color-viz-gray)" : "var(--color-viz-1)"} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

function Empty({ height }: { height: number }) {
  return (
    <div style={{ height }} className="flex items-center justify-center text-sm text-adm-muted">
      No data for this period yet.
    </div>
  );
}
