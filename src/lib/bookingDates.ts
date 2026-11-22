import type { VenueBooking as Booking } from "@/types/api";
import { format, parseISO, startOfDay } from "date-fns";

/** Turns bookings into date ranges the calendar can disable */

export function getBookedRanges(bookings: Booking[] = []) {
  return bookings.map((b) => ({
    from: startOfDay(parseISO(b.dateFrom)),
    to: startOfDay(parseISO(b.dateTo)),
  }));
}

/**
 * Formats a date as yyyy-MM-dd for the API
 * @param date - the date to format
 * @returns e.g "2024-06-15"
 */
export function toApiDate(date: Date): string {
  return format(date, "yyyy-MM-dd");
}

/**
 * Formats a date for display, e.g. "15 Jun 2024"
 * @param date - the date to format
 */
export function formatDisplayDate(date: Date): string {
  return format(date, "d MMM yyyy");
}
