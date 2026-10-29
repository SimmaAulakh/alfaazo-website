"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import Icon from "../ui/Icon";
import { NAV, itemForPath } from "./nav";
import { useAdminData } from "@/lib/admin/AdminData";
import { RANGE_OPTIONS, fmtDay } from "@/lib/admin/metrics";

function Brand() {
  return (
    <Link href="/admin" className="flex items-center gap-2.5 px-2">
      <span className="h-8 w-8 rounded-lg bg-adm-accent text-white grid place-items-center text-sm font-bold">
        A
      </span>
      <span className="leading-tight">
        <span className="block text-sm font-semibold text-adm-ink">Alfaazo</span>
        <span className="block text-[11px] text-adm-muted">Admin console</span>
      </span>
    </Link>
  );
}

function SidebarNav({ onNavigate }: { onNavigate?: () => void }) {
  const pathname = usePathname();
  const active = itemForPath(pathname);
  return (
    <nav className="flex flex-col gap-5" aria-label="Admin sections">
      {NAV.map((g, gi) => (
        <div key={gi} className="flex flex-col gap-0.5">
          {g.heading && (
            <span className="px-3 pb-1 text-[11px] font-semibold uppercase tracking-wider text-adm-muted">
              {g.heading}
            </span>
          )}
          {g.items.map((item) => {
            const isActive = item.href === active.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={onNavigate}
                aria-current={isActive ? "page" : undefined}
                className={`flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-colors ${
                  isActive
                    ? "bg-adm-accent-wash text-adm-accent-deep font-semibold"
                    : "text-adm-ink-2 hover:bg-adm-hover hover:text-adm-ink"
                }`}
              >
                <Icon name={item.icon} size={17} />
                {item.label}
              </Link>
            );
          })}
        </div>
      ))}
    </nav>
  );
}

function Account({ email, onSignOut }: { email: string | null; onSignOut: () => void }) {
  return (
    <div className="border-t border-adm-line pt-3 flex items-center gap-2">
      <span className="h-8 w-8 rounded-full bg-adm-hover text-adm-ink-2 grid place-items-center text-xs font-semibold uppercase shrink-0">
        {(email ?? "?").charAt(0)}
      </span>
      <span className="text-xs text-adm-ink-2 truncate flex-1" title={email ?? undefined}>
        {email}
      </span>
      <button
        type="button"
        onClick={onSignOut}
        className="h-8 w-8 grid place-items-center rounded-lg text-adm-muted hover:text-adm-ink hover:bg-adm-hover transition-colors"
        title="Sign out"
      >
        <Icon name="logout" size={16} />
        <span className="sr-only">Sign out</span>
      </button>
    </div>
  );
}

function RangePicker() {
  const { range, setRange } = useAdminData();
  return (
    <div className="flex items-center rounded-lg bg-adm-surface border border-adm-line p-0.5" role="radiogroup" aria-label="Date range">
      {RANGE_OPTIONS.map((r) => (
        <button
          key={r}
          type="button"
          role="radio"
          aria-checked={range === r}
          onClick={() => setRange(r)}
          className={`h-7 px-2.5 sm:px-3 rounded-md text-xs font-medium transition-colors ${
            range === r ? "bg-adm-accent text-white" : "text-adm-ink-2 hover:bg-adm-hover"
          }`}
        >
          {r}D
        </button>
      ))}
    </div>
  );
}

export default function AdminShell({
  email,
  onSignOut,
  children,
}: {
  email: string | null;
  onSignOut: () => void;
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const page = itemForPath(pathname);
  const { latest, refresh, refreshing, range } = useAdminData();
  // The drawer remembers the route it was opened on, so it closes by itself
  // whenever the route changes (including back/forward).
  const [drawerPath, setDrawerPath] = useState<string | null>(null);
  const drawer = drawerPath === pathname;
  const setDrawer = (open: boolean) => setDrawerPath(open ? pathname : null);

  // Close the mobile drawer on Escape.
  useEffect(() => {
    if (!drawer) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setDrawerPath(null);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [drawer]);

  return (
    <div className="min-h-screen bg-adm-page text-adm-ink font-sans">
      {/* Desktop sidebar */}
      <aside className="hidden lg:flex fixed inset-y-0 left-0 w-60 flex-col gap-6 border-r border-adm-line bg-adm-surface px-3 py-5">
        <Brand />
        <div className="flex-1 overflow-y-auto">
          <SidebarNav />
        </div>
        <Account email={email} onSignOut={onSignOut} />
      </aside>

      {/* Mobile drawer */}
      {drawer && (
        <div className="lg:hidden fixed inset-0 z-40">
          <div className="absolute inset-0 bg-adm-ink/30" onClick={() => setDrawer(false)} />
          <aside className="absolute inset-y-0 left-0 w-64 flex flex-col gap-6 bg-adm-surface px-3 py-5 shadow-xl">
            <div className="flex items-center justify-between">
              <Brand />
              <button
                type="button"
                onClick={() => setDrawer(false)}
                className="h-9 w-9 grid place-items-center rounded-lg text-adm-ink-2 hover:bg-adm-hover"
              >
                <Icon name="close" />
                <span className="sr-only">Close menu</span>
              </button>
            </div>
            <div className="flex-1 overflow-y-auto">
              <SidebarNav onNavigate={() => setDrawer(false)} />
            </div>
            <Account email={email} onSignOut={onSignOut} />
          </aside>
        </div>
      )}

      <div className="lg:pl-60">
        {/* Top bar */}
        <header className="sticky top-0 z-30 bg-adm-page/90 backdrop-blur border-b border-adm-line">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center gap-3">
            <button
              type="button"
              onClick={() => setDrawer(true)}
              className="lg:hidden h-9 w-9 -ml-1 grid place-items-center rounded-lg text-adm-ink-2 hover:bg-adm-hover"
              aria-expanded={drawer}
            >
              <Icon name="menu" />
              <span className="sr-only">Open menu</span>
            </button>
            <div className="min-w-0 flex-1">
              <h1 className="text-lg font-semibold text-adm-ink truncate">{page.label}</h1>
              <p className="hidden md:block text-xs text-adm-muted truncate">{page.description}</p>
            </div>
            <span className="hidden xl:inline text-xs text-adm-muted">
              {latest ? `Data through ${fmtDay(latest.date)} (UTC)` : ""}
            </span>
            <div className="hidden sm:block">
              <RangePicker />
            </div>
            <button
              type="button"
              onClick={refresh}
              disabled={refreshing}
              className="h-8 w-8 grid place-items-center rounded-lg border border-adm-line bg-adm-surface text-adm-ink-2 hover:text-adm-ink hover:bg-adm-hover disabled:opacity-60 transition-colors"
              title="Refresh data"
            >
              <Icon name="refresh" size={15} className={refreshing ? "animate-spin" : ""} />
              <span className="sr-only">Refresh data</span>
            </button>
          </div>
        </header>

        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 lg:py-8">
          <div className="xl:hidden flex flex-wrap items-center justify-between gap-3 mb-4">
            <p className="text-xs text-adm-muted">
              {latest ? `Last ${range} days · data through ${fmtDay(latest.date)} (UTC)` : ""}
            </p>
            <div className="sm:hidden">
              <RangePicker />
            </div>
          </div>
          {children}
        </main>
      </div>
    </div>
  );
}
