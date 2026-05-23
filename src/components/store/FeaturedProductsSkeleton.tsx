// src/components/store/FeaturedProductsSkeleton.tsx
import { Skeleton } from "@/components/ui/skeleton";

function FeaturedProductCardSkeleton() {
  return (
    <div className="group block">
      {/* Image */}
      <div className="relative bg-stone-50 overflow-hidden mb-5" style={{ paddingBottom: "130%" }}>
        <Skeleton className="absolute inset-0 w-full h-full" />
      </div>
      {/* Infos */}
      <div className="flex flex-col items-center gap-2">
        <Skeleton className="h-3 w-20" />
        <Skeleton className="h-4 w-32" />
        <Skeleton className="h-4 w-16 mt-1" />
      </div>
    </div>
  );
}

export function FeaturedProductsSkeleton() {
  return (
    <section className="bg-white py-24 lg:py-32 px-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex flex-col items-center mb-16 gap-3">
          <Skeleton className="h-3 w-24" />
          <Skeleton className="h-8 w-72" />
        </div>

        {/* Grid */}
        <div className="grid md:grid-cols-3 gap-8 mb-14">
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
