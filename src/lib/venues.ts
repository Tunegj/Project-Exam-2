import type { PaginationMeta, Venue } from "@/types/api";
import { apiFetch } from "./api";

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
export async function getVenues(page = 1, limit = 12): Promise<VenueListResponse> {
  const params = new URLSearchParams({
    page: String(page),
    limit: String(limit),
    sort: "created",
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
