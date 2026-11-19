import VenueCard from "@/components/venues/VenueCard";
import VenueCardSkeleton from "@/components/venues/VenueCardSkeleton";
import type { Venue } from "@/types/api";
import NextLink from "next/link";

type VenueSectionProps = {
  title: string;
  venues: Venue[];
};

export default function VenueSection({ title, venues }: VenueSectionProps) {
  return (
    <section className="mb-16">
      <div className="mb-6 flex items-end justify-between gap-4">
        <h2 className="text-3xl">{title}</h2>
        <NextLink href="/venues" className="text-coastal whitespace-nowrap hover:underline">
          See all venues
        </NextLink>
      </div>
      {venues.length === 0 ? (
        <p className="text-muted">No venues to show yet.</p>
      ) : (
        <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {venues.map((venue) => (
            <li key={venue.id}>
              <VenueCard venue={venue} />
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}

export function VenueSectionSkeleton({ title }: { title: string }) {
  return (
    <section className="mb-16">
      <h2 className="mb-6 text-3xl">{title}</h2>
      <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {Array.from({ length: 4 }, (_, i) => (
          <li key={i}>
            <VenueCardSkeleton />
          </li>
        ))}
      </ul>
    </section>
  );
}
