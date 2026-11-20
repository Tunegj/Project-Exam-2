"use client";

import { useEffect, useRef } from "react";
import Button from "../ui/Button";

type BookingConfirmModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  isLoading: boolean;
  error: string;
  summary: string;
};

export default function BookingConfirmModal({
  isOpen,
  onClose,
  onConfirm,
  isLoading,
  error,
  summary,
}: BookingConfirmModalProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (isOpen) dialog?.showModal();
    else dialog?.close();
  }, [isOpen]);

  return (
    <dialog
      ref={dialogRef}
      onClose={onClose}
      aria-labelledby="confirm-title"
      className="backdrop:bg-navy/50 m-auto w-full max-w-md rounded-xl p-6"
    >
      <h2 id="confirm-title" className="mb-4 text-2xl">
        Confirm your booking
      </h2>
      <p className="text-muted mb-6 whitespace-pre-line">{summary}</p>
      {error && (
        <p role="alert" className="text-error" mb-4 text-sm>
          {error}{" "}
        </p>
      )}
      <div className="flex justify-end gap-3">
        <Button variant="secondary" onClick={onClose}>
          Cancel
        </Button>
        <Button onClick={onConfirm} isLoading={isLoading}>
          Confirm
        </Button>
      </div>
    </dialog>
  );
}
