"use client";

import Link from "next/link";
import { useSession } from "@/lib/auth-client";
import { useSyncExternalStore } from "react";

function useIsMounted() {
  return useSyncExternalStore(
    () => () => {},
    () => true,
    () => false
  );
}

export default function Footer() {
  const { data: session } = useSession();
  const mounted = useIsMounted();

  return (
    <footer className="bg-stone-950 text-stone-400 pt-16 pb-8 px-6">
      <div className="max-w-7xl mx-auto">

        {/* TOP GRID */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-10 pb-14 border-b border-stone-800">

          {/* BRAND */}
          <div className="col-span-2 md:col-span-1">
            <div className="flex flex-col leading-none mb-5">
              <span className="font-sans text-[9px] tracking-[0.25em] uppercase text-stone-600">
                Domaine
              </span>
              <span className="font-serif text-xl text-white">
                test
              </span>
              <span className="font-sans text-[9px] tracking-[0.3em] uppercase text-stone-600">
                Chinon
              </span>
            </div>

            <p className="text-xs text-stone-500 leading-relaxed">
              Vins et expériences au cœur du terroir de Chinon.
            </p>
          </div>

          {/* NAVIGATION */}
          <div>
            <h4 className="text-[10px] tracking-[0.3em] uppercase text-stone-500 mb-5">
              Navigation
            </h4>

            <ul className="space-y-3 text-sm">
              <li><Link href="/products">Produits</Link></li>
              <li><Link href="/experiences">Expériences</Link></li>
              <li><Link href="/journal">Journal</Link></li>
              <li><Link href="/cart">Panier</Link></li>
            </ul>
          </div>

          {/* MON COMPTE */}
          <div>
            <h4 className="text-[10px] tracking-[0.3em] uppercase text-stone-500 mb-5">
              Mon compte
            </h4>

            <ul className="space-y-3 text-sm">
              {!mounted || !session ? (
                <>
                  <li><Link href="/login">Connexion</Link></li>
                  <li><Link href="/register">Créer un compte</Link></li>
                </>
              ) : (
                <>
                  <li><Link href="/account/orders">Commandes</Link></li>
                  <li><Link href="/account/profile">Profil</Link></li>
                </>
              )}
            </ul>
          </div>

          {/* LEGAL */}
          <div>
            <h4 className="text-[10px] tracking-[0.3em] uppercase text-stone-500 mb-5">
              Informations
            </h4>

            <ul className="space-y-3 text-sm">
              <li><Link href="/mentions-legales">Mentions légales</Link></li>
              <li><Link href="/confidentialite">Confidentialité</Link></li>
              <li><Link href="/cgv">CGV</Link></li>
            </ul>
          </div>

          {/* NEWSLETTER CTA */}
          <div>
            <h4 className="text-[10px] tracking-[0.3em] uppercase text-stone-500 mb-5">
              Newsletter
            </h4>

            <p className="text-xs text-stone-500 mb-3">
              Recevez les nouveautés du domaine
            </p>

            <Link
              href="/#newsletter"
              className="text-xs tracking-[0.2em] uppercase text-amber-600 hover:text-amber-500"
            >
              S’inscrire →
            </Link>
          </div>
        </div>

        {/* BOTTOM */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-stone-600">
          <p>© {new Date().getFullYear()} Domaine test</p>

          <p className="text-center text-stone-700 text-[11px]">
            L’abus d’alcool est dangereux pour la santé.
          </p>
        </div>

      </div>
    </footer>
  );
}