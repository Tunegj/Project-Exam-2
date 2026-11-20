"use client";

import { getBookedRanges } from "@/lib/bookingDates";
import { VenueBooking } from "@/types/api";
import { startOfDay } from "date-fns";
import { useState } from "react";
import { DayPicker, type DateRange } from "react-day-picker";

export default function BookingCalendar({ bookings }: { bookings?: VenueBooking[] }) {
  const [range, setRange] = useState<DateRange | undefined>();
  const booked = getBookedRanges(bookings);
  const today = startOfDay(new Date());

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
          <span className="bg-muted/30 size-3 shrink-0 rounded-full" /> Booked
        </li>
      </ul>
    </div>
  );
}
