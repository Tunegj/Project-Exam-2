import type { VenueInput } from "@/types/api";

export type VenueErrors = Partial<
  Record<"name" | "description" | "price" | "maxGuests" | "media", string>
>;

/**
 * Checks venue form data before it is sent to the API.
 * @param venue  - the venue data from the form
 * @returns an object with an error message per invalid field
 */
export function validateVenue(venue: VenueInput): VenueErrors {
  const errors: VenueErrors = {};

  if (!venue.name.trim()) errors.name = "Please enter a venue name";
  if (!venue.description.trim()) errors.description = "Please add a description.";
  if (!(venue.price > 0)) errors.price = "Price must be higher than 0.";
  if (!Number.isInteger(venue.maxGuests) || venue.maxGuests < 1)
    errors.maxGuests = "Max guests must be at least 1.";
  if (venue.media?.some((m) => !m.url.trim().startsWith("http")))
    errors.media = "Every image needs a valid url starting with http.";

  return errors;
}
