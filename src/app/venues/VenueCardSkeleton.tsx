export default function VenueCardSkeleton() {
  return (
    <div aria-hidden className="animate-pulse overflow-hidden rounded-xl bg-white shadow-sm">
      <div className="bg-navy/10 aspect-4/3" />
      <div className="flex flex-col gap-2 p-4">
        <div className="bg-navy/10 h-6 w-3/4 rounded" />
        <div className="bg-navy/10 h-4 w-1/3 rounded" />
        <div className="bg-navy/10 mt-2 h-4 w-1/2 rounded" />
        <div className="bg-navy/10 mt-2 h-5 w-2/5 rounded" />
      </div>
    </div>
  );
}
