"use client";
import Button from "@/components/ui/Button";
import BookingConfirmModal from "@/components/venues/BookingConfirmModal";
import { useAuth } from "@/context/AuthContext";
import { ApiError } from "@/lib/api";
import { formatDisplayDate, getBookedRanges, toApiDate } from "@/lib/bookingDates";
import { createBooking } from "@/lib/bookings";
import type { VenueBooking } from "@/types/api";
import { differenceInCalendarDays, startOfDay } from "date-fns";
import { Minus, Plus } from "lucide-react";
import NextLink from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { DayPicker, type DateRange } from "react-day-picker";

type BookingCalendarProps = {
  bookings?: VenueBooking[];
  price: number;
  maxGuests: number;
  ownerName?: string;
  venueId: string;
};

export default function BookingCalendar({
  bookings,
  price,
  maxGuests,
  ownerName,
  venueId,
}: BookingCalendarProps) {
  const [range, setRange] = useState<DateRange | undefined>();
  const [guests, setGuests] = useState(1);
  const booked = getBookedRanges(bookings);
  const today = startOfDay(new Date());

  const nights = range?.from && range?.to ? differenceInCalendarDays(range.to, range.from) : 0;
  const total = nights * price;

  const { user } = useAuth();
  const isOwner = !!user && user.name === ownerName;
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const router = useRouter();
  const [successMessage, setSuccessMessage] = useState("");

  const summary =
    range?.from && range?.to
      ? [
          `Booking as ${user?.name}`,
          `${formatDisplayDate(range.from)} – ${formatDisplayDate(range.to)}`,
          `${nights} ${nights === 1 ? "night" : "nights"} · ${guests} ${guests === 1 ? "guest" : "guests"}`,
          `Total: NOK ${total.toLocaleString("nb-NO")}`,
        ].join("\n")
      : "";

  async function handleConfirm() {
    if (!user || !range?.from || !range?.to) return;
    setIsLoading(true);
    setError("");
    try {
      await createBooking(
        {
          venueId,
          guests,
          dateFrom: toApiDate(range.from),
          dateTo: toApiDate(range.to),
        },
        user.accessToken,
      );
      setIsConfirmOpen(false);
      setSuccessMessage("Your booking is confirmed! 🎉");
      setRange(undefined);
      setGuests(1);
      router.refresh();
    } catch (err) {
      setError(err instanceof ApiError ? err.message : "Something went wrong. Please try again.");
    } finally {
      setIsLoading(false);
    }
  }

  const bookLabel = !range?.from
    ? "Select check-in date"
    : nights === 0
      ? "Select check-out date"
      : "Book now";

  return (
    <div>
      <DayPicker
        mode="range"
        selected={range}
        onSelect={(newRange) => {
          setRange(newRange);
          setSuccessMessage("");
        }}
        disabled={[{ before: today }, ...booked]}
        excludeDisabled
        modifiers={{ booked }}
        modifiersClassNames={{ booked: "booked" }}
        startMonth={today}
        weekStartsOn={1}
        navLayout="around"
      />
      <ul className="text-muted mt-3 flex flex-wrap gap-4 text-sm">
        <li className="flex items-center gap-2">
          <span className="bg-coastal size-3 rounded-full" />
          Selected
        </li>
        <li className="flex items-center gap-2">
          <span className="border-navy size-3 rounded-full border" />
          Available
        </li>
        <li className="flex items-center gap-2">
          <span className="bg-ivory border-muted/30 size-3 shrink-0 rounded-full border" />
          Booked
        </li>
      </ul>
      {!isOwner && (
        <>
          <div className="mt-6 flex items-center justify-between">
            <span id="guests-label" className="text-sm">
              Guests
            </span>
            <div role="group" aria-labelledby="guests-label" className="flex items-center gap-4">
              <button
                type="button"
                onClick={() => setGuests((g) => g - 1)}
                disabled={guests <= 1}
                aria-label="fewer guests"
                className="border-coastal text-coastal rounded-full border p-1 disabled:opacity-30"
              >
                <Minus aria-hidden className="size-5" />
              </button>
              <span aria-live="polite">{guests}</span>
              <button
                type="button"
                onClick={() => setGuests((g) => g + 1)}
                disabled={guests >= maxGuests}
                aria-label="More guests"
                className="border-coastal text-coastal rounded-full border p-1 disabled:opacity-30"
              >
                <Plus aria-hidden className="size-5" />
              </button>
            </div>
          </div>

          {nights > 0 && (
            <p className="mt-4">
              Total: NOK {total.toLocaleString("nb-NO")} ({nights}{" "}
              {nights === 1 ? "night" : "nights"})
            </p>
          )}
        </>
      )}

      {successMessage && (
        <p role="status" className="bg-sage/10 text-sage mt-6 rounded-lg p-3 text-sm">
          {successMessage}
        </p>
      )}

      {isOwner ? (
        <p className="text-muted mt-6 text-sm">Upcoming bookings for your venue</p>
      ) : user ? (
        <Button
          className="mt-6 w-full"
          disabled={nights === 0}
          onClick={() => setIsConfirmOpen(true)}
        >
          {bookLabel}
        </Button>
      ) : (
        <NextLink
          href="/login"
          className="bg-coastal mt-6 block w-full rounded-lg py-3 text-center text-white"
        >
          Log in to book
        </NextLink>
      )}
      <BookingConfirmModal
        isOpen={isConfirmOpen}
        onClose={() => {
          setIsConfirmOpen(false);
          setError("");
        }}
        onConfirm={handleConfirm}
        isLoading={isLoading}
        error={error}
        summary={summary}
      />
    </div>
  );
}
