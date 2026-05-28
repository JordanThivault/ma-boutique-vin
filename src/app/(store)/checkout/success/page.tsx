// src/app/(store)/checkout/success/page.tsx
"use client";

import { useEffect } from "react";
import { useCart } from "@/hooks/useCart";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { CheckCircle2, Package } from "lucide-react";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";

function SuccessContent() {
  const { clearCart } = useCart();
  const searchParams = useSearchParams();
  const sessionId = searchParams.get("session_id");

  useEffect(() => {
    if (sessionId) {
      clearCart();
    }
  }, [sessionId, clearCart]);

  return (
    <div className="mx-auto max-w-lg px-4 py-24 text-center sm:px-6">
      <div className="flex justify-center">
        <div className="flex h-24 w-24 items-center justify-center rounded-full bg-emerald-100">
          <CheckCircle2 className="h-14 w-14 text-emerald-600" />
        </div>
      </div>

      <h1 className="mt-8 text-3xl font-bold text-neutral-900">Commande confirmée !</h1>
      <p className="mt-4 text-lg text-neutral-500">
        Merci pour votre achat. Vous recevrez un email de confirmation avec les détails de votre
        commande.
      </p>

      <div className="mt-8 rounded-2xl border bg-neutral-50 p-6">
        <div className="flex items-center gap-3 text-left">
          <Package className="h-8 w-8 text-neutral-600" />
          <div>
            <p className="font-medium text-neutral-900">
              Votre commande est en cours de traitement
            </p>
            <p className="text-sm text-neutral-500">Vous recevrez un email dès l'expédition.</p>
          </div>
        </div>
      </div>

      <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
        <Button asChild size="lg">
          <Link href="/products">Continuer mes achats</Link>
        </Button>
        <Button asChild variant="outline" size="lg">
          <Link href="/">Retour à l'accueil</Link>
        </Button>
      </div>
    </div>
  );
}

export default function CheckoutSuccessPage() {
  return (
    <Suspense>
      <SuccessContent />
    </Suspense>
  );
}
