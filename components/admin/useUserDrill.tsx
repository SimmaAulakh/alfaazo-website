"use client";

import { useState } from "react";
import UserListModal from "./UserListModal";
import type { AdminUser } from "@/lib/admin-users";

interface Drill {
  title: string;
  loading: boolean;
  error: string | null;
  users: AdminUser[];
  truncated: boolean;
}

/** A user-list drill-down: call `open(title, fetcher)`, render `modal`. */
export function useUserDrill() {
  const [drill, setDrill] = useState<Drill | null>(null);
  // Bumped on every open so the modal remounts with fresh search/copy state.
  const [openCount, setOpenCount] = useState(0);

  async function open(
    title: string,
    fetcher: () => Promise<{ users: AdminUser[]; truncated: boolean }>,
  ) {
    setOpenCount((n) => n + 1);
    setDrill({ title, loading: true, error: null, users: [], truncated: false });
    try {
      const res = await fetcher();
      setDrill({ title, loading: false, error: null, users: res.users, truncated: res.truncated });
    } catch (e) {
      setDrill({
        title,
        loading: false,
        error: e instanceof Error ? e.message : "Failed to load users",
        users: [],
        truncated: false,
      });
    }
  }

  const modal = (
    <UserListModal
      key={openCount}
      open={drill !== null}
      title={drill?.title ?? ""}
      loading={drill?.loading ?? false}
      error={drill?.error ?? null}
      users={drill?.users ?? []}
      truncated={drill?.truncated}
      onClose={() => setDrill(null)}
    />
  );

  return { open, modal };
}
