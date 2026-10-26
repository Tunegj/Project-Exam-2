import { apiFetch } from "@/lib/api";

type TestResponse = {
  data: { id: string; name: string }[];
};

export default async function HomePage() {
  const { data } = await apiFetch<TestResponse>("/holidaze/venues?limit=5");

  return (
    <>
      <div>
        <h1>Venues</h1>
        <ul>
          {data.map((venue) => (
            <li key={venue.id}>{venue.name}</li>
          ))}
        </ul>
      </div>
    </>
  );
}
