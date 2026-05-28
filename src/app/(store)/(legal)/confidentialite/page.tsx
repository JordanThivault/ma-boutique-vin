// src/app/(store)/(legal)/confidentialite/page.tsx
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Politique de confidentialité",
};

export default function ConfidentialitePage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-14 sm:px-6 lg:px-8">
      <h1 className="mb-10 border-b border-neutral-100 pb-6 text-2xl font-bold text-neutral-900">
        Politique de confidentialité
      </h1>

      <div className="prose prose-neutral max-w-none space-y-8 text-neutral-600">
        <section>
          <h2 className="mb-3 text-base font-semibold tracking-[0.1em] text-neutral-900 uppercase">
            1. Responsable du traitement
          </h2>
          <p>
            Ma Boutique est responsable du traitement de vos données personnelles conformément au
            Règlement Général sur la Protection des Données (RGPD).
          </p>
        </section>

        <section>
          <h2 className="mb-3 text-base font-semibold tracking-[0.1em] text-neutral-900 uppercase">
            2. Données collectées
          </h2>
          <p>Nous collectons uniquement les données nécessaires :</p>
          <ul className="mt-2 list-inside list-disc space-y-1">
            <li>Nom et prénom</li>
            <li>Adresse email</li>
            <li>Adresse de livraison (uniquement lors d&apos;une commande)</li>
            <li>Historique de commandes</li>
          </ul>
          <p className="mt-2">
            Nous ne collectons pas de données bancaires — celles-ci sont traitées directement par
            Stripe.
          </p>
        </section>

        <section>
          <h2 className="mb-3 text-base font-semibold tracking-[0.1em] text-neutral-900 uppercase">
            3. Utilisation des données
          </h2>
          <p>Vos données sont utilisées pour :</p>
          <ul className="mt-2 list-inside list-disc space-y-1">
            <li>Traiter et livrer vos commandes</li>
            <li>Vous envoyer les confirmations de commande</li>
            <li>Gérer votre compte client</li>
            <li>Respecter nos obligations légales</li>
          </ul>
        </section>

        <section>
          <h2 className="mb-3 text-base font-semibold tracking-[0.1em] text-neutral-900 uppercase">
            4. Conservation des données
          </h2>
          <p>
            Vos données sont conservées pendant la durée nécessaire à l&apos;exécution du contrat,
            augmentée des délais légaux de conservation (10 ans pour les données comptables).
          </p>
        </section>

        <section>
          <h2 className="mb-3 text-base font-semibold tracking-[0.1em] text-neutral-900 uppercase">
            5. Vos droits
          </h2>
          <p>Conformément au RGPD, vous disposez des droits suivants :</p>
          <ul className="mt-2 list-inside list-disc space-y-1">
            <li>Droit d&apos;accès à vos données</li>
            <li>Droit de rectification</li>
            <li>Droit à l&apos;effacement (droit à l&apos;oubli)</li>
            <li>Droit à la portabilité</li>
            <li>Droit d&apos;opposition</li>
          </ul>
          <p className="mt-2">
            Pour exercer ces droits, contactez-nous à :{" "}
            <a href="mailto:contact@maboutique.fr" className="text-amber-600 hover:text-amber-500">
              contact@maboutique.fr
            </a>
          </p>
        </section>

        <section>
          <h2 className="mb-3 text-base font-semibold tracking-[0.1em] text-neutral-900 uppercase">
            6. Cookies
          </h2>
          <p>
            Nous utilisons uniquement des cookies techniques nécessaires au fonctionnement du site
            (session, panier). Aucun cookie publicitaire ou de tracking n&apos;est utilisé.
          </p>
        </section>

        <section>
          <h2 className="mb-3 text-base font-semibold tracking-[0.1em] text-neutral-900 uppercase">
            7. Contact
          </h2>
          <p>
            Pour toute question relative à vos données personnelles :{" "}
            <a href="mailto:contact@maboutique.fr" className="text-amber-600 hover:text-amber-500">
              contact@maboutique.fr
            </a>
          </p>
        </section>
      </div>
    </div>
  );
}
