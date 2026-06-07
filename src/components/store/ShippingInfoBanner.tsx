// src/components/store/ShippingInfoBanner.tsx
import { Truck } from "lucide-react";

export function ShippingInfoBanner({
  isBottle = true,
  className = "",
}: {
  isBottle?: boolean;
  className?: string;
}) {
  return (
    <div
      className={`flex items-center gap-3 rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-800 ${className}`}
    >
      <Truck className="h-4 w-4 shrink-0" />
      <span>
        {isBottle ? (
          <>
            Livraison <strong>1&nbsp;€ par bouteille</strong>
          </>
        ) : (
          <>
            Livraison <strong>4,90&nbsp;€</strong> (colis)
          </>
        )}
      </span>
    </div>
  );
}
