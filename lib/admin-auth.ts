/**
 * Admin authentication against the punjabilingo-d02cc project.
 *
 * The frontend uid check here is UX only (show/hide the dashboard). The real
 * security boundary is the `admin_aggregates` Firestore rule in the backend,
 * which only lets the admin uid read the data.
 */
"use client";

import { useEffect, useState } from "react";
import {
  onAuthStateChanged,
  signInWithPopup,
  signOut,
  type User,
} from "firebase/auth";
import { plAuth, googleProvider } from "./pl-firebase";

const ADMIN_UID = process.env.NEXT_PUBLIC_ADMIN_UID;

export interface AdminAuthState {
  user: User | null;
  isAdmin: boolean;
  loading: boolean;
}

/**
 * Subscribes to the pl-project auth state and reports whether the signed-in
 * user is the configured admin.
 */
export function useAdminAuth(): AdminAuthState {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsub = onAuthStateChanged(plAuth(), (u) => {
      setUser(u);
      setLoading(false);
    });
    return unsub;
  }, []);

  const isAdmin = Boolean(user && ADMIN_UID && user.uid === ADMIN_UID);

  return { user, isAdmin, loading };
}

export async function signInWithGoogle(): Promise<void> {
  await signInWithPopup(plAuth(), googleProvider);
}

export async function signOutAdmin(): Promise<void> {
  await signOut(plAuth());
}
