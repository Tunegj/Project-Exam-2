import EditVenue from "@/components/venues/EditVenue";

export const metadata = { title: "Edit venue | Holidaze" };

type EditVenueProps = {
  params: Promise<{ id: string }>;
};

export default async function EditVenuePage({ params }: EditVenueProps) {
  const { id } = await params;

  return (
    <main className="mx-auto max-w-2xl px-4 py-10">
      <h1 className="text-navy text-4xl">Edit venue</h1>
      <EditVenue id={id} />
    </main>
  );
}
