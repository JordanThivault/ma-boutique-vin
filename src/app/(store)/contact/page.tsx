import type { Metadata } from "next";
import ContactForm from "@/components/store/ContactForm";

export const metadata: Metadata = {
  title: "Contact — Domaine Gaud",
  description:
    "Contactez le Domaine Gaud à Tavant, au cœur du Chinon. Adresse, téléphone, email et formulaire de contact.",
};

export default function ContactPage() {
  return (
    <main>
      {/* Header */}
      <section className="mx-auto max-w-6xl px-6 pt-24 pb-12 text-center">
        <p className="mb-4 font-sans text-xs tracking-[0.35em] text-amber-700 uppercase">Contact</p>

        <h1 className="mb-4 font-serif text-5xl font-light text-stone-900 lg:text-6xl">
          Nous contacter
        </h1>

        <p className="mx-auto max-w-xl font-sans text-base text-stone-500">
          Une question, une commande, une envie de venir nous rencontrer ? Écrivez-nous.
        </p>
      </section>

      {/* Content */}
      <section className="mx-auto max-w-6xl px-6 pb-24">
        <div className="grid gap-16 lg:grid-cols-2">
          {/* Coordonnées + carte */}
          <div>
            <h2 className="mb-6 font-serif text-2xl font-light text-stone-900">Le domaine</h2>

            <address className="space-y-4 font-sans text-sm text-stone-600 not-italic">
              <div>
                <p className="mb-1 text-xs tracking-[0.2em] text-stone-400 uppercase">Adresse</p>
                <p>EARL Domaine Gaud</p>
                <p>3 Rue Grande, 37220 Tavant</p>
              </div>

              <div>
                <p className="mb-1 text-xs tracking-[0.2em] text-stone-400 uppercase">Téléphone</p>
                <a href="tel:+33641834405" className="transition-colors hover:text-stone-900">
                  06 41 83 44 05
                </a>
              </div>

              <div>
                <p className="mb-1 text-xs tracking-[0.2em] text-stone-400 uppercase">Email</p>
                <a
                  href="mailto:contact@domaine-gaud.com"
                  className="transition-colors hover:text-stone-900"
                >
                  contact@domaine-gaud.com
                </a>
              </div>
            </address>

            <div className="mt-8 overflow-hidden border border-stone-200">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2714.6797151652363!2d0.38537339649181956!3d47.12494799676177!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47fd15565dcaccd9%3A0xf2674ffde8fce5b9!2sDomaine%20Gaud!5e0!3m2!1sfr!2sfr!4v1782804495205!5m2!1sfr!2sfr"
                title="Localisation du Domaine Gaud à Tavant"
                width="600"
                height="450"
                className="h-[360px] w-full"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="strict-origin-when-cross-origin"
              />
            </div>
          </div>

          {/* Formulaire */}
          <div>
            <h2 className="mb-6 font-serif text-2xl font-light text-stone-900">
              Envoyer un message
            </h2>

            <ContactForm />
          </div>
        </div>
      </section>
    </main>
  );
}