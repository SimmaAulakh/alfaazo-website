"use client";

import { useAdminData } from "@/lib/admin/AdminData";

/**
 * Gate for pages built on the daily aggregates: a spinner on first load, a
 * clear error if nothing could load, and an inline warning if a refresh
 * failed while older data is still on screen.
 */
export default function PageStatus({ children }: { children: React.ReactNode }) {
  const { aggregates, latest } = useAdminData();

  if (!aggregates.data && aggregates.loading) {
    return (
      <div className="flex items-center gap-3 text-adm-muted text-sm py-24 justify-center">
        <div className="h-5 w-5 rounded-full border-2 border-adm-line border-t-adm-accent animate-spin" />
        Loading metrics…
      </div>
    );
  }
  if (!aggregates.data && aggregates.error) {
    return (
      <div className="rounded-xl bg-adm-surface border border-delta-down/30 p-6 max-w-xl">
        <p className="text-sm font-semibold text-delta-down mb-1">Couldn’t load analytics</p>
        <p className="text-xs text-adm-ink-2 break-words">{aggregates.error}</p>
        <p className="text-xs text-adm-muted mt-3">
          Check the punjabilingo-d02cc web config and admin uid env vars, and that the
          admin_aggregates Firestore rule allows your account.
        </p>
      </div>
    );
  }
  if (!latest) {
    return (
      <p className="text-sm text-adm-muted py-24 text-center">
        No daily metrics yet. They appear after the nightly aggregate job has run.
      </p>
    );
  }
  return (
    <>
      {aggregates.error && (
        <p className="mb-4 rounded-lg border border-delta-down/30 bg-adm-surface px-3 py-2 text-xs text-delta-down">
          Refresh failed: {aggregates.error}. Showing the last data that loaded.
        </p>
      )}
      {children}
    </>
  );
}
