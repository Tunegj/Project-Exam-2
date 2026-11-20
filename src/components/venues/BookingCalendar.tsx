"use client";

import Button from "@/components/ui/Button";
import { useAuth } from "@/context/AuthContext";
import { getBookedRanges } from "@/lib/bookingDates";
import type { VenueBooking } from "@/types/api";
import { differenceInCalendarDays, startOfDay } from "date-fns";
import { Minus, Plus } from "lucide-react";
import NextLink from "next/link";
import { useState } from "react";
import { DayPicker, type DateRange } from "react-day-picker";

type BookingCalendarProps = {
  bookings?: VenueBooking[];
  price: number;
  maxGuests: number;
  ownerName?: string;
};

export default function BookingCalendar({
  bookings,
  price,
  maxGuests,
  ownerName,
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

  return (
    <div>
      <DayPicker
        mode="range"
        selected={range}
        onSelect={setRange}
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
          Total: NOK {total.toLocaleString("nb-NO")} ({nights} {nights === 1 ? "night" : "nights"})
        </p>
      )}

      {isOwner ? (
        <p className="text-muted mt-6 text-sm">This is your venue, so you can't book it.</p>
      ) : user ? (
        <Button
          className="mt-6 w-full"
          disabled={nights === 0}
          onClick={() => setIsConfirmOpen(true)}
        >
          Book now
        </Button>
      ) : (
        <NextLink
          href="/login"
          className="bg-coastal mt-6 block w-full rounded-lg py-3 text-center text-white"
        >
          Log in to book
        </NextLink>
      )}
    </div>
  );
}
