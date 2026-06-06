// src/app/(store)/(legal)/cgv/page.tsx
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Conditions générales de vente",
};

export default function CGVPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-bold text-neutral-900 mb-8">
        Conditions Générales de Vente
      </h1>
 
      <div className="prose prose-neutral max-w-none space-y-8 text-neutral-600">
 
        {/* Identification du vendeur */}
        <section>
          <p>
            <strong className="text-neutral-900">EARL Domaine GAUD</strong><br />
            3 rue Grande, 37220 Tavant<br />
            SIRET : 988 736 013 00018<br />
            TVA intracommunautaire : FR43988736013<br />
            Exploitation Agricole à Responsabilité Limitée au capital social de
            7 500 €, immatriculée au RCS de Tours<br />
            Téléphone : 06 41 83 44 05<br />
            Email : contact@domaine-gaud.com
          </p>
        </section>
 
        <section>
          <h2 className="text-xl font-semibold text-neutral-900 mb-3">
            1. Objet
          </h2>
          <p>
            Les présentes Conditions Générales de Vente (CGV) régissent
            l’ensemble des ventes de vins et de jus de raisin produits et
            commercialisés par l’EARL Domaine GAUD, en bouteilles ou en vrac, à
            destination de particuliers et de professionnels. Elles sont
            réputées acceptées intégralement par le client dès la passation de
            la commande.
          </p>
        </section>
 
        <section>
          <h2 className="text-xl font-semibold text-neutral-900 mb-3">
            2. Produits
          </h2>
          <p>
            Les vins et jus proposés à la vente proviennent exclusivement de
            l’exploitation. Les descriptifs, millésimes et conditionnements sont
            précisés lors de la commande. Les visuels et supports de
            communication sont donnés à titre indicatif.
          </p>
        </section>
 
        <section>
          <h2 className="text-xl font-semibold text-neutral-900 mb-3">
            3. Prix
          </h2>
          <p>
            Les prix sont exprimés en euros, toutes taxes comprises (TTC). Ils
            peuvent être modifiés à tout moment, mais les produits sont facturés
            au tarif en vigueur au moment de la commande validée. Les prix
            s’entendent hors frais de transport éventuels.
          </p>
        </section>
 
        <section>
          <h2 className="text-xl font-semibold text-neutral-900 mb-3">
            4. Commandes
          </h2>
          <p>
            Les commandes peuvent être passées en ligne sur le site, directement
            au domaine ou lors d’événements commerciaux (salons, marchés, etc.).
            Elles sont considérées comme définitives après validation et
            encaissement du paiement. Une confirmation de commande est adressée
            au client par email.
          </p>
        </section>
 
        <section>
          <h2 className="text-xl font-semibold text-neutral-900 mb-3">
            5. Paiement
          </h2>
          <p>
            Le règlement des achats s’effectue en euros. Le prix indiqué est
            payable au comptant, net et sans escompte. Les modes de paiement
            acceptés sont :
          </p>
          <ul className="mt-2 list-disc list-inside space-y-1">
            <li>
              en ligne, par carte bancaire via Stripe, prestataire de paiement
              sécurisé (les données bancaires ne sont jamais transmises au
              vendeur) ;
            </li>
            <li>au domaine ou en événement, en espèces (dans la limite légale de 1 000 €) ;</li>
            <li>par virement bancaire instantané ;</li>
            <li>par carte bancaire.</li>
          </ul>
        </section>
 
        <section>
          <h2 className="text-xl font-semibold text-neutral-900 mb-3">
            6. Livraison et retrait
          </h2>
          <p>
            <strong className="text-neutral-900">Retrait au domaine :</strong>{" "}
            gratuit et sur rendez-vous.
          </p>
          <p className="mt-2">
            <strong className="text-neutral-900">Livraison :</strong> les frais
            de livraison s’élèvent à 1 € par bouteille. Les délais et la zone de
            livraison sont précisés lors de la commande. Le transfert des
            risques intervient à la remise des marchandises au client ou au
            transporteur.
          </p>
        </section>
 
        <section>
          <h2 className="text-xl font-semibold text-neutral-900 mb-3">
            7. Réserve de propriété
          </h2>
          <p>
            Les produits demeurent la propriété de l’EARL Domaine GAUD jusqu’au
            paiement complet du prix par le client. Le défaut de paiement, même
            partiel, peut entraîner la revendication des produits.
          </p>
        </section>
 
        <section>
          <h2 className="text-xl font-semibold text-neutral-900 mb-3">
            8. Droit de rétractation
          </h2>
          <p>
            Conformément au Code de la consommation, les particuliers achetant à
            distance bénéficient d’un délai de 14 jours calendaires à compter de
            la date de réception du produit pour exercer leur droit de
            rétractation. Les produits doivent être retournés en parfait état,
            dans leur emballage d’origine et non ouverts. Les frais de retour
            restent à la charge du client.
          </p>
        </section>
 
        <section>
          <h2 className="text-xl font-semibold text-neutral-900 mb-3">
            9. Protection des mineurs
          </h2>
          <p>
            La vente d’alcool est interdite aux mineurs de moins de 18 ans. Le
            client certifie avoir l’âge légal requis lors de la commande.
            L’abus d’alcool est dangereux pour la santé ; à consommer avec
            modération.
          </p>
        </section>
 
        <section>
          <h2 className="text-xl font-semibold text-neutral-900 mb-3">
            10. Données personnelles
          </h2>
          <p>
            Les données personnelles recueillies sont utilisées uniquement pour
            le traitement des commandes et la gestion de la relation client.
            Elles ne sont ni transmises ni revendues. Conformément au RGPD, le
            client dispose d’un droit d’accès, de rectification et de
            suppression de ses données.
          </p>
        </section>
 
        <section>
          <h2 className="text-xl font-semibold text-neutral-900 mb-3">
            11. Loi applicable et règlement des litiges
          </h2>
          <p>
            Les présentes CGV sont soumises au droit français. En cas de litige,
            et à défaut de solution amiable, le tribunal compétent sera celui du
            ressort du siège de l’exploitation. Le client particulier est
            informé de son droit de recourir à un médiateur de la consommation.
          </p>
        </section>
 
      </div>
    </div>
  );
}