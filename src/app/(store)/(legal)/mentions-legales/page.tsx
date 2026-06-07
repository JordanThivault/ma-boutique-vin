// src/app/(store)/(legal)/mentions-legales/page.tsx
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Mentions légales",
};

export default function MentionsLegalesPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6 lg:px-8">
      <h1 className="mb-8 text-3xl font-bold text-neutral-900">Mentions Légales</h1>

      <div className="prose prose-neutral max-w-none space-y-8 text-neutral-600">
        <section>
          <h2 className="mb-3 text-xl font-semibold text-neutral-900">Éditeur du site</h2>
          <p>
            <strong className="text-neutral-900">EARL Domaine GAUD</strong>
            <br />
            Exploitation Agricole à Responsabilité Limitée au capital de 7 500 €<br />
            3 rue Grande, 37220 Tavant
            <br />
            SIRET : 988 736 013 00018
            <br />
            TVA intracommunautaire : FR43988736013
            <br />
            RCS de Tours
            <br />
            Email : isa.seb.gaud@gmail.com
            <br />
            Téléphone : 06 41 83 44 05
          </p>
        </section>

        <section>
          <h2 className="mb-3 text-xl font-semibold text-neutral-900">
            Conception et réalisation du site
          </h2>
          <p>
            <strong className="text-neutral-900">Jordan Thivault</strong>
            <br />
            SIRET : 989 714 902 00016
          </p>
        </section>

        <section>
          <h2 className="mb-3 text-xl font-semibold text-neutral-900">Hébergement</h2>
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
          <h2 className="mb-3 text-xl font-semibold text-neutral-900">Propriété intellectuelle</h2>
          <p>
            L’ensemble du contenu de ce site (textes, images, logos) est protégé par le droit
            d’auteur. Toute reproduction est interdite sans autorisation préalable.
          </p>
        </section>

        <section>
          <h2 className="mb-3 text-xl font-semibold text-neutral-900">Avertissement alcool</h2>
          <p>
            Conformément à la loi Évin, la vente d’alcool est interdite aux mineurs de moins de 18
            ans.
          </p>
          <p className="mt-2 font-medium text-neutral-900">
            L’abus d’alcool est dangereux pour la santé, à consommer avec modération.
          </p>
        </section>

        <section>
          <h2 className="mb-3 text-xl font-semibold text-neutral-900">Règlement des litiges</h2>
          <p>
            En cas de litige, vous pouvez recourir à une médiation conventionnelle ou à tout autre
            mode alternatif de règlement des différends. Plateforme européenne de règlement des
            litiges :{" "}
            <a
              href="https://ec.europa.eu/consumers/odr"
              target="_blank"
              rel="noopener noreferrer"
              className="text-neutral-900 underline"
            >
              ec.europa.eu/consumers/odr
            </a>
          </p>
        </section>
      </div>
    </div>
  );
}
