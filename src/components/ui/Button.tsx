import type { ButtonHTMLAttributes } from "react";

type ButtonVariant = "primary" | "secondary" | "danger" | "accent" | "outline-light";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  isLoading?: boolean;
}

const variantClasses: Record<ButtonVariant, string> = {
  primary: "bg-coastal text-white hover:bg-navy",
  secondary: "border border-coastal text-coastal hover:bg-coastal/10",
  danger: "bg-error text-white hover:bg-error/90",
  accent: "bg-sand text-navy hover:bg-sand/90",
  "outline-light": "border border-white text-white hover:bg-white/10",
};

/**
 * Button in the Holidaze style.
 * Defaults to type="button" so it never submits a form by accident.
 *
 * @param variant - Visual style. Defaults to "primary".
 * @param isLoading - Disables the button and tells screen readers it is busy.
 */
export default function Button({
  variant = "primary",
  isLoading = false,
  type = "button",
  disabled,
  className = "",
  children,
  ...props
}: ButtonProps) {
  return (
    <button
      type={type}
      disabled={disabled || isLoading}
      aria-busy={isLoading || undefined}
      className={`focus-visible:outline-coastal inline-flex h-12 items-center justify-center gap-2 rounded-lg px-6 font-medium transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 disabled:cursor-not-allowed disabled:opacity-60 ${variantClasses[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
