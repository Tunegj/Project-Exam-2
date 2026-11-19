"use client";

import { useAuth } from "@/context/AuthContext";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Avatar from "../ui/Avatar";
import Button from "../ui/Button";
import MobileMenu from "./MobileMenu";

const navLink = "text-white hover:text-sand focus-visible:outline-2 focus-visible:outline-white";

/**
 * Site header: logo, search and links that change for guests, customers and venue managers.
 * On small screens, the navigation collapses into a mobile menu.
 */
export default function Header() {
  const { user, isReady, logout } = useAuth();
  const router = useRouter();

  function handleLogout() {
    logout();
    router.push("/");
  }

  return (
    <header className="bg-navy">
      <nav
        aria-label="Main navigation"
        className="mx-auto flex max-w-7xl items-center justify-between gap-6 px-4 py-3"
      >
        <Link href="/" className="font-serif text-[28px] text-white">
          Holidaze
        </Link>

        {isReady && (
          <>
            <ul className="hidden items-center gap-6 md:flex">
              <li>
                <Link href="/venues" className={navLink}>
                  Venues
                </Link>
              </li>

              {user ? (
                <>
                  {user.venueManager && (
                    <li>
                      <Link href="/profile" className={navLink}>
                        My venues
                      </Link>
                    </li>
                  )}
                  <li>
                    <Link href="/profile" className={`${navLink} flex items-center gap-2`}>
                      {user.avatar?.url && (
                        <Avatar name={user.name} avatar={user.avatar} className="size-7 text-xs" />
                      )}
                      Profile
                    </Link>
                  </li>
                  <li>
                    <Button variant="outline-light" onClick={handleLogout}>
                      Log out
                    </Button>
                  </li>
                </>
              ) : (
                <>
                  <li>
                    <Link href="/login" className={navLink}>
                      Log in
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/register"
                      className="bg-sand text-navy hover:bg-sand/90 inline-flex h-12 items-center rounded-lg px-6 font-medium"
                    >
                      Register
                    </Link>
                  </li>
                </>
              )}
            </ul>

            {<MobileMenu user={user} onLogout={handleLogout} />}
          </>
        )}
      </nav>
    </header>
  );
}
