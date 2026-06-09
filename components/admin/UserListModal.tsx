"use client";

import { useEffect } from "react";
import type { StreakUser } from "@/lib/admin-users";

interface UserListModalProps {
  open: boolean;
  title: string;
  loading: boolean;
  error: string | null;
  users: StreakUser[];
  truncated?: boolean;
  onClose: () => void;
}

export default function UserListModal({
  open,
  title,
  loading,
  error,
  users,
  truncated,
  onClose,
}: UserListModalProps) {
  // Close on Escape.
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  if (!open) return null;

  const emails = users.map((u) => u.email).filter(Boolean).join(", ");

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-ink/40"
      onClick={onClose}
    >
      <div
        className="w-full max-w-lg max-h-[80vh] flex flex-col rounded-2xl bg-surface shadow-xl border border-primary/10"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-primary/10">
          <h3 className="text-sm font-semibold text-primary-dark">{title}</h3>
          <button
            onClick={onClose}
            className="text-text-secondary hover:text-primary-dark transition-colors text-lg leading-none"
            aria-label="Close"
          >
            ✕
          </button>
        </div>

        {/* Body */}
        <div className="flex-1 overflow-y-auto px-5 py-4">
          {loading ? (
            <div className="flex items-center gap-3 text-text-secondary text-sm py-6 justify-center">
              <div className="h-5 w-5 rounded-full border-2 border-primary/30 border-t-primary animate-spin" />
              Loading users…
            </div>
          ) : error ? (
            <p className="text-sm text-streak-orange py-4">{error}</p>
          ) : users.length === 0 ? (
            <p className="text-sm text-text-secondary py-4">No users on this streak.</p>
          ) : (
            <ul className="flex flex-col divide-y divide-primary/5">
              {users.map((u) => (
                <li key={u.uid} className="py-3 flex flex-col gap-0.5">
                  <span className="text-sm font-medium text-ink">
                    {u.name || <span className="text-text-secondary italic">No name</span>}
                  </span>
                  <span className="text-xs text-warm-brown/80 break-all">
                    {u.email || "—"}
                  </span>
                  <span className="text-[11px] font-mono text-text-secondary break-all">
                    {u.uid}
                  </span>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Footer */}
        {!loading && !error && users.length > 0 && (
          <div className="flex items-center justify-between gap-3 px-5 py-3 border-t border-primary/10">
            <span className="text-xs text-text-secondary">
              {users.length} user{users.length === 1 ? "" : "s"}
              {truncated ? " (showing first 1000)" : ""}
            </span>
            <button
              onClick={() => navigator.clipboard?.writeText(emails)}
              className="text-xs font-medium text-primary hover:text-primary-dark transition-colors"
            >
              Copy all emails
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
