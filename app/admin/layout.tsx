"use client";

import { useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import { useAdminAuth, signOutAdmin } from "@/lib/admin-auth";
import { AdminDataProvider } from "@/lib/admin/AdminData";
import AdminShell from "@/components/admin/shell/AdminShell";

function Centered({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-adm-page font-sans flex items-center justify-center p-6">
      {children}
    </div>
  );
}

function Skeleton() {
  return (
    <Centered>
      <div className="flex flex-col items-center gap-3 text-adm-muted">
        <div className="h-8 w-8 rounded-full border-2 border-adm-line border-t-adm-accent animate-spin" />
        <span className="text-sm">Loading…</span>
      </div>
    </Centered>
  );
}

function AccessDenied({ email }: { email: string | null }) {
  return (
    <Centered>
      <div className="max-w-sm text-center rounded-xl bg-adm-surface border border-adm-line p-8 shadow-sm">
        <h1 className="text-lg font-semibold text-adm-ink mb-2">Access denied</h1>
        <p className="text-sm text-adm-muted mb-1">
          {email ? `Signed in as ${email}.` : "Signed in."}
        </p>
        <p className="text-sm text-adm-muted mb-6">
          This account is not authorised to view the admin dashboard.
        </p>
        <button
          onClick={() => signOutAdmin()}
          className="rounded-lg bg-adm-accent text-white text-sm font-medium px-5 py-2.5 hover:bg-adm-accent-deep transition-colors"
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
    <AdminDataProvider>
      <AdminShell email={user.email} onSignOut={() => signOutAdmin()}>
        {children}
      </AdminShell>
    </AdminDataProvider>
  );
}
