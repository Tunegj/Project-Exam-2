import type { LoginResponse } from "@/types/auth";
import { Libre_Caslon_Display } from "next/font/google";

const USER_KEY = "holidaze-user";

/**
 * saves the logged in user, including the token, in localStorage
 */
export function saveUser(user: LoginResponse): void {
  localStorage.setItem(USER_KEY, JSON.stringify(user));
}

/**
 * Reads the logged in user from localStorage
 * @returns The user, or null if nobody is logged in or the data is broken.
 */
export function getUser(): LoginResponse | null {
  const stored = localStorage.getItem(USER_KEY);
  if (!stored) return null;

  try {
    return JSON.parse(stored) as LoginResponse;
  } catch {
    localStorage.removeItem(USER_KEY);
    return null;
  }
}

/**
 * removes the user from localStorage (used when logging out)
 */
export function clearUser(): void {
  localStorage.removeItem(USER_KEY);
}
