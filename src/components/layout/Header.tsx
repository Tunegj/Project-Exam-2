import Link from "next/link";

/**
 * Placeholder header component for the Holidaze application.
 */
export default function Header() {
  return (
    <header className="border-b">
      <nav
        aria-label="Main navigation"
        className="mx-auto flex max-w-6xl items-center justify-between p-4"
      >
        <Link href="/" className="text-xl font-bold">
          Holidaze
        </Link>
        <ul className="flex gap-4">
          <li>
            <Link href="/login">Login</Link>
          </li>
          <li>
            <Link href="/register">Register</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}
