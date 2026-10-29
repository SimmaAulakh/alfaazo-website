"use client";

import { useMemo, useState } from "react";
import { useAdminData } from "@/lib/admin/AdminData";
import { fmtDay, fmtInt, fmtPct, prettyLesson } from "@/lib/admin/metrics";
import PageStatus from "@/components/admin/ui/PageStatus";
import StatTile from "@/components/admin/ui/StatTile";
import ChartCard from "@/components/admin/ui/ChartCard";
import Icon from "@/components/admin/ui/Icon";
import { LESSON_CATALOG } from "@/lib/admin/lessonCatalog";
import { SectionProgress, UnitProgress } from "@/components/admin/learning/CourseProgress";
import { useUserDrill } from "@/components/admin/useUserDrill";

type Sort = "course" | "most" | "least";

interface LessonRow {
  id: string;
  name: string;
  /** Course position (catalog order); unknown ids sort last. */
  order: number;
  unitLabel: string;
  pct: number;
}

function Learning() {
  const { latest, completion, refreshing } = useAdminData();
  const drill = useUserDrill();
  const [q, setQ] = useState("");
  const [sort, setSort] = useState<Sort>("course");

  // Every lesson in the course (0% if nobody has finished it yet), plus any
  // completed lesson id the catalog doesn't know about (e.g. a newer app build).
  const allRows = useMemo<LessonRow[]>(() => {
    const done = latest?.lessonCompletion ?? {};
    const known = new Set(LESSON_CATALOG.map((l) => l.id));
    return [
      ...LESSON_CATALOG.map((l, i) => ({
        id: l.id,
        name: l.title,
        order: i,
        unitLabel: `Unit ${l.unit} · ${l.unitTitle}`,
        pct: done[l.id] ?? 0,
      })),
      ...Object.keys(done)
        .filter((id) => !known.has(id))
        .map((id, i) => ({ id, name: prettyLesson(id), order: 10_000 + i, unitLabel: "Not in catalog", pct: done[id] })),
    ];
  }, [latest]);

  const rows = useMemo(() => {
    const needle = q.trim().toLowerCase();
    const filtered = needle
      ? allRows.filter((r) =>
          [r.name, r.id, r.unitLabel].some((f) => f.toLowerCase().includes(needle)),
        )
      : allRows;
    return [...filtered].sort((a, b) =>
      sort === "course" ? a.order - b.order : sort === "most" ? b.pct - a.pct : a.pct - b.pct,
    );
  }, [allRows, q, sort]);

  if (!latest) return null;
  const c = completion.data;
  const values = allRows.map((r) => r.pct);
  const reached = values.filter((v) => v > 0).length;
  const maxPct = Math.max(1, ...values);
  const mean = values.length ? values.reduce((a, b) => a + b, 0) / values.length : 0;

  return (
    <div className="flex flex-col gap-6">
      <section className="grid grid-cols-2 xl:grid-cols-4 gap-3 sm:gap-4">
        <StatTile label="Lessons in the course" value={c ? fmtInt(c.totalLessons) : "—"} hint={c ? `${fmtInt(reached)} completed by at least one user` : undefined} />
        <StatTile
          label="Finished every lesson"
          value={c ? fmtInt(c.completedAllCount) : completion.loading ? "…" : "—"}
          hint={c ? `of ${fmtInt(latest.totalUsers)} users` : completion.error ?? undefined}
          onClick={
            c && c.completedAllCount > 0
              ? () => drill.open(`Finished all ${c.totalLessons} lessons`, async () => c)
              : undefined
          }
        />
        <StatTile label="Within 5 of finishing" value={c ? fmtInt(c.nearDoneCount) : "—"} hint={c ? `missing 5 or fewer of ${c.totalLessons}` : undefined} />
        <StatTile label="Average lesson completion" value={fmtPct(mean)} hint="share of users, averaged across lessons" />
      </section>

      <SectionProgress latest={latest} />
      <UnitProgress latest={latest} dimmed={refreshing} />

      <ChartCard
        title="Completion by lesson"
        description="Share of all users who have completed each lesson. In course order, the drop-off shows where learners stop."
        badge={`Snapshot · ${fmtDay(latest.date)}`}
        dimmed={refreshing}
        csvName="alfaazo-lesson-completion"
        actions={
          <div className="hidden md:flex items-center gap-2">
            <label className="flex items-center gap-2 h-8 px-2.5 rounded-lg border border-adm-line bg-adm-page text-adm-muted focus-within:border-adm-accent">
              <Icon name="search" size={14} />
              <input
                value={q}
                onChange={(e) => setQ(e.target.value)}
                placeholder="Find a lesson"
                aria-label="Find a lesson"
                className="w-32 bg-transparent text-xs text-adm-ink outline-none placeholder:text-adm-muted"
              />
            </label>
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value as Sort)}
              aria-label="Sort lessons"
              className="h-8 rounded-lg border border-adm-line bg-adm-surface px-2 text-xs text-adm-ink-2"
            >
              <option value="course">Course order</option>
              <option value="most">Most completed</option>
              <option value="least">Least completed</option>
            </select>
          </div>
        }
        table={{
          columns: [
            { key: "name", label: "Lesson" },
            { key: "unitLabel", label: "Unit" },
            { key: "id", label: "Lesson id" },
            { key: "pct", label: "Completed by", align: "right", format: (v) => fmtPct(Number(v)) },
          ],
          rows,
        }}
      >
        {/* Phone controls (the header ones are hidden below md) */}
        <div className="md:hidden flex gap-2 mb-3">
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Find a lesson"
            aria-label="Find a lesson"
            className="flex-1 h-9 rounded-lg border border-adm-line bg-adm-page px-3 text-sm text-adm-ink outline-none focus:border-adm-accent"
          />
          <select
            value={sort}
            onChange={(e) => setSort(e.target.value as Sort)}
            aria-label="Sort lessons"
            className="h-9 rounded-lg border border-adm-line bg-adm-surface px-2 text-sm text-adm-ink-2"
          >
            <option value="course">Course order</option>
            <option value="most">Most</option>
            <option value="least">Least</option>
          </select>
        </div>
        {rows.length === 0 ? (
          <p className="text-sm text-adm-muted py-10 text-center">
            {values.length ? "No lessons match." : "No lesson data yet."}
          </p>
        ) : (
          <ol className="flex flex-col max-h-[560px] overflow-y-auto -mx-1 px-1">
            {rows.map((r, i) => (
              <li key={r.id} className="grid grid-cols-[2rem_minmax(0,16rem)_1fr_3.5rem] items-center gap-3 py-1.5 border-b border-adm-line/60 last:border-0">
                <span className="text-xs text-adm-muted tabular-nums text-right">{i + 1}</span>
                <span className="min-w-0">
                  <span className="block text-sm text-adm-ink truncate" title={r.name}>{r.name}</span>
                  <span className="block text-[11px] text-adm-muted truncate" title={r.id}>{r.unitLabel}</span>
                </span>
                <span className="h-2.5 rounded-full bg-adm-page overflow-hidden" aria-hidden="true">
                  <span
                    className="block h-full rounded-full bg-viz-1"
                    style={{ width: `${Math.max(1.5, (r.pct / maxPct) * 100)}%` }}
                  />
                </span>
                <span className="text-sm font-semibold text-adm-ink tabular-nums text-right">{fmtPct(r.pct)}</span>
              </li>
            ))}
          </ol>
        )}
      </ChartCard>
      {drill.modal}
    </div>
  );
}

export default function LearningPage() {
  return (
    <PageStatus>
      <Learning />
    </PageStatus>
  );
}
