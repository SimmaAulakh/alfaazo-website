"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  useAdminAuth,
  signInWithGoogle,
  signOutAdmin,
} from "@/lib/admin-auth";

export default function AdminLoginPage() {
  const router = useRouter();
  const { user, isAdmin, loading } = useAdminAuth();
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  // Once an authorised admin is signed in, send them to the dashboard.
  useEffect(() => {
    if (!loading && isAdmin) router.replace("/admin");
  }, [loading, isAdmin, router]);

  async function handleSignIn() {
    setError(null);
    setBusy(true);
    try {
      await signInWithGoogle();
    } catch (e) {
      setError(e instanceof Error ? e.message : "Sign-in failed");
    } finally {
      setBusy(false);
    }
  }

  const signedInNonAdmin = !loading && user && !isAdmin;

  return (
    <div className="min-h-screen bg-adm-page font-sans flex items-center justify-center p-6">
      <div className="max-w-sm w-full text-center rounded-xl bg-adm-surface border border-adm-line p-8 shadow-sm">
        <h1 className="text-xl font-semibold text-adm-ink mb-2">
          Alfaazo Admin
        </h1>
        <p className="text-sm text-adm-muted mb-6">
          Private analytics dashboard. Sign in with the admin Google account.
        </p>

        {signedInNonAdmin ? (
          <>
            <p className="text-sm text-delta-down mb-4">
              {user.email} is not authorised for the admin dashboard.
            </p>
            <button
              onClick={() => signOutAdmin()}
              className="w-full rounded-lg bg-adm-accent text-white text-sm font-medium px-5 py-3 hover:bg-adm-accent-deep transition-colors"
            >
              Sign out & try another account
            </button>
          </>
        ) : (
          <button
            onClick={handleSignIn}
            disabled={busy || loading}
            className="w-full rounded-lg bg-adm-accent text-white text-sm font-medium px-5 py-3 hover:bg-adm-accent-deep transition-colors disabled:opacity-60"
          >
            {busy ? "Signing in…" : "Sign in with Google"}
          </button>
        )}

        {error && <p className="text-xs text-delta-down mt-4">{error}</p>}
      </div>
    </div>
  );
}
