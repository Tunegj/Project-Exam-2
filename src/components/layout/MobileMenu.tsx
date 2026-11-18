"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import Button from "../ui/Button";
import type { LoginResponse } from "@/types/auth";

type MobileMenuProps = {
  user: LoginResponse | null;
  onLogout: () => void;
};

const menuLink = "block py-3 text-white hover:text-sand";

export default function MobileMenu({ user, onLogout }: MobileMenuProps) {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (!isOpen) return;

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") setIsOpen(false);
    }

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isOpen]);

  function close() {
    setIsOpen(false);
  }

  function handleLogout() {
    close();
    onLogout();
  }

  return (
    <div className="md:hidden">
      <button
        type="button"
        onClick={() => setIsOpen(true)}
        aria-label="Open menu"
        aria-expanded={isOpen}
        aria-controls="mobile-menu"
        className="p-2 text-white"
      >
        <Menu aria-hidden className="size-6" />
      </button>

      {isOpen && (
        <div id="mobile-menu" className="bg-navy fixed inset-0 z-50 flex flex-col px-4 py-3">
          <div className="flex items-center justify-between">
            <Link href="/" onClick={close} className="font-serif text-[28px] text-white">
              Holidaze
            </Link>
            <button
              type="button"
              onClick={close}
              aria-label="Close menu"
              className="p-2 text-white"
            >
              <X aria-hidden className="size-6" />
            </button>
          </div>

          <ul className="mt-6">
            <li>
              <Link href="/venues" onClick={close} className={menuLink}>
                Venues
              </Link>
            </li>

            {user ? (
              <>
                <li>
                  <Link href="/profile" onClick={close} className={menuLink}>
                    My profile
                  </Link>
                </li>
                <li>
                  <Link href="/profile" onClick={close} className={menuLink}>
                    My bookings
                  </Link>
                </li>
                {user.venueManager && (
                  <>
                    <li>
                      <Link href="/profile" onClick={close} className={menuLink}>
                        My venues
                      </Link>
                    </li>
                    <li>
                      <Link href="/venues/create" onClick={close} className={menuLink}>
                        Create venue
                      </Link>
                    </li>
                  </>
                )}
                <li className="mt-4">
                  <Button variant="outline-light" onClick={handleLogout}>
                    Log out
                  </Button>
                </li>
              </>
            ) : (
              <>
                <li>
                  <Link href="/login" onClick={close} className={menuLink}>
                    Log in
                  </Link>
                </li>
                <li className="mt-4">
                  <Link
                    href="/register"
                    onClick={close}
                    className="bg-sand text-navy hover:bg-sand/90 inline-flex h-12 items-center rounded-lg px-6 font-medium"
                  >
                    Register
                  </Link>
                </li>
              </>
            )}
          </ul>
        </div>
      )}
    </div>
  );
}
