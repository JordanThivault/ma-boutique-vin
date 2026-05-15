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
    <section className="grid lg:grid-cols-2 min-h-[600px]">
      {/* Text — dark */}
      <div className="flex items-center bg-stone-900 px-12 py-20 lg:px-20 order-2 lg:order-1">
        <div className="max-w-md">
          <p className="text-xs tracking-[0.35em] uppercase text-amber-500 font-sans mb-5">
            Savoir-faire
          </p>
          <h2 className="font-serif text-4xl lg:text-5xl font-light text-white leading-tight mb-6">
            Le savoir-faire
            <br />
            du domaine
          </h2>
          <p className="text-stone-400 font-sans leading-relaxed text-base mb-10">
            De la vigne à la bouteille, chaque étape est guidée par une exigence
            de précision et de respect du fruit. Nos méthodes ancestrales,
            transmises de génération en génération, donnent naissance à des
            vins qui reflètent fidèlement notre terroir.
          </p>

          {/* Features */}
          <ul className="space-y-4 mb-10">
            {ITEMS.map((item) => (
              <li key={item.label} className="flex items-center gap-3">
                <span className="text-base">{item.icon}</span>
                <span className="text-sm font-sans text-stone-300 tracking-wide">
                  {item.label}
                </span>
              </li>
            ))}
          </ul>

          <Link
            href="/savoir-faire"
            className="inline-flex items-center gap-2 text-sm tracking-[0.15em] uppercase font-sans text-amber-500 hover:gap-4 transition-all duration-300"
          >
            Notre philosophie
            <span className="text-base">→</span>
          </Link>
        </div>
      </div>

      {/* Image */}
      <div className="relative overflow-hidden min-h-[400px] lg:min-h-0 order-1 lg:order-2">
        <Image
          src="https://images.unsplash.com/photo-1566467021572-37fbefe8fcb2?q=80&w=1374&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          alt="Cave à vins du domaine"
          fill
          className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
        />
      </div>
    </section>
  );
}
