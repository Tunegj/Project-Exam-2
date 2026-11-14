"use client";

import { useAuth } from "@/context/AuthContext";

export default function ProfileContent() {
  const { user } = useAuth();
  if (!user) return null;

  return (
    <section className="py-12">
      <h1 className="text-4xl">Hi, {user.name}</h1>
      <p className="text-muted mt-2">{user.venueManager ? "Venue manager" : "Customer"}</p>
    </section>
  );
}
