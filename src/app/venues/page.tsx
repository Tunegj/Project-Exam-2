import VenueList from "@/components/venues/VenueList";
import VenueSearch from "@/components/venues/VenueSearch";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Venues | Holidaze",
  description: "Browse holiday venues to book with Holidaze.",
};

type VenuesPageProps = {
  searchParams: Promise<{ q?: string }>;
};

export default async function VenuesPage({ searchParams }: VenuesPageProps) {
  const { q } = await searchParams;
  const query = q?.trim() ?? "";
  return (
    <main className="mx-auto max-w-7xl px-4 py-12">
      <VenueSearch initialQuery={query} live />
      <h1 className="mb-8 text-4xl">{query ? `Search results for "${query}"` : "All Venues"}</h1>
      <VenueList query={query} />
    </main>
  );
}
