import { TbAperture } from "react-icons/tb";

export function PageSpinner({ label = "Loading StudioSpace" }) {
  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center gap-4">
      <TbAperture size={56} className="animate-spin text-primary" />
      <p className="font-display text-lg font-bold text-base-content/70">
        {label}
      </p>
    </div>
  );
}

export function CardSkeleton() {
  return (
    <div className="card-surface overflow-hidden">
      <div className="skeleton h-52 w-full rounded-none" />
      <div className="space-y-3 p-5">
        <div className="skeleton h-5 w-3/4" />
        <div className="skeleton h-4 w-1/2" />
        <div className="flex items-center justify-between pt-4">
          <div className="skeleton h-7 w-20" />
          <div className="skeleton h-8 w-28" />
        </div>
      </div>
    </div>
  );
}

export function StudioGridSkeleton({ count = 6 }) {
  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {Array.from({ length: count }).map((_, index) => (
        <CardSkeleton key={index} />
      ))}
    </div>
  );
}

export function DetailsSkeleton() {
  return (
    <div className="container-page py-10">
      <div className="skeleton mb-6 h-10 w-2/3" />
      <div className="grid gap-8 lg:grid-cols-3">
        <div className="space-y-6 lg:col-span-2">
          <div className="skeleton h-96 w-full" />
          <div className="skeleton h-32 w-full" />
          <div className="skeleton h-24 w-full" />
        </div>
        <div className="skeleton h-80 w-full" />
      </div>
    </div>
  );
}

export function RowsSkeleton({ rows = 4 }) {
  return (
    <div className="space-y-4">
      {Array.from({ length: rows }).map((_, index) => (
        <div key={index} className="skeleton h-24 w-full" />
      ))}
    </div>
  );
}
