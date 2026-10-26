const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;
const API_KEY = process.env.NEXT_PUBLIC_API_KEY;

/**
 * Error thrown when a request to the Noroff API fails.
 * Extends the built-in Error with the HTTP status code.
 *
 * @example
 * throw new ApiError("Profile not found", 404);
 */
export class ApiError extends Error {
  constructor(
    message: string,
    public status: number,
  ) {
    super(message);
  }
}

type Options = RequestInit & { token?: string };

/**
 * Fetch wrapper for the Noroff API. Adds the API key, and the auth token if given.
 *
 * @template T - The expected response type
 * @param endpoint - API path, e.g. "/holidaze/venues"
 * @param options - Fetch options, plus an optional `token`
 * @returns The parsed JSON response
 * @throws {ApiError} If the response is not ok
 */
export async function apiFetch<T>(
  endpoint: string,
  { token, headers, ...options }: Options = {},
): Promise<T> {
  if (!BASE_URL) {
    throw new Error("NEXT_PUBLIC_API_BASE_URL is not set. Check your .env.local file.");
  }

  const requestHeaders = new Headers(headers);

  if (!requestHeaders.has("Content-Type")) {
    requestHeaders.set("Content-Type", "application/json");
  }

  if (API_KEY) {
    requestHeaders.set("X-Noroff-API-Key", API_KEY);
  }
  if (token) {
    requestHeaders.set("Authorization", `Bearer ${token}`);
  }

  const response = await fetch(`${BASE_URL}${endpoint}`, {
    ...options,
    headers: requestHeaders,
  });

  if (!response.ok) {
    const json = await response.json().catch(() => null);
    const message = json?.errors?.[0]?.message ?? "Something went wrong";
    throw new ApiError(message, response.status);
  }

  if (response.status === 204) {
    return undefined as T;
  }

  return (await response.json()) as T;
}
