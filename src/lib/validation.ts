import type { RegisterData } from "@/types/auth";
import { error } from "console";

export type RegisterFormValues = RegisterData & { confirmPassword: string };

export type FormErrors<T> = Partial<Record<keyof T, string>>;

const NAME_PATTERN = /^[A-Za-z0-9_]+$/;
const EMAIL_PATTERN = /^[^\s@]+@stud\.noroff\.no$/i;
const MIN_PASSWORD_LENGTH = 8;

/**
 * Checks the register form against the Noroff API rules.
 *
 * @param values - The current form values
 * @returns An error message per invalid field. Empty object = valid.
 */
export function validateRegister(values: RegisterFormValues): FormErrors<RegisterFormValues> {
  const errors: FormErrors<RegisterFormValues> = {};
  const name = values.name.trim();
  const email = values.email.trim();

  if (!name) {
    errors.name = "Please enter a username.";
  } else if (!NAME_PATTERN.test(name)) {
    errors.name = "Use only letters, numbers and underscore (_).";
  }

  if (!email) {
    errors.email = "Please enter your email.";
  } else if (!EMAIL_PATTERN.test(email)) {
    errors.email = "Use your @stud.noroff.no email.";
  }

  if (values.password.length < MIN_PASSWORD_LENGTH) {
    errors.password = `Password must be at least ${MIN_PASSWORD_LENGTH} characters.`;
  }

  if (values.confirmPassword !== values.password) {
    errors.confirmPassword = "Passwords do not match.";
  }

  return errors;
}
