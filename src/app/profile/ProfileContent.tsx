"use client";

import { useEffect, useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { getProfile } from "@/lib/profile";
import { ApiError } from "@/lib/api";
import type { Profile, Media } from "@/types/api";
import Button from "@/components/ui/Button";
import EditAvatarForm from "./EditAvatarForm";
import Avatar from "@/components/ui/Avatar";

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
    <section className="py-12">
      <div className="flex flex-col items-start gap-6 sm:flex-row sm:items-center">
        <Avatar name={profile.name} avatar={profile.avatar} className="size-24 text-3xl" />
        <div>
          <h1 className="font-heading text-navy text-4xl">{profile.name}</h1>
          <p className="text-navy mt-2">{profile.email}</p>
          <p className="text-muted mt-1 text-sm">
            {profile.venueManager ? "Venue manager" : "Customer"}
          </p>
        </div>
      </div>

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
    </section>
  );
}
