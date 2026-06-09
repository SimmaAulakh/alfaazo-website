/**
 * Admin drill-down: fetch the users on a given streak via the gated
 * getUsersByStreak callable (admin-only, server-side query in
 * punjabilingo-d02cc). Returns minimal PII for display in the dashboard.
 */
"use client";

import { httpsCallable } from "firebase/functions";
import { plFunctions } from "./pl-firebase";

export interface StreakUser {
  uid: string;
  name: string | null;
  email: string | null;
}

export interface StreakUsersResult {
  streak: number;
  count: number;
  truncated: boolean;
  users: StreakUser[];
}

/**
 * @param streak exact streak day-count (use 90 for the "90+" overflow bucket).
 */
export async function getUsersByStreak(
  streak: number,
): Promise<StreakUsersResult> {
  const callable = httpsCallable<{ streak: number }, StreakUsersResult>(
    plFunctions(),
    "getUsersByStreak",
  );
  const res = await callable({ streak });
  return res.data;
}
