// src/app/(store)/(legal)/layout.tsx
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { LegalNavLink } from "@/components/store/LegalNavLink";

const LEGAL_LINKS = [
  { href: "/mentions-legales", label: "Mentions légales" },
  { href: "/confidentialite", label: "Confidentialité" },
  { href: "/cgv", label: "CGV" },
];

export default function LegalLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      {/* Header sobre — fond stone-950 cohérent avec Navbar/Footer */}
      <div className="bg-stone-950 px-6 pt-32 pb-12">
        <div className="mx-auto max-w-3xl">
          {/* Breadcrumb */}
          <nav className="mb-8 flex items-center gap-1.5 text-[11px] tracking-[0.2em] text-stone-500 uppercase">
            <Link href="/" className="transition-colors hover:text-stone-300">
              Accueil
            </Link>
            <ChevronRight className="h-3 w-3 flex-shrink-0 text-stone-700" />
            <span className="text-stone-400">Informations légales</span>
          </nav>

          {/* Navigation entre les pages légales */}
          <div className="flex flex-wrap gap-3">
            {LEGAL_LINKS.map((link) => (
              <LegalNavLink key={link.href} href={link.href}>
                {link.label}
              </LegalNavLink>
            ))}
          </div>
        </div>
      </div>

      {/* Contenu page */}
      <div className="min-h-screen bg-white">{children}</div>
    </>
  );
}
