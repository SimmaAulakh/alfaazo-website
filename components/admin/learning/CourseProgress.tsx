"use client";

/**
 * Completion by course section and by unit for the Learning page.
 * Started/finished user counts come from the nightly aggregate
 * (sectionCompletion / unitCompletion); rows computed before that field
 * existed fall back to the average lesson completion, which is derivable from
 * the per-lesson data every row has.
 */
import { useState } from "react";
import type { DailyAggregate, ProgressCount } from "@/lib/aggregates";
import { SECTION_CATALOG, UNIT_CATALOG } from "@/lib/admin/lessonCatalog";
import { fmtDay, fmtInt, fmtPct } from "@/lib/admin/metrics";
import ChartCard from "@/components/admin/ui/ChartCard";
import { BarsChart } from "@/components/admin/ui/Charts";

function share(n: number, of: number): number {
  return of > 0 ? (n / of) * 100 : 0;
}

function avgLesson(ids: string[], done: Record<string, number>): number {
  return ids.length ? ids.reduce((s, id) => s + (done[id] ?? 0), 0) / ids.length : 0;
}

/** A labelled horizontal meter: fill = share of all users. */
function Meter({ label, value, count }: { label: string; value: number; count: number }) {
  return (
    <div className="flex flex-col gap-1">
      <div className="flex items-baseline justify-between gap-3 text-sm">
        <span className="text-adm-ink-2">{label}</span>
        <span>
          <span className="font-semibold text-adm-ink">{fmtPct(value)}</span>
          <span className="text-xs text-adm-muted"> · {fmtInt(count)} users</span>
        </span>
      </div>
      <div className="h-2 rounded-full bg-adm-page overflow-hidden" aria-hidden="true">
        <div className="h-full rounded-full bg-viz-1" style={{ width: `${Math.min(100, Math.max(value > 0 ? 1 : 0, value))}%` }} />
      </div>
    </div>
  );
}

export function SectionProgress({ latest }: { latest: DailyAggregate }) {
  const total = latest.totalUsers;
  const done = latest.lessonCompletion ?? {};
  return (
    <section className="grid grid-cols-1 lg:grid-cols-2 gap-4" aria-label="Completion by section">
      {SECTION_CATALOG.map((sec) => {
        const c: ProgressCount | undefined = latest.sectionCompletion?.[String(sec.number)];
        const ids = UNIT_CATALOG.filter((u) => u.section === sec.number).flatMap((u) => u.lessonIds);
        const finishRate = c && c.started > 0 ? share(c.completed, c.started) : null;
        return (
          <div key={sec.number} className="rounded-xl bg-adm-surface border border-adm-line p-4 sm:p-5 flex flex-col gap-4">
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="text-[11px] font-semibold uppercase tracking-wider text-adm-muted">
                  Section {sec.number}
                </p>
                <h2 className="text-[15px] font-semibold text-adm-ink">{sec.title}</h2>
                <p className="text-xs text-adm-muted mt-0.5">
                  {sec.unitIds.length} units · {sec.lessonCount} lessons
                </p>
              </div>
              <div className="text-right">
                <p className="text-2xl font-semibold text-adm-ink leading-none">
                  {finishRate == null ? fmtPct(avgLesson(ids, done)) : fmtPct(finishRate)}
                </p>
                <p className="text-xs text-adm-muted mt-1">
                  {finishRate == null ? "avg lesson completion" : "of starters finished"}
                </p>
              </div>
            </div>
            {c ? (
              <div className="flex flex-col gap-3">
                <Meter label="Started" value={share(c.started, total)} count={c.started} />
                <Meter label="Finished every lesson" value={share(c.completed, total)} count={c.completed} />
              </div>
            ) : (
              <p className="text-xs text-adm-muted">
                Started and finished counts appear after the nightly aggregate job runs with the updated function.
              </p>
            )}
          </div>
        );
      })}
    </section>
  );
}

type Metric = "completed" | "started" | "avg";
const METRIC_LABEL: Record<Metric, string> = {
  completed: "Finished",
  started: "Started",
  avg: "Avg lesson",
};

