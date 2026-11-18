"use client";

import { useState, type ChangeEvent, type SubmitEvent } from "react";
import { ApiError } from "@/lib/api";
import { updateAvatar } from "@/lib/profile";
import type { Media } from "@/types/api";
import Avatar from "@/components/ui/Avatar";
import Button from "@/components/ui/Button";
import FormField from "@/components/ui/FormField";

type EditAvatarFormProps = {
  name: string;
  token: string;
  currentAvatar: Media | null;
  onSaved: (avatar: Media) => void;
  onCancel: () => void;
};

export default function EditAvatarForm({
  name,
  token,
  currentAvatar,
  onSaved,
  onCancel,
}: EditAvatarFormProps) {
  const [values, setValues] = useState<Media>({
    url: currentAvatar?.url ?? "",
    alt: currentAvatar?.alt ?? "",
  });
  const [error, setError] = useState("");
  const [isSaving, setIsSaving] = useState(false);

  function handleChange(event: ChangeEvent<HTMLInputElement>) {
    const { name, value } = event.target;
    setValues((prev) => ({ ...prev, [name]: value }));
  }

  async function handleSubmit(event: SubmitEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    setIsSaving(true);

    try {
      const profile = await updateAvatar(name, { url: values.url, alt: `${name}'s avatar` }, token);
      if (profile.avatar) onSaved(profile.avatar);
    } catch (err) {
      setError(err instanceof ApiError ? err.message : "Could not save your avatar.");
    } finally {
      setIsSaving(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} noValidate={false} className="mt-6 flex max-w-md flex-col gap-4">
      <div className="flex items-center gap-4">
        <Avatar name={name} avatar={values.url ? values : null} className="size-24 text-3xl" />
        <p className="text-muted text-sm">Preview</p>
      </div>

      <FormField
        label="Image URL"
        name="url"
        type="url"
        required
        value={values.url}
        onChange={handleChange}
        helperText="Paste a link to a public image"
      />

      {error && (
        <p role="alert" className="text-error text-sm">
          {error}
        </p>
      )}
      <div className="flex gap-4">
        <Button type="submit" isLoading={isSaving}>
          Save avatar
        </Button>
        <Button variant="secondary" onClick={onCancel}>
          Cancel
        </Button>
      </div>
    </form>
  );
}
