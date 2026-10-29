"use client";

import { useState } from "react";
import Icon from "./Icon";

export interface TableColumn {
  key: string;
  label: string;
  align?: "left" | "right";
  format?: (v: unknown) => string;
}

export interface TableData {
  columns: TableColumn[];
  /** Plain row objects; each column reads `row[column.key]`. */
  rows: readonly object[];
}

interface ChartCardProps {
  title: string;
  description?: string;
  /** Small tag beside the title, e.g. "Snapshot · Oct 28". */
  badge?: string;
  /** Equivalent table for the chart (accessibility + export). */
  table?: TableData;
  /** File name for the CSV export (without extension). */
  csvName?: string;
  /** Extra controls on the right of the header. */
  actions?: React.ReactNode;
  /** Dim the body while new data loads, without collapsing the layout. */
  dimmed?: boolean;
  className?: string;
  children: React.ReactNode;
}

function field(row: object, key: string): unknown {
  return (row as Record<string, unknown>)[key];
}

function cellText(col: TableColumn, v: unknown): string {
  if (v == null) return "—";
  return col.format ? col.format(v) : String(v);
}

function downloadCsv(name: string, t: TableData) {
  const esc = (s: string) => (/[",\n]/.test(s) ? `"${s.replace(/"/g, '""')}"` : s);
  const lines = [
    t.columns.map((c) => esc(c.label)).join(","),
    ...t.rows.map((r) =>
      t.columns.map((c) => {
        const v = field(r, c.key);
        return esc(v == null ? "" : String(v));
      }).join(","),
    ),
  ];
  const blob = new Blob([lines.join("\n") + "\n"], { type: "text/csv;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `${name}.csv`;
  a.click();
  URL.revokeObjectURL(url);
}

export function DataTable({ table, maxHeight = 320 }: { table: TableData; maxHeight?: number }) {
  return (
    <div className="overflow-auto rounded-lg border border-adm-line" style={{ maxHeight }}>
      <table className="w-full text-sm border-collapse">
        <thead className="sticky top-0 bg-adm-page">
          <tr>
            {table.columns.map((c) => (
              <th
                key={c.key}
                scope="col"
                className={`px-3 py-2 text-xs font-medium text-adm-ink-2 border-b border-adm-line ${
                  c.align === "right" ? "text-right" : "text-left"
                }`}
              >
                {c.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {table.rows.map((r, i) => (
            <tr key={i} className="border-b border-adm-line/70 last:border-0">
              {table.columns.map((c) => (
                <td
                  key={c.key}
                  className={`px-3 py-1.5 text-adm-ink ${
                    c.align === "right" ? "text-right tabular-nums" : "text-left"
                  }`}
                >
                  {cellText(c, field(r, c.key))}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default function ChartCard({
  title,
  description,
  badge,
  table,
  csvName,
  actions,
  dimmed,
  className = "",
  children,
}: ChartCardProps) {
  const [view, setView] = useState<"chart" | "table">("chart");
  const btn = (active: boolean) =>
    `inline-flex items-center justify-center h-7 w-7 rounded-md transition-colors ${
      active ? "bg-adm-surface text-adm-ink shadow-sm" : "text-adm-muted hover:text-adm-ink"
    }`;
  return (
    <section
      className={`rounded-xl bg-adm-surface border border-adm-line p-4 sm:p-5 flex flex-col min-w-0 ${className}`}
    >
      <header className="flex items-start justify-between gap-3 mb-4">
        <div className="min-w-0">
          <div className="flex flex-wrap items-center gap-2">
            <h2 className="text-[15px] font-semibold text-adm-ink">{title}</h2>
            {badge && (
              <span className="text-[11px] font-medium text-adm-ink-2 bg-adm-page border border-adm-line rounded-full px-2 py-0.5">
                {badge}
              </span>
            )}
          </div>
          {description && <p className="text-[13px] text-adm-muted mt-1">{description}</p>}
        </div>
        <div className="flex items-center gap-2 shrink-0">
          {actions}
          {table && (
            <div className="flex items-center gap-0.5 rounded-lg bg-adm-page border border-adm-line p-0.5" role="group" aria-label="View as">
              <button type="button" className={btn(view === "chart")} onClick={() => setView("chart")} aria-pressed={view === "chart"} title="Chart">
                <Icon name="chart" size={15} />
                <span className="sr-only">Chart view</span>
              </button>
              <button type="button" className={btn(view === "table")} onClick={() => setView("table")} aria-pressed={view === "table"} title="Table">
                <Icon name="table" size={15} />
                <span className="sr-only">Table view</span>
              </button>
            </div>
          )}
          {table && csvName && (
            <button
              type="button"
              onClick={() => downloadCsv(csvName, table)}
              className="inline-flex items-center justify-center h-8 w-8 rounded-lg border border-adm-line text-adm-muted hover:text-adm-ink hover:bg-adm-hover transition-colors"
              title="Download CSV"
            >
              <Icon name="download" size={15} />
              <span className="sr-only">Download CSV</span>
            </button>
          )}
        </div>
      </header>
      <div className={`flex-1 min-w-0 transition-opacity ${dimmed ? "opacity-50" : ""}`}>
        {view === "table" && table ? <DataTable table={table} /> : children}
      </div>
    </section>
  );
}
