"use client";

import type { LessonCompletion } from "@/lib/aggregates";

/** Extract the numeric part of "lesson_12" for ordering. */
function lessonNum(id: string): number {
  const m = id.match(/(\d+)/);
  return m ? parseInt(m[1], 10) : Number.MAX_SAFE_INTEGER;
}

export default function LessonFunnel({
  completion,
}: {
  completion: LessonCompletion;
}) {
  const rows = Object.entries(completion)
    .map(([id, pct]) => ({ id, pct, n: lessonNum(id) }))
    .sort((a, b) => a.n - b.n);

  return (
    <div className="rounded-2xl bg-surface border border-primary/10 p-5 shadow-sm">
      <h3 className="text-sm font-semibold text-primary-dark mb-1">
        Lesson drop-off funnel
      </h3>
      <p className="text-xs text-text-secondary mb-4">
        % of all users who’ve completed each lesson, in order. “continued” is how
        many of the previous lesson’s finishers reached this one — low values mark
        where learners drop off.
      </p>

      {rows.length === 0 ? (
        <p className="text-sm text-text-secondary py-4">No lesson data yet.</p>
      ) : (
        <ul className="flex flex-col gap-2.5">
          {rows.map((r, i) => {
            const prev = i > 0 ? rows[i - 1].pct : null;
            const continued =
              prev && prev > 0 ? Math.round((r.pct / prev) * 100) : null;
            const bigDrop = continued != null && continued < 50;
            const maxPct = rows[0].pct || 1;
            return (
              <li key={r.id} className="flex items-center gap-3">
                <span className="w-16 shrink-0 text-xs font-medium text-warm-brown">
                  {r.id.replace("_", " ")}
                </span>
                <div className="flex-1 h-4 rounded-md bg-primary/10 overflow-hidden">
                  <div
                    className="h-full rounded-md bg-primary/70"
                    style={{ width: `${Math.max(1.5, (r.pct / maxPct) * 100)}%` }}
                  />
                </div>
                <span className="w-12 shrink-0 text-right text-xs font-semibold text-primary-dark tabular-nums">
                  {r.pct}%
                </span>
                <span
                  className={`w-28 shrink-0 text-right text-[11px] ${
                    bigDrop
                      ? "text-streak-orange font-semibold"
                      : "text-text-secondary"
                  }`}
                >
                  {continued != null ? `${continued}% continued` : "start"}
                </span>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
