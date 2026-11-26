"use client";

import { useAuth } from "@/context/AuthContext";
import { getProfileVenues } from "@/lib/venues";
import type { VenueDetails } from "@/types/api";
import { useEffect, useState } from "react";
import BookingsEmptyState from "../bookings/BookingsEmptyState";
import ManagerVenueCard from "./ManagerVenueCard";

/**
 * Lists the logged-in venue manager's venues.
 * Shows loading, error and empty state. Is used inside ManagerTabs
 */
export default function ManagerVenues() {
  const { user } = useAuth();
  const [venues, setVenues] = useState<VenueDetails[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!user) return;
    let ignore = false;

    getProfileVenues(user.name, user.accessToken)
      .then((data) => !ignore && setVenues(data))
      .catch(() => !ignore && setError("Could not load your venues. Please try again later."))
      .finally(() => !ignore && setIsLoading(false));

    return () => {
      ignore = true;
    };
  }, [user]);

  return (
    <section aria-label="My venues" className="flex flex-col gap-4">
      {isLoading && <p className="text-muted">Loading your venues...</p>}
      {error && (
        <p role="alert" className="text-error">
          {error}
        </p>
      )}
      {!isLoading && !error && venues.length === 0 && (
        <BookingsEmptyState
          title="No venues yet"
          text="Create your first venue so guests can find and book it."
        />
      )}
      {venues.length > 0 && (
        <ul className="grid gap-6 sm:grid-cols-2">
          {venues.map((venue) => (
            <li key={venue.id}>
              <ManagerVenueCard venue={venue} />
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
