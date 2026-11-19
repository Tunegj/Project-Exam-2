"use client";
import { useDebounce } from "@/hooks/useDebounce";
import { Search } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState, type SubmitEvent } from "react";

export default function VenueSearch({
  initialQuery = "",
  live = false,
}: {
  initialQuery?: string;
  live?: boolean;
}) {
  const router = useRouter();
  const pathName = usePathname();
  const [text, setText] = useState(initialQuery);
  const debouncedText = useDebounce(text.trim(), 400);

  useEffect(() => {
    if (!live || debouncedText === initialQuery) return;

    const url = debouncedText ? `${pathName}?q=${encodeURIComponent(debouncedText)}` : pathName;
    router.replace(url, { scroll: false });
  }, [debouncedText, initialQuery, pathName, router, live]);

  function handleSubmit(event: SubmitEvent<HTMLFormElement>) {
    event.preventDefault();
    const query = text.trim();
    router.push(query ? `/venues?q=${encodeURIComponent(query)}` : "/venues");
  }

  return (
    <form role="search" onSubmit={handleSubmit} className="relative mb-8 w-full max-w-md">
      <label htmlFor="header-search" className="sr-only">
        Search venues
      </label>
      <Search aria-hidden className="text-muted absolute top-1/2 left-3 size-5 -translate-y-1/2" />
      <input
        id="header-search"
        name="q"
        type="search"
        placeholder="Search for venues..."
        className="text-navy focus:ring-coastal border-muted h-10 w-full rounded-lg border bg-white pr-4 pl-10 outline-none focus:ring-2"
        value={text}
        onChange={(event) => setText(event.target.value)}
      />
    </form>
  );
}
