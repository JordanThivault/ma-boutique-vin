// src/components/store/AgeVerificationModal.tsx
"use client";

import { useState, useSyncExternalStore } from "react";
import { Button } from "@/components/ui/button";

function useIsMounted() {
  return useSyncExternalStore(
    () => () => {},
    () => true,
    () => false
  );
}

export function AgeVerificationModal() {
  const mounted = useIsMounted();
  const [accepted, setAccepted] = useState(false);

  function handleAccept() {
    localStorage.setItem("age-verified", "true");
    setAccepted(true); // ✅ juste un state change, pas de reload
  }

  function handleDecline() {
    window.location.href = "https://www.google.com";
  }

  // SSR ou déjà accepté dans cette session
  if (!mounted || accepted) return null;

  // Déjà vérifié dans une session précédente
  if (localStorage.getItem("age-verified") === "true") return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-sm">
      <div className="mx-4 w-full max-w-md rounded-2xl bg-white p-8 shadow-2xl">

        <div className="mb-6 text-center">
          <span className="text-6xl">🍷</span>
        </div>

        <h2 className="text-center text-2xl font-bold text-neutral-900">
          Vérification de l âge
        </h2>

        <p className="mt-3 text-center text-neutral-500 leading-relaxed">
          Ce site vend des boissons alcoolisées. Vous devez avoir{" "}
          <strong className="text-neutral-900">18 ans ou plus</strong> pour
          accéder à ce contenu.
        </p>

        <p className="mt-2 text-center text-sm text-neutral-400">
          Avez-vous 18 ans ou plus ?
        </p>

        <div className="mt-8 flex flex-col gap-3">
          <Button size="lg" className="w-full" onClick={handleAccept}>
            Oui, j ai 18 ans ou plus
          </Button>
          <Button
            size="lg"
            variant="outline"
            className="w-full"
            onClick={handleDecline}
          >
            Non, j ai moins de 18 ans
          </Button>
        </div>

        <p className="mt-6 text-center text-xs text-neutral-400 leading-relaxed">
          L abus d alcool est dangereux pour la santé. À consommer avec modération.
          La vente d alcool aux mineurs est interdite par la loi.
        </p>

      </div>
    </div>
  );
}