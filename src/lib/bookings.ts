import { ApiResponse, CreateBookingData, VenueBooking } from "@/types/api";
import { apiFetch } from "./api";

export async function createBooking(data: CreateBookingData, token: string): Promise<VenueBooking> {
  const response = await apiFetch<ApiResponse<VenueBooking>>("/holidaze/bookings", {
    method: "POST",
    token,
    body: JSON.stringify(data),
  });
  return response.data;
}
