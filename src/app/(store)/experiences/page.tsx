import { Metadata } from "next";
import ReservationForm from "@/components/store/ReservationForm";
import Image from "next/image";

export const metadata: Metadata = {
  title: "Expériences — Domaine de la Rochette",
  description:
    "Venez déguster nos vins et visiter le domaine. Réservez votre expérience unique au cœur du Chinon.",
};

const EXPERIENCES = [
  {
    id: "degustation",
    type: "Dégustation",
    title: "L'essentiel du Chinon",
    duration: "1h30",
    price: "18€ / personne",
    description:
      "Guidé par Marie Mercier ou son équipe, explorez 4 à 6 vins représentatifs du domaine, des blancs aux rouges en passant par les rosés. Dégustation commentée dans notre cave tuffeau, avec accords mets et vins.",
    includes: ["Dégustation de 5 vins", "Visite de la cave", "Accords fromages locaux"],
    image: "https://images.unsplash.com/photo-1568213816046-0ee1c42bd559?w=800&q=80",
  },
  {
    id: "visite",
    type: "Visite",
    title: "Dans les rangs et la cave",
    duration: "2h",
    price: "25€ / personne",
    description:
      "Une immersion complète : parcourez les vignes avec notre vigneron, comprenez les terroirs et les différents sols, puis descendez dans la cave tuffeau pour une dégustation verticale commentée.",
    includes: ["Promenade dans les vignes", "Explication des terroirs", "Dégustation verticale de 3 millésimes"],
    image: "https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?w=800&q=80",
  },
  {
    id: "evenements",
    type: "Événements",
    title: "Privatisation & événements",
    duration: "Sur mesure",
    price: "Nous contacter",
    description:
      "Séminaires d'entreprise, soirées de dégustation privées, célébrations — nous mettons le domaine à votre disposition. Capacité jusqu'à 40 personnes dans notre salle de réception en cave.",
    includes: ["Espace privatisé", "Dégustation sur mesure", "Proposition traiteur possible"],
    image: "https://images.unsplash.com/photo-1543418219-44e30b057fea?w=800&q=80",
  },
];

export default function ExperiencesPage() {
  return (
    <main>
      {/* Hero */}
      <section className="relative h-[65vh] min-h-[450px] overflow-hidden">
        <Image
          src="https://images.unsplash.com/photo-1568213816046-0ee1c42bd559?w=1600&q=80"
          alt="Dégustation au domaine"
          fill
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/50" />
        <div className="absolute inset-0 flex flex-col items-center justify-center text-white text-center px-6">
          <p className="text-xs tracking-[0.35em] uppercase text-stone-300 font-sans mb-4">
            Expériences
          </p>
          <h1 className="font-serif text-5xl lg:text-7xl font-light mb-4">
            Vivre le domaine
          </h1>
          <p className="text-stone-300 font-sans text-base tracking-wide">
            Déguster, visiter, comprendre.
          </p>
        </div>
      </section>

      {/* Experiences */}
      <section className="max-w-6xl mx-auto px-6 py-24">
        <div className="space-y-24">
          {EXPERIENCES.map((exp, i) => (
            <div
              key={exp.id}
              id={exp.id}
              className={`grid lg:grid-cols-2 gap-12 items-center ${
                i % 2 !== 0 ? "lg:flex-row-reverse" : ""
              }`}
            >
              {/* Image */}
              <div
                className={`relative overflow-hidden ${
                  i % 2 !== 0 ? "lg:order-2" : ""
                }`}
                style={{ paddingBottom: i % 2 !== 0 ? undefined : "65%" }}
              >
                {i % 2 !== 0 ? (
                  <Image
                    src={exp.image}
                    alt={exp.title}
                    width={1200}
                    height={800}
                    className="w-full object-cover"
                    style={{ height: "400px" }}
                  />
                ) : (
                  <div className="relative" style={{ paddingBottom: "65%" }}>
                    <Image
                      src={exp.image}
                      alt={exp.title}
                      width={1200}
                      height={800}
                      className="absolute inset-0 w-full h-full object-cover"
                    />
                  </div>
                )}
              </div>

              {/* Content */}
              <div className={i % 2 !== 0 ? "lg:order-1" : ""}>
                <p className="text-xs tracking-[0.35em] uppercase text-amber-700 font-sans mb-3">
                  {exp.type}
                </p>
                <h2 className="font-serif text-3xl lg:text-4xl font-light text-stone-900 mb-2">
                  {exp.title}
                </h2>
                <div className="flex gap-6 mb-5">
                  <span className="text-sm text-stone-400 font-sans">
                    ⏱ {exp.duration}
                  </span>
                  <span className="text-sm text-stone-400 font-sans">
                    💰 {exp.price}
                  </span>
                </div>
                <p className="text-stone-500 font-sans leading-relaxed mb-6">
                  {exp.description}
                </p>
                <ul className="space-y-2 mb-8">
                  {exp.includes.map((item) => (
                    <li key={item} className="flex items-center gap-2 text-sm text-stone-600 font-sans">
                      <span className="text-amber-600">✓</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Reservation form */}
      <section className="bg-stone-50 py-24 px-6">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-12">
            <p className="text-xs tracking-[0.35em] uppercase text-amber-700 font-sans mb-4">
              Réservation
            </p>
            <h2 className="font-serif text-4xl font-light text-stone-900 mb-3">
              Réserver votre expérience
            </h2>
            <p className="text-stone-500 font-sans text-sm">
              Complétez ce formulaire et nous vous répondrons dans les 24h pour confirmer votre réservation.
            </p>
          </div>
          <ReservationForm />
        </div>
      </section>
    </main>
  );
}
