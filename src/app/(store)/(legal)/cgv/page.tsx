// src/app/(store)/(legal)/cgv/page.tsx
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Conditions générales de vente",
};

export default function CGVPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-14 sm:px-6 lg:px-8">
      <h1 className="mb-10 border-b border-neutral-100 pb-6 text-2xl font-bold text-neutral-900">
        Conditions générales de vente
      </h1>

      <div className="prose prose-neutral max-w-none space-y-8 text-neutral-600">
        <section>
          <h2 className="mb-3 text-base font-semibold tracking-[0.1em] text-neutral-900 uppercase">
            1. Objet
          </h2>
          <p>
            Les présentes conditions générales de vente régissent les relations contractuelles entre
            Ma Boutique (ci-après le Vendeur) et tout acheteur (ci-après le Client) effectuant un
            achat sur le site maboutique.fr.
          </p>
        </section>

        <section>
          <h2 className="mb-3 text-base font-semibold tracking-[0.1em] text-neutral-900 uppercase">
            2. Produits et prix
          </h2>
          <p>
            Les produits proposés sont des boissons alcoolisées. Conformément à la législation
            française, la vente d&apos;alcool est strictement interdite aux mineurs de moins de 18
            ans.
          </p>
          <p className="mt-2">
            Les prix sont indiqués en euros toutes taxes comprises (TTC). Le Vendeur se réserve le
            droit de modifier ses prix à tout moment, étant entendu que le prix applicable est celui
            en vigueur au moment de la commande.
          </p>
        </section>

        <section>
          <h2 className="mb-3 text-base font-semibold tracking-[0.1em] text-neutral-900 uppercase">
            3. Commandes
          </h2>
          <p>
            Toute commande implique l&apos;acceptation des présentes CGV. Le Client reconnaît avoir
            la capacité légale de contracter et être âgé de 18 ans ou plus.
          </p>
          <p className="mt-2">
            La confirmation de commande est envoyée par email après validation du paiement. Le
            contrat est formé à réception de cette confirmation.
          </p>
        </section>

        <section>
          <h2 className="mb-3 text-base font-semibold tracking-[0.1em] text-neutral-900 uppercase">
            4. Paiement
          </h2>
          <p>
            Le paiement s&apos;effectue en ligne par carte bancaire via Stripe, prestataire de
            paiement sécurisé. Les données bancaires ne sont jamais transmises au Vendeur.
          </p>
        </section>

        <section>
          <h2 className="mb-3 text-base font-semibold tracking-[0.1em] text-neutral-900 uppercase">
            5. Livraison
          </h2>
          <p>
            Les livraisons sont effectuées en France métropolitaine uniquement. Les délais de
            livraison sont donnés à titre indicatif. En cas de retard, le Client sera informé par
            email.
          </p>
          <p className="mt-2">
            La livraison est offerte à partir de 120&nbsp;€ d&apos;achat. En dessous de ce montant,
            des frais de livraison s&apos;appliquent selon le mode choisi.
          </p>
        </section>

        <section>
          <h2 className="mb-3 text-base font-semibold tracking-[0.1em] text-neutral-900 uppercase">
            6. Droit de rétractation
          </h2>
          <p>
            Conformément à l&apos;article L221-18 du Code de la consommation, le Client dispose
            d&apos;un délai de 14 jours à compter de la réception de sa commande pour exercer son
            droit de rétractation, sans avoir à justifier sa décision.
          </p>
          <p className="mt-2">
            Les produits doivent être retournés dans leur état d&apos;origine, non ouverts et non
            consommés.
          </p>
        </section>

        <section>
          <h2 className="mb-3 text-base font-semibold tracking-[0.1em] text-neutral-900 uppercase">
            7. Responsabilité
          </h2>
          <p>
            Le Vendeur ne pourra être tenu responsable des dommages de toute nature résultant
            d&apos;une mauvaise utilisation des produits ou d&apos;une consommation excessive
            d&apos;alcool.
          </p>
        </section>

        <section>
          <h2 className="mb-3 text-base font-semibold tracking-[0.1em] text-neutral-900 uppercase">
            8. Droit applicable
          </h2>
          <p>
            Les présentes CGV sont soumises au droit français. En cas de litige, les tribunaux
            français seront seuls compétents.
          </p>
        </section>
      </div>
    </div>
  );
}
