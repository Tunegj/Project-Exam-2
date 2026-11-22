"use client";

import ProfileBookings from "@/components/bookings/ProfileBookings";
import Avatar from "@/components/ui/Avatar";
import Button from "@/components/ui/Button";
import { useAuth } from "@/context/AuthContext";
import { ApiError } from "@/lib/api";
import { getProfile } from "@/lib/profile";
import type { Media, Profile } from "@/types/api";
import NextImage from "next/image";
import { useEffect, useState } from "react";
import EditAvatarForm from "./EditAvatarForm";

export default function ProfileContent() {
  const { user, updateUser } = useAuth();
  const [profile, setProfile] = useState<Profile | null>(null);
  const [error, setError] = useState("");
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    if (!user) return;

    getProfile(user.name, user.accessToken)
      .then(setProfile)
      .catch((err) => {
        setError(err instanceof ApiError ? err.message : "Could not load your profile");
      });
  }, [user?.name, user?.accessToken]);

  function handleAvatarSaved(avatar: Media) {
    setProfile((prev) => (prev ? { ...prev, avatar } : prev));
    updateUser({ avatar });
    setIsEditing(false);
  }

  if (!user) return null;
  if (error)
    return (
      <p role="alert" className="text-error py-12">
        {error}
      </p>
    );
  if (!profile) return <p className="text-muted py-12">Loading profile...</p>;

  return (
    <div className="py-8">
      <div className="bg-coastal/20 relative h-40 overflow-hidden rounded-xl md:h-56">
        {profile.banner?.url && (
          <NextImage
            src={profile.banner.url}
            alt={profile.banner.alt || ""}
            fill
            unoptimized
            priority
            className="object-cover"
          />
        )}
      </div>

      <section className="grid gap-10 pb-12 md:grid-cols-[18rem_1fr]">
        <div>
          <div className="relative -mt-12 ml-6 w-fit">
            <Avatar
              name={profile.name}
              avatar={profile.avatar}
              className="ring-ivory size-24 text-3xl ring-4"
            />
          </div>
          <h1 className="text-navy mt-4 text-3xl">{profile.name}</h1>
          <p className="text-muted mt-1 text-sm">{profile.email}</p>
          <p className="text-muted mt-1 text-sm">
            {profile.venueManager ? "Venue manager" : "Customer"}
          </p>

          {isEditing ? (
            <EditAvatarForm
              name={user.name}
              token={user.accessToken}
              currentAvatar={profile.avatar}
              onSaved={handleAvatarSaved}
              onCancel={() => setIsEditing(false)}
            />
          ) : (
            <Button variant="secondary" className="mt-6" onClick={() => setIsEditing(true)}>
              Edit avatar
            </Button>
          )}
        </div>
        <div className="md:pt-16">
          <ProfileBookings />
        </div>
      </section>
    </div>
  );
}
