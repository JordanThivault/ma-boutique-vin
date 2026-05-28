// src/lib/shipping.ts

export const FREE_SHIPPING_THRESHOLD = 6000; // en centimes = 60€
export const SHIPPING_COST = 490;             // en centimes = 4,90€
export const EXPRESS_SHIPPING_COST = 990; // 9,90€

export function calculateShipping(subtotalCents: number): number {
  return subtotalCents >= FREE_SHIPPING_THRESHOLD ? 0 : SHIPPING_COST;
}