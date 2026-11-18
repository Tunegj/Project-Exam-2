export type Media = {
  url: string;
  alt: string;
};

export type Profile = {
  name: string;
  email: string;
  bio: string | null;
  avatar: Media | null;
  banner: Media | null;
  venueManager: boolean;
};

export type ApiResponse<T> = {
  data: T;
  meta: Record<string, unknown>;
};

export type UpdateAvatarData = {
  avatar: Media;
};
