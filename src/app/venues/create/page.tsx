import CreateVenue from "@/components/venues/CreateVenue";

export const metadata = { title: "Create venue | Holidaze" };

export default function CreateVenuePage() {
  return (
    <main className="mx-auto max-w-2xl px-4 py-10">
      <h1 className="text-navy text-4xl">Create venue</h1>
      <CreateVenue />
    </main>
  );
}
