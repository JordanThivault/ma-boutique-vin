// src/components/store/AddToCartButton.tsx
"use client";

import { useState } from "react";
import { useCart } from "@/hooks/useCart";
import { Button } from "@/components/ui/button";
import { Minus, Plus, ShoppingCart } from "lucide-react";
import { toast } from "sonner";
import type { Product } from "@/types/product";


export function AddToCartButton({ product }: { product: Product }) {
  const [quantity, setQuantity] = useState(1);
  const { addItem, openCart } = useCart();
  const inStock = product.stock > 0;

  function handleAdd() {
    addItem(
      {
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.images[0] ?? "",
        slug: product.slug,
        stock: product.stock,
      },
      quantity
    );
    openCart();
    toast.success(`${product.name} ajouté au panier`);
  }

  if (!inStock) {
    return (
      <Button size="lg" disabled className="w-full">
        Rupture de stock
      </Button>
    );
  }

  return (
    <div className="space-y-4">
      {/* Quantity selector */}
      <div className="flex items-center gap-4">
        <span className="text-sm font-medium text-neutral-700">Quantité</span>
        <div className="flex items-center gap-2 rounded-full border px-2 py-1">
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 rounded-full"
            onClick={() => setQuantity(Math.max(1, quantity - 1))}
          >
            <Minus className="h-4 w-4" />
          </Button>
          <span className="w-8 text-center font-medium">{quantity}</span>
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 rounded-full"
            onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}
            disabled={quantity >= product.stock}
          >
            <Plus className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <Button size="lg" className="w-full" onClick={handleAdd}>
        <ShoppingCart className="mr-2 h-5 w-5" />
        Ajouter au panier
      </Button>
    </div>
  );
}
