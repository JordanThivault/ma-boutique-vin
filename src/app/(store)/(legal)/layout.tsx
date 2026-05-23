// src/app/(store)/(legal)/layout.tsx
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { LegalNavLink } from "@/components/store/LegalNavLink";

const LEGAL_LINKS = [
  { href: "/mentions-legales", label: "Mentions légales" },
  { href: "/confidentialite", label: "Confidentialité" },
  { href: "/cgv", label: "CGV" },
];

export default function LegalLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      {/* Header sobre — fond stone-950 cohérent avec Navbar/Footer */}
      <div className="bg-stone-950 pt-32 pb-12 px-6">
        <div className="max-w-3xl mx-auto">

          {/* Breadcrumb */}
          <nav className="flex items-center gap-1.5 text-[11px] uppercase tracking-[0.2em] text-stone-500 mb-8">
            <Link href="/" className="hover:text-stone-300 transition-colors">
              Accueil
            </Link>
            <ChevronRight className="h-3 w-3 text-stone-700 flex-shrink-0" />
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
      <div className="bg-white min-h-screen">
        {children}
      </div>
    </>
  );
}
