"use client";

import { useState, type ChangeEvent, type SubmitEvent } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Button from "@/components/ui/Button";
import FormField from "@/components/ui/FormField";
import { ApiError } from "@/lib/api";
import { loginUser } from "@/lib/auth";
import type { LoginData } from "@/types/auth";
import { useAuth } from "@/context/AuthContext";

type LoginErrors = Partial<Record<keyof LoginData, string>>;

/**
 * Login form: checks the fields, calls the API, and shows errors.
 */
export default function LoginForm() {
  const router = useRouter();
  const { login } = useAuth();
  const [values, setValues] = useState<LoginData>({ email: "", password: "" });
  const [errors, setErrors] = useState<LoginErrors>({});
  const [formError, setFormError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  function handleChange(event: ChangeEvent<HTMLInputElement>) {
    const { name, value } = event.target;
    setValues((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: undefined }));
  }

  async function handleSubmit(event: SubmitEvent<HTMLFormElement>) {
    event.preventDefault();
    setFormError("");

    const newErrors: LoginErrors = {};
    if (!values.email.trim()) newErrors.email = "Enter your email.";
    if (!values.password) newErrors.password = "Enter your password.";
    setErrors(newErrors);
    if (Object.keys(newErrors).length > 0) return;

    setIsSubmitting(true);

    try {
      const user = await loginUser({ email: values.email.trim(), password: values.password });

      login(user);
      router.push("/");
    } catch (error) {
      setFormError(
        error instanceof ApiError
          ? error.message
          : "Could not reach the server. Check your connection and try again.",
      );
      setIsSubmitting(false);
    }
  }

  return (
    <>
      <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-6">
        {formError && (
          <p
            role="alert"
            className="border-error text-error rounded-lg border bg-white p-4 text-sm"
          >
            {formError}
          </p>
        )}
        <FormField
          label="Email"
          name="email"
          type="email"
          autoComplete="email"
          value={values.email}
          onChange={handleChange}
          error={errors.email}
        />
        <FormField
          label="Password"
          name="password"
          type="password"
          autoComplete="current-password"
          value={values.password}
          onChange={handleChange}
          error={errors.password}
        />
        <Button type="submit" isLoading={isSubmitting}>
          {isSubmitting ? "Logging in..." : "Log in"}
        </Button>
      </form>

      <p className="mt-6 text-sm">
        No account yet?{" "}
        <Link href="/register" className="text-coastal font-medium underline">
          Register
        </Link>
      </p>
    </>
  );
}
