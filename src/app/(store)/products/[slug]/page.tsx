// src/app/(store)/products/[slug]/page.tsx
import { Suspense } from "react";
import { notFound } from "next/navigation";
import { db } from "@/lib/db";
import { formatPrice } from "@/lib/utils";
import { AddToCartButton } from "@/components/store/AddToCartButton";
import { RelatedProducts } from "@/components/store/RelatedProducts";
import { RelatedProductsSkeleton } from "@/components/store/RelatedProductsSkeleton";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { ShieldCheck, Truck, RefreshCcw, Package, Leaf } from "lucide-react";
import type { Metadata } from "next";
import Image from "next/image";

interface Props {
  params: Promise<{ slug: string }>;
}

async function getProduct(slug: string) {
  return db.product.findUnique({
    where: { slug, published: true },
    include: { category: true },
  });
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const product = await getProduct(slug);
  if (!product) return { title: "Produit introuvable" };
  return {
    title: product.name,
    description: product.description,
  };
}

export default async function ProductPage({ params }: Props) {
  const { slug } = await params;
  const product = await getProduct(slug);

  if (!product) notFound();

  const inStock = product.stock > 0;
  const mainImage = product.images[0] ?? "/placeholder-product.jpg";

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 pt-20 sm:px-6 lg:px-8 lg:pt-26">
      <div className="grid grid-cols-1 gap-12 lg:grid-cols-2">
        {/* Images */}
        <div className="space-y-4">
          <div className="relative aspect-square overflow-hidden rounded-2xl bg-neutral-100">
            <Image src={mainImage} alt={product.name} fill className="object-cover" priority />
            {!inStock && (
              <div className="absolute inset-0 flex items-center justify-center bg-black/40">
                <Badge variant="destructive" className="text-base">
                  Rupture de stock
                </Badge>
              </div>
            )}
          </div>
          {product.images.length > 1 && (
            <div className="grid grid-cols-4 gap-2">
              {product.images.slice(1, 5).map((img, i) => (
                <div
                  key={i}
                  className="relative aspect-square overflow-hidden rounded-lg bg-neutral-100"
                >
                  <Image src={img} alt={`${product.name} ${i + 2}`} fill className="object-cover" />
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Infos */}
        <div className="flex flex-col">
          <div className="flex flex-wrap items-center gap-2">
            {product.category && (
              <span className="text-sm font-medium text-amber-600">{product.category.name}</span>
            )}
            {!product.hasAlcohol && (
              <span className="inline-flex items-center gap-1 rounded-full bg-emerald-100 px-2.5 py-0.5 text-xs font-medium text-emerald-700">
                <Leaf className="h-3 w-3" />
                Sans alcool
              </span>
            )}
          </div>

          <h1 className="mt-2 text-4xl font-bold text-neutral-900">{product.name}</h1>

          {/* Prix */}
          <div className="mt-4 flex items-baseline gap-3">
            <span className="text-3xl font-bold text-neutral-900">
              {formatPrice(product.price)}
            </span>
            {product.comparePrice && product.comparePrice > product.price && (
              <>
                <span className="text-xl text-neutral-400 line-through">
                  {formatPrice(product.comparePrice)}
                </span>
                <Badge className="bg-red-500 text-white">
                  -
                  {Math.round(
                    ((product.comparePrice - product.price) / product.comparePrice) * 100
                  )}
                  %
                </Badge>
              </>
            )}
          </div>

          {/* Stock */}
          <div className="mt-3">
            {inStock ? (
              <div className="flex items-center gap-2 text-sm text-emerald-600">
                <Package className="h-4 w-4" />
                <span>
                  En stock ({product.stock} disponible{product.stock > 1 ? "s" : ""})
                </span>
              </div>
            ) : (
              <div className="flex items-center gap-2 text-sm text-red-500">
                <Package className="h-4 w-4" />
                <span>Rupture de stock</span>
              </div>
            )}
          </div>

          <Separator className="my-6" />

          <p className="leading-relaxed text-neutral-600">{product.description}</p>

          {/* Mention alcool conditionnelle */}
          {product.hasAlcohol && (
            <p className="mt-4 text-xs text-neutral-400">
              L'abus d'alcool est dangereux pour la santé. À consommer avec modération.
            </p>
          )}

          <Separator className="my-6" />

          <AddToCartButton product={product} />

          {/* Garanties */}
          <div className="mt-8 grid grid-cols-3 gap-4">
            {[
              { icon: Truck, label: "Livraison\nrapide" },
              { icon: ShieldCheck, label: "Paiement\nsécurisé" },
              { icon: RefreshCcw, label: "Retours\ngratuits" },
            ].map(({ icon: Icon, label }) => (
              <div
                key={label}
                className="flex flex-col items-center gap-2 rounded-xl bg-neutral-50 p-4 text-center"
              >
                <Icon className="h-5 w-5 text-neutral-600" />
                <span className="text-xs whitespace-pre-line text-neutral-500">{label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Produits similaires */}
      <Suspense fallback={<RelatedProductsSkeleton />}>
        <RelatedProducts productId={product.id} />
      </Suspense>
    </div>
  );
}
