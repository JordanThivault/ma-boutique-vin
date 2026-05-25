// src/app/dashboard/products/page.tsx
import { db } from "@/lib/db";
import { formatPrice } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Pagination } from "@/components/admin/Pagination";
import Link from "next/link";
import { Plus, Pencil, Eye, Search } from "lucide-react";
import { DeleteProductButton } from "@/components/admin/DeleteProductButton";
import { AdminSelect } from "@/components/admin/AdminSelect";
import Image from "next/image";

const PAGE_SIZE = 15;

interface PageProps {
  searchParams: Promise<{ page?: string; q?: string; category?: string }>;
}

export default async function AdminProductsPage({ searchParams }: PageProps) {
  const { page, q, category } = await searchParams;

  const currentPage = Math.max(1, parseInt(page ?? "1", 10));
  const search = q?.trim() ?? "";
  const categoryFilter = category ?? "";

  // Fetch categories for filter dropdown
  const categories = await db.category.findMany({ orderBy: { name: "asc" } });

  const where = {
    ...(categoryFilter ? { category: { slug: categoryFilter } } : {}),
    ...(search
      ? {
          OR: [
            { name: { contains: search, mode: "insensitive" as const } },
            { slug: { contains: search, mode: "insensitive" as const } },
          ],
        }
      : {}),
  };

  const [total, products] = await Promise.all([
    db.product.count({ where }),
    db.product.findMany({
      where,
      include: { category: true },
      orderBy: { createdAt: "desc" },
      skip: (currentPage - 1) * PAGE_SIZE,
      take: PAGE_SIZE,
    }),
  ]);

  const totalPages = Math.ceil(total / PAGE_SIZE);

  return (
    <div>
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-neutral-900">Produits</h1>
          <p className="mt-1 text-neutral-500">
            {total} produit{total !== 1 ? "s" : ""}
            {search || categoryFilter ? " (filtrés)" : ""}
          </p>
        </div>
        <Button asChild>
          <Link href="/dashboard/products/new">
            <Plus className="mr-2 h-4 w-4" />
            Nouveau produit
          </Link>
        </Button>
      </div>

      {/* Filters */}
      <form method="GET" className="mt-6 flex flex-wrap items-center gap-3">
        <div className="relative flex-1 min-w-[200px]">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-neutral-400" />
          <input
            type="text"
            name="q"
            defaultValue={search}
            placeholder="Rechercher un produit…"
            className="w-full rounded-xl border bg-white pl-9 pr-4 py-2 text-sm text-neutral-900 placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-neutral-900"
          />
        </div>

        {/* Category filter */}
        {categories.length > 0 && (
          <AdminSelect name="category" defaultValue={categoryFilter}>
            <option value="">Toutes les catégories</option>
            {categories.map((cat) => (
              <option key={cat.id} value={cat.slug}>{cat.name}</option>
            ))}
          </AdminSelect>
        )}

        <input type="hidden" name="page" value="1" />

        <button
          type="submit"
          className="rounded-xl bg-neutral-900 px-4 py-2 text-sm font-medium text-white hover:bg-neutral-700 transition-colors"
        >
          Filtrer
        </button>

        {(search || categoryFilter) && (
          <a
            href="/dashboard/products"
            className="rounded-xl border px-4 py-2 text-sm text-neutral-500 hover:bg-neutral-50 transition-colors"
          >
            Réinitialiser
          </a>
        )}
      </form>

      {/* Table */}
      <div className="mt-6 rounded-2xl border bg-white overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-neutral-50 border-b">
            <tr>
              {["Produit", "Catégorie", "Prix", "Stock", "Statut", "Actions"].map((h) => (
                <th key={h} className="px-4 py-3 text-left font-medium text-neutral-500">
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y">
            {products.map((product) => (
              <tr key={product.id} className="hover:bg-neutral-50">
                <td className="px-4 py-3">
                  <div className="flex items-center gap-3">
                    {product.images[0] && (
                      <Image
                        src={product.images[0]}
                        alt={product.name}
                        width={40}
                        height={40}
                        className="h-10 w-10 rounded-lg object-cover bg-neutral-100"
                      />
                    )}
                    <div>
                      <p className="font-medium text-neutral-900">{product.name}</p>
                      <p className="text-neutral-400 text-xs">{product.slug}</p>
                    </div>
                  </div>
                </td>
                <td className="px-4 py-3 text-neutral-500">
                  {product.category?.name ?? "—"}
                </td>
                <td className="px-4 py-3 font-medium">{formatPrice(product.price)}</td>
                <td className="px-4 py-3">
                  <span
                    className={
                      product.stock === 0
                        ? "text-red-500 font-medium"
                        : product.stock <= 5
                        ? "text-amber-500 font-medium"
                        : "text-neutral-700"
                    }
                  >
                    {product.stock}
                  </span>
                </td>
                <td className="px-4 py-3">
                  <span
                    className={`inline-block rounded-full px-2.5 py-0.5 text-xs font-medium ${
                      product.published
                        ? "bg-emerald-100 text-emerald-700"
                        : "bg-neutral-100 text-neutral-600"
                    }`}
                  >
                    {product.published ? "Publié" : "Masqué"}
                  </span>
                </td>
                <td className="px-4 py-3">
                  <div className="flex items-center gap-1">
                    <Button variant="ghost" size="icon" asChild>
                      <Link href={`/products/${product.slug}`} target="_blank">
                        <Eye className="h-4 w-4" />
                      </Link>
                    </Button>
                    <Button variant="ghost" size="icon" asChild>
                      <Link href={`/dashboard/products/${product.id}/edit`}>
                        <Pencil className="h-4 w-4" />
                      </Link>
                    </Button>
                    <DeleteProductButton id={product.id} name={product.name} />
                  </div>
                </td>
              </tr>
            ))}

            {products.length === 0 && (
              <tr>
                <td colSpan={6} className="px-4 py-12 text-center text-neutral-400">
                  {search || categoryFilter
                    ? "Aucun produit ne correspond à cette recherche."
                    : "Aucun produit pour l'instant."}
                </td>
              </tr>
            )}
          </tbody>
        </table>

        {/* Pagination intégrée dans le tableau */}
        <Pagination totalPages={totalPages} currentPage={currentPage} />
      </div>
    </div>
  );
}
