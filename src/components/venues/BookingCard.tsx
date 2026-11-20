import { VenueBooking } from "@/types/api";
import BookingCalendar from "./BookingCalendar";

type BookinCardProps = {
  price: number;
  bookings?: VenueBooking[];
};

export default function BookingCard({ price, bookings }: BookinCardProps) {
  return (
    <aside id="booking" className="rounded-xl bg-white p-6 shadow-sm md:sticky md:top-8">
      <h2 className="mb-4 text-2xl">
        NOK {price.toLocaleString("nb-NO")} <span className="text-muted text-base">/ night</span>
      </h2>
      <p className="text-muted">Check availability</p>
      <BookingCalendar bookings={bookings} />
    </aside>
  );
}
