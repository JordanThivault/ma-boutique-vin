// src/app/(store)/account/orders/page.tsx
import { auth } from "@/lib/auth";
import { db } from "@/lib/db";
import { headers } from "next/headers";
import { formatPrice, formatDate } from "@/lib/utils";
import { redirect } from "next/navigation";
import { Package } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const STATUS_CONFIG: Record<string, { label: string; class: string }> = {
  PENDING:    { label: "En attente",     class: "bg-yellow-100 text-yellow-700" },
  PAID:       { label: "Payée",          class: "bg-emerald-100 text-emerald-700" },
  PROCESSING: { label: "En traitement",  class: "bg-blue-100 text-blue-700" },
  SHIPPED:    { label: "Expédiée",       class: "bg-purple-100 text-purple-700" },
  DELIVERED:  { label: "Livrée",         class: "bg-green-100 text-green-700" },
  CANCELLED:  { label: "Annulée",        class: "bg-red-100 text-red-700" },
  REFUNDED:   { label: "Remboursée",     class: "bg-neutral-100 text-neutral-600" },
};

async function getOrders(userId: string) {
  return db.order.findMany({
    where: { userId },
    include: {
      items: {
        include: { product: true },
      },
    },
    orderBy: { createdAt: "desc" },
  });
}

export default async function AccountOrdersPage() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) redirect("/login");

  const orders = await getOrders(session.user.id);

  return (
    <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6 lg:px-8 pt-20 lg:pt-26">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-neutral-900">
          Mes commandes
        </h1>
        <p className="mt-1 text-neutral-500">
          Bonjour {session.user.name} —{" "}
          {orders.length} commande{orders.length !== 1 ? "s" : ""}
        </p>
      </div>

      {orders.length === 0 ? (
        <div className="flex flex-col items-center justify-center gap-4 rounded-2xl border bg-white py-24 text-center">
          <Package className="h-16 w-16 text-neutral-200" />
          <p className="text-lg font-medium text-neutral-500">
            Vous n avez pas encore de commande
          </p>
          <Link
            href="/products"
            className="text-sm font-medium text-neutral-900 hover:underline"
          >
            Découvrir nos produits →
          </Link>
        </div>
      ) : (
        <div className="space-y-4">
          {orders.map((order) => {
            const config = STATUS_CONFIG[order.status] ?? {
              label: order.status,
              class: "bg-neutral-100 text-neutral-600",
            };

            return (
              <div
                key={order.id}
                className="rounded-2xl border bg-white p-6"
              >
                {/* Header commande */}
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <div className="flex items-center gap-3">
                      <span className="font-mono text-sm font-medium text-neutral-900">
                        #{order.orderNumber.slice(-8).toUpperCase()}
                      </span>
                      <span className={`rounded-full px-2.5 py-0.5 text-xs font-medium ${config.class}`}>
                        {config.label}
                      </span>
                    </div>
                    <p className="mt-1 text-sm text-neutral-400">
                      {formatDate(order.createdAt)}
                    </p>
                  </div>
                  <p className="text-lg font-bold text-neutral-900">
                    {formatPrice(order.total)}
                  </p>
                </div>

                {/* Articles */}
                <div className="mt-4 divide-y rounded-xl border">
                  {order.items.map((item) => (
                    <div
                      key={item.id}
                      className="flex items-center gap-4 px-4 py-3"
                    >
                      {/* Image produit */}
                      {item.product.images[0] && (
                        <div className="relative h-12 w-12 flex-shrink-0 overflow-hidden rounded-lg bg-neutral-100">
                          <Image
                            src={item.product.images[0]}
                            alt={item.product.name}
                            fill
                            className="object-cover"
                            />
                        </div>
                      )}
                      <div className="flex-1">
                        <p className="text-sm font-medium text-neutral-900">
                          {item.product.name}
                        </p>
                        <p className="text-xs text-neutral-400">
                          {item.quantity} × {formatPrice(item.price)}
                        </p>
                      </div>
                      <p className="text-sm font-medium text-neutral-900">
                        {formatPrice(item.price * item.quantity)}
                      </p>
                    </div>
                  ))}
                </div>

                {/* Adresse livraison */}
                <div className="mt-4 rounded-xl bg-neutral-50 px-4 py-3">
                  <p className="text-xs font-medium text-neutral-500 mb-1">
                    Adresse de livraison
                  </p>
                  <p className="text-sm text-neutral-700">
                    {order.shippingAddress}, {order.shippingPostal}{" "}
                    {order.shippingCity}, {order.shippingCountry}
                  </p>
                </div>

                {/* Livraison info */}
                {order.status === "SHIPPED" && (
                  <div className="mt-3 rounded-xl bg-purple-50 px-4 py-3">
                    <p className="text-sm text-purple-700 font-medium">
                      📦 Votre commande a été expédiée !
                    </p>
                  </div>
                )}

                {order.status === "DELIVERED" && (
                  <div className="mt-3 rounded-xl bg-emerald-50 px-4 py-3">
                    <p className="text-sm text-emerald-700 font-medium">
                      ✅ Commande livrée — Merci pour votre achat !
                    </p>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}