"use client";

import { useAuth } from "@/context/AuthContext";
import { getProfileBookings } from "@/lib/bookings";
import type { ProfileBooking } from "@/types/api";
import { startOfDay } from "date-fns";
import { useEffect, useState } from "react";
import BookingsEmptyState from "./BookingsEmptyState";
import ProfileBookingCard from "./ProfileBookingCard";

type Tab = "upcoming" | "past";

export default function ProfileBookings() {
  const { user } = useAuth();
  const [bookings, setBookings] = useState<ProfileBooking[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const [tab, setTab] = useState<Tab>("upcoming");

  useEffect(() => {
    if (!user) return;
    let ignore = false;
    getProfileBookings(user.name, user.accessToken)
      .then((data) => {
        if (!ignore) setBookings(data);
      })
      .catch(() => {
        if (!ignore) setError("Could not load your bookings. Please try again later.");
      })
      .finally(() => {
        if (!ignore) setIsLoading(false);
      });
    return () => {
      ignore = true;
    };
  }, [user]);

  const today = startOfDay(new Date());
  const upcoming = bookings.filter((b) => new Date(b.dateTo) >= today);
  const past = bookings.filter((b) => new Date(b.dateTo) < today).reverse();
  const shown = tab === "upcoming" ? upcoming : past;

  return (
    <section aria-label="Your bookings">
      <div role="tablist" className="flex gap-2">
        <button
          type="button"
          role="tab"
          aria-selected={tab === "upcoming"}
          onClick={() => setTab("upcoming")}
          className={`border-b-2 px-4 py-2 text-sm ${tab === "upcoming" ? "border-coastal text-navy" : "border-sand text-muted"}`}
        >
          Upcoming bookings
        </button>

        <button
          type="button"
          role="tab"
          aria-selected={tab === "past"}
          onClick={() => setTab("past")}
          className={`border-b-2 px-4 py-2 text-sm ${tab === "past" ? "border-coastal text-navy" : "border-sand text-muted"}`}
        >
          Past bookings
        </button>
      </div>

      <div role="tabpanel" className="mt-4">
        {isLoading ? (
          <p className="text-muted">Loading bookings...</p>
        ) : error ? (
          <p role="alert" className="text-error">
            {error}
          </p>
        ) : shown.length === 0 ? (
          <BookingsEmptyState
            title={tab === "upcoming" ? "No upcoming bookings" : "No past stays yet"}
            text={
              tab === "upcoming"
                ? "When you book a stay, it will show up here."
                : "Past stays will show up here."
            }
          />
        ) : (
          <ul className="grid gap-4 md:grid-cols-2">
            {shown.map((b) => (
              <li key={b.id}>
                <ProfileBookingCard booking={b} isPast={tab === "past"} />
              </li>
            ))}
          </ul>
        )}
      </div>
    </section>
  );
}
