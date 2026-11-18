"use client";

import type { Venue } from "@/types/api";
import { Star, Users } from "lucide-react";
import Image from "next/image";
import NextLink from "next/link";
import { useState } from "react";

const FALLBACK_IMAGE = "/venue-placeholder.svg";

function formatPrice(price: number): string {
  return `NOK ${new Intl.NumberFormat("nb-NO").format(price)}`;
}

export default function VenueCard({ venue }: { venue: Venue }) {
  const image = venue.media[0];
  const [hasError, setHasError] = useState(false);
  const imageUrl = !image?.url || hasError ? FALLBACK_IMAGE : image.url;
  const city = venue.location?.city || "Location unknown";

  return (
    <NextLink
      href={`/venues/${venue.id}`}
      className="group focus-visible:outline-coastal block h-full overflow-hidden rounded-xl bg-white shadow-sm focus-visible:outline-2"
    >
      <div className="bg-navy/10 relative aspect-4/3">
        <Image
          src={imageUrl}
          alt={image?.alt || venue.name}
          fill
          unoptimized
          onError={() => setHasError(true)}
          sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
          className="object-cover"
        />
      </div>

      <div className="flex flex-col gap-1 p-4">
        <h3 className="text-navy text-2xl group-hover:underline">{venue.name}</h3>
        <p className="text-muted text-sm">{city}</p>

        <div className="text-muted mt-2 flex items-center gap-4 text-sm">
          <span className="flex items-center gap-1">
            <Star aria-hidden className="fill-sand text-sand size-4" />
            {venue.rating > 0 ? venue.rating.toFixed(1) : "New"}
          </span>
          <span className="flex items-center gap-1">
            <Users aria-hidden className="size-4" />
            Up to {venue.maxGuests} guests
          </span>
        </div>
        <p className="text-navy mt-2 font-medium">
          {formatPrice(venue.price)} <span className="text-muted text-sm font-normal">/ night</span>
        </p>
      </div>
    </NextLink>
  );
}
