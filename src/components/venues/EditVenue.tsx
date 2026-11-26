"use client";

import { useAuth } from "@/context/AuthContext";
import { getVenue, toVenueInput, updateVenue } from "@/lib/venues";
import { VenueDetails, VenueInput } from "@/types/api";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import VenueForm from "./VenueForm";

type EditVenueProps = {
  id: string;
};

/**
 * Client wrapper for the edit venue page
 *  Loads the venue, checks that the user owns it, then shows the form
 * @param props - the id of the venue to edit
 */
export default function EditVenue({ id }: EditVenueProps) {
  const { user, isReady } = useAuth();
  const router = useRouter();
  const [venue, setVenue] = useState<VenueDetails | null>(null);
  const [error, setError] = useState("");

  useEffect(() => {
    let ignore = false;
    getVenue(id)
      .then((data) => !ignore && setVenue(data))
      .catch(() => !ignore && setError("Could not load this venue."));
    return () => {
      ignore = true;
    };
  }, [id]);

  if (!isReady) return null;
  if (error)
    return (
      <p role="alert" className="text-error mt-8">
        {error}
      </p>
    );
  if (!venue) return <p className="text-muted mt-8">Loading venue...</p>;
  if (!user || venue.owner?.name !== user.name) {
    return <p className="text-muted mt-8">You can only edit your own venues.</p>;
  }

  const token = user.accessToken;

  async function handleUpdate(data: VenueInput) {
    await updateVenue(id, data, token);
    router.push(`/venues/${id}`);
  }

  return (
    <VenueForm
      initialValues={toVenueInput(venue)}
      submitLabel="Save changes"
      onSubmit={handleUpdate}
    />
  );
}
