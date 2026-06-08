import type { Metadata } from "next";
import Image from "next/image";
import { db } from "@/lib/db";
import ReservationForm from "@/components/store/ReservationForm";

export const metadata: Metadata = {
  title: "Expériences — Domaine Gaud",
  description:
    "Venez déguster nos vins et visiter le domaine. Réservez votre expérience unique au cœur du Chinon.",
};

export default async function ExperiencesPage() {
  const experiences = await db.experience.findMany({
    where: {
      active: true,
    },
    orderBy: {
      order: "asc",
    },
  });

  return (
    <main>
      {/* Hero */}
      <section className="relative h-[65vh] min-h-[450px] overflow-hidden">
        <Image
          src="/images/exp_hero3.jpg"
          alt="Dégustation au domaine"
          fill
          priority
          className="h-full w-full object-cover"
        />

        <div className="absolute inset-0 bg-black/50" />

        <div className="absolute inset-0 flex flex-col items-center justify-center px-6 text-center text-white">
          <p className="mb-4 font-sans text-xs tracking-[0.35em] text-stone-300 uppercase">
            Expériences
          </p>

          <h1 className="mb-4 font-serif text-5xl font-light lg:text-7xl">Vivre le domaine</h1>

          <p className="font-sans text-base tracking-wide text-stone-300">
            Déguster, visiter, comprendre.
          </p>
        </div>
      </section>

      {/* Experiences */}
      <section className="mx-auto max-w-6xl px-6 py-24">
        {experiences.length === 0 ? (
          <div className="py-24 text-center">
            <p className="font-sans text-stone-400">Aucune expérience disponible pour le moment.</p>
          </div>
        ) : (
          <div className="space-y-24">
            {experiences.map((exp, i) => (
              <div
                key={exp.id}
                id={exp.type.toLowerCase().replace(/\s+/g, "-")}
                className="grid items-center gap-12 lg:grid-cols-2"
              >
                {/* Image */}
                <div className={`relative overflow-hidden ${i % 2 !== 0 ? "lg:order-2" : ""}`}>
                  {exp.image ? (
                    <div className="relative h-[420px] w-full overflow-hidden">
                      <Image src={exp.image} alt={exp.title} fill className="object-cover" />
                    </div>
                  ) : (
                    <div className="flex h-[420px] w-full items-center justify-center bg-stone-100">
                      <span className="font-sans text-sm text-stone-300">Aucune image</span>
                    </div>
                  )}
                </div>

                {/* Content */}
                <div className={i % 2 !== 0 ? "lg:order-1" : ""}>
                  <p className="mb-3 font-sans text-xs tracking-[0.35em] text-amber-700 uppercase">
                    {exp.type}
                  </p>

                  <h2 className="mb-2 font-serif text-3xl font-light text-stone-900 lg:text-4xl">
                    {exp.title}
                  </h2>

                  <div className="mb-5 flex gap-6">
                    <span className="font-sans text-sm text-stone-400">⏱ {exp.duration}</span>

                    <span className="font-sans text-sm text-stone-400">💰 {exp.price}</span>
                  </div>

                  <p className="mb-6 font-sans leading-relaxed text-stone-500">{exp.description}</p>

                  {exp.includes.length > 0 && (
                    <ul className="mb-8 space-y-2">
                      {exp.includes.map((item) => (
                        <li
                          key={item}
                          className="flex items-center gap-2 font-sans text-sm text-stone-600"
                        >
                          <span className="text-amber-600">✓</span>
                          {item}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* Reservation form */}
      <section className="bg-stone-50 px-6 py-24">
        <div className="mx-auto max-w-2xl">
          <div className="mb-12 text-center">
            <p className="mb-4 font-sans text-xs tracking-[0.35em] text-amber-700 uppercase">
              Réservation
            </p>

            <h2 className="mb-3 font-serif text-4xl font-light text-stone-900">
              Réserver votre expérience
            </h2>

            <p className="font-sans text-sm text-stone-500">
              Complétez ce formulaire et nous vous répondrons dans les 24h pour confirmer votre
              réservation.
            </p>
          </div>

          <ReservationForm experiences={experiences} />
        </div>
      </section>
    </main>
  );
}
