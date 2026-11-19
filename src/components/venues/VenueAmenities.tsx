import type { Venue } from "@/types/api";
import { CircleCheck, CircleX } from "lucide-react";

const AMENITIES = [
  { key: "wifi", label: "Wifi" },
  { key: "parking", label: "Parking" },
  { key: "breakfast", label: "Breakfast" },
  { key: "pets", label: "Pets allowed" },
] as const;

export default function VenueAmenities({ meta }: { meta: Venue["meta"] }) {
  return (
    <section className="mb-8">
      <h2 className="mb-3 text-2xl">Amenities</h2>
      <ul className="flex flex-col gap-2">
        {AMENITIES.map(({ key, label }) =>
          meta[key] ? (
            <li key={key} className="flex items-center gap-2">
              <CircleCheck aria-hidden className="text-sage size-5" />
              {label}
            </li>
          ) : (
            <li key={key} className="text-muted flex items-center gap-2">
              <CircleX aria-hidden className="size-5" />
              <span className="line-through">{label}</span>
              <span className="sr-only">(not included)</span>
            </li>
          ),
        )}
      </ul>
    </section>
  );
}
