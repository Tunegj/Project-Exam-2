"use client";

import type { SubmitEvent } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Search } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import MobileMenu from "./MobileMenu";
import Button from "../ui/Button";
import Avatar from "../ui/Avatar";

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

  function handleSearch(event: SubmitEvent<HTMLFormElement>) {
    event.preventDefault();
    const query = new FormData(event.currentTarget).get("q")?.toString().trim() ?? "";
    router.push(query ? `/venues?q=${encodeURIComponent(query)}` : "/venues");
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

        <form
          role="search"
          onSubmit={handleSearch}
          className="relative hidden w-full max-w-sm md:block"
        >
          <label htmlFor="header-search" className="sr-only">
            Search venues
          </label>
          <Search
            aria-hidden
            className="text-muted absolute top-1/2 left-3 size-5 -translate-y-1/2"
          />
          <input
            id="header-search"
            name="q"
            type="search"
            placeholder="Search..."
            className="text-navy focus:ring-sand h-10 w-full rounded-lg bg-white pr-4 pl-10 outline-none focus:ring-2"
          />
        </form>

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
