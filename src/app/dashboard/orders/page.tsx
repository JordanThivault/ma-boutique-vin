// src/app/dashboard/orders/page.tsx
import { db } from "@/lib/db";
import { formatPrice, formatDate } from "@/lib/utils";
import { UpdateOrderStatusButton } from "@/components/admin/UpdateOrderStatusButton";

async function getOrders() {
  return db.order.findMany({
    include: {
      items: { include: { product: true } },
      user: true,
    },
    orderBy: { createdAt: "desc" },
  });
}

const STATUS_CONFIG: Record<string, { label: string; class: string }> = {
  PENDING: { label: "En attente", class: "bg-yellow-100 text-yellow-700" },
  PAID: { label: "Payée", class: "bg-emerald-100 text-emerald-700" },
  PROCESSING: { label: "En traitement", class: "bg-blue-100 text-blue-700" },
  SHIPPED: { label: "Expédiée", class: "bg-purple-100 text-purple-700" },
  DELIVERED: { label: "Livrée", class: "bg-green-100 text-green-700" },
  CANCELLED: { label: "Annulée", class: "bg-red-100 text-red-700" },
  REFUNDED: { label: "Remboursée", class: "bg-neutral-100 text-neutral-600" },
};

export default async function AdminOrdersPage() {
  const orders = await getOrders();

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-neutral-900">Commandes</h1>
        <p className="mt-1 text-neutral-500">
          {orders.length} commande{orders.length !== 1 ? "s" : ""}
        </p>
      </div>

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
                  <p className="mt-1 font-medium text-neutral-900">
                    {order.shippingName}
                  </p>
                  <p className="text-sm text-neutral-500">{order.shippingEmail}</p>
                  <p className="text-sm text-neutral-400">
                    {formatDate(order.createdAt)}
                  </p>
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
                <UpdateOrderStatusButton
                  orderId={order.id}
                  currentStatus={order.status}
                />
              </div>
            </div>
          );
        })}

        {orders.length === 0 && (
          <div className="rounded-2xl border bg-white py-16 text-center text-neutral-400">
            Aucune commande pour l instant
          </div>
        )}
      </div>
    </div>
  );
}
