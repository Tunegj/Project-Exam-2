"use client";

import NextLink from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import Button from "@/components/ui/Button";
import { log } from "console";

/**
 * Site header. Shows different links for guests, customers and venue managers.
 */
export default function Header() {
  const { user, isReady, logout } = useAuth();
  const router = useRouter();

  function handleLogout() {
    logout();
    router.push("/");
  }

  return (
    <header className="border-b">
      <nav
        aria-label="Main navigation"
        className="mx-auto flex max-w-6xl items-center justify-between p-4"
      >
        <NextLink href="/">Holidaze</NextLink>

        {isReady && (
          <ul className="flex items-center gap-4">
            <li>
              <NextLink href="/venues">Venues</NextLink>
            </li>

            {user ? (
              <>
                {user.venueManager && (
                  <li>
                    <NextLink href="/venues/create">Create venue</NextLink>
                  </li>
                )}
                <li>
                  <NextLink href="/profile">Profile</NextLink>
                </li>
                <li>
                  <Button variant="secondary" onClick={handleLogout}>
                    Log out
                  </Button>
                </li>
              </>
            ) : (
              <>
                <li>
                  <NextLink href="/login">Log in</NextLink>
                </li>
                <li>
                  <NextLink href="/register">Register</NextLink>
                </li>
              </>
            )}
          </ul>
        )}
      </nav>
    </header>
  );
}
