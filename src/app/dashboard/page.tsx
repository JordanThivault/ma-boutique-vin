// src/app/dashboard/page.tsx
import { db } from "@/lib/db";
import { formatPrice } from "@/lib/utils";
import { ShoppingBag, Users, Package, TrendingUp } from "lucide-react";

async function getStats() {
  const [totalOrders, totalRevenue, totalProducts, totalUsers, recentOrders] =
    await Promise.all([
      db.order.count({ where: { status: { not: "CANCELLED" } } }),
      db.order.aggregate({
        where: { status: { in: ["PAID", "PROCESSING", "SHIPPED", "DELIVERED"] } },
        _sum: { total: true },
      }),
      db.product.count({ where: { published: true } }),
      db.user.count(),
      db.order.findMany({
        take: 5,
        orderBy: { createdAt: "desc" },
        include: { items: { include: { product: true } } },
      }),
    ]);

  return {
    totalOrders,
    totalRevenue: totalRevenue._sum.total ?? 0,
    totalProducts,
    totalUsers,
    recentOrders,
  };
}

export default async function DashboardPage() {
  const stats = await getStats();

  const cards = [
    {
      title: "Revenus totaux",
      value: formatPrice(stats.totalRevenue),
      icon: TrendingUp,
      color: "bg-emerald-500",
    },
    {
      title: "Commandes",
      value: stats.totalOrders.toString(),
      icon: ShoppingBag,
      color: "bg-blue-500",
    },
    {
      title: "Produits actifs",
      value: stats.totalProducts.toString(),
      icon: Package,
      color: "bg-amber-500",
    },
    {
      title: "Clients",
      value: stats.totalUsers.toString(),
      icon: Users,
      color: "bg-purple-500",
    },
  ];

  return (
    <div>
      <h1 className="text-2xl font-bold text-neutral-900">Tableau de bord</h1>
      <p className="mt-1 text-neutral-500">Vue d'ensemble de votre boutique</p>

      {/* Stats */}
      <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {cards.map(({ title, value, icon: Icon, color }) => (
          <div key={title} className="rounded-2xl border bg-white p-6">
            <div className="flex items-center justify-between">
              <p className="text-sm text-neutral-500">{title}</p>
              <div className={`rounded-lg p-2 ${color}`}>
                <Icon className="h-4 w-4 text-white" />
              </div>
            </div>
            <p className="mt-4 text-3xl font-bold text-neutral-900">{value}</p>
          </div>
        ))}
      </div>

      {/* Recent orders */}
      <div className="mt-10">
        <h2 className="mb-4 text-lg font-semibold text-neutral-900">
          Dernières commandes
        </h2>
        <div className="rounded-2xl border bg-white overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-neutral-50 border-b">
              <tr>
                {["N°", "Client", "Articles", "Total", "Statut", "Date"].map(
                  (h) => (
                    <th
                      key={h}
                      className="px-4 py-3 text-left font-medium text-neutral-500"
                    >
                      {h}
                    </th>
                  )
                )}
              </tr>
            </thead>
            <tbody className="divide-y">
              {stats.recentOrders.map((order) => (
                <tr key={order.id} className="hover:bg-neutral-50">
                  <td className="px-4 py-3 font-mono text-xs text-neutral-500">
                    #{order.orderNumber.slice(-8).toUpperCase()}
                  </td>
                  <td className="px-4 py-3">
                    <div>
                      <p className="font-medium">{order.shippingName}</p>
                      <p className="text-neutral-400">{order.shippingEmail}</p>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-neutral-500">
                    {order.items.length} article{order.items.length > 1 ? "s" : ""}
                  </td>
                  <td className="px-4 py-3 font-medium">
                    {formatPrice(order.total)}
                  </td>
                  <td className="px-4 py-3">
                    <StatusBadge status={order.status} />
                  </td>
                  <td className="px-4 py-3 text-neutral-400">
                    {new Date(order.createdAt).toLocaleDateString("fr-FR")}
                  </td>
                </tr>
              ))}
              {stats.recentOrders.length === 0 && (
                <tr>
                  <td colSpan={6} className="px-4 py-8 text-center text-neutral-400">
                    Aucune commande pour l'instant
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

function StatusBadge({ status }: { status: string }) {
  const configs: Record<string, { label: string; class: string }> = {
    PENDING: { label: "En attente", class: "bg-yellow-100 text-yellow-700" },
    PAID: { label: "Payée", class: "bg-emerald-100 text-emerald-700" },
    PROCESSING: { label: "En traitement", class: "bg-blue-100 text-blue-700" },
    SHIPPED: { label: "Expédiée", class: "bg-purple-100 text-purple-700" },
    DELIVERED: { label: "Livrée", class: "bg-green-100 text-green-700" },
    CANCELLED: { label: "Annulée", class: "bg-red-100 text-red-700" },
    REFUNDED: { label: "Remboursée", class: "bg-neutral-100 text-neutral-600" },
  };
  const config = configs[status] ?? { label: status, class: "bg-neutral-100 text-neutral-600" };
  return (
    <span className={`inline-block rounded-full px-2.5 py-0.5 text-xs font-medium ${config.class}`}>
      {config.label}
    </span>
  );
}
