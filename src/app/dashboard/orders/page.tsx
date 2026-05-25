// src/app/dashboard/orders/page.tsx
import { db } from "@/lib/db";
import { OrderStatus } from "@prisma/client";
import { formatPrice, formatDate } from "@/lib/utils";
import { UpdateOrderStatusButton } from "@/components/admin/UpdateOrderStatusButton";
import { Pagination } from "@/components/admin/Pagination";
import { Search } from "lucide-react";
import { AdminSelect } from "@/components/admin/AdminSelect";

const PAGE_SIZE = 10;

const STATUS_CONFIG: Record<string, { label: string; class: string }> = {
  PENDING:    { label: "En attente",     class: "bg-yellow-100 text-yellow-700" },
  PAID:       { label: "Payée",          class: "bg-emerald-100 text-emerald-700" },
  PROCESSING: { label: "En traitement",  class: "bg-blue-100 text-blue-700" },
  SHIPPED:    { label: "Expédiée",       class: "bg-purple-100 text-purple-700" },
  DELIVERED:  { label: "Livrée",         class: "bg-green-100 text-green-700" },
  CANCELLED:  { label: "Annulée",        class: "bg-red-100 text-red-700" },
  REFUNDED:   { label: "Remboursée",     class: "bg-neutral-100 text-neutral-600" },
};

interface PageProps {
  searchParams: Promise<{ page?: string; q?: string; status?: string }>;
}

export default async function AdminOrdersPage({ searchParams }: PageProps) {
  const { page, q, status } = await searchParams;

  const currentPage = Math.max(1, parseInt(page ?? "1", 10));
  const search = q?.trim() ?? "";
  const statusFilter = status && STATUS_CONFIG[status] ? status : "";

  // Build Prisma where clause
  const where = {
    ...(statusFilter ? { status: statusFilter as OrderStatus } : {}),
    ...(search
      ? {
          OR: [
            { shippingName:  { contains: search, mode: "insensitive" as const } },
            { shippingEmail: { contains: search, mode: "insensitive" as const } },
            { orderNumber:   { contains: search, mode: "insensitive" as const } },
          ],
        }
      : {}),
  };

  const [total, orders] = await Promise.all([
    db.order.count({ where }),
    db.order.findMany({
      where,
      include: {
        items: { include: { product: true } },
        user: true,
      },
      orderBy: { createdAt: "desc" },
      skip: (currentPage - 1) * PAGE_SIZE,
      take: PAGE_SIZE,
    }),
  ]);

  const totalPages = Math.ceil(total / PAGE_SIZE);

  return (
    <div>
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-neutral-900">Commandes</h1>
        <p className="mt-1 text-neutral-500">
          {total} commande{total !== 1 ? "s" : ""}
          {search || statusFilter ? " (filtrées)" : ""}
        </p>
      </div>

      {/* Filters */}
      <form method="GET" className="mb-6 flex flex-wrap items-center gap-3">
        {/* Search */}
        <div className="relative flex-1 min-w-[220px]">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-neutral-400" />
          <input
            type="text"
            name="q"
            defaultValue={search}
            placeholder="Nom, email, numéro…"
            className="w-full rounded-xl border bg-white pl-9 pr-4 py-2 text-sm text-neutral-900 placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-neutral-900"
          />
        </div>

        {/* Status filter */}
        <AdminSelect name="status" defaultValue={statusFilter}>
          <option value="">Tous les statuts</option>
          {Object.entries(STATUS_CONFIG).map(([key, { label }]) => (
            <option key={key} value={key}>{label}</option>
          ))}
        </AdminSelect>

        {/* Hidden page reset */}
        <input type="hidden" name="page" value="1" />

        <button
          type="submit"
          className="rounded-xl bg-neutral-900 px-4 py-2 text-sm font-medium text-white hover:bg-neutral-700 transition-colors"
        >
          Filtrer
        </button>

        {(search || statusFilter) && (
          <a
            href="/dashboard/orders"
            className="rounded-xl border px-4 py-2 text-sm text-neutral-500 hover:bg-neutral-50 transition-colors"
          >
            Réinitialiser
          </a>
        )}
      </form>

      {/* Orders */}
      <div className="space-y-4">
        {orders.map((order) => {
          const config = STATUS_CONFIG[order.status] ?? {
            label: order.status,
            class: "bg-neutral-100 text-neutral-600",
          };

          return (
            <div key={order.id} className="rounded-2xl border bg-white p-6">
              <div className="flex flex-wrap items-start justify-between gap-4">
                <div>
                  <div className="flex items-center gap-3">
                    <span className="font-mono text-sm text-neutral-500">
                      #{order.orderNumber.slice(-8).toUpperCase()}
                    </span>
                    <span
                      className={`rounded-full px-2.5 py-0.5 text-xs font-medium ${config.class}`}
                    >
                      {config.label}
                    </span>
                  </div>
                  <p className="mt-1 font-medium text-neutral-900">{order.shippingName}</p>
                  <p className="text-sm text-neutral-500">{order.shippingEmail}</p>
                  <p className="text-sm text-neutral-400">{formatDate(order.createdAt)}</p>
                </div>

                <div className="text-right">
                  <p className="text-xl font-bold text-neutral-900">
                    {formatPrice(order.total)}
                  </p>
                  <p className="text-xs text-neutral-400">
                    {order.items.length} article{order.items.length > 1 ? "s" : ""}
                  </p>
                </div>
              </div>

              {/* Items */}
              <div className="mt-4 divide-y rounded-xl border">
                {order.items.map((item) => (
                  <div key={item.id} className="flex items-center justify-between px-4 py-2 text-sm">
                    <span className="text-neutral-700">
                      {item.quantity}× {item.product.name}
                    </span>
                    <span className="font-medium">
                      {formatPrice(item.price * item.quantity)}
                    </span>
                  </div>
                ))}
              </div>

              {/* Adresse */}
              <div className="mt-4 rounded-xl bg-neutral-50 px-4 py-3 text-sm text-neutral-500">
                📦 {order.shippingAddress}, {order.shippingPostal} {order.shippingCity},{" "}
                {order.shippingCountry}
              </div>

              {/* Change status */}
              <div className="mt-4 flex justify-end">
                <UpdateOrderStatusButton orderId={order.id} currentStatus={order.status} />
              </div>
            </div>
          );
        })}

        {orders.length === 0 && (
          <div className="rounded-2xl border bg-white py-16 text-center text-neutral-400">
            {search || statusFilter
              ? "Aucune commande ne correspond à cette recherche."
              : "Aucune commande pour l'instant."}
          </div>
        )}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="mt-6 rounded-2xl border bg-white overflow-hidden">
          <Pagination totalPages={totalPages} currentPage={currentPage} />
        </div>
      )}
    </div>
  );
}
