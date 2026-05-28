// src/app/(store)/(legal)/mentions-legales/page.tsx
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Mentions légales",
};

export default function MentionsLegalesPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-14 sm:px-6 lg:px-8">
      <h1 className="mb-10 border-b border-neutral-100 pb-6 text-2xl font-bold text-neutral-900">
        Mentions légales
      </h1>

      <div className="prose prose-neutral max-w-none space-y-8 text-neutral-600">
        <section>
          <h2 className="mb-3 text-base font-semibold tracking-[0.1em] text-neutral-900 uppercase">
            Éditeur du site
          </h2>
          <p>
            <strong className="text-neutral-900">Ma Boutique</strong>
            <br />
            Forme juridique : [À compléter]
            <br />
            Adresse : [À compléter]
            <br />
            SIRET : [À compléter]
            <br />
            Email : contact@maboutique.fr
            <br />
            Téléphone : [À compléter]
          </p>
        </section>

        <section>
          <h2 className="mb-3 text-base font-semibold tracking-[0.1em] text-neutral-900 uppercase">
            Hébergement
          </h2>
          <p>
            <strong className="text-neutral-900">Vercel Inc.</strong>
            <br />
            340 Pine Street, Suite 701
            <br />
            San Francisco, CA 94104, États-Unis
            <br />
            vercel.com
          </p>
        </section>

        <section>
          <h2 className="mb-3 text-base font-semibold tracking-[0.1em] text-neutral-900 uppercase">
            Propriété intellectuelle
          </h2>
          <p>
            L&apos;ensemble du contenu de ce site (textes, images, logos) est protégé par le droit
            d&apos;auteur. Toute reproduction est interdite sans autorisation préalable.
          </p>
        </section>

        <section>
          <h2 className="mb-3 text-base font-semibold tracking-[0.1em] text-neutral-900 uppercase">
            Avertissement alcool
          </h2>
          <p>
            Conformément à la loi Évin, la vente d&apos;alcool est interdite aux mineurs de moins de
            18 ans.
          </p>
          <p className="mt-2 font-medium text-neutral-900">
            L&apos;abus d&apos;alcool est dangereux pour la santé, à consommer avec modération.
          </p>
        </section>

        <section>
          <h2 className="mb-3 text-base font-semibold tracking-[0.1em] text-neutral-900 uppercase">
            Règlement des litiges
          </h2>
          <p>
            En cas de litige, vous pouvez recourir à une médiation conventionnelle ou à tout autre
            mode alternatif de règlement des différends. Plateforme européenne de règlement des
            litiges :{" "}
            <a
              href="https://ec.europa.eu/consumers/odr"
              target="_blank"
              rel="noopener noreferrer"
              className="text-amber-600 underline underline-offset-2 hover:text-amber-500"
            >
              ec.europa.eu/consumers/odr
            </a>
          </p>
        </section>
      </div>
    </div>
  );
}