export function UnitProgress({ latest, dimmed }: { latest: DailyAggregate; dimmed?: boolean }) {
  const hasCounts = Boolean(latest.unitCompletion);
  const [picked, setPicked] = useState<Metric>("completed");
  const metric: Metric = hasCounts ? picked : "avg";
  const total = latest.totalUsers;
  const done = latest.lessonCompletion ?? {};

  const rows = UNIT_CATALOG.map((u) => {
    const c = latest.unitCompletion?.[u.id];
    return {
      key: `U${u.number}`,
      unit: `Unit ${u.number} · ${u.title}`,
      section: `${u.section} · ${u.sectionTitle}`,
      lessons: u.lessonIds.length,
      started: c?.started ?? null,
      startedPct: c ? share(c.started, total) : null,
      completed: c?.completed ?? null,
      completedPct: c ? share(c.completed, total) : null,
      finishRate: c && c.started > 0 ? share(c.completed, c.started) : null,
      avg: avgLesson(u.lessonIds, done),
    };
  });
  const byKey = new Map(rows.map((r) => [r.key, r]));
  const value = (r: (typeof rows)[number]) =>
    metric === "avg" ? r.avg : metric === "started" ? (r.startedPct ?? 0) : (r.completedPct ?? 0);

  const description =
    metric === "avg"
      ? "Average share of users who completed each unit’s lessons, in course order."
      : metric === "started"
        ? "Share of all users who completed at least one lesson in each unit, in course order."
        : "Share of all users who completed every lesson in each unit, in course order. The drop between units shows where learners stop.";

  const pct = (v: unknown) => fmtPct(Number(v));
  const int = (v: unknown) => fmtInt(Number(v));

  return (
    <ChartCard
      title="Completion by unit"
      description={description}
      badge={`Snapshot · ${fmtDay(latest.date)}`}
      dimmed={dimmed}
      csvName="alfaazo-unit-completion"
      actions={
        hasCounts ? (
          <div className="flex items-center rounded-lg bg-adm-page border border-adm-line p-0.5" role="radiogroup" aria-label="Measure">
            {(["completed", "started", "avg"] as Metric[]).map((m) => (
              <button
                key={m}
                type="button"
                role="radio"
                aria-checked={metric === m}
                onClick={() => setPicked(m)}
                className={`h-7 px-2.5 rounded-md text-xs font-medium transition-colors ${
                  metric === m ? "bg-adm-surface text-adm-ink shadow-sm" : "text-adm-muted hover:text-adm-ink"
                }`}
              >
                {METRIC_LABEL[m]}
              </button>
            ))}
          </div>
        ) : undefined
      }
      table={{
        columns: [
          { key: "unit", label: "Unit" },
          { key: "section", label: "Section" },
          { key: "lessons", label: "Lessons", align: "right" },
          { key: "started", label: "Started", align: "right", format: int },
          { key: "startedPct", label: "Started %", align: "right", format: pct },
          { key: "completed", label: "Finished", align: "right", format: int },
          { key: "completedPct", label: "Finished %", align: "right", format: pct },
          { key: "finishRate", label: "Finish rate", align: "right", format: pct },
          { key: "avg", label: "Avg lesson", align: "right", format: pct },
        ],
        rows,
      }}
    >
      <BarsChart
        data={rows.map((r) => ({ label: r.key, value: Number(value(r).toFixed(1)) }))}
        seriesLabel={
          metric === "avg" ? "avg lesson completion" : metric === "started" ? "of users started" : "of users finished"
        }
        format={(v) => fmtPct(v)}
        tooltipLabel={(k) => {
          const r = byKey.get(k);
          return r ? `${r.unit} · Section ${r.section}` : k;
        }}
        percent
        height={260}
      />
      {/* Section ruler: same left/right inset as the plot (y-axis 44px, margin 8px),
          each section as wide as its share of the equal-width unit bands. */}
      <div className="flex gap-1 pl-11 pr-2 mt-2" aria-hidden="true">
        {SECTION_CATALOG.map((sec) => (
          <div key={sec.number} style={{ flexGrow: sec.unitIds.length, flexBasis: 0 }} className="min-w-0">
            <div className="h-1 rounded-full bg-adm-line" />
            <p className="text-[11px] text-adm-muted mt-1 truncate">
              Section {sec.number} · {sec.title}
            </p>
          </div>
        ))}
      </div>
      {!hasCounts && (
        <p className="text-xs text-adm-muted mt-3">
          Showing average lesson completion. Started and finished counts per unit appear after the
          nightly aggregate job runs with the updated function.
        </p>
      )}
    </ChartCard>
  );
}
