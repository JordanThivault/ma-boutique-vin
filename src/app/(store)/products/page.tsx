// src/app/(store)/products/page.tsx
import { db } from "@/lib/db";
import { ProductCard } from "@/components/store/ProductCard";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { cn } from "@/lib/utils";

interface ProductsPageProps {
  searchParams: Promise<{ category?: string; q?: string; featured?: string }>;
}

async function getProducts(params: {
  category?: string;
  q?: string;
  featured?: string;
}) {
  return db.product.findMany({
    where: {
      published: true,
      ...(params.category && {
        category: { slug: params.category },
      }),
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

async function getCategories() {
  return db.category.findMany({ orderBy: { name: "asc" } });
}

export default async function ProductsPage({ searchParams }: ProductsPageProps) {
  const params = await searchParams;
  const [products, categories] = await Promise.all([
    getProducts(params),
    getCategories(),
  ]);

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 pt-20 lg:pt-26">
      <div className="mb-8 ">
        <h1 className="text-3xl font-bold text-neutral-900">
          {params.q
            ? `Résultats pour "${params.q}"`
            : params.category
            ? categories.find((c) => c.slug === params.category)?.name ?? "Produits"
            : "Tous les produits"}
        </h1>
        <p className="mt-2 text-neutral-500">
          {products.length} produit{products.length !== 1 ? "s" : ""} disponible
          {products.length !== 1 ? "s" : ""}
        </p>
      </div>

      {/* Category filters */}
      {categories.length > 0 && (
        <div className="mb-8 flex flex-wrap gap-2">
          <Link href="/products">
            <Badge
              variant={!params.category ? "default" : "outline"}
              className="cursor-pointer text-sm"
            >
              Tous
            </Badge>
          </Link>
          {categories.map((cat) => (
            <Link key={cat.id} href={`/products?category=${cat.slug}`}>
              <Badge
                variant={params.category === cat.slug ? "default" : "outline"}
                className="cursor-pointer text-sm"
              >
                {cat.name}
              </Badge>
            </Link>
          ))}
        </div>
      )}

      {/* Products grid */}
      {products.length === 0 ? (
        <div className="py-24 text-center">
          <p className="text-xl font-medium text-neutral-500">
            Aucun produit trouvé
          </p>
          <Link href="/products" className="mt-4 inline-block text-sm text-neutral-400 hover:text-neutral-600">
            Voir tous les produits →
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
}
