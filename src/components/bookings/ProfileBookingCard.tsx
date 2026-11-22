import { formatDisplayDate } from "@/lib/bookingDates";
import { formatPrice } from "@/lib/format";
import { ProfileBooking } from "@/types/api";
import { differenceInCalendarDays } from "date-fns";
import { BadgeCheck, CalendarDays, ChevronRight, MapPin, Users } from "lucide-react";
import NextImage from "next/image";
import NextLink from "next/link";

type ProfileBookingCardProps = {
  booking: ProfileBooking;
  isPast?: boolean;
};

export default function ProfileBookingCard({ booking, isPast = false }: ProfileBookingCardProps) {
  const { venue, dateFrom, dateTo, guests } = booking;
  const city = venue.location?.city;
  const image = venue.media?.[0];
  const nights = differenceInCalendarDays(new Date(dateTo), new Date(dateFrom));
  const total = nights * venue.price;

  return (
    <NextLink
      href={`/venues/${venue.id}`}
      className="flex items-center gap-4 rounded-xl bg-white p-3 transition hover:shadow-md"
    >
      <div className="bg-ivory relative size-20 shrink-0 overflow-hidden rounded-lg">
        {image && (
          <NextImage
            src={image.url}
            alt={image.alt || venue.name}
            fill
            unoptimized
            className="object-cover"
          />
        )}
      </div>
      <div className="min-w-0 flex-1">
        <h3 className="text-navy truncate font-medium">{venue.name}</h3>
        <p className="text-muted mt-1 flex items-center gap-1.5 text-sm">
          <CalendarDays aria-hidden className="size-4" />
          {formatDisplayDate(new Date(dateFrom))} – {formatDisplayDate(new Date(dateTo))}
        </p>
        <p className="text-muted mt-1 flex items-center gap-1.5 text-xs">
          <Users aria-hidden className="size-4" />
          {guests} {guests === 1 ? "guest" : "guests"}
          {city && (
            <>
              <span aria-hidden>·</span>
              <MapPin aria-hidden className="size-4" />
              {city}
            </>
          )}
        </p>
        <p className="text-navy mt-1 text-sm font-medium">{formatPrice(total)}</p>
      </div>

      {isPast ? (
        <BadgeCheck aria-label="Completed stay" className="text-sand size-5 shrink-0" />
      ) : (
        <ChevronRight aria-hidden className="text-muted size-5 shrink-0" />
      )}
    </NextLink>
  );
}
