// src/app/(store)/cart/page.tsx
"use client";

import { useCart } from "@/hooks/useCart";
import { formatPrice } from "@/lib/utils";
import { computeShippingCents } from "@/lib/shipping";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Minus, Plus, Trash2, ShoppingBag, ArrowLeft } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { useCheckout } from "@/hooks/useCheckout";

export default function CartPage() {
  const { items, removeItem, updateQuantity, totalPrice } = useCart();
  const { checkout, loading } = useCheckout();

  const subtotal = totalPrice();
  const shipping = computeShippingCents(
    items.map((i) => ({
      quantity: i.quantity,
      isBottle: i.product.isBottle ?? true,
    }))
  );
  const total = subtotal + shipping;

  if (items.length === 0) {
    return (
      <div className="mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center justify-center gap-6 text-center">
          <ShoppingBag className="h-20 w-20 text-neutral-300" />
          <h1 className="text-2xl font-bold text-neutral-900">Votre panier est vide</h1>
          <p className="text-neutral-500">Ajoutez des produits pour commencer vos achats.</p>
          <Button asChild>
            <Link href="/products">Découvrir nos produits</Link>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 pt-20 sm:px-6 lg:px-8 lg:pt-26">
      <div className="mb-8 flex items-center gap-4">
        <Button variant="ghost" size="sm" asChild>
          <Link href="/products">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Continuer les achats
          </Link>
        </Button>
        <h1 className="text-2xl font-bold text-neutral-900">
          Mon panier ({items.length} article{items.length > 1 ? "s" : ""})
        </h1>
      </div>

      <div className="grid grid-cols-1 gap-12 lg:grid-cols-3">
        {/* Items */}
        <div className="space-y-4 lg:col-span-2">
          {items.map(({ product, quantity }) => (
            <div key={product.id} className="flex gap-4 rounded-2xl border bg-white p-4">
              <div className="relative h-24 w-24 flex-shrink-0 overflow-hidden rounded-xl bg-neutral-100">
                <Image
                  src={product.image || "/placeholder-product.jpg"}
                  alt={product.name}
                  fill
                  className="object-cover"
                />
              </div>

              <div className="flex flex-1 flex-col justify-between">
                <div className="flex items-start justify-between">
                  <div>
                    <Link
                      href={`/products/${product.slug}`}
                      className="font-medium text-neutral-900 hover:text-neutral-600"
                    >
                      {product.name}
                    </Link>
                    <p className="mt-1 text-sm text-neutral-500">
                      {formatPrice(product.price)} / unité
                    </p>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="text-neutral-400 hover:text-red-500"
                    onClick={() => removeItem(product.id)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 rounded-full border px-1 py-1">
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-7 w-7 rounded-full"
                      onClick={() => updateQuantity(product.id, quantity - 1)}
                    >
                      <Minus className="h-3 w-3" />
                    </Button>
                    <span className="w-6 text-center text-sm font-medium">{quantity}</span>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-7 w-7 rounded-full"
                      onClick={() => updateQuantity(product.id, quantity + 1)}
                      disabled={quantity >= product.stock}
                    >
                      <Plus className="h-3 w-3" />
                    </Button>
                  </div>
                  <p className="font-semibold text-neutral-900">
                    {formatPrice(product.price * quantity)}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Summary */}
        <div className="lg:col-span-1">
          <div className="sticky top-24 rounded-2xl border bg-white p-6">
            <h2 className="text-lg font-semibold text-neutral-900">Récapitulatif</h2>

            <div className="mt-6 space-y-3">
              <div className="flex justify-between text-sm">
                <span className="text-neutral-500">Sous-total</span>
                <span>{formatPrice(subtotal)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-neutral-500">Livraison</span>
                <span>{formatPrice(shipping)}</span>
              </div>
              <p className="rounded-lg bg-neutral-50 px-3 py-2 text-xs text-neutral-500">
                1&nbsp;€ / bouteille · 4,90&nbsp;€ pour les autres produits. Code promo à saisir au
                paiement.
              </p>
            </div>

            <Separator className="my-4" />

            <div className="flex justify-between font-semibold">
              <span>Total</span>
              <span className="text-lg">{formatPrice(total)}</span>
            </div>

            <Button className="mt-6 w-full" size="lg" onClick={checkout} disabled={loading}>
              {loading ? "Redirection..." : "Payer maintenant"}
            </Button>

            <p className="mt-3 text-center text-xs text-neutral-400">
              Paiement sécurisé par Stripe 🔒
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
