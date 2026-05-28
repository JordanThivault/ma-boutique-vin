import Link from "next/link";
import Image from "next/image";

const ITEMS = [
  {
    icon: "🌿",
    label: "Vendanges manuelles",
  },
  {
    icon: "🏺",
    label: "Vinification traditionnelle",
  },
  {
    icon: "🪣",
    label: "Élevage maîtrisé",
  },
];

export default function SavoirFaireSection() {
  return (
    <section className="grid min-h-[600px] lg:grid-cols-2">
      {/* Text — dark */}
      <div className="order-2 flex items-center bg-stone-900 px-12 py-20 lg:order-1 lg:px-20">
        <div className="max-w-md">
          <p className="mb-5 font-sans text-xs tracking-[0.35em] text-amber-500 uppercase">
            Savoir-faire
          </p>
          <h2 className="mb-6 font-serif text-4xl leading-tight font-light text-white lg:text-5xl">
            Le savoir-faire
            <br />
            du domaine
          </h2>
          <p className="mb-10 font-sans text-base leading-relaxed text-stone-400">
            De la vigne à la bouteille, chaque étape est guidée par une exigence de précision et de
            respect du fruit. Nos méthodes ancestrales, transmises de génération en génération,
            donnent naissance à des vins qui reflètent fidèlement notre terroir.
          </p>

          {/* Features */}
          <ul className="mb-10 space-y-4">
            {ITEMS.map((item) => (
              <li key={item.label} className="flex items-center gap-3">
                <span className="text-base">{item.icon}</span>
                <span className="font-sans text-sm tracking-wide text-stone-300">{item.label}</span>
              </li>
            ))}
          </ul>

          <Link
            href="/savoir-faire"
            className="inline-flex items-center gap-2 font-sans text-sm tracking-[0.15em] text-amber-500 uppercase transition-all duration-300 hover:gap-4"
          >
            Notre philosophie
            <span className="text-base">→</span>
          </Link>
        </div>
      </div>

      {/* Image */}
      <div className="relative order-1 min-h-[400px] overflow-hidden lg:order-2 lg:min-h-0">
        <Image
          src="https://images.unsplash.com/photo-1566467021572-37fbefe8fcb2?q=80&w=1374&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          alt="Cave à vins du domaine"
          fill
          className="h-full w-full object-cover transition-transform duration-700 hover:scale-105"
        />
      </div>
    </section>
  );
}
