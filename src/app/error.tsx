"use client";

export default function Error({ reset }: { reset: () => void }) {
  return (
    <main className="mx-auto max-w-7xl px-4 py-12">
      <p className="mb-4">Something went wrong. Please try again.</p>
      <button onClick={reset} className="text-coastal hover:underline">
        Try again
      </button>
    </main>
  );
}
