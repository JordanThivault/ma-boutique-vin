"use server";

import { db } from "@/lib/db";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { resend } from "@/lib/emails/resend";
import { revalidatePath } from "next/cache";

// ============================================================
// ADMIN
// ============================================================

async function requireAdmin() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  if (!session?.user || session.user.role !== "ADMIN") {
    throw new Error("Non autorisé");
  }
  return session;
}

// ============================================================
// SOUMISSION RÉSERVATION
// ============================================================

interface ReservationData {
  nom: string;
  email: string;
  telephone?: string;
  experience: string;
  date: string;
  message?: string;
}

export async function submitReservation(
  data: ReservationData
): Promise<{ success: boolean; error?: string }> {
  if (!data.nom || !data.email || !data.experience || !data.date) {
    return { success: false, error: "Veuillez remplir tous les champs obligatoires." };
  }

  try {
    const reservationDate = new Date(`${data.date}T00:00:00`);

    await db.reservation.create({
      data: {
        nom: data.nom,
        email: data.email,
        telephone: data.telephone || null,
        experience: data.experience,
        date: reservationDate,
        message: data.message || null,
      },
    });

    await resend.emails.send({
      from: "Domaine test <onboarding@resend.dev>",
      to: data.email,
      subject: "Votre demande de réservation — Domaine test",
      html: `
        <div style="font-family:Georgia,serif;max-width:600px;margin:0 auto;color:#292524;line-height:1.6;">
          <h1 style="font-weight:300;">Demande reçue</h1>
          <p>Bonjour ${data.nom},</p>
          <p>Nous avons bien reçu votre demande de réservation pour <strong>${data.experience}</strong>.</p>
          <p>Date souhaitée : <strong>${data.date}</strong></p>
          ${data.message ? `<p><strong>Message :</strong> ${data.message}</p>` : ""}
          <p>Notre équipe vous répondra dans les plus brefs délais.</p>
          <p style="color:#78716c;font-size:12px;margin-top:32px;">L'abus d'alcool est dangereux pour la santé. À consommer avec modération.</p>
        </div>
      `,
    });

    const adminEmail = process.env.ADMIN_EMAIL;
    if (adminEmail) {
      await resend.emails.send({
        from: "Notifications <onboarding@resend.dev>",
        to: adminEmail,
        subject: `Nouvelle réservation — ${data.nom}`,
        html: `
          <p><strong>Nom :</strong> ${data.nom}</p>
          <p><strong>Email :</strong> ${data.email}</p>
          <p><strong>Téléphone :</strong> ${data.telephone || "—"}</p>
          <p><strong>Expérience :</strong> ${data.experience}</p>
          <p><strong>Date :</strong> ${data.date}</p>
          <p><strong>Message :</strong> ${data.message || "—"}</p>
        `,
      });
    }

    return { success: true };
  } catch (err) {
    console.error("Reservation error:", err);
    return { success: false, error: "Une erreur est survenue." };
  }
}

// ============================================================
// UPDATE STATUT (admin)
// ============================================================

export async function updateReservationStatus(
  id: string,
  status: "PENDING" | "CONFIRMED" | "CANCELLED"
) {
  try {
    await requireAdmin();
    await db.reservation.update({ where: { id }, data: { status } });
    revalidatePath("/dashboard/reservations");
    return { success: true };
  } catch (err) {
    console.error("Update reservation status error:", err);
    return { success: false, error: "Une erreur est survenue." };
  }
}
