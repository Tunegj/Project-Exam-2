import { formatPrice } from "@/lib/format";
import type { VenueDetails } from "@/types/api";
import { CalendarCheck, MapPin, Users } from "lucide-react";
import NextImage from "next/image";
import NextLink from "next/link";

type ManagerVenueProps = {
  venue: VenueDetails;
};

export default function ManagerVenueCard({ venue }: ManagerVenueProps) {
  const image = venue.media?.[0];
  const place = [venue.location?.city, venue.location?.country].filter(Boolean).join(", ");
  const bookingCount = venue.bookings?.length ?? 0;

  return (
    <article className="flex flex-col overflow-hidden rounded-xl bg-white">
      <NextLink href={`/venues/${venue.id}`} className="bg-coastal/10 relative block aspect-4/3">
        {image && (
          <NextImage
            src={image.url}
            alt={image.alt || venue.name}
            fill
            unoptimized
            className="object-cover"
          />
        )}
      </NextLink>

      <div className="flex flex-1 flex-col gap-1 p-4">
        <h3 className="text-navy font-serif text-xl">
          <NextLink href={`/venues/${venue.id}`} className="hover:underline">
            {venue.name}
          </NextLink>
        </h3>
        {place && (
          <p className="text-muted flex items-center gap-2 text-sm">
            <MapPin size={14} aria-hidden="true" /> {place}
          </p>
        )}
        <p className="text-muted flex items-center gap-2 text-sm">
          <Users size={14} aria-hidden="true" /> Up to {venue.maxGuests} guests
        </p>
        <p className="text-muted flex items-center gap-2 text-sm">
          <CalendarCheck size={14} aria-hidden="true" />
          {bookingCount === 1 ? "1 booking" : `${bookingCount} bookings`}
        </p>
        <p className="text-navy mt-1">
          <span className="font-medium">{formatPrice(venue.price)}</span> / night
        </p>

        <div className="mt-auto grid grid-cols-2 gap-3 pt-4">
          <NextLink
            href={`/venues/${venue.id}/bookings`}
            className="border-coastal text-coastal rounded-lg border px-3 py-2 text-center text-sm"
          >
            View bookings
          </NextLink>
          <NextLink
            href={`/venues/${venue.id}/edit`}
            className="border-coastal text-coastal rounded-lg border px-3 py-2 text-center text-sm"
          >
            Edit venue
          </NextLink>
        </div>
      </div>
    </article>
  );
}
