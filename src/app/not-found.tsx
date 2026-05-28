// src/app/not-found.tsx
import Link from "next/link";

export default function NotFound() {
  return (
    <div className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-stone-950 px-6 text-center">
      {/* Cercles décoratifs */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute top-1/2 left-1/2 h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/5" />
        <div className="absolute top-1/2 left-1/2 h-[400px] w-[400px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/5" />
        <div className="absolute top-1/2 left-1/2 h-[200px] w-[200px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/5" />
      </div>

      {/* Contenu */}
      <div className="relative z-10 flex flex-col items-center">
        {/* Logo */}
        <div className="mb-16 flex flex-col items-center leading-none">
          <span className="font-sans text-[9px] tracking-[0.35em] text-stone-500 uppercase">
            Domaine
          </span>
          <span className="font-serif text-2xl text-white">Test</span>
          <span className="font-sans text-[9px] tracking-[0.4em] text-stone-500 uppercase">
            Chinon
          </span>
        </div>

        {/* 404 */}
        <p className="absolute -translate-y-4 font-serif text-[10rem] leading-none font-light text-white/5 select-none lg:text-[14rem]">
          404
        </p>

        <div className="relative">
          <p className="mb-4 font-sans text-[10px] tracking-[0.4em] text-amber-500 uppercase">
            Page introuvable
          </p>
          <h1 className="mb-6 font-serif text-4xl leading-tight font-light text-white lg:text-6xl">
            Cette page s'est
            <br />
            évaporée
          </h1>
          <p className="mx-auto mb-12 max-w-sm font-sans text-sm leading-relaxed text-stone-400">
            Comme un grand millésime, certaines choses ne durent pas éternellement. La page que vous
            cherchez n'existe plus ou a changé d'adresse.
          </p>
        </div>

        {/* CTA */}
        <div className="flex flex-col gap-4 sm:flex-row">
          <Link
            href="/"
            className="bg-white px-8 py-3.5 font-sans text-sm tracking-[0.15em] text-stone-900 uppercase transition-colors duration-300 hover:bg-stone-100"
          >
            Retour à l'accueil
          </Link>
          <Link
            href="/products"
            className="border border-white/20 px-8 py-3.5 font-sans text-sm tracking-[0.15em] text-white uppercase transition-colors duration-300 hover:bg-white/5"
          >
            Découvrir les vins
          </Link>
        </div>
      </div>

      {/* Bas de page */}
      <p className="absolute bottom-6 font-sans text-[10px] tracking-wide text-stone-600">
        L'abus d'alcool est dangereux pour la santé. À consommer avec modération.
      </p>
    </div>
  );
}
