"use client";

import { useEffect, type ReactNode } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";

type RequireAuthProps = {
  children: ReactNode;
  managerOnly?: boolean;
};

/**
 * ONly shows its children to logged in users.
 * Guests are sent to /login. With `managerOnly`, customers are sent to profile.
 */
export default function RequireAuth({ children, managerOnly = false }: RequireAuthProps) {
  const { user, isReady } = useAuth();
  const router = useRouter();

  const isAllowed = user !== null && (!managerOnly || user.venueManager);

  useEffect(() => {
    if (!isReady) return;
    if (!user) router.replace("/login");
    else if (managerOnly && !user.venueManager) router.replace("/profile");
  }, [isReady, user, managerOnly, router]);

  if (!isReady || !isAllowed) {
    return <p className="text-muted py-12 text-center">Loading...</p>;
  }

  return <>{children}</>;
}
