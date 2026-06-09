/**
 * Retention cohorts (D1 / D7 / D30) via the admin-only getRetention callable.
 * Computed live server-side from createdAt + dailyActivities history.
 */
"use client";

import { useEffect, useState } from "react";
import { httpsCallable } from "firebase/functions";
import { plFunctions } from "./pl-firebase";

export interface RetentionCohort {
  weekStart: string; // "YYYY-MM-DD" (Monday)
  size: number;
  d1: number | null; // % retained at D1, or null if no mature users
  d1n: number; // mature-user count (denominator)
  d7: number | null;
  d7n: number;
  d30: number | null;
  d30n: number;
}

export interface RetentionOverall {
  d1: number | null;
  d1n: number;
  d7: number | null;
  d7n: number;
  d30: number | null;
  d30n: number;
}

export interface RetentionResult {
  totalUsers: number;
  overall: RetentionOverall;
  cohorts: RetentionCohort[];
}

interface RetentionState {
  data: RetentionResult | null;
  loading: boolean;
  error: string | null;
}

export function useRetention(): RetentionState {
  const [state, setState] = useState<RetentionState>({
    data: null,
    loading: true,
    error: null,
  });

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const callable = httpsCallable<Record<string, never>, RetentionResult>(
          plFunctions(),
          "getRetention",
        );
        const res = await callable({});
        if (!cancelled) {
          setState({ data: res.data, loading: false, error: null });
        }
      } catch (e) {
        if (!cancelled) {
          setState({
            data: null,
            loading: false,
            error: e instanceof Error ? e.message : "Failed to load retention",
          });
        }
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  return state;
}
