"use client";

// src/components/store/LegalNavLink.tsx
import Link from "next/link";
import { usePathname } from "next/navigation";

interface LegalNavLinkProps {
  href: string;
  children: React.ReactNode;
}

export function LegalNavLink({ href, children }: LegalNavLinkProps) {
  const pathname = usePathname();
  const isActive = pathname === href;

  return (
    <Link
      href={href}
      className={`
        text-[11px] uppercase tracking-[0.2em] px-4 py-2 rounded-full border transition-colors
        ${
          isActive
            ? "border-amber-500 text-amber-400 bg-amber-500/10"
            : "border-stone-700 text-stone-500 hover:border-stone-500 hover:text-stone-300"
        }
      `}
    >
      {children}
    </Link>
  );
}
