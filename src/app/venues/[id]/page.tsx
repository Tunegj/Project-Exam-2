import BookingCard from "@/components/bookings/BookingCard";
import Avatar from "@/components/ui/Avatar";
import VenueAmenities from "@/components/venues/VenueAmenities";
import VenueDescription from "@/components/venues/VenueDescription";
import VenueGallery from "@/components/venues/VenueGallery";
import { ApiError } from "@/lib/api";
import { formatPrice } from "@/lib/format";
import { getVenue } from "@/lib/venues";
import { MapPin, Star, Users } from "lucide-react";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { cache } from "react";

type VenuePageProps = {
  params: Promise<{ id: string }>;
};

/** Gets the venue once per request, or shows the 404 page if it doesn't exist. */
const loadVenue = cache(async (id: string) => {
  try {
    return await getVenue(id);
  } catch (error) {
    if (error instanceof ApiError && error.status === 404) notFound();
    throw error;
  }
});

export async function generateMetadata({ params }: VenuePageProps): Promise<Metadata> {
  const { id } = await params;
  const venue = await loadVenue(id);

  return {
    title: `${venue.name} | Holidaze`,
    description: venue.description.slice(0, 155),
  };
}

export default async function VenuePage({ params }: VenuePageProps) {
  const { id } = await params;
  const venue = await loadVenue(id);
  const { city, country } = venue.location;
  const place = [city, country].filter(Boolean).join(", ") || "Location unkown";

  return (
    <main className="mx-auto max-w-7xl px-4 py-12">
      <h1 className="mb-2 text-4xl">{venue.name}</h1>
      <p className="text-muted mb-6 flex items-center gap-1">
        <MapPin aria-hidden className="size-4" />
        {place}
      </p>
      <VenueGallery media={venue.media} name={venue.name} />

      <div className="grid gap-8 md:grid-cols-[1fr_22rem] md:items-start">
        <div>
          <ul className="text-muted mb-8 flex flex-col gap-1 text-sm">
            <li className="flex items-center gap-2">
              <Star
                aria-hidden
                className={`text-sand size-5 ${venue.rating > 0 ? "fill-sand" : ""}`}
              />
              {venue.rating > 0 ? venue.rating.toFixed(1) : "No ratings yet"}
            </li>
            <li className="flex items-center gap-2">
              <Users aria-hidden className="size-5" />
              Up to {venue.maxGuests} guests
            </li>
            <li className="text-navy text-xl font-medium">
              {formatPrice(venue.price)}{" "}
              <span className="text-muted text-base font-normal">/ night</span>
            </li>
          </ul>
          <VenueAmenities meta={venue.meta} />
          <VenueDescription text={venue.description} />

          {venue.owner && (
            <div className="mb-8 flex items-center gap-3">
              <Avatar
                name={venue.owner.name}
                avatar={venue.owner.avatar}
                className="size-10 text-sm"
              />
              <p className="text-muted text-sm">
                Hosted by <span className="text-navy font-medium">{venue.owner.name}</span>
              </p>
            </div>
          )}
        </div>
        <BookingCard
          price={venue.price}
          bookings={venue.bookings}
          maxGuests={venue.maxGuests}
          ownerName={venue.owner?.name}
          venueId={venue.id}
        />
      </div>
    </main>
  );
}
