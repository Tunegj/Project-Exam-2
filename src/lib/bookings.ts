import { ApiResponse, CreateBookingData, ProfileBooking, VenueBooking } from "@/types/api";
import { startOfDay } from "date-fns";
import { apiFetch } from "./api";

export async function createBooking(data: CreateBookingData, token: string): Promise<VenueBooking> {
  const response = await apiFetch<ApiResponse<VenueBooking>>("/holidaze/bookings", {
    method: "POST",
    token,
    body: JSON.stringify(data),
  });
  return response.data;
}

/**
 * Gets a users upcoming bookings (ending today or later), soonest first.
 * @param name - the profile name
 * @param token - the users access token
 */
export async function getUpcomingBookings(name: string, token: string): Promise<ProfileBooking[]> {
  const res = await apiFetch<{ data: ProfileBooking[] }>(
    `/holidaze/profiles/${encodeURIComponent(name)})/bookings?_venue=true&sort=dateFrom&sortOrder=asc`,
    { token },
  );
  const today = startOfDay(new Date());
  return res.data.filter((b) => new Date(b.dateTo) >= today);
}
