"use client";

import { useState } from "react";

const LONG_TEXT = 300;

export default function VenueDescription({ text }: { text: string }) {
  const [isOpen, setIsOpen] = useState(false);
  const isLong = text.length > LONG_TEXT;

  return (
    <section className="mb-8">
      <h2 className="mb-3 text-2xl">About this place</h2>
      <p
        id="venue-description"
        className={`text-muted max-w-prose whitespace-pre-line ${isLong && !isOpen ? "line-clamp-4" : ""}`}
      >
        {text}
      </p>
      {isLong && (
        <button
          type="button"
          onClick={() => setIsOpen((open) => !open)}
          aria-expanded={isOpen}
          aria-controls="venue-description"
          className="text-coastal mt-2 font-medium hover:underline"
        >
          {isOpen ? "Show less" : "Read more"}
        </button>
      )}
    </section>
  );
}
