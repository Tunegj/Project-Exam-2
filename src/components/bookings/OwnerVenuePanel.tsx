import { formatDisplayDate } from "@/lib/bookingDates";
import type { VenueBooking } from "@/types/api";
import { startOfDay } from "date-fns";
import NextLink from "next/link";

type OwnerVenuePanelProps = {
  bookings?: VenueBooking[];
  venueId: string;
};

export default function OwnerVenuePanel({ bookings = [], venueId }: OwnerVenuePanelProps) {
  const today = startOfDay(new Date());
  const upcoming = bookings
    .filter((b) => new Date(b.dateTo) >= today)
    .sort((a, b) => new Date(a.dateFrom).getTime() - new Date(b.dateFrom).getTime())
    .slice(0, 3);

  return (
    <div className="flex flex-col gap-4">
      <h3 className="text-navy font-medium">Upcoming bookings</h3>

      {upcoming.length === 0 ? (
        <p className="text-muted text-sm">No upcoming bookings yet.</p>
      ) : (
        <ul className="divide-sand/40 flex flex-col divide-y">
          {upcoming.map((booking) => (
            <li key={booking.id} className="py-3 text-sm">
              <p className="text-navy font-medium">
                {formatDisplayDate(new Date(booking.dateFrom))} –
                {formatDisplayDate(new Date(booking.dateTo))}
              </p>
            </li>
          ))}
        </ul>
      )}

      <NextLink href={`/venues/${venueId}/bookings`} className="text-coastal text-sm underline">
        See all bookings
      </NextLink>
      <NextLink
        href={`/venues/${venueId}/edit`}
        className="bg-coastal block w-full rounded-lg py-3 text-center text-white"
      >
        Edit venue
      </NextLink>
    </div>
  );
}
