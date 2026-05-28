// src/app/(store)/products/page.tsx
import { Suspense } from "react";
import { db } from "@/lib/db";
import { ProductCard } from "@/components/store/ProductCard";
import { ProductsGridSkeleton } from "@/components/store/ProductCardSkeleton";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";

interface ProductsPageProps {
  searchParams: Promise<{ category?: string; q?: string; featured?: string }>;
}

async function getCategories() {
  return db.category.findMany({ orderBy: { name: "asc" } });
}

async function getProducts(params: { category?: string; q?: string; featured?: string }) {
  return db.product.findMany({
    where: {
      published: true,
      ...(params.category && { category: { slug: params.category } }),
      ...(params.q && {
        OR: [
          { name: { contains: params.q, mode: "insensitive" } },
          { description: { contains: params.q, mode: "insensitive" } },
        ],
      }),
      ...(params.featured === "true" && { featured: true }),
    },
    include: { category: true },
    orderBy: { createdAt: "desc" },
  });
}

// ─── Composant async séparé pour le fetch ───────────────
async function ProductsGrid({
  params,
}: {
  params: { category?: string; q?: string; featured?: string };
}) {
  const products = await getProducts(params);

  if (products.length === 0) {
    return (
      <div className="py-24 text-center">
        <p className="text-xl font-medium text-neutral-500">Aucun produit trouvé</p>
        <Link
          href="/products"
          className="mt-4 inline-block text-sm text-neutral-400 hover:text-neutral-600"
        >
          Voir tous les produits →
        </Link>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}

// ─── Composant async séparé pour les filtres ────────────
async function CategoryFilters({ activeCategory }: { activeCategory?: string }) {
  const categories = await getCategories();

  if (categories.length === 0) return null;

  return (
    <div className="mb-8 flex flex-wrap gap-2">
      <Link href="/products">
        <Badge variant={!activeCategory ? "default" : "outline"} className="cursor-pointer text-sm">
          Tous
        </Badge>
      </Link>
      {categories.map((cat) => (
        <Link key={cat.id} href={`/products?category=${cat.slug}`}>
          <Badge
            variant={activeCategory === cat.slug ? "default" : "outline"}
            className="cursor-pointer text-sm"
          >
            {cat.name}
          </Badge>
        </Link>
      ))}
    </div>
  );
}

// ─── Page principale ─────────────────────────────────────
export default async function ProductsPage({ searchParams }: ProductsPageProps) {
  const params = await searchParams;

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 pt-20 sm:px-6 lg:px-8 lg:pt-26">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-neutral-900">
          {params.q
            ? `Résultats pour "${params.q}"`
            : params.category
              ? "Produits"
              : "Tous les produits"}
        </h1>
      </div>

      {/* Filtres catégories */}
      <Suspense
        fallback={
          <div className="mb-8 flex gap-2">
            {Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="h-6 w-20 animate-pulse rounded-full bg-neutral-100" />
            ))}
          </div>
        }
      >
        <CategoryFilters activeCategory={params.category} />
      </Suspense>

      {/* Grille produits */}
      <Suspense fallback={<ProductsGridSkeleton count={8} />}>
        <ProductsGrid params={params} />
      </Suspense>
    </div>
  );
}
