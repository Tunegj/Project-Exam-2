import type { InputHTMLAttributes } from "react";

interface FormFieldProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  name: string;
  error?: string;
  helperText?: string;
}

export default function FormField({
  label,
  name,
  error,
  helperText,
  id,
  className = "",
  ...props
}: FormFieldProps) {
  const inputId = id ?? name;
  const messageId = `${inputId}-message`;
  const message = error ?? helperText;

  return (
    <div className="flex flex-col gap-2">
      <label htmlFor={inputId} className="text-sm font-medium">
        {label}
      </label>
      <input
        type="text"
        name={name}
        id={inputId}
        aria-invalid={error ? true : undefined}
        aria-describedby={message ? messageId : undefined}
        className={`text-navy focus:ring-coastal h-12 rounded-lg border bg-white px-4 outline-none focus:ring-2 ${
          error ? "border-error" : "border-muted"
        } ${className}`}
        {...props}
      />
      {message && (
        <p id={messageId} className={`text-sm ${error ? "text-error" : "text-muted"}`}>
          {message}
        </p>
      )}
    </div>
  );
}
