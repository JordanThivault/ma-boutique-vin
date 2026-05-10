// src/app/(store)/confidentialite/page.tsx
export default function ConfidentialitePage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-bold text-neutral-900 mb-8">
        Politique de Confidentialité
      </h1>

      <div className="prose prose-neutral max-w-none space-y-8 text-neutral-600">

        <section>
          <h2 className="text-xl font-semibold text-neutral-900 mb-3">
            1. Responsable du traitement
          </h2>
          <p>
            Ma Boutique est responsable du traitement de vos données personnelles
            conformément au Règlement Général sur la Protection des Données (RGPD).
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-neutral-900 mb-3">
            2. Données collectées
          </h2>
          <p>Nous collectons uniquement les données nécessaires :</p>
          <ul className="mt-2 list-disc list-inside space-y-1">
            <li>Nom et prénom</li>
            <li>Adresse email</li>
            <li>Adresse de livraison (uniquement lors d une commande)</li>
            <li>Historique de commandes</li>
          </ul>
          <p className="mt-2">
            Nous ne collectons pas de données bancaires — celles-ci sont
            traitées directement par Stripe.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-neutral-900 mb-3">
            3. Utilisation des données
          </h2>
          <p>Vos données sont utilisées pour :</p>
          <ul className="mt-2 list-disc list-inside space-y-1">
            <li>Traiter et livrer vos commandes</li>
            <li>Vous envoyer les confirmations de commande</li>
            <li>Gérer votre compte client</li>
            <li>Respecter nos obligations légales</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-neutral-900 mb-3">
            4. Conservation des données
          </h2>
          <p>
            Vos données sont conservées pendant la durée nécessaire à
            l exécution du contrat, augmentée des délais légaux de conservation
            (10 ans pour les données comptables).
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-neutral-900 mb-3">
            5. Vos droits
          </h2>
          <p>Conformément au RGPD, vous disposez des droits suivants :</p>
          <ul className="mt-2 list-disc list-inside space-y-1">
            <li>Droit d accès à vos données</li>
            <li>Droit de rectification</li>
            <li>Droit à l effacement (droit à l oubli)</li>
            <li>Droit à la portabilité</li>
            <li>Droit d opposition</li>
          </ul>
          <p className="mt-2">
            Pour exercer ces droits, contactez-nous à : contact@maboutique.fr
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-neutral-900 mb-3">
            6. Cookies
          </h2>
          <p>
            Nous utilisons uniquement des cookies techniques nécessaires au
            fonctionnement du site (session, panier). Aucun cookie publicitaire
            ou de tracking n est utilisé.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-neutral-900 mb-3">
            7. Contact
          </h2>
          <p>
            Pour toute question relative à vos données personnelles :
            contact@maboutique.fr
          </p>
        </section>

      </div>
    </div>
  );
}