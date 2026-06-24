// src/lib/shipping.ts

// Frais de livraison
export const SHIPPING_PER_BOTTLE_CENTS = 100; // 1 € par bouteille
export const SHIPPING_PARCEL_CENTS = 490; // 4,90 € forfait colis (sel, condiment…)
export const FREE_SHIPPING_THRESHOLD_CENTS = 25000; // livraison offerte dès 250 €

export interface ShippableItem {
  quantity: number;
  isBottle: boolean;
  priceCents: number; // prix unitaire en centimes
}

/**
 * Frais de livraison en centimes :
 *  - 0 € si le sous-total atteint le seuil de livraison offerte (250 €)
 *  - sinon : 1 € par bouteille
 *    + 4,90 € forfaitaire (une seule fois) si la commande contient
 *    au moins un produit non-bouteille (sel, condiment…)
 */
export function computeShippingCents(items: ShippableItem[]): number {
  const subtotal = items.reduce((sum, item) => sum + item.priceCents * item.quantity, 0);
  if (subtotal >= FREE_SHIPPING_THRESHOLD_CENTS) return 0;

  let bottles = 0;
  let hasParcel = false;

  for (const item of items) {
    if (item.isBottle) {
      bottles += item.quantity;
    } else {
      hasParcel = true;
    }
  }

  return bottles * SHIPPING_PER_BOTTLE_CENTS + (hasParcel ? SHIPPING_PARCEL_CENTS : 0);
}
