import VenueSearch from "@/components/venues/VenueSearch";
import VenueSection, { VenueSectionSkeleton } from "@/components/venues/VenueSection";
import { getVenues } from "@/lib/venues";
import NextImage from "next/image";
import { Suspense } from "react";

async function NewVenues() {
  const { data } = await getVenues(1, 4);
  return <VenueSection title="New venues" venues={data} />;
}

async function TopRatedVenues() {
  const { data } = await getVenues(1, 4, "rating");
  return <VenueSection title="Top rated venues" venues={data} />;
}

export default function HomePage() {
  return (
    <main className="mx-auto max-w-7xl px-4 py-12">
      <section className="relative mb-16 flex min-h-80 items-end overflow-hidden rounded-2xl md:min-h-112">
        <NextImage
          src="/images/hero.jpg"
          alt=""
          fill
          priority
          sizes="(min-width: 1280px) 1280px, 100vw"
          className="object-cover"
        />
        <div className="bg-navy/50 absolute inset-0" />
        <div className="relative w-full p-6 md:p-12">
          <h1 className="mb-4 text-4xl text-white md:text-5xl">Find your next getaway</h1>
          <p className="mb-6 max-w-xl text-white/90">
            Browse unique venues and book your stay with Holidaze.
          </p>
          <VenueSearch />
        </div>
      </section>

      <Suspense fallback={<VenueSectionSkeleton title="New venues" />}>
        <NewVenues />
      </Suspense>
      <Suspense fallback={<VenueSectionSkeleton title="Top rated venues" />}>
        <TopRatedVenues />
      </Suspense>
    </main>
  );
}
