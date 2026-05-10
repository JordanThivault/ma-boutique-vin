// src/components/store/Footer.tsx
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

export function Footer() {
  const { data: session } = useSession();
  const mounted = useIsMounted();

  return (
    <footer className="border-t bg-neutral-950 text-neutral-400">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-4">

          {/* Brand */}
          <div>
            <p className="text-lg font-bold text-white">Ma Boutique</p>
            <p className="mt-2 text-sm leading-relaxed">
              Des vins et produits artisanaux de qualité, livrés rapidement.
            </p>
          </div>

          {/* Navigation */}
          <div>
            <p className="font-medium text-white">Navigation</p>
            <ul className="mt-4 space-y-2 text-sm">
              <li>
                <Link href="/products" className="hover:text-white transition-colors">
                  Produits
                </Link>
              </li>
              <li>
                <Link href="/products?featured=true" className="hover:text-white transition-colors">
                  Nouveautés
                </Link>
              </li>
              <li>
                <Link href="/cart" className="hover:text-white transition-colors">
                  Mon panier
                </Link>
              </li>
            </ul>
          </div>

          {/* Mon compte — ✅ rendu uniquement après hydration */}
          <div>
            <p className="font-medium text-white">Mon compte</p>
            <ul className="mt-4 space-y-2 text-sm">
              {!mounted ? (
                // ✅ SSR → liens neutres sans session
                <>
                  <li>
                    <Link href="/login" className="hover:text-white transition-colors">
                      Connexion
                    </Link>
                  </li>
                  <li>
                    <Link href="/register" className="hover:text-white transition-colors">
                      Créer un compte
                    </Link>
                  </li>
                </>
              ) : session ? (
                <>
                  <li>
                    <Link href="/account/orders" className="hover:text-white transition-colors">
                      Mes commandes
                    </Link>
                  </li>
                  <li>
                    <Link href="/account/profile" className="hover:text-white transition-colors">
                      Mon profil
                    </Link>
                  </li>
                </>
              ) : (
                <>
                  <li>
                    <Link href="/login" className="hover:text-white transition-colors">
                      Connexion
                    </Link>
                  </li>
                  <li>
                    <Link href="/register" className="hover:text-white transition-colors">
                      Créer un compte
                    </Link>
                  </li>
                </>
              )}
            </ul>
          </div>

          {/* Informations légales */}
          <div>
            <p className="font-medium text-white">Informations</p>
            <ul className="mt-4 space-y-2 text-sm">
              <li>
                <Link href="/cgv" className="hover:text-white transition-colors">
                  CGV
                </Link>
              </li>
              <li>
                <Link href="/confidentialite" className="hover:text-white transition-colors">
                  Politique de confidentialité
                </Link>
              </li>
              <li>
                <Link href="/mentions-legales" className="hover:text-white transition-colors">
                  Mentions légales
                </Link>
              </li>
            </ul>
          </div>

        </div>

        <div className="mt-12 border-t border-neutral-800 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
          <p>© {new Date().getFullYear()} Ma Boutique. Tous droits réservés.</p>
          <p>Paiements sécurisés par Stripe 🔒 — L abus d alcool est dangereux pour la santé 🍷</p>
        </div>
      </div>
    </footer>
  );
}