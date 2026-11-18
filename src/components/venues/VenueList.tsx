"use client";

import VenueCardSkeleton from "@/app/venues/VenueCardSkeleton";
import { ApiError } from "@/lib/api";
import { getVenues } from "@/lib/venues";
import { PaginationMeta, Venue } from "@/types/api";
import { useEffect, useState } from "react";
import Button from "../ui/Button";
import VenueCard from "./VenueCard";

function getErrorMessage(error: unknown): string {
  if (error instanceof ApiError) return error.message;
  if (error instanceof TypeError) return "Could not reach server. Check your internet connection";
  return "Something went wrong while loading venues.";
}

export default function VenueList() {
  const [venues, setVenues] = useState<Venue[]>([]);
  const [meta, setMeta] = useState<PaginationMeta | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    let ignore = false;

    getVenues(1)
      .then((result) => {
        if (ignore) return;
        setVenues(result.data);
        setMeta(result.meta);
      })
      .catch((err) => {
        if (!ignore) setError(getErrorMessage(err));
      })
      .finally(() => {
        if (!ignore) setIsLoading(false);
      });

    return () => {
      ignore = true;
    };
  }, []);

  async function handleLoadMore() {
    if (!meta?.nextPage) return;
    setIsLoadingMore(true);
    setError("");

    try {
      const result = await getVenues(meta.nextPage);
      setVenues((prev) => [...prev, ...result.data]);
      setMeta(result.meta);
    } catch (err) {
      setError(getErrorMessage(err));
    } finally {
      setIsLoadingMore(false);
    }
  }

  const gridClasses = "grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4";

  if (isLoading) {
    return (
      <div role="status">
        <span className="sr-only">Loading venues...</span>
        <div className={gridClasses}>
          {Array.from({ length: 8 }, (_, i) => (
            <VenueCardSkeleton key={i} />
          ))}
        </div>
      </div>
    );
  }

  if (error && venues.length === 0) {
    return (
      <p role="alert" className="text-error">
        {error}
      </p>
    );
  }

  if (venues.length === 0) {
    return <p className="text-muted">No venues found. Check back later!</p>;
  }

  return (
    <div className="flex flex-col items-center gap-8">
      <ul className={`w-full ${gridClasses}`}>
        {venues.map((venue) => (
          <li key={venue.id}>
            <VenueCard venue={venue} />
          </li>
        ))}
      </ul>

      {error && (
        <p role="alert" className="text-error">
          {error}
        </p>
      )}

      {meta?.nextPage && (
        <Button variant="secondary" isLoading={isLoadingMore} onClick={handleLoadMore}>
          Load more venues
        </Button>
      )}
    </div>
  );
}
