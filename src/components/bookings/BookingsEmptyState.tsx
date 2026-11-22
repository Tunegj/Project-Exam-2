import { CalendarDays } from "lucide-react";
import NextLink from "next/link";

export default function BookingsEmptyState() {
  return (
    <div className="flex flex-col items-center rounded-xl bg-white p-10 text-center">
      <CalendarDays aria-hidden className="text-muted size-10" />
      <h3 className="mt-4 text-2xl">No bookings yet</h3>
      <p className="text-muted mt-2 text-sm">When you book a stay, it will show up here</p>
      <NextLink href="/venues" className="bg-coastal mt-6 rounded-lg px-6 py-3 text-white">
        Browse venues
      </NextLink>
    </div>
  );
}
