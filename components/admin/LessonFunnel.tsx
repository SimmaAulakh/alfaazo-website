"use client";

import type { LessonCompletion } from "@/lib/aggregates";

/** "lesson_sentence_structure" → "lesson sentence structure". */
function prettyLesson(id: string): string {
  return id.replace(/_/g, " ");
}

export default function LessonFunnel({
  completion,
}: {
  completion: LessonCompletion;
}) {
  // Lessons aren't a single linear sequence (numbered core + themed units), so
  // we rank by completion rather than implying a strict funnel order.
  const rows = Object.entries(completion)
    .map(([id, pct]) => ({ id, pct }))
    .sort((a, b) => b.pct - a.pct);

  const maxPct = rows.length > 0 ? rows[0].pct || 1 : 1;

  return (
    <div className="rounded-2xl bg-surface border border-primary/10 p-5 shadow-sm">
      <h3 className="text-sm font-semibold text-primary-dark mb-1">
        Lesson completion
      </h3>
      <p className="text-xs text-text-secondary mb-4">
        % of all users who’ve completed each lesson, most to least. The lessons
        at the bottom are the least-reached content — where engagement drops off.
      </p>

      {rows.length === 0 ? (
        <p className="text-sm text-text-secondary py-4">No lesson data yet.</p>
      ) : (
        <ul className="flex flex-col gap-2">
          {rows.map((r) => (
            <li key={r.id} className="flex items-center gap-3">
              <span className="w-36 shrink-0 text-xs font-medium text-warm-brown capitalize truncate">
                {prettyLesson(r.id)}
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
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
