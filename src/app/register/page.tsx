"use client";

import { useState, type ChangeEvent, type FormEvent } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Button from "@/components/ui/Button";
import FormField from "@/components/ui/FormField";
import { ApiError } from "@/lib/api";
import { registerUser } from "@/lib/auth";
import { validateRegister, type FormErrors, type RegisterFormValues } from "@/lib/validation";

const initialValues: RegisterFormValues = {
  name: "",
  email: "",
  password: "",
  confirmPassword: "",
  venueManager: false,
};

export default function RegisterPage() {
  const router = useRouter();
  const [values, setValues] = useState<RegisterFormValues>(initialValues);
  const [errors, setErrors] = useState<FormErrors<RegisterFormValues>>({});
  const [formError, setFormError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  function handleChange(event: ChangeEvent<HTMLInputElement>) {
    const { name, value, type, checked } = event.target;

    setValues((prev) => ({ ...prev, [name]: type === "checkbox" ? checked : value }));
    setErrors((prev) => ({ ...prev, [name]: undefined }));
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setFormError("");

    const validationErrors = validateRegister(values);
    setErrors(validationErrors);
    if (Object.keys(validationErrors).length > 0) return;

    setIsSubmitting(true);

    try {
      await registerUser({
        name: values.name.trim(),
        email: values.email.trim(),
        password: values.password,
        venueManager: values.venueManager,
      });
      router.push("/login?registered=true");
    } catch (error) {
      if (error instanceof ApiError) {
        setFormError(
          error.message === "Profile already exists"
            ? "That username or email is already registered."
            : error.message,
        );
      } else {
        setFormError("Could not reach the server. Check your connection and try again.");
      }
      setIsSubmitting(false);
    }
  }

  return (
    <section className="mx-auto w-full max-w-md py-12">
      <h1 className="mb-6 text-4xl">Create an account</h1>

      <div className="rounded-xl bg-white p-6">
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
            label="Username"
            name="name"
            autoComplete="username"
            value={values.name}
            onChange={handleChange}
            error={errors.name}
            helperText="Letters, numbers and underscore (_) only."
          />
          <FormField
            label="Email"
            name="email"
            type="email"
            autoComplete="email"
            value={values.email}
            onChange={handleChange}
            error={errors.email}
            helperText="Must be a valid @stud.noroff.no address."
          />
          <FormField
            label="Password"
            name="password"
            type="password"
            autoComplete="new-password"
            value={values.password}
            onChange={handleChange}
            error={errors.password}
            helperText="At least 8 characters."
          />
          <FormField
            label="Confirm password"
            name="confirmPassword"
            type="password"
            autoComplete="new-password"
            value={values.confirmPassword}
            onChange={handleChange}
            error={errors.confirmPassword}
          />

          <label className="flex items-center gap-3">
            <input
              type="checkbox"
              name="venueManager"
              checked={values.venueManager}
              onChange={handleChange}
              className="accent-coastal size-5"
            />
            Register as a venue manager
          </label>

          <Button type="submit" isLoading={isSubmitting}>
            {isSubmitting ? "Creating account..." : "Register"}
          </Button>
        </form>

        <p className="mt-6 text-sm">
          Already have an account?{" "}
          <Link href="/login" className="text-coastal font-medium underline">
            Log in
          </Link>
        </p>
      </div>
    </section>
  );
}
