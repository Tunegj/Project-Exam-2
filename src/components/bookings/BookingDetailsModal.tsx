"use client";

import { useAuth } from "@/context/AuthContext";
import { formatDisplayDate } from "@/lib/bookingDates";
import { deleteBooking } from "@/lib/bookings";
import { formatPrice } from "@/lib/format";
import type { ProfileBooking } from "@/types/api";
import { differenceInCalendarDays } from "date-fns";
import NextLink from "next/link";
import { useEffect, useRef, useState } from "react";
import Button from "../ui/Button";

type BookingDetailsModalProps = {
  booking: ProfileBooking;
  onClose: () => void;
  onCancelled: (id: string) => void;
};

/**
 * Popup with one booking's details and actions.
 * @param props.booking - the booking, with its venue
 * @param props.onClose - called when the popup closes
 * @param props.onCancelled - called after the booking is cancelled
 */
export default function BookingDetailsModal({
  booking,
  onClose,
  onCancelled,
}: BookingDetailsModalProps) {
  const { user } = useAuth();
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [isConfirming, setIsConfirming] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [error, setError] = useState("");
  const { venue, dateFrom, dateTo, guests } = booking;
  const nights = differenceInCalendarDays(new Date(dateTo), new Date(dateFrom));

  useEffect(() => {
    dialogRef.current?.showModal();
  }, []);

  async function handleCancel() {
    if (!user) {
      setError("You must be logged in to cancel a booking.");
      return;
    }
    setIsDeleting(true);
    setError("");
    try {
      await deleteBooking(booking.id, user.accessToken);
      onCancelled(booking.id);
    } catch {
      setError("Could not cancel the booking. Please try again.");
      setIsDeleting(false);
    }
  }

  return (
    <dialog
      ref={dialogRef}
      onClose={onClose}
      aria-labelledby="booking-details-title"
      className="backdrop:bg-navy/50 m-auto w-full max-w-md rounded-xl bg-white p-6"
    >
      <h2 id="booking-details-title" className="text-navy text-2xl">
        {venue.name}
      </h2>
      <p className="text-muted mt-2 text-sm">
        {formatDisplayDate(new Date(dateFrom))} – {formatDisplayDate(new Date(dateTo))}
      </p>
      <p className="text-muted mt-1 text-sm">
        {guests} {guests === 1 ? "guest" : "guests"} · {nights} {nights === 1 ? "night" : "nights"}
      </p>
      <p className="text-navy mt-2 font-medium">{formatPrice(nights * venue.price)}</p>
      {error && (
        <p role="alert" className="text-error mt-4 text-sm">
          {error}
        </p>
      )}
      {isConfirming ? (
        <div className="mt-6">
          <p className="text-navy font-medium">Cancel this booking? This can't be undone.</p>
          <div className="mt-4 flex gap-3">
            <Button variant="danger" isLoading={isDeleting} onClick={handleCancel}>
              Yes, cancel booking
            </Button>
            <Button variant="secondary" onClick={() => setIsConfirming(false)}>
              Keep booking
            </Button>
          </div>
        </div>
      ) : (
        <div className="mt-6 flex items-center justify-between gap-3">
          <NextLink href={`/venues/${venue.id}`} className="text-coastal underline">
            View venue
          </NextLink>
          <div className="flex gap-3">
            <Button variant="danger" onClick={() => setIsConfirming(true)}>
              Cancel booking
            </Button>
            <Button variant="secondary" onClick={() => dialogRef.current?.close()}>
              Close
            </Button>
          </div>
        </div>
      )}
    </dialog>
  );
}
