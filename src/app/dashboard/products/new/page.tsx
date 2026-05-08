// src/app/dashboard/products/new/page.tsx
import { db } from "@/lib/db";
import { ProductForm } from "@/components/admin/ProductForm";

async function getCategories() {
  return db.category.findMany({ orderBy: { name: "asc" } });
}

export default async function NewProductPage() {
  const categories = await getCategories();

  return (
    <div className="max-w-2xl">
      <h1 className="text-2xl font-bold text-neutral-900">Nouveau produit</h1>
      <p className="mt-1 text-neutral-500">Remplissez les informations du produit</p>
      <div className="mt-8">
        <ProductForm categories={categories} />
      </div>
    </div>
  );
}
