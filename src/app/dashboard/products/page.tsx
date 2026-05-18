// src/app/dashboard/products/page.tsx
import { db } from "@/lib/db";
import { formatPrice } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Plus, Pencil, Eye } from "lucide-react";
import { DeleteProductButton } from "@/components/admin/DeleteProductButton";
import Image from "next/image";

async function getProducts() {
  return db.product.findMany({
    include: { category: true },
    orderBy: { createdAt: "desc" },
  });
}

export default async function AdminProductsPage() {
  const products = await getProducts();

  return (
    <div>
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-neutral-900">Produits</h1>
          <p className="mt-1 text-neutral-500">
            {products.length} produit{products.length !== 1 ? "s" : ""}
          </p>
        </div>
        <Button asChild>
          <Link href="/dashboard/products/new">
            <Plus className="mr-2 h-4 w-4" />
            Nouveau produit
          </Link>
        </Button>
      </div>

      <div className="mt-8 rounded-2xl border bg-white overflow-hidden">
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
                        width={400}
                        height={400}
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
                        ? "text-red-500"
                        : product.stock <= 5
                        ? "text-amber-500"
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
                    {product.published ? "Publié" : "Brouillon"}
                  </span>
                </td>
                <td className="px-4 py-3">
                  <div className="flex items-center gap-2">
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
                  Aucun produit — créez-en un !
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
