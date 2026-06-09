/**
 * Admin drill-downs: fetch user lists via gated callables (admin-only,
 * server-side queries in punjabilingo-d02cc). Return minimal PII for display.
 */
"use client";

import { httpsCallable } from "firebase/functions";
import { plFunctions } from "./pl-firebase";

export interface AdminUser {
  uid: string;
  name: string | null;
  email: string | null;
  /** Optional badge, e.g. subscription plan ("monthly" | "yearly"). */
  plan?: string | null;
}

/** Back-compat alias. */
export type StreakUser = AdminUser;

export interface StreakUsersResult {
  streak: number;
  count: number;
  truncated: boolean;
  users: AdminUser[];
}

export interface PaidUsersResult {
  count: number;
  truncated: boolean;
  users: AdminUser[];
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

/** Users whose subscription.isPremium === true (with their plan). */
export async function getPaidUsers(): Promise<PaidUsersResult> {
  const callable = httpsCallable<Record<string, never>, PaidUsersResult>(
    plFunctions(),
    "getPaidUsers",
  );
  const res = await callable({});
  return res.data;
}
