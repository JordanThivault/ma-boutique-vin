// src/app/actions/orders.ts
"use server";

import { db } from "@/lib/db";
import { OrderStatus } from "@prisma/client";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { revalidatePath } from "next/cache";

async function requireAdmin() {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session || session.user.role !== "ADMIN") {
    throw new Error("Unauthorized");
  }
}

export async function updateOrderStatus(orderId: string, status: string) {
  try {
    await requireAdmin();

    const validStatuses = [
      "PENDING",
      "PAID",
      "PROCESSING",
      "SHIPPED",
      "DELIVERED",
      "CANCELLED",
      "REFUNDED",
    ];

    if (!validStatuses.includes(status)) {
      return { error: "Statut invalide" };
    }

    await db.order.update({
      where: { id: orderId },
      data: { status: status as OrderStatus },
    });

    revalidatePath("/dashboard/orders");
    return { success: true };
  } catch {
    return { error: "Erreur lors de la mise à jour du statut" };
  }
}
