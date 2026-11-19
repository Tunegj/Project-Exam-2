"use client";

import type { Venue } from "@/types/api";
import { ChevronLeft, ChevronRight } from "lucide-react";
import NextImage from "next/image";
import { useState } from "react";

const FALLBACK_IMAGE = "/venue-placeholder.svg";
const MAX_DESKTOP_THUMBS = 8;
const DESKTOP_COLS = ["", "md:grid-cols-1", "md:grid-cols-2", "md:grid-cols-3", "md:grid-cols-4"];

/** One gallery image that shows the placeholder if it fails to load. */
function GalleryImage({
  url,
  alt,
  priority = false,
}: {
  url: string;
  alt: string;
  priority?: boolean;
}) {
  const [hasError, setHasError] = useState(false);
  return (
    <NextImage
      src={!url || hasError ? FALLBACK_IMAGE : url}
      alt={alt}
      fill
      unoptimized
      priority={priority}
      className="object-cover"
      onError={() => setHasError(true)}
    />
  );
}

/**
 * Big image with clickable thumbnails and previous/next buttons.
 * Mobile: thumbnails in rows of 4 under the image. Desktop: thumbnails in a grid to the right,
 * up to 8, getting smaller the more images there are.
 */
export default function VenueGallery({ media, name }: { media: Venue["media"]; name: string }) {
  const [selected, setSelected] = useState(0);
  const count = media.length;
  const current = media[selected];

  const desktopThumbs = Math.min(count, MAX_DESKTOP_THUMBS);
  const cols = desktopThumbs <= 2 ? 1 : desktopThumbs <= 4 ? 2 : desktopThumbs <= 6 ? 3 : 4;
  const hiddenCount = count - MAX_DESKTOP_THUMBS;

  function show(step: number) {
    setSelected((index) => (index + step + count) % count);
  }

  return (
    <div className={`mb-8 md:grid md:aspect-[5/2] md:gap-3 ${count > 1 ? "md:grid-cols-2" : ""}`}>
      <div className="bg-navy/10 relative aspect-4/3 overflow-hidden rounded-xl md:aspect-auto">
        <GalleryImage key={selected} url={current?.url ?? ""} alt={current?.alt || name} priority />

        {count > 1 && (
          <>
            <button
              type="button"
              onClick={() => show(-1)}
              aria-label="Previous image"
              className="text-navy absolute top-1/2 left-3 -translate-y-1/2 rounded-full bg-white/80 p-2 hover:bg-white"
            >
              <ChevronLeft aria-hidden className="size-5" />
            </button>
            <button
              type="button"
              onClick={() => show(1)}
              aria-label="Next image"
              className="text-navy absolute top-1/2 right-3 -translate-y-1/2 rounded-full bg-white/80 p-2 hover:bg-white"
            >
              <ChevronRight aria-hidden className="size-5" />
            </button>
          </>
        )}
      </div>

      {count > 1 && (
        <ul
          className={`mt-3 grid grid-cols-4 gap-2 md:mt-0 md:grid-rows-2 md:gap-3 ${DESKTOP_COLS[cols]}`}
        >
          {media.map((item, index) => (
            <li key={item.url + index} className={index >= MAX_DESKTOP_THUMBS ? "md:hidden" : ""}>
              <button
                type="button"
                onClick={() => setSelected(index)}
                aria-label={`Show image ${index + 1} of ${count}`}
                aria-current={index === selected}
                className={`bg-navy/10 relative block aspect-4/3 w-full overflow-hidden rounded-lg ring-2 md:aspect-auto md:h-full ${
                  index === selected ? "ring-coastal" : "ring-transparent"
                }`}
              >
                <GalleryImage url={item.url} alt="" />
                {index === MAX_DESKTOP_THUMBS - 1 && hiddenCount > 0 && (
                  <span className="bg-navy/60 absolute inset-0 hidden items-center justify-center text-lg font-medium text-white md:flex">
                    +{hiddenCount}
                  </span>
                )}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
