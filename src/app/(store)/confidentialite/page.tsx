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
            Le Domaine de la Rochette est responsable du traitement de vos données personnelles
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
            <li>Adresse de livraison (uniquement lors d'une commande)</li>
            <li>Historique de commandes</li>
            <li>Adresse IP et date de consentement (lors de l'inscription à la newsletter)</li>
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
            <li>Vous envoyer la newsletter (uniquement si vous y avez consenti explicitement)</li>
            <li>Respecter nos obligations légales</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-neutral-900 mb-3">
            4. Conservation des données
          </h2>
          <p>
            Vos données sont conservées pendant la durée nécessaire à
            l'exécution du contrat, augmentée des délais légaux de conservation
            (10 ans pour les données comptables). Les données d'inscription à la
            newsletter sont conservées jusqu'à désinscription.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-neutral-900 mb-3">
            5. Sous-traitants
          </h2>
          <p>
            Nous faisons appel aux sous-traitants suivants pour traiter vos données :
          </p>
          <ul className="mt-3 space-y-4 list-none">
            <li>
              <strong className="text-neutral-800">Stripe</strong> — traitement des paiements<br />
              Stripe Inc., 354 Oyster Point Blvd, South San Francisco, CA 94080, États-Unis.<br />
              Données transférées hors UE sous garanties appropriées (clauses contractuelles types).<br />
              <a href="https://stripe.com/fr/privacy" target="_blank" rel="noopener noreferrer" className="text-amber-700 underline text-sm">Politique de confidentialité Stripe</a>
            </li>
            <li>
              <strong className="text-neutral-800">Resend</strong> — envoi d'emails transactionnels et newsletter<br />
              Resend Inc., 2261 Market Street #5694, San Francisco, CA 94114, États-Unis.<br />
              Données transférées hors UE sous garanties appropriées (clauses contractuelles types).<br />
              Resend agit en tant que sous-traitant au sens de l'article 28 du RGPD et dispose d'un DPA (Data Processing Agreement) disponible sur leur site.<br />
              <a href="https://resend.com/legal/privacy-policy" target="_blank" rel="noopener noreferrer" className="text-amber-700 underline text-sm">Politique de confidentialité Resend</a>
            </li>
            <li>
              <strong className="text-neutral-800">Vercel</strong> — hébergement du site<br />
              Vercel Inc., 340 Pine Street, Suite 701, San Francisco, CA 94104, États-Unis.<br />
              <a href="https://vercel.com/legal/privacy-policy" target="_blank" rel="noopener noreferrer" className="text-amber-700 underline text-sm">Politique de confidentialité Vercel</a>
            </li>
            <li>
              <strong className="text-neutral-800">Neon</strong> — base de données<br />
              Neon Inc. — hébergement des données en Europe (région eu-central-1).<br />
              <a href="https://neon.tech/privacy-policy" target="_blank" rel="noopener noreferrer" className="text-amber-700 underline text-sm">Politique de confidentialité Neon</a>
            </li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-neutral-900 mb-3">
            6. Newsletter
          </h2>
          <p>
            L'inscription à notre newsletter nécessite un double consentement (double opt-in) :
            vous recevrez un email de confirmation que vous devrez valider avant d'être inscrit(e).
            Votre consentement (date, adresse IP) est enregistré conformément aux recommandations
            de la CNIL.
          </p>
          <p className="mt-2">
            Vous pouvez vous désinscrire à tout moment en cliquant sur le lien de désinscription
            présent dans chaque email, ou en nous contactant directement.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-neutral-900 mb-3">
            7. Vos droits
          </h2>
          <p>Conformément au RGPD, vous disposez des droits suivants :</p>
          <ul className="mt-2 list-disc list-inside space-y-1">
            <li>Droit d'accès à vos données</li>
            <li>Droit de rectification</li>
            <li>Droit à l'effacement (droit à l'oubli)</li>
            <li>Droit à la portabilité</li>
            <li>Droit d'opposition</li>
            <li>Droit de retrait du consentement à tout moment (newsletter)</li>
          </ul>
          <p className="mt-2">
            Pour exercer ces droits, contactez-nous à : contact@domainedelarochette.fr
          </p>
          <p className="mt-2">
            Vous avez également le droit d'introduire une réclamation auprès de la CNIL
            (Commission Nationale de l'Informatique et des Libertés) :{" "}
            <a href="https://www.cnil.fr" target="_blank" rel="noopener noreferrer" className="text-amber-700 underline">www.cnil.fr</a>
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-neutral-900 mb-3">
            8. Cookies
          </h2>
          <p>
            Nous utilisons uniquement des cookies techniques nécessaires au
            fonctionnement du site (session, panier). Aucun cookie publicitaire
            ou de tracking n'est utilisé.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-neutral-900 mb-3">
            9. Contact
          </h2>
          <p>
            Pour toute question relative à vos données personnelles :{" "}
            contact@domainedelarochette.fr
          </p>
        </section>

      </div>
    </div>
  );
}
