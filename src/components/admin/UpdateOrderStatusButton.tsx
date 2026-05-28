// src/components/admin/UpdateOrderStatusButton.tsx
"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { updateOrderStatus } from "@/app/actions/orders";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";

const STATUSES = [
  { value: "PENDING", label: "En attente" },
  { value: "PAID", label: "Payée" },
  { value: "PROCESSING", label: "En traitement" },
  { value: "SHIPPED", label: "Expédiée" },
  { value: "DELIVERED", label: "Livrée" },
  { value: "CANCELLED", label: "Annulée" },
  { value: "REFUNDED", label: "Remboursée" },
];

export function UpdateOrderStatusButton({
  orderId,
  currentStatus,
}: {
  orderId: string;
  currentStatus: string;
}) {
  const [status, setStatus] = useState(currentStatus);
  const [loading, setLoading] = useState(false);

  async function handleUpdate() {
    if (status === currentStatus) return;
    setLoading(true);
    const result = await updateOrderStatus(orderId, status);
    if (result?.error) {
      toast.error(result.error);
    } else {
      toast.success("Statut mis à jour");
    }
    setLoading(false);
  }

  return (
    <div className="flex items-center gap-2">
      <Select value={status} onValueChange={setStatus}>
        <SelectTrigger className="w-44">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          {STATUSES.map((s) => (
            <SelectItem key={s.value} value={s.value}>
              {s.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      <Button size="sm" onClick={handleUpdate} disabled={loading || status === currentStatus}>
        {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : "Mettre à jour"}
      </Button>
    </div>
  );
}
