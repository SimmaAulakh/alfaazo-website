"use client";

import { useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import { useAdminAuth, signOutAdmin } from "@/lib/admin-auth";

function Centered({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-cream flex items-center justify-center p-6">
      {children}
    </div>
  );
}

function Skeleton() {
  return (
    <Centered>
      <div className="flex flex-col items-center gap-3 text-text-secondary">
        <div className="h-8 w-8 rounded-full border-2 border-primary/30 border-t-primary animate-spin" />
        <span className="text-sm">Loading…</span>
      </div>
    </Centered>
  );
}

function AccessDenied({ email }: { email: string | null }) {
  return (
    <Centered>
      <div className="max-w-sm text-center rounded-2xl bg-surface border border-primary/10 p-8 shadow-sm">
        <h1 className="text-xl font-bold text-primary-dark mb-2">Access denied</h1>
        <p className="text-sm text-text-secondary mb-1">
          {email ? `Signed in as ${email}.` : "Signed in."}
        </p>
        <p className="text-sm text-text-secondary mb-6">
          This account is not authorised to view the admin dashboard.
        </p>
        <button
          onClick={() => signOutAdmin()}
          className="rounded-full bg-primary text-white text-sm font-medium px-5 py-2.5 hover:bg-primary-dark transition-colors"
        >
          Sign out
        </button>
      </div>
    </Centered>
  );
}

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();
  const { user, isAdmin, loading } = useAdminAuth();
  const isLoginRoute = pathname === "/admin/login";

  useEffect(() => {
    if (loading) return;
    if (!user && !isLoginRoute) router.replace("/admin/login");
  }, [loading, user, isLoginRoute, router]);

  // The login route renders its own UI (sign-in button / access-denied copy)
  // and must bypass the gate to avoid a redirect loop.
  if (isLoginRoute) return <>{children}</>;

  if (loading) return <Skeleton />;
  if (!user) return <Skeleton />; // redirecting to /admin/login
  if (!isAdmin) return <AccessDenied email={user.email} />;

  return (
    <div className="min-h-screen bg-cream">
      <header className="border-b border-primary/10 bg-surface">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <span className="font-heading text-lg font-bold text-primary-dark">
            Alfaazo Admin
          </span>
          <div className="flex items-center gap-4">
            <span className="text-xs text-text-secondary hidden sm:inline">
              {user.email}
            </span>
            <button
              onClick={() => signOutAdmin()}
              className="text-xs font-medium text-primary hover:text-primary-dark transition-colors"
            >
              Sign out
            </button>
          </div>
        </div>
      </header>
      <main className="max-w-6xl mx-auto px-6 py-8">{children}</main>
    </div>
  );
}
