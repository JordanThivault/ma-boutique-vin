// src/components/admin/Pagination.tsx
"use client";

import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface PaginationProps {
  totalPages: number;
  currentPage: number;
}

export function Pagination({ totalPages, currentPage }: PaginationProps) {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  if (totalPages <= 1) return null;

  function buildHref(page: number) {
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", String(page));
    return `${pathname}?${params.toString()}`;
  }

  // Generate page numbers with ellipsis
  function getPages(): (number | "…")[] {
    if (totalPages <= 7) {
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    }
    const pages: (number | "…")[] = [1];
    if (currentPage > 3) pages.push("…");
    for (
      let i = Math.max(2, currentPage - 1);
      i <= Math.min(totalPages - 1, currentPage + 1);
      i++
    ) {
      pages.push(i);
    }
    if (currentPage < totalPages - 2) pages.push("…");
    pages.push(totalPages);
    return pages;
  }

  const pages = getPages();

  return (
    <div className="flex items-center justify-between border-t bg-white px-4 py-3">
      <p className="text-sm text-neutral-500">
        Page {currentPage} sur {totalPages}
      </p>

      <div className="flex items-center gap-1">
        {/* Prev */}
        <Link
          href={currentPage > 1 ? buildHref(currentPage - 1) : "#"}
          aria-disabled={currentPage <= 1}
          tabIndex={currentPage <= 1 ? -1 : undefined}
          className={cn(
            "flex h-8 w-8 items-center justify-center rounded-lg transition-colors",
            currentPage > 1
              ? "text-neutral-500 hover:bg-neutral-100 hover:text-neutral-900"
              : "pointer-events-none text-neutral-300"
          )}
        >
          <ChevronLeft className="h-4 w-4" />
        </Link>

        {/* Pages */}
        {pages.map((p, i) =>
          p === "…" ? (
            <span
              key={`ellipsis-${i}`}
              className="flex h-8 w-8 items-center justify-center text-sm text-neutral-400"
            >
              …
            </span>
          ) : (
            <Link
              key={p}
              href={buildHref(p)}
              className={cn(
                "flex h-8 w-8 items-center justify-center rounded-lg text-sm font-medium transition-colors",
                p === currentPage
                  ? "bg-neutral-900 text-white"
                  : "text-neutral-600 hover:bg-neutral-100 hover:text-neutral-900"
              )}
            >
              {p}
            </Link>
          )
        )}

        {/* Next */}
        <Link
          href={currentPage < totalPages ? buildHref(currentPage + 1) : "#"}
          aria-disabled={currentPage >= totalPages}
          tabIndex={currentPage >= totalPages ? -1 : undefined}
          className={cn(
            "flex h-8 w-8 items-center justify-center rounded-lg transition-colors",
            currentPage < totalPages
              ? "text-neutral-500 hover:bg-neutral-100 hover:text-neutral-900"
              : "pointer-events-none text-neutral-300"
          )}
        >
          <ChevronRight className="h-4 w-4" />
        </Link>
      </div>
    </div>
  );
}
