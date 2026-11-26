"use client";

import { useAuth } from "@/context/AuthContext";
import { formatPrice } from "@/lib/format";
import { VenueBooking } from "@/types/api";
import BookingCalendar from "./BookingCalendar";

type BookinCardProps = {
  price: number;
  maxGuests: number;
  bookings?: VenueBooking[];
  ownerName?: string;
  venueId: string;
};

export default function BookingCard({
  price,
  bookings,
  maxGuests,
  ownerName,
  venueId,
}: BookinCardProps) {
  const { user } = useAuth();
  const isOwner = !!user && user.name === ownerName;

  return (
    <aside id="booking" className="rounded-xl bg-white p-6 shadow-sm md:sticky md:top-8">
      {isOwner ? (
        <h2 className="mb-4 text-2xl">Your venue</h2>
      ) : (
        <>
          <h2 className="mb-4 text-2xl">
            {formatPrice(price)} <span className="text-muted text-base">/ night</span>
          </h2>
          <p className="text-muted">Check availability</p>
        </>
      )}
      <BookingCalendar
        bookings={bookings}
        price={price}
        maxGuests={maxGuests}
        ownerName={ownerName}
        venueId={venueId}
      />
    </aside>
  );
}
