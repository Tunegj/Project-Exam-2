import { LoaderCircle } from "lucide-react";

export default function Loading() {
  return (
    <main className="flex justify-center py-24" role="status">
      <LoaderCircle aria-hidden className="text-coastal size-8 animate-spin" />
      <span className="sr-only">Loading...</span>
    </main>
  );
}
