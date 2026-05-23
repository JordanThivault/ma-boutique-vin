// src/app/(store)/(legal)/mentions-legales/page.tsx
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Mentions légales",
};

export default function MentionsLegalesPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-14 sm:px-6 lg:px-8">
      <h1 className="text-2xl font-bold text-neutral-900 mb-10 pb-6 border-b border-neutral-100">
        Mentions légales
      </h1>

      <div className="prose prose-neutral max-w-none space-y-8 text-neutral-600">

        <section>
          <h2 className="text-base font-semibold text-neutral-900 mb-3 uppercase tracking-[0.1em]">
            Éditeur du site
          </h2>
          <p>
            <strong className="text-neutral-900">Ma Boutique</strong><br />
            Forme juridique : [À compléter]<br />
            Adresse : [À compléter]<br />
            SIRET : [À compléter]<br />
            Email : contact@maboutique.fr<br />
            Téléphone : [À compléter]
          </p>
        </section>

        <section>
          <h2 className="text-base font-semibold text-neutral-900 mb-3 uppercase tracking-[0.1em]">
            Hébergement
          </h2>
          <p>
            <strong className="text-neutral-900">Vercel Inc.</strong><br />
            340 Pine Street, Suite 701<br />
            San Francisco, CA 94104, États-Unis<br />
            vercel.com
          </p>
        </section>

        <section>
          <h2 className="text-base font-semibold text-neutral-900 mb-3 uppercase tracking-[0.1em]">
            Propriété intellectuelle
          </h2>
          <p>
            L&apos;ensemble du contenu de ce site (textes, images, logos) est
            protégé par le droit d&apos;auteur. Toute reproduction est interdite
            sans autorisation préalable.
          </p>
        </section>

        <section>
          <h2 className="text-base font-semibold text-neutral-900 mb-3 uppercase tracking-[0.1em]">
            Avertissement alcool
          </h2>
          <p>
            Conformément à la loi Évin, la vente d&apos;alcool est interdite
            aux mineurs de moins de 18 ans.
          </p>
          <p className="mt-2 font-medium text-neutral-900">
            L&apos;abus d&apos;alcool est dangereux pour la santé, à consommer avec modération.
          </p>
        </section>

        <section>
          <h2 className="text-base font-semibold text-neutral-900 mb-3 uppercase tracking-[0.1em]">
            Règlement des litiges
          </h2>
          <p>
            En cas de litige, vous pouvez recourir à une médiation conventionnelle
            ou à tout autre mode alternatif de règlement des différends.
            Plateforme européenne de règlement des litiges :{" "}
            <a
              href="https://ec.europa.eu/consumers/odr"
              target="_blank"
              rel="noopener noreferrer"
              className="text-amber-600 hover:text-amber-500 underline underline-offset-2"
            >
              ec.europa.eu/consumers/odr
            </a>
          </p>
        </section>

      </div>
    </div>
  );
}
