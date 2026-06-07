"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSession, signOut } from "@/lib/auth-client";
import { useCart } from "@/hooks/useCart";
import { useAuthModal } from "@/hooks/useAuthModal";
import { ShoppingBag, User, Menu, X } from "lucide-react";
import type { SessionUser } from "@/lib/auth-client";
import Image from "next/image";
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
  const { openCart, totalItems, hasHydrated } = useCart();
  const { open: openAuthModal } = useAuthModal();

  const cartCount = totalItems();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 right-0 left-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-white/95 shadow-sm backdrop-blur-sm"
          : "bg-gradient-to-b from-black/40 to-transparent"
      }`}
    >
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6 lg:h-20">
        {/* Logo */}
        <Link href="/" aria-label="Domaine Gaud — Accueil" className="flex items-center">
          <Image
            src="/logo.png"
            alt="Domaine Gaud"
            width={439}
            height={267}
            className={`h-10 w-auto transition-[filter] duration-500 lg:h-12 ${
              isTop ? "brightness-0 invert" : ""
            }`}
          />
        </Link>

        {/* Desktop nav */}
        <nav className="hidden items-center gap-8 lg:flex">
          {NAV_ITEMS.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`text-[11px] tracking-[0.2em] uppercase transition-colors ${
                isTop ? "text-white/80 hover:text-white" : "text-stone-700 hover:text-stone-900"
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
                  className={`cursor-pointer p-1 transition-colors ${isTop ? "text-white/80 hover:text-white" : "text-stone-700 hover:text-stone-900"}`}
                >
                  <User className="h-5 w-5" />
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <div className="px-3 py-2 text-sm">
                  <p className="font-medium">{session.user.name}</p>
                  <p className="text-xs text-neutral-400">{session.user.email}</p>
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
                  onClick={() => signOut({ fetchOptions: { onSuccess: () => router.refresh() } })}
                  className="text-red-500"
                >
                  Se déconnecter
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <button
              onClick={() => openAuthModal("login")}
              className={`cursor-pointer text-[11px] tracking-[0.2em] uppercase transition-colors ${
                isTop ? "text-white/80 hover:text-white" : "text-stone-700 hover:text-stone-900"
              }`}
            >
              Connexion
            </button>
          )}

          {/* Cart */}
          <button
            onClick={openCart}
            className={`relative cursor-pointer p-1 transition-colors ${
              isTop ? "text-white/80 hover:text-white" : "text-stone-700 hover:text-stone-900"
            }`}
          >
            <ShoppingBag className="h-5 w-5" />
            {hasHydrated && cartCount > 0 && (
              <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-stone-900 text-[10px] font-bold text-white">
                {cartCount > 9 ? "9+" : cartCount}
              </span>
            )}
          </button>

          {/* Burger */}
          <button
            className={`cursor-pointer p-1 transition-colors lg:hidden ${
              isTop ? "text-white/80 hover:text-white" : "text-stone-700 hover:text-stone-900"
            }`}
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="space-y-5 border-t bg-white px-6 py-6 lg:hidden">
          {NAV_ITEMS.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setMobileOpen(false)}
              className="block text-sm tracking-[0.15em] text-stone-700 uppercase hover:text-stone-900"
            >
              {item.label}
            </Link>
          ))}
          {!session && (
            <button
              onClick={() => {
                setMobileOpen(false);
                openAuthModal("login");
              }}
              className="block text-sm font-medium tracking-[0.15em] text-amber-700 uppercase hover:text-amber-800"
            >
              Connexion / Inscription
            </button>
          )}
        </div>
      )}
    </header>
  );
}
