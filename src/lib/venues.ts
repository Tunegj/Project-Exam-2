import type { PaginationMeta, Venue, VenueDetails, VenueInput } from "@/types/api";
import { ApiError, apiFetch } from "./api";

export type VenueListResponse = {
  data: Venue[];
  meta: PaginationMeta;
};

/**
 * Gets one page of venues, newest first.
 *
 * @param page - Page number, starting at 1
 * @param limit - Venues per page
 * @returns The venues and pagination info
 * @throws {ApiError} If the API answers with an error
 * @throws {TypeError} if there is no network connection
 */
export async function getVenues(
  page = 1,
  limit = 12,
  sort: "created" | "rating" = "created",
): Promise<VenueListResponse> {
  const params = new URLSearchParams({
    page: String(page),
    limit: String(limit),
    sort,
    sortOrder: "desc",
  });

  return apiFetch<VenueListResponse>(`/holidaze/venues?${params}`);
}

export async function searchVenues(
  query: string,
  page = 1,
  limit = 12,
): Promise<VenueListResponse> {
  const params = new URLSearchParams({
    q: query,
    page: String(page),
    limit: String(limit),
    sort: "created",
    sortOrder: "desc",
  });

  return apiFetch<VenueListResponse>(`/holidaze/venues/search?${params}`);
}

/**
 * Gets one venue with its owner and bookings
 *
 * @param id - The venue id
 * @returns The venue
 * @throws {ApiError} If the API answers with an error, e.g 404 for unkownd ids.
 */
export async function getVenue(id: string): Promise<VenueDetails> {
  const { data } = await apiFetch<{ data: VenueDetails }>(
    `/holidaze/venues/${encodeURIComponent(id)}?_owner=true&_bookings=true`,
  );
  return data;
}

/**
 * Gets a manager's venues, with their bookings.
 * @param name - the profile name
 * @param token - the user's access token
 * @returns the venues this profile owns
 */
export async function getProfileVenues(name: string, token: string): Promise<VenueDetails[]> {
  const res = await apiFetch<{ data: VenueDetails[] }>(
    `/holidaze/profiles/${encodeURIComponent(name)}/venues?_bookings=true`,
    { token },
  );
  return res.data;
}

/**
 * Creates a new venue for the logged-in venue manager.
 * @param venue = The venue data from the form
 * @param token - the user's access token
 * @returns the created venue
 */
export async function createVenue(venue: VenueInput, token: string): Promise<Venue> {
  const res = await apiFetch<{ data: Venue }>("/holidaze/venues", {
    method: "POST",
    token,
    body: JSON.stringify(venue),
  });
  return res.data;
}
