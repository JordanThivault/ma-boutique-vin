"use client";

import { useState } from "react";
import { useCart } from "@/hooks/useCart";
import { toast } from "sonner";

export function useCheckout() {
  const { items } = useCart();
  const [loading, setLoading] = useState(false);

  async function checkout() {
    if (items.length === 0) return;
    setLoading(true);
    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          items: items.map((i) => ({
            productId: i.product.id,
            quantity: i.quantity,
          })),
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        toast.error(data.error ?? "Erreur lors du paiement");
        return;
      }

      if (data.url) {
        window.location.href = data.url;
      }
    } catch {
      toast.error("Erreur réseau, veuillez réessayer");
    } finally {
      setLoading(false);
    }
  }

  return { checkout, loading };
}