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
import { updateReservationStatus } from "@/app/actions/reservations";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";

const STATUSES = [
  { value: "PENDING", label: "En attente" },
  { value: "CONFIRMED", label: "Confirmée" },
  { value: "CANCELLED", label: "Annulée" },
];

type Status = "PENDING" | "CONFIRMED" | "CANCELLED";

export default function UpdateReservationStatusButton({
  reservationId,
  currentStatus,
}: {
  reservationId: string;
  currentStatus: Status;
}) {
  const [status, setStatus] = useState(currentStatus);
  const [loading, setLoading] = useState(false);

  async function handleUpdate() {
    if (status === currentStatus) return;

    setLoading(true);

    const result = await updateReservationStatus(reservationId, status);

    if (result?.error) {
      toast.error(result.error);
    } else {
      toast.success("Statut mis à jour");
    }

    setLoading(false);
  }

  return (
    <div className="flex items-center gap-2">
      <Select value={status} onValueChange={(value) => setStatus(value as Status)}>
        <SelectTrigger className="w-40">
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
