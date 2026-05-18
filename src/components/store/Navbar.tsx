"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSession, signOut } from "@/lib/auth-client";
import { useCart } from "@/hooks/useCart";
import { ShoppingBag, User, Menu, X } from "lucide-react";
import type { SessionUser } from "@/lib/auth-client";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const NAV_ITEMS = [
  { label: "Les vins", href: "/products" },
  { label: "Le domaine", href: "/domaine" },
  { label: "Savoir-faire", href: "/savoir-faire" },
  { label: "Expériences", href: "/experiences" },
  { label: "Journal", href: "/journal" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  const isTop = !scrolled;

  const router = useRouter();
  const { data: session } = useSession();
  const { openCart, totalItems } = useCart();
  const cartCount = totalItems();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-white/95 backdrop-blur-sm shadow-sm"
          : "bg-gradient-to-b from-black/40 to-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between h-16 lg:h-20">

        {/* Logo */}
        <Link href="/" className="flex flex-col leading-none">
          <span
            className={`text-[9px] tracking-[0.25em] uppercase transition-colors ${
              isTop ? "text-white/70" : "text-stone-400"
            }`}
          >
            Domaine
          </span>

          <span
            className={`font-serif text-lg transition-colors ${
              isTop ? "text-white" : "text-stone-900"
            }`}
          >
            Test
          </span>

          <span
            className={`text-[9px] tracking-[0.3em] uppercase transition-colors ${
              isTop ? "text-white/70" : "text-stone-400"
            }`}
          >
            Chinon
          </span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden lg:flex items-center gap-8">
          {NAV_ITEMS.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`text-[11px] uppercase tracking-[0.2em] transition-colors ${
                isTop
                  ? "text-white/80 hover:text-white"
                  : "text-stone-700 hover:text-stone-900"
              }`}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        {/* Right */}
        <div className="flex items-center gap-3">

          {/* User */}
          {session ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button
                  className={`p-1 cursor-pointer transition-colors ${
                    isTop
                      ? "text-white/80 hover:text-white"
                      : "text-stone-700 hover:text-stone-900"
                  }`}
                >
                  <User className="h-5 w-5" />
                </button>
              </DropdownMenuTrigger>

              <DropdownMenuContent align="end">
                <div className="px-3 py-2 text-sm">
                  <p className="font-medium">{session.user.name}</p>
                  <p className="text-neutral-400 text-xs">{session.user.email}</p>
                </div>

                <DropdownMenuSeparator />

                <DropdownMenuItem asChild>
                  <Link href="/account/profile">Mon profil</Link>
                </DropdownMenuItem>

                <DropdownMenuItem asChild>
                  <Link href="/account/orders">Mes commandes</Link>
                </DropdownMenuItem>

                {(session.user as SessionUser).role === "ADMIN" && (
                  <DropdownMenuItem asChild>
                    <Link href="/dashboard">Dashboard admin</Link>
                  </DropdownMenuItem>
                )}

                <DropdownMenuSeparator />

                <DropdownMenuItem
                  onClick={() =>
                    signOut({
                      fetchOptions: { onSuccess: () => router.refresh() },
                    })
                  }
                  className="text-red-500"
                >
                  Se déconnecter
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <Link
              href="/login"
              className={`text-[11px] uppercase tracking-[0.2em] transition-colors ${
                isTop
                  ? "text-white/80 hover:text-white"
                  : "text-stone-700 hover:text-stone-900"
              }`}
            >
              Connexion
            </Link>
          )}

          {/* Cart */}
          <button
            onClick={openCart}
            className={`relative p-1 cursor-pointer transition-colors ${
              isTop
                ? "text-white/80 hover:text-white"
                : "text-stone-700 hover:text-stone-900"
            }`}
          >
            <ShoppingBag className="h-5 w-5" />

            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-stone-900 text-[10px] font-bold text-white">
                {cartCount > 9 ? "9+" : cartCount}
              </span>
            )}
          </button>

          {/* Burger */}
          <button
            className={`lg:hidden p-1 cursor-pointer transition-colors ${
              isTop
                ? "text-white/80 hover:text-white"
                : "text-stone-700 hover:text-stone-900"
            }`}
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="lg:hidden bg-white border-t px-6 py-6 space-y-5">
          {NAV_ITEMS.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setMobileOpen(false)}
              className="block text-sm uppercase tracking-[0.15em] text-stone-700 hover:text-stone-900"
            >
              {item.label}
            </Link>
          ))}
        </div>
      )}
    </header>
  );
}