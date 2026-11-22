import { CalendarDays } from "lucide-react";
import NextLink from "next/link";

type BookingsEmptyStateProps = {
  title: string;
  text: string;
};

/**
 * Shown when a bookins tab is empty
 * @param props.title - the heading
 * @param props.text - the helper text
 */
export default function BookingsEmptyState({ title, text }: BookingsEmptyStateProps) {
  return (
    <div className="flex flex-col items-center rounded-xl bg-white p-10 text-center">
      <CalendarDays aria-hidden className="text-muted size-10" />
      <h3 className="mt-4 text-2xl">{title}</h3>
      <p className="text-muted mt-2 text-sm">{text}</p>
      <NextLink href="/venues" className="bg-coastal mt-6 rounded-lg px-6 py-3 text-white">
        Browse venues
      </NextLink>
    </div>
  );
}
