"use client";

import { ApiError } from "@/lib/api";
import { validateVenue, type VenueErrors } from "@/lib/validateVenue";
import type { VenueInput } from "@/types/api";
import { Plus, Trash2 } from "lucide-react";
import NextImage from "next/image";
import { useState } from "react";
import Button from "../ui/Button";
import FormField from "../ui/FormField";

type VenueFormProps = {
  initialValues?: VenueInput;
  submitLabel: string;
  onSubmit: (venue: VenueInput) => Promise<void>;
};

const emptyVenue: VenueInput = {
  name: "",
  description: "",
  price: 0,
  maxGuests: 1,
  media: [],
  meta: { wifi: false, parking: false, breakfast: false, pets: false },
  location: { address: "", city: "", zip: "", country: "" },
};

const amenities = [
  { key: "wifi", label: "Wifi" },
  { key: "parking", label: "Parking" },
  { key: "breakfast", label: "Breakfast" },
  { key: "pets", label: "Pets allowed" },
] as const;

/**
 * Shared form for creating and editing a venue
 * @param props - starting values, button text and submit handler
 */
export default function VenueForm({
  initialValues = emptyVenue,
  submitLabel,
  onSubmit,
}: VenueFormProps) {
  const [venue, setVenue] = useState<VenueInput>(initialValues);
  const [errors, setErrors] = useState<VenueErrors>({});
  const [apiError, setApiError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  /**
   * Updates one top-level field and clears its error.
   * @param field - the key in VenueInput to change
   * @param value - the new value
   */
  function updateField<K extends keyof VenueInput>(field: K, value: VenueInput[K]) {
    setVenue((prev) => ({ ...prev, [field]: value }));
    setErrors((prev) => ({ ...prev, [field]: undefined }));
  }

  /**
   * Updates one field inside venue.location
   * @param field - address, city, zip or country
   * @param value - the new text
   */
  function updateLocation(field: keyof NonNullable<VenueInput["location"]>, value: string) {
    setVenue((prev) => ({ ...prev, location: { ...prev.location, [field]: value } }));
  }

  const media = venue.media ?? [];

  /**
   * Adds an empty image row
   */
  function addImage() {
    updateField("media", [...media, { url: "", alt: "" }]);
  }

  /**
   * Changes the url or alt text of one image
   * @param index  - which image in the list
   * @param field - "url" or "alt"
   * @param value - the new text
   */
  function updateImage(index: number, field: "url" | "alt", value: string) {
    updateField(
      "media",
      media.map((image, i) => (i === index ? { ...image, [field]: value } : image)),
    );
  }

  /**
   * removes one image from the list
   * @param index - which image to remove
   */
  function removeImage(index: number) {
    updateField(
      "media",
      media.filter((_, i) => i !== index),
    );
  }

  /**
   * Turns one amenity on or off.
   * @param field - wifi, parking, breakfast or pets
   * @param checked - whether the box is ticked
   */
  function updateMeta(field: keyof NonNullable<VenueInput["meta"]>, checked: boolean) {
    setVenue((prev) => ({
      ...prev,
      meta: {
        wifi: false,
        parking: false,
        breakfast: false,
        pets: false,
        ...prev.meta,
        [field]: checked,
      },
    }));
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setApiError("");

    const newErrors = validateVenue(venue);
    setErrors(newErrors);
    const firstError = Object.keys(newErrors)[0];
    if (firstError) {
      const field = event.currentTarget.querySelector<HTMLElement>(
        `[name="${firstError}"], [name^="${firstError}-url"]`,
      );
      field?.focus();
      return;
    }

    setIsLoading(true);
    try {
      await onSubmit(venue);
    } catch (error) {
      setApiError(
        error instanceof ApiError ? error.message : "Could not save the venue. Please try again.",
      );
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="mt-8 flex flex-col gap-6">
      <FormField
        label="Venue name"
        name="name"
        value={venue.name}
        onChange={(e) => updateField("name", e.target.value)}
        error={errors.name}
        required
      />
      <div className="flex flex-col gap-2">
        <label htmlFor="description" className="text-sm font-medium">
          Description
        </label>
        <textarea
          name="description"
          id="description"
          rows={5}
          value={venue.description}
          onChange={(e) => updateField("description", e.target.value)}
          aria-invalid={errors.description ? true : undefined}
          aria-describedby={errors.description ? "description-message" : undefined}
          className={`text-navy focus:ring-coastal rounded-lg border bg-white px-4 py-3 outline-none focus:ring-2 ${errors.description ? "border-error" : "border-muted"}`}
          required
        />
        {errors.description && (
          <p id="description-message" className="text-error text-sm">
            {errors.description}
          </p>
        )}
      </div>
      <div className="grid gap-6 sm:grid-cols-2">
        <FormField
          label="Price per night (NOK)"
          name="price"
          type="number"
          min={1}
          value={Number.isNaN(venue.price) ? "" : venue.price}
          onChange={(e) => updateField("price", e.target.valueAsNumber)}
          error={errors.price}
          required
        />
        <FormField
          label="Max guests"
          name="maxGuests"
          type="number"
          min={1}
          step={1}
          value={Number.isNaN(venue.maxGuests) ? "" : venue.maxGuests}
          onChange={(e) => updateField("maxGuests", e.target.valueAsNumber)}
          error={errors.maxGuests}
          required
        />
      </div>
      <fieldset className="flex flex-col gap-4">
        <legend className="text-navy mb-2 text-lg font-medium">Location</legend>
        <FormField
          label="Address"
          name="address"
          value={venue.location?.address ?? ""}
          onChange={(e) => updateLocation("address", e.target.value)}
        />
        <div className="grid gap-4 sm:grid-cols-3">
          <FormField
            label="City"
            name="city"
            value={venue.location?.city ?? ""}
            onChange={(e) => updateLocation("city", e.target.value)}
          />
          <FormField
            label="Zip code"
            name="zip"
            value={venue.location?.zip ?? ""}
            onChange={(e) => updateLocation("zip", e.target.value)}
          />
          <FormField
            label="Country"
            name="country"
            value={venue.location?.country ?? ""}
            onChange={(e) => updateLocation("country", e.target.value)}
          />
        </div>
      </fieldset>
      <fieldset className="flex flex-col gap-4">
        <legend className="text-navy mb-1 text-lg font-medium">Images</legend>
        <p className="text-muted text-sm">
          Venues with pictures get more bookings. Add image URLs, and describe each image for screen
          readers.
        </p>

        {media.map((image, index) => (
          <div key={index} className="flex flex-col gap-4 rounded-xl bg-white p-4 sm:flex-row">
            <div className="bg-coastal/10 relative aspect-4/3 w-full shrink-0 overflow-hidden rounded-lg sm:w-40">
              {image.url.startsWith("http") && (
                <NextImage
                  src={image.url}
                  alt={image.alt}
                  fill
                  unoptimized
                  className="object-cover"
                />
              )}
            </div>
            <div className="flex flex-1 flex-col gap-3">
              <FormField
                label={`Image ${index + 1} URL`}
                name={`media-url-${index}`}
                type="url"
                value={image.url}
                onChange={(e) => updateImage(index, "url", e.target.value)}
              />

              <FormField
                label={`Image ${index + 1} description`}
                name={`media-alt-${index}`}
                value={image.alt}
                onChange={(e) => updateImage(index, "alt", e.target.value)}
              />
              <Button variant="secondary" onClick={() => removeImage(index)} className="self-start">
                <Trash2 size={16} aria-hidden="true" /> Remove image {index + 1}
              </Button>
            </div>
          </div>
        ))}

        {errors.media && <p className="text-error text-sm">{errors.media}</p>}

        <Button variant="secondary" onClick={addImage} className="self-start">
          <Plus size={16} aria-hidden="true" /> Add image
        </Button>
      </fieldset>
      <fieldset className="flex flex-col gap-3">
        <legend className="text-navy mb-1 text-lg font-medium">Amenities</legend>
        <p className="text-muted text-sm">
          Listing your amenities gives you a better chance of getting bookings.
        </p>
        <div className="grid grid-cols-2 gap-3">
          {amenities.map(({ key, label }) => (
            <label key={key} className="text-navy flex items-center gap-3">
              <input
                type="checkbox"
                checked={venue.meta?.[key] ?? false}
                onChange={(e) => updateMeta(key, e.target.checked)}
                className="accent-coastal size-5"
              />
              {label}
            </label>
          ))}
        </div>
      </fieldset>
      {apiError && (
        <p role="alert" className="text-error rounded-lg bg-white p-4 text-sm">
          {apiError}
        </p>
      )}
      <Button type="submit" isLoading={isLoading} className="self-start">
        {submitLabel}
      </Button>
    </form>
  );
}
