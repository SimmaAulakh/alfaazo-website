"use client";

/**
 * Loads every data source the admin console needs ONCE (in the admin layout)
 * and shares it with all pages, so moving between sections never refetches.
 * Refresh keeps the previous data on screen while the new load runs.
 */
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  useSyncExternalStore,
} from "react";
import { fetchAggregates, type DailyAggregate } from "@/lib/aggregates";
import { fetchRetention, type RetentionResult } from "@/lib/retention";
import { getUsersCompletedAll, type CompletedAllResult } from "@/lib/admin-users";
import {
  FETCH_DAYS,
  RANGE_OPTIONS,
  sliceWindows,
  type RangeDays,
  type Windows,
} from "./metrics";

interface Source<T> {
  data: T | null;
  error: string | null;
  loading: boolean;
}

interface AdminDataValue {
  aggregates: Source<DailyAggregate[]>;
  retention: Source<RetentionResult>;
  completion: Source<CompletedAllResult>;
  /** Newest daily row (the snapshot every distribution chart shows). */
  latest: DailyAggregate | null;
  range: RangeDays;
  setRange: (r: RangeDays) => void;
  windows: Windows;
  refreshing: boolean;
  refresh: () => void;
  loadedAt: Date | null;
}

const Ctx = createContext<AdminDataValue | null>(null);
const RANGE_KEY = "alfaazo-admin-range";

function empty<T>(): Source<T> {
  return { data: null, error: null, loading: true };
}

const DEFAULT_RANGE: RangeDays = 30;

/**
 * The selected range lives in localStorage (a per-browser convenience only)
 * and is read through useSyncExternalStore, so server and first client render
 * agree on the default and the saved value takes over right after hydration.
 */
const rangeListeners = new Set<() => void>();
// Session fallback for when storage is blocked, so the picker still works.
let memoryRange: RangeDays | null = null;

function readSavedRange(): RangeDays | null {
  try {
    const saved = Number(window.localStorage.getItem(RANGE_KEY));
    if ((RANGE_OPTIONS as readonly number[]).includes(saved)) return saved as RangeDays;
  } catch {
    /* storage unavailable */
  }
  return null;
}

function rangeSnapshot(): RangeDays {
  return readSavedRange() ?? memoryRange ?? DEFAULT_RANGE;
}

function subscribeRange(cb: () => void) {
  rangeListeners.add(cb);
  window.addEventListener("storage", cb);
  return () => {
    rangeListeners.delete(cb);
    window.removeEventListener("storage", cb);
  };
}

function saveRange(r: RangeDays) {
  memoryRange = r;
  try {
    window.localStorage.setItem(RANGE_KEY, String(r));
  } catch {
    /* storage blocked — memoryRange covers this session */
  }
  rangeListeners.forEach((cb) => cb());
}

function message(e: unknown, fallback: string): string {
  return e instanceof Error ? e.message : fallback;
}

export function AdminDataProvider({ children }: { children: React.ReactNode }) {
  const [aggregates, setAggregates] = useState<Source<DailyAggregate[]>>(empty);
  const [retention, setRetention] = useState<Source<RetentionResult>>(empty);
  const [completion, setCompletion] = useState<Source<CompletedAllResult>>(empty);
  const range = useSyncExternalStore(subscribeRange, rangeSnapshot, () => DEFAULT_RANGE);
  const [loadKey, setLoadKey] = useState(0);
  const [loadedAt, setLoadedAt] = useState<Date | null>(null);

  const setRange = useCallback((r: RangeDays) => saveRange(r), []);

  useEffect(() => {
    let cancelled = false;

    const settle = <T,>(
      p: Promise<T>,
      set: React.Dispatch<React.SetStateAction<Source<T>>>,
      fallback: string,
    ) =>
      p.then(
        (data) => !cancelled && set({ data, error: null, loading: false }),
        (e) =>
          !cancelled &&
          set((s) => ({ data: s.data, error: message(e, fallback), loading: false })),
      );

    Promise.all([
      settle(fetchAggregates(FETCH_DAYS), setAggregates, "Failed to load metrics"),
      settle(fetchRetention(), setRetention, "Failed to load retention"),
      settle(getUsersCompletedAll(), setCompletion, "Failed to load course completion"),
    ]).then(() => !cancelled && setLoadedAt(new Date()));

    return () => {
      cancelled = true;
    };
  }, [loadKey]);

  const value = useMemo<AdminDataValue>(() => {
    const rows = aggregates.data ?? [];
    return {
      aggregates,
      retention,
      completion,
      latest: rows.length ? rows[rows.length - 1] : null,
      range,
      setRange,
      windows: sliceWindows(rows, range),
      refreshing: aggregates.loading || retention.loading || completion.loading,
      refresh: () => {
        // Keep current data visible; only flip the loading flags.
        setAggregates((s) => ({ ...s, loading: true }));
        setRetention((s) => ({ ...s, loading: true }));
        setCompletion((s) => ({ ...s, loading: true }));
        setLoadKey((k) => k + 1);
      },
      loadedAt,
    };
  }, [aggregates, retention, completion, range, setRange, loadedAt]);

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export function useAdminData(): AdminDataValue {
  const v = useContext(Ctx);
  if (!v) throw new Error("useAdminData must be used inside AdminDataProvider");
  return v;
}
