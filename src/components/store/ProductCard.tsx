"use client";

import Link from "next/link";
import Image from "next/image";
import { formatPrice } from "@/lib/utils";
import { useCart } from "@/hooks/useCart";
import { Button } from "@/components/ui/button";
import { ShoppingCart, Eye } from "lucide-react";
import { toast } from "sonner";
import type { Product } from "@/types/product";

export function ProductCard({ product }: { product: Product }) {
  const { addItem, openCart } = useCart();
  const image = product.images[0] ?? "/placeholder-product.jpg";
  const inStock = product.stock > 0;

  function handleAddToCart(e: React.MouseEvent) {
    e.preventDefault(); // ← empêche la navigation du Link parent
    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      image,
      slug: product.slug,
      stock: product.stock,
      isBottle: product.isBottle,
    });
    openCart();
    toast.success(`${product.name} ajouté au panier`);
  }

  return (
    <div className="group relative flex flex-col overflow-hidden rounded-2xl border bg-white transition-shadow hover:shadow-md">
      {/* Toute la card est un seul Link */}
      <Link
        href={`/products/${product.slug}`}
        className="relative block aspect-square overflow-hidden bg-neutral-100"
      >
        <Image
          src={image}
          alt={product.name}
          fill
          className="object-cover transition-transform duration-300 group-hover:scale-105"
        />

        {/* Badge rupture */}
        {!inStock && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/30">
            <span className="rounded-full bg-white px-3 py-1 text-xs font-medium text-neutral-700">
              Rupture de stock
            </span>
          </div>
        )}

        {/* Badge vedette */}
        {product.featured && inStock && (
          <span className="absolute top-2 left-2 rounded-full bg-amber-500 px-2.5 py-0.5 text-xs font-medium text-white">
            Vedette
          </span>
        )}

        {/* Badge promo */}
        {product.comparePrice && product.comparePrice > product.price && (
          <span className="absolute top-2 right-2 rounded-full bg-red-500 px-2.5 py-0.5 text-xs font-medium text-white">
            -{Math.round(((product.comparePrice - product.price) / product.comparePrice) * 100)}%
          </span>
        )}

        {/* Quick actions — plus de Link imbriqué ici */}
        <div className="absolute inset-x-0 bottom-0 flex translate-y-full flex-col gap-2 bg-white/95 p-3 backdrop-blur-sm transition-transform duration-200 group-hover:translate-y-0">
          <Button
            size="sm"
            className="w-full"
            onClick={handleAddToCart} // ← e.preventDefault() dedans
            disabled={!inStock}
          >
            <ShoppingCart className="mr-2 h-4 w-4" />
            Ajouter au panier
          </Button>

          {/* ✅ Remplacé par un span stylisé, pas un Link */}
          <span className="flex w-full items-center justify-center gap-2 rounded-md border border-neutral-200 bg-white px-3 py-1.5 text-sm font-medium text-neutral-700">
            <Eye className="h-4 w-4" />
            Voir le produit
          </span>
        </div>
      </Link>

      {/* Infos produit */}
      <div className="flex flex-1 flex-col p-4">
        {product.category && (
          <span className="text-xs font-medium text-amber-600">{product.category.name}</span>
        )}
        <Link
          href={`/products/${product.slug}`}
          className="mt-1 line-clamp-2 font-medium text-neutral-900 hover:text-neutral-600"
        >
          {product.name}
        </Link>
        <div className="mt-3 flex items-center gap-2">
          <span className="text-lg font-bold text-neutral-900">{formatPrice(product.price)}</span>
          {product.comparePrice && product.comparePrice > product.price && (
            <span className="text-sm text-neutral-400 line-through">
              {formatPrice(product.comparePrice)}
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
