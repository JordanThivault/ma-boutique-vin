// src/components/admin/AdminSidebar.tsx
"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { signOut } from "@/lib/auth-client";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  LayoutDashboard,
  Package,
  ShoppingBag,
  LogOut,
  Store,
} from "lucide-react";

const navItems = [
  { href: "/dashboard", label: "Vue d'ensemble", icon: LayoutDashboard, exact: true },
  { href: "/dashboard/products", label: "Produits", icon: Package },
  { href: "/dashboard/orders", label: "Commandes", icon: ShoppingBag },
];

interface AdminSidebarProps {
  user: { name: string; email: string };
}

export function AdminSidebar({ user }: AdminSidebarProps) {
  const pathname = usePathname();
  const router = useRouter();

  function isActive(href: string, exact?: boolean) {
    return exact ? pathname === href : pathname.startsWith(href);
  }

  return (
    <aside className="flex w-64 flex-col border-r bg-white">
      <div className="border-b px-6 py-5">
        <Link href="/" className="flex items-center gap-2 text-sm text-neutral-500 hover:text-neutral-900">
          <Store className="h-4 w-4" />
          Ma Boutique
        </Link>
        <p className="mt-1 text-lg font-bold text-neutral-900">Admin</p>
      </div>

      <nav className="flex-1 space-y-1 px-3 py-4">
        {navItems.map(({ href, label, icon: Icon, exact }) => (
          <Link
            key={href}
            href={href}
            className={cn(
              "flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-colors",
              isActive(href, exact)
                ? "bg-neutral-900 text-white"
                : "text-neutral-600 hover:bg-neutral-100 hover:text-neutral-900"
            )}
          >
            <Icon className="h-4 w-4" />
            {label}
          </Link>
        ))}
      </nav>

      <div className="border-t px-3 py-4">
        <div className="mb-3 rounded-xl bg-neutral-50 px-3 py-2">
          <p className="text-sm font-medium text-neutral-900 truncate">{user.name}</p>
          <p className="text-xs text-neutral-500 truncate">{user.email}</p>
        </div>
        <Button
          variant="ghost"
          className="w-full justify-start text-red-500 hover:bg-red-50 hover:text-red-600"
          onClick={() =>
            signOut({ fetchOptions: { onSuccess: () => router.push("/") } })
          }
        >
          <LogOut className="mr-2 h-4 w-4" />
          Se déconnecter
        </Button>
      </div>
    </aside>
  );
}
