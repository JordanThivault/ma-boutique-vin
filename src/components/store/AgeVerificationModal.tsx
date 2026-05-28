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
    setAccepted(true);
  }

  function handleDecline() {
    window.location.href = "https://www.google.com";
  }

  if (!mounted || accepted) return null;
  if (localStorage.getItem("age-verified") === "true") return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/75 px-6 backdrop-blur-md">
      <div className="relative w-full max-w-lg overflow-hidden rounded-2xl border border-white/10 bg-black/60 shadow-2xl">
        {/* glow subtil */}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-white/5 to-transparent" />

        <div className="relative p-10 text-center">
          {/* titre */}
          <h2 className="font-serif text-2xl tracking-wide text-white">
            Accès à l’univers du Domaine
          </h2>

          {/* texte */}
          <p className="mt-4 text-sm leading-relaxed text-white/70">
            Ce site présente des vins et des expériences réservées aux personnes majeures. L’alcool
            doit être consommé avec modération.
          </p>

          <p className="mt-6 text-sm text-white/80">
            Confirmez-vous avoir <span className="font-medium text-white">18 ans ou plus</span> ?
          </p>

          {/* actions */}
          <div className="mt-8 flex flex-col gap-3">
            <Button
              size="lg"
              onClick={handleAccept}
              className="w-full bg-white text-black transition hover:bg-white/90"
            >
              Entrer
            </Button>

            <Button
              size="lg"
              variant="outline"
              onClick={handleDecline}
              className="w-full border-white/30 text-black transition hover:bg-white/10"
            >
              Quitter
            </Button>
          </div>

          {/* legal */}
          <p className="mt-8 text-[11px] leading-relaxed text-white/40">
            L’abus d’alcool est dangereux pour la santé. Vente interdite aux mineurs de moins de 18
            ans.
          </p>
        </div>
      </div>
    </div>
  );
}
