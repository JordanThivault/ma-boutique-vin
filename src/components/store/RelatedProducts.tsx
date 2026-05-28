// src/components/store/RelatedProducts.tsx
import { db } from "@/lib/db";
import { ProductCard } from "@/components/store/ProductCard";

async function getRelatedProducts(excludeId: string) {
  const count = await db.product.count({
    where: { published: true, id: { not: excludeId } },
  });

  const skip = Math.max(0, Math.floor(Math.random() * (count - 3)));

  return db.product.findMany({
    where: { published: true, id: { not: excludeId } },
    include: { category: true },
    take: 3,
    skip,
  });
}

export async function RelatedProducts({ productId }: { productId: string }) {
  const products = await getRelatedProducts(productId);

  if (products.length === 0) return null;

  return (
    <section className="mt-16 border-t pt-16">
      <div className="mb-8">
        <p className="mb-2 font-sans text-xs tracking-[0.3em] text-amber-700 uppercase">
          Notre sélection
        </p>
        <h2 className="font-serif text-3xl font-light text-neutral-900">Vous aimerez aussi</h2>
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  );
}
