// src/app/dashboard/products/[id]/edit/page.tsx
import { notFound } from "next/navigation";
import { db } from "@/lib/db";
import { ProductForm } from "@/components/admin/ProductForm";

interface Props {
  params: Promise<{ id: string }>;
}

async function getProduct(id: string) {
  return db.product.findUnique({
    where: { id },
  });
}

async function getCategories() {
  return db.category.findMany({ orderBy: { name: "asc" } });
}

export default async function EditProductPage({ params }: Props) {
  const { id } = await params;
  const [product, categories] = await Promise.all([
    getProduct(id),
    getCategories(),
  ]);

  if (!product) notFound();

  return (
    <div className="max-w-2xl">
      <h1 className="text-2xl font-bold text-neutral-900">Modifier le produit</h1>
      <p className="mt-1 text-neutral-500">{product.name}</p>
      <div className="mt-8">
        <ProductForm categories={categories} product={product} />
      </div>
    </div>
  );
}