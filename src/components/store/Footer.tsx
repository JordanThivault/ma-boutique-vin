// src/components/store/Footer.tsx
import Link from "next/link";

export function Footer() {
  return (
    <footer className="border-t bg-neutral-950 text-neutral-400">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-3">
          <div>
            <p className="text-lg font-bold text-white">Ma Boutique</p>
            <p className="mt-2 text-sm">
              Des produits de qualité, livrés rapidement.
            </p>
          </div>
          <div>
            <p className="font-medium text-white">Navigation</p>
            <ul className="mt-4 space-y-2 text-sm">
              <li><Link href="/products" className="hover:text-white transition-colors">Produits</Link></li>
              <li><Link href="/cart" className="hover:text-white transition-colors">Mon panier</Link></li>
              <li><Link href="/login" className="hover:text-white transition-colors">Mon compte</Link></li>
            </ul>
          </div>
          <div>
            <p className="font-medium text-white">Informations</p>
            <ul className="mt-4 space-y-2 text-sm">
              <li><Link href="#" className="hover:text-white transition-colors">CGV</Link></li>
              <li><Link href="#" className="hover:text-white transition-colors">Politique de confidentialité</Link></li>
              <li><Link href="#" className="hover:text-white transition-colors">Mentions légales</Link></li>
            </ul>
          </div>
        </div>
        <div className="mt-12 border-t border-neutral-800 pt-8 text-center text-xs">
          <p>© {new Date().getFullYear()} Ma Boutique. Paiements sécurisés par Stripe.</p>
        </div>
      </div>
    </footer>
  );
}
