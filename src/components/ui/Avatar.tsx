"use client";

import { useEffect, useState } from "react";
import type { Media } from "@/types/api";
import Image from "next/image";

type AvatarProps = {
  name: string;
  avatar: Media | null;
  className?: string;
};

function getInitials(name: string): string {
  const parts = name.split("_").filter(Boolean);
  const initials = parts.length > 1 ? parts[0][0] + parts[1][0] : name.slice(0, 2);
  return initials.toUpperCase();
}

export default function Avatar({ name, avatar, className = "size-10 text-sm" }: AvatarProps) {
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    setHasError(false);
  }, [avatar?.url]);

  if (!avatar?.url || hasError) {
    return (
      <span
        role="img"
        aria-label={`${name}'s avatar`}
        className={`bg-coastal flex shrink-0 items-center justify-center rounded-full font-medium text-white ${className}`}
      >
        {getInitials(name)}
      </span>
    );
  }

  return (
    <Image
      src={avatar.url}
      alt={avatar.alt || `${name}'s avatar`}
      width={96}
      height={96}
      unoptimized
      onError={() => setHasError(true)}
      className={`shrink-0 rounded-full object-cover ${className}`}
    />
  );
}
