import type { Profile } from "./api";

export type RegisterData = {
  name: string;
  email: string;
  password: string;
  venueManager: boolean;
};

export type LoginData = {
  email: string;
  password: string;
};

export type LoginResponse = Profile & {
  accessToken: string;
};
