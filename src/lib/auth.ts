import { apiFetch } from "./api";
import type { ApiResponse, Profile } from "@/types/api";
import type { RegisterData, LoginData, LoginResponse } from "@/types/auth";

/**
 * Registers a new Holidaze user.
 * The API does not return a token, so the user must log in afterwards.
 *
 * @param data - name, email, password and venueManager.
 * @returns The created profile
 * @throws {ApiError} if the API rejects it, e.g "Profile already exists"
 */
export async function registerUser(data: RegisterData): Promise<Profile> {
  const response = await apiFetch<ApiResponse<Profile>>("/auth/register", {
    method: "POST",
    body: JSON.stringify(data),
  });
  return response.data;
}

/**
 * Logs in a Holidaze user.
 * `_holidaze=true` makes the API include venueManager in the answer
 *
 * @param data - email and password.
 * @returns - THe profile with an accessToken
 * @throws {ApiError}  if the email or password is wrong.
 */
export async function loginUser(data: LoginData): Promise<LoginResponse> {
  const response = await apiFetch<ApiResponse<LoginResponse>>("/auth/login?_holidaze=true", {
    method: "POST",
    body: JSON.stringify(data),
  });
  return response.data;
}
