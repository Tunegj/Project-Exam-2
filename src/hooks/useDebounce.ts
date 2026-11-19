import { useEffect, useState } from "react";

/**
 * Returns `value`, but only after it has stopped changing for `delay` milliseconds.
 *
 * @param value The value to debounce, e.g the search text.
 * @param delay The debounce delay in milliseconds.
 */
export function useDebounce<T>(value: T, delay = 400): T {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const timer = setTimeout(() => setDebouncedValue(value), delay);
    return () => clearTimeout(timer);
  }, [value, delay]);

  return debouncedValue;
}
