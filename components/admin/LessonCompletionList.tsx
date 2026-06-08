"use client";

import type { LessonCompletion } from "@/lib/aggregates";

interface LessonCompletionListProps {
  title: string;
  completion: LessonCompletion;
  topN?: number;
}

/** Natural sort for "lesson_2" < "lesson_10". */
function lessonNum(id: string): number {
  const m = id.match(/(\d+)/);
  return m ? parseInt(m[1], 10) : Number.MAX_SAFE_INTEGER;
}

export default function LessonCompletionList({
  title,
  completion,
  topN = 10,
}: LessonCompletionListProps) {
  const rows = Object.entries(completion)
    .map(([id, pct]) => ({ id, pct }))
    .sort((a, b) => b.pct - a.pct || lessonNum(a.id) - lessonNum(b.id))
    .slice(0, topN);

  return (
    <div className="rounded-2xl bg-surface border border-primary/10 p-5 shadow-sm">
      <h3 className="text-sm font-semibold text-primary-dark mb-4">{title}</h3>
      {rows.length === 0 ? (
        <p className="text-sm text-text-secondary">No lesson data yet.</p>
      ) : (
        <ul className="flex flex-col gap-3">
          {rows.map((r) => (
            <li key={r.id} className="flex items-center gap-3">
              <span className="w-20 shrink-0 text-xs font-medium text-warm-brown">
                {r.id.replace("_", " ")}
              </span>
              <div className="flex-1 h-2.5 rounded-full bg-primary/10 overflow-hidden">
                <div
                  className="h-full rounded-full bg-primary"
                  style={{ width: `${Math.min(100, r.pct)}%` }}
                />
              </div>
              <span className="w-12 shrink-0 text-right text-xs font-semibold text-primary-dark">
                {r.pct}%
              </span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
