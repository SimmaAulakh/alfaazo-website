"use client";

import { useEffect, useMemo, useState } from "react";
import type { AdminUser } from "@/lib/admin-users";
import Icon from "./ui/Icon";

interface UserListModalProps {
  open: boolean;
  title: string;
  loading: boolean;
  error: string | null;
  users: AdminUser[];
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
  const [q, setQ] = useState("");
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  const shown = useMemo(() => {
    const needle = q.trim().toLowerCase();
    if (!needle) return users;
    return users.filter((u) =>
      [u.name, u.email, u.uid].some((f) => f?.toLowerCase().includes(needle)),
    );
  }, [users, q]);

  if (!open) return null;

  async function copyEmails() {
    const emails = shown.map((u) => u.email).filter(Boolean).join(", ");
    try {
      await navigator.clipboard?.writeText(emails);
      setCopied(true);
    } catch {
      /* clipboard blocked — nothing to do */
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-adm-ink/40" onClick={onClose}>
      <div
        role="dialog"
        aria-modal="true"
        aria-label={title}
        className="w-full max-w-lg max-h-[80vh] flex flex-col rounded-xl bg-adm-surface shadow-2xl border border-adm-line font-sans"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between gap-3 px-5 py-4 border-b border-adm-line">
          <h3 className="text-[15px] font-semibold text-adm-ink">{title}</h3>
          <button
            type="button"
            onClick={onClose}
            autoFocus
            className="h-8 w-8 grid place-items-center rounded-lg text-adm-muted hover:text-adm-ink hover:bg-adm-hover"
          >
            <Icon name="close" size={16} />
            <span className="sr-only">Close</span>
          </button>
        </div>

        {!loading && !error && users.length > 6 && (
          <div className="px-5 pt-3">
            <label className="flex items-center gap-2 h-9 px-3 rounded-lg border border-adm-line bg-adm-page text-adm-muted focus-within:border-adm-accent">
              <Icon name="search" size={15} />
              <input
                value={q}
                onChange={(e) => setQ(e.target.value)}
                placeholder="Search name, email or uid"
                className="flex-1 bg-transparent text-sm text-adm-ink outline-none placeholder:text-adm-muted"
              />
            </label>
          </div>
        )}

        <div className="flex-1 overflow-y-auto px-5 py-2">
          {loading ? (
            <div className="flex items-center gap-3 text-adm-muted text-sm py-8 justify-center">
              <div className="h-5 w-5 rounded-full border-2 border-adm-line border-t-adm-accent animate-spin" />
              Loading users…
            </div>
          ) : error ? (
            <p className="text-sm text-delta-down py-4">{error}</p>
          ) : shown.length === 0 ? (
            <p className="text-sm text-adm-muted py-6 text-center">No users found.</p>
          ) : (
            <ul className="flex flex-col divide-y divide-adm-line">
              {shown.map((u) => (
                <li key={u.uid} className="py-3 flex flex-col gap-0.5">
                  <span className="text-sm font-medium text-adm-ink flex items-center gap-2">
                    {u.name || <span className="text-adm-muted italic font-normal">No name</span>}
                    {u.plan && (
                      <span className="text-[10px] font-semibold uppercase tracking-wide px-2 py-0.5 rounded-full bg-adm-accent-wash text-adm-accent-deep">
                        {u.plan}
                      </span>
                    )}
                  </span>
                  <span className="text-xs text-adm-ink-2 break-all">{u.email || "—"}</span>
                  <span className="text-[11px] font-mono text-adm-muted break-all">{u.uid}</span>
                </li>
              ))}
            </ul>
          )}
        </div>

        {!loading && !error && users.length > 0 && (
          <div className="flex items-center justify-between gap-3 px-5 py-3 border-t border-adm-line">
            <span className="text-xs text-adm-muted">
              {shown.length === users.length
                ? `${users.length} user${users.length === 1 ? "" : "s"}`
                : `${shown.length} of ${users.length} users`}
              {truncated ? " · first 1,000 only" : ""}
            </span>
            <button
              type="button"
              onClick={copyEmails}
              className="text-xs font-medium text-adm-accent hover:text-adm-accent-deep transition-colors"
            >
              {copied ? "Copied" : "Copy emails"}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
