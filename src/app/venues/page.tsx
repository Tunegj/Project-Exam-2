import VenueList from "@/components/venues/VenueList";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Venues | Holidaze",
  description: "Browse holiday venues to book with Holidaze.",
};

export default function VenuesPage() {
  return (
    <main className="mx-auto max-w-7xl px-4 py-12">
      <h1 className="mb-8 text-4xl">All Venues</h1>
      <VenueList />
    </main>
  );
}
