// src/components/store/FeaturedProductsSkeleton.tsx
import { Skeleton } from "@/components/ui/skeleton";

function FeaturedProductCardSkeleton() {
  return (
    <div className="group block">
      {/* Image */}
      <div className="relative mb-5 overflow-hidden bg-stone-50" style={{ paddingBottom: "130%" }}>
        <Skeleton className="absolute inset-0 h-full w-full" />
      </div>
      {/* Infos */}
      <div className="flex flex-col items-center gap-2">
        <Skeleton className="h-3 w-20" />
        <Skeleton className="h-4 w-32" />
        <Skeleton className="mt-1 h-4 w-16" />
      </div>
    </div>
  );
}

export function FeaturedProductsSkeleton() {
  return (
    <section className="bg-white px-6 py-24 lg:py-32">
      <div className="mx-auto max-w-6xl">
        {/* Header */}
        <div className="mb-16 flex flex-col items-center gap-3">
          <Skeleton className="h-3 w-24" />
          <Skeleton className="h-8 w-72" />
        </div>

        {/* Grid */}
        <div className="mb-14 grid gap-8 md:grid-cols-3">
          {Array.from({ length: 3 }).map((_, i) => (
            <FeaturedProductCardSkeleton key={i} />
          ))}
        </div>

        {/* CTA */}
        <div className="flex justify-center">
          <Skeleton className="h-12 w-56" />
        </div>
      </div>
    </section>
  );
}
