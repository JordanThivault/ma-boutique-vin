import Link from "next/link";
import { formatPrice } from "@/lib/utils";
import Image from "next/image";

interface Product {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  price: number;
  images: string[];
  category: { name: string } | null;
}

interface FeaturedProductsProps {
  products: Product[];
}

export default function FeaturedProducts({ products }: FeaturedProductsProps) {
  return (
    <section className="bg-white py-24 lg:py-32 px-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <p className="text-xs tracking-[0.35em] uppercase text-amber-700 font-sans mb-4">
            Nos vins
          </p>
          <h2 className="font-serif text-4xl lg:text-5xl font-light text-stone-900">
            Une collection authentique
          </h2>
        </div>

        {/* Products grid */}
        <div className="grid md:grid-cols-3 gap-8 mb-14">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        {/* CTA */}
        <div className="text-center">
          <Link
            href="/products"
            className="inline-block px-10 py-3.5 bg-stone-900 text-white text-sm font-sans tracking-[0.15em] uppercase hover:bg-stone-700 transition-colors duration-300"
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
      <div className="relative bg-stone-50 overflow-hidden mb-5" style={{ paddingBottom: "130%" }}>
        {product.images[0] ? (
          <Image
            src={product.images[0]}
            alt={product.name}
            fill
            className="absolute inset-0 w-full h-full object-contain p-8 group-hover:scale-105 transition-transform duration-500"
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center text-stone-300">
            <svg width="48" height="48" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path d="M12 2C8 2 6 6 6 10c0 3 1.5 5.5 3 7v3h6v-3c1.5-1.5 3-4 3-7 0-4-2-8-6-8z" strokeWidth="1.5"/>
            </svg>
          </div>
        )}
        {product.category && (
          <span className="absolute top-4 left-4 text-[10px] tracking-[0.25em] uppercase text-stone-500 font-sans bg-white/80 px-2 py-1">
            {product.category.name}
          </span>
        )}
      </div>

      {/* Info */}
      <div className="text-center">
        <h3 className="font-sans text-xs tracking-[0.25em] uppercase text-stone-900 font-medium mb-1">
          {product.name}
        </h3>
        {product.description && (
          <p className="text-stone-400 text-sm font-sans leading-snug mb-3 line-clamp-2">
            {product.description}
          </p>
        )}
        <p className="font-sans text-stone-700 text-base mb-2">
          {formatPrice(product.price)}
        </p>
        <span className="text-xs tracking-[0.2em] uppercase font-sans text-amber-700 group-hover:gap-2 transition-all">
          Découvrir →
        </span>
      </div>
    </Link>
  );
}
