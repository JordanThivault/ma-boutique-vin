"use client";

import { useEffect } from "react";
import Link from "next/link";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="min-h-screen bg-stone-950 flex flex-col items-center justify-center px-6 text-center relative overflow-hidden">

      {/* Cercles décoratifs */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full border border-white/5" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] rounded-full border border-white/5" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[200px] h-[200px] rounded-full border border-white/5" />
      </div>

      <div className="relative z-10 flex flex-col items-center">

        {/* Logo */}
        <div className="flex flex-col leading-none items-center mb-16">
          <span className="font-sans text-[9px] tracking-[0.35em] uppercase text-stone-500">
            Domaine
          </span>
          <span className="font-serif text-2xl text-white">Test</span>
          <span className="font-sans text-[9px] tracking-[0.4em] uppercase text-stone-500">
            Chinon
          </span>
        </div>

        {/* 500 fantôme */}
        <p className="font-serif text-[10rem] lg:text-[14rem] font-light text-white/5 leading-none select-none absolute -translate-y-4">
          500
        </p>

        <div className="relative">
          <p className="font-sans text-[10px] tracking-[0.4em] uppercase text-amber-500 mb-4">
            Une erreur est survenue
          </p>
          <h1 className="font-serif text-4xl lg:text-6xl font-light text-white mb-6 leading-tight">
            Quelque chose<br />s'est mal passé
          </h1>
          <p className="text-stone-400 font-sans text-sm leading-relaxed max-w-sm mx-auto mb-12">
            Nos équipes ont été notifiées. En attendant, vous pouvez réessayer ou revenir à l'accueil.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4">
          <button
            onClick={reset}
            className="px-8 py-3.5 bg-white text-stone-900 text-sm font-sans tracking-[0.15em] uppercase hover:bg-stone-100 transition-colors duration-300"
          >
            Réessayer
          </button>
          <Link
            href="/"
            className="px-8 py-3.5 border border-white/20 text-white text-sm font-sans tracking-[0.15em] uppercase hover:bg-white/5 transition-colors duration-300"
          >
            Retour à l'accueil
          </Link>
        </div>

      </div>

      <p className="absolute bottom-6 text-[10px] text-stone-600 font-sans tracking-wide">
        L'abus d'alcool est dangereux pour la santé. À consommer avec modération.
      </p>
    </div>
  );
}
