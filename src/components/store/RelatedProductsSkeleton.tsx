// src/components/store/RelatedProductsSkeleton.tsx
import { Skeleton } from "@/components/ui/skeleton";

export function RelatedProductsSkeleton() {
  return (
    <section className="mt-16 border-t pt-16">
      <div className="mb-8">
        <Skeleton className="mb-2 h-3 w-24" />
        <Skeleton className="h-8 w-48" />
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 3 }).map((_, i) => (
          <div key={i} className="flex flex-col overflow-hidden rounded-2xl border bg-white">
            <Skeleton className="aspect-square w-full" />
            <div className="flex flex-col gap-2 p-4">
              <Skeleton className="h-3 w-16" />
              <Skeleton className="h-4 w-3/4" />
              <Skeleton className="mt-1 h-4 w-1/3" />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
