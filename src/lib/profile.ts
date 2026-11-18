import { apiFetch } from "@/lib/api";
import type { Profile, UpdateAvatarData, Media, ApiResponse } from "@/types/api";

/**
 * Gets one Holidaze profile by name
 *
 * @param name - The profile name (also the id in the URL)
 * @param token - The logged-in user's access token
 * @returns The profile
 * @throws {ApiError} If the request fails, e.g 404 if the profile doesn't exist
 */
export async function getProfile(name: string, token: string): Promise<Profile> {
  const json = await apiFetch<ApiResponse<Profile>>(
    `/holidaze/profiles/${encodeURIComponent(name)}`,
    { token },
  );
  return json.data;
}

/**
 * Updates the avatar of the logged-in user's profile.
 *
 * @param name - The profile name (also the id in the URL)
 * @param avatar - New avatar, the `url` must be a public image, `alt` under 120 characters.
 * @param token - The logged in user's access token.
 * @returns The updated profile
 * @throws {ApiError} If the request fails, e.g 400 for a broke image url */
export async function updateAvatar(name: string, avatar: Media, token: string): Promise<Profile> {
  const json = await apiFetch<ApiResponse<Profile>>(
    `/holidaze/profiles/${encodeURIComponent(name)}`,
    {
      method: "PUT",
      token,
      body: JSON.stringify({ avatar }),
    },
  );
  return json.data;
}
