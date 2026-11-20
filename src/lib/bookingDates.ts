import type { VenueBooking as Booking } from "@/types/api";
import { parseISO, startOfDay } from "date-fns";

/** Turns bookings into date ranges the calendar can disable */

export function getBookedRanges(bookings: Booking[] = []) {
  return bookings.map((b) => ({
    from: startOfDay(parseISO(b.dateFrom)),
    to: startOfDay(parseISO(b.dateTo)),
  }));
}
