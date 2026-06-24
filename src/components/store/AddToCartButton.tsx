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

  function handleQuantityChange(e: React.ChangeEvent<HTMLInputElement>) {
    const value = e.target.value;
    // On autorise le champ vide pendant la saisie (sentinelle 0)
    if (value === "") {
      setQuantity(0);
      return;
    }
    const parsed = Number.parseInt(value, 10);
    if (Number.isNaN(parsed)) return;
    setQuantity(Math.min(parsed, product.stock));
  }

  function handleQuantityBlur() {
    // À la sortie du champ, on revient à 1 minimum
    if (quantity < 1) setQuantity(1);
  }

  function handleAdd() {
    const qty = Math.max(1, quantity); // garde-fou si le champ est resté "vide"
    addItem(
      {
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.images[0] ?? "",
        slug: product.slug,
        stock: product.stock,
        isBottle: product.isBottle,
      },
      qty
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
          <input
            type="number"
            inputMode="numeric"
            min={1}
            max={product.stock}
            value={quantity === 0 ? "" : quantity}
            onChange={handleQuantityChange}
            onBlur={handleQuantityBlur}
            className="w-12 [appearance:textfield] bg-transparent text-center font-medium outline-none [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
          />
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
