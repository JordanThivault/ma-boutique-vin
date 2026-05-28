import Link from "next/link";
import { formatPrice } from "@/lib/utils";
import Image from "next/image";
import type { Product } from "@/types/product";


interface FeaturedProductsProps {
  products: Product[];
}

export default function FeaturedProducts({ products }: FeaturedProductsProps) {
  return (
    <section className="bg-white px-6 py-24 lg:py-32">
      <div className="mx-auto max-w-6xl">
        {/* Header */}
        <div className="mb-16 text-center">
          <p className="mb-4 font-sans text-xs tracking-[0.35em] text-amber-700 uppercase">
            Nos vins
          </p>
          <h2 className="font-serif text-4xl font-light text-stone-900 lg:text-5xl">
            Une collection authentique
          </h2>
        </div>

        {/* Products grid */}
        <div className="mb-14 grid gap-8 md:grid-cols-3">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        {/* CTA */}
        <div className="text-center">
          <Link
            href="/products"
            className="inline-block bg-stone-900 px-10 py-3.5 font-sans text-sm tracking-[0.15em] text-white uppercase transition-colors duration-300 hover:bg-stone-700"
          >
            Voir toute la collection
          </Link>
        </div>
      </div>
    </section>
  );
}

function ProductCard({ product }: { product: Product }) {
  return (
    <Link href={`/products/${product.slug}`} className="group block">
      {/* Image */}
      <div className="relative mb-5 overflow-hidden bg-stone-50" style={{ paddingBottom: "130%" }}>
        {product.images[0] ? (
          <Image
            src={product.images[0]}
            alt={product.name}
            fill
            className="absolute inset-0 h-full w-full object-contain p-8 transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center text-stone-300">
            <svg width="48" height="48" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                d="M12 2C8 2 6 6 6 10c0 3 1.5 5.5 3 7v3h6v-3c1.5-1.5 3-4 3-7 0-4-2-8-6-8z"
                strokeWidth="1.5"
              />
            </svg>
          </div>
        )}
        {product.category && (
          <span className="absolute top-4 left-4 bg-white/80 px-2 py-1 font-sans text-[10px] tracking-[0.25em] text-stone-500 uppercase">
            {product.category.name}
          </span>
        )}
      </div>

      {/* Info */}
      <div className="text-center">
        <h3 className="mb-1 font-sans text-xs font-medium tracking-[0.25em] text-stone-900 uppercase">
          {product.name}
        </h3>
        {product.description && (
          <p className="mb-3 line-clamp-2 font-sans text-sm leading-snug text-stone-400">
            {product.description}
          </p>
        )}
        <p className="mb-2 font-sans text-base text-stone-700">{formatPrice(product.price)}</p>
        <span className="font-sans text-xs tracking-[0.2em] text-amber-700 uppercase transition-all group-hover:gap-2">
          Découvrir →
        </span>
      </div>
    </Link>
  );
}
