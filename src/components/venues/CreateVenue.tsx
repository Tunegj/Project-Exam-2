"use client";

import { useAuth } from "@/context/AuthContext";
import { createVenue } from "@/lib/venues";
import type { VenueInput } from "@/types/api";
import { useRouter } from "next/navigation";
import VenueForm from "./VenueForm";

/**
 * Client wrapper for the create venue page.
 * Sends the form data to the API and opens the new venue.
 */
export default function CreateVenue() {
  const { user, isReady } = useAuth();
  const router = useRouter();

  if (!isReady) return null;
  if (!user?.venueManager) {
    return <p className="text-muted mt-8">Only venue managers can create venues.</p>;
  }

  const token = user.accessToken;

  /**
   * Creates the venue, the redirects to its page
   * @param venue  - valid data from the form
   */
  async function handleCreate(venue: VenueInput) {
    const created = await createVenue(venue, token);
    router.push(`/venues/${created.id}`);
  }

  return <VenueForm submitLabel="Create venue" onSubmit={handleCreate} />;
}
