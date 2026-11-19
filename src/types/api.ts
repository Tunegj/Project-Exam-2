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

export type Location = {
  address: string | null;
  city: string | null;
  zip: string | null;
  country: string | null;
  continent: string | null;
  lat: number;
  lng: number;
};

export type VenueMeta = {
  wifi: boolean;
  parking: boolean;
  breakfast: boolean;
  pets: boolean;
};

export type Venue = {
  id: string;
  name: string;
  description: string;
  media: Media[];
  price: number;
  maxGuests: number;
  rating: number;
  created: string;
  updated: string;
  meta: VenueMeta;
  location: Location;
};

export type PaginationMeta = {
  isFirstPage: boolean;
  isLastPage: boolean;
  currentPage: number;
  previousPage: number | null;
  nextPage: number | null;
  pageCount: number;
  totalCount: number;
};

export type VenueBooking = {
  id: string;
  dateFrom: string;
  dateTo: string;
  guests: number;
};

export type VenueDetails = Venue & {
  owner?: Profile;
  bookings?: VenueBooking[];
};
