// src/app/(store)/mentions-legales/page.tsx
export default function MentionsLegalesPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-bold text-neutral-900 mb-8">
        Mentions Légales
      </h1>

      <div className="prose prose-neutral max-w-none space-y-8 text-neutral-600">

        <section>
          <h2 className="text-xl font-semibold text-neutral-900 mb-3">
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
          <h2 className="text-xl font-semibold text-neutral-900 mb-3">
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
          <h2 className="text-xl font-semibold text-neutral-900 mb-3">
            Propriété intellectuelle
          </h2>
          <p>
            L ensemble du contenu de ce site (textes, images, logos) est
            protégé par le droit d auteur. Toute reproduction est interdite
            sans autorisation préalable.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-neutral-900 mb-3">
            Avertissement alcool
          </h2>
          <p>
            Conformément à la loi Évin, la vente d alcool est interdite
            aux mineurs de moins de 18 ans. L abus d alcool est dangereux
            pour la santé. À consommer avec modération.
          </p>
          <p className="mt-2 font-medium text-neutral-900">
            L abus d alcool est dangereux pour la santé, à consommer avec modération.
          </p>
        </section>

        <section>
            <h2 className="text-xl font-semibold text-neutral-900 mb-3">
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