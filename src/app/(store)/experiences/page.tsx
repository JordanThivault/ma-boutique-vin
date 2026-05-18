import { Metadata } from "next";
import Image from "next/image";
import { db } from "@/lib/db";
import ReservationForm from "@/components/store/ReservationForm";

export const metadata: Metadata = {
  title: "Expériences — Domaine test",
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
          src="https://images.unsplash.com/photo-1568213816046-0ee1c42bd559?w=1600&q=80"
          alt="Dégustation au domaine"
          fill
          priority
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
        {experiences.length === 0 ? (
          <div className="text-center py-24">
            <p className="text-stone-400 font-sans">
              Aucune expérience disponible pour le moment.
            </p>
          </div>
        ) : (
          <div className="space-y-24">
            {experiences.map((exp, i) => (
              <div
                key={exp.id}
                id={exp.type.toLowerCase().replace(/\s+/g, "-")}
                className="grid lg:grid-cols-2 gap-12 items-center"
              >
                {/* Image */}
                <div
                  className={`relative overflow-hidden ${
                    i % 2 !== 0 ? "lg:order-2" : ""
                  }`}
                >
                  {exp.image ? (
                    <div className="relative h-[420px] w-full overflow-hidden">
                      <Image
                        src={exp.image}
                        alt={exp.title}
                        fill
                        className="object-cover"
                      />
                    </div>
                  ) : (
                    <div className="h-[420px] w-full bg-stone-100 flex items-center justify-center">
                      <span className="text-stone-300 text-sm font-sans">
                        Aucune image
                      </span>
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

                  {exp.includes.length > 0 && (
                    <ul className="space-y-2 mb-8">
                      {exp.includes.map((item) => (
                        <li
                          key={item}
                          className="flex items-center gap-2 text-sm text-stone-600 font-sans"
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
              Complétez ce formulaire et nous vous répondrons dans les 24h
              pour confirmer votre réservation.
            </p>
          </div>

          <ReservationForm experiences={experiences} />
        </div>
      </section>
    </main>
  );
}