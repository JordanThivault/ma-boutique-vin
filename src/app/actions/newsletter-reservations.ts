"use server";

import { db } from "@/lib/db";
import { resend } from "@/lib/emails/resend";

// =====================
// NEWSLETTER
// =====================

export async function subscribeToNewsletter(email: string): Promise<{
  success: boolean;
  error?: string;
}> {
  if (!email || !email.includes("@")) {
    return { success: false, error: "Email invalide." };
  }

  try {
    const existing = await db.newsletterSubscriber.findUnique({
      where: { email: email.toLowerCase().trim() },
    });

    if (existing) {
      if (existing.active) {
        return { success: true }; // silently succeed — already subscribed
      }
      await db.newsletterSubscriber.update({
        where: { email: email.toLowerCase().trim() },
        data: { active: true },
      });
      return { success: true };
    }

    await db.newsletterSubscriber.create({
      data: { email: email.toLowerCase().trim() },
    });

    return { success: true };
  } catch (err) {
    console.error("Newsletter subscribe error:", err);
    return { success: false, error: "Une erreur est survenue." };
  }
}

// =====================
// RÉSERVATION EXPÉRIENCE
// =====================

interface ReservationData {
  nom: string;
  email: string;
  telephone?: string;
  experience: string;
  date: string;
  message?: string;
}

export async function submitReservation(data: ReservationData): Promise<{
  success: boolean;
  error?: string;
}> {
  if (!data.nom || !data.email || !data.experience || !data.date) {
    return { success: false, error: "Veuillez remplir tous les champs obligatoires." };
  }

  try {
    await db.reservation.create({
      data: {
        nom: data.nom,
        email: data.email,
        telephone: data.telephone || null,
        experience: data.experience,
        date: new Date(data.date),
        message: data.message || null,
      },
    });

    // Email de confirmation au client
    await resend.emails.send({
      from: "Domaine Test <@>",
      to: data.email,
      subject: "Votre demande de réservation — Domaine de la Rochette",
      html: `
        <div style="font-family: Georgia, serif; max-width: 600px; margin: 0 auto; color: #292524; line-height: 1.6;">
          <div style="border-bottom: 1px solid #e7e5e4; padding-bottom: 24px; margin-bottom: 24px;">
            <p style="font-family: sans-serif; font-size: 11px; letter-spacing: 0.3em; text-transform: uppercase; color: #a8a29e;">Domaine de la Rochette · Chinon</p>
          </div>
          <h1 style="font-weight: 300; font-size: 28px; margin: 0 0 16px;">Demande reçue</h1>
          <p style="font-size: 16px; color: #57534e;">Bonjour ${data.nom},</p>
          <p style="color: #57534e;">Nous avons bien reçu votre demande de réservation pour <strong>${data.experience}</strong> le <strong>${data.date}</strong>.</p>
          <p style="color: #57534e;">Notre équipe vous répondra dans les 24h pour confirmer votre réservation.</p>
          <div style="background: #fafaf9; border: 1px solid #e7e5e4; padding: 20px; margin: 24px 0;">
            <p style="margin: 0; font-size: 13px; color: #a8a29e; font-family: sans-serif; text-transform: uppercase; letter-spacing: 0.2em;">Récapitulatif</p>
            <p style="margin: 8px 0 0; color: #292524;"><strong>Expérience :</strong> ${data.experience}</p>
            <p style="margin: 4px 0 0; color: #292524;"><strong>Date souhaitée :</strong> ${data.date}</p>
            ${data.message ? `<p style="margin: 4px 0 0; color: #292524;"><strong>Message :</strong> ${data.message}</p>` : ""}
          </div>
          <p style="color: #57534e; font-size: 14px;">À bientôt au domaine,</p>
          <p style="color: #292524; font-style: italic;">Marie Mercier & l'équipe du Domaine de la Rochette</p>
          <div style="border-top: 1px solid #e7e5e4; margin-top: 32px; padding-top: 16px;">
            <p style="font-family: sans-serif; font-size: 11px; color: #a8a29e;">L'abus d'alcool est dangereux pour la santé. À consommer avec modération.</p>
          </div>
        </div>
      `,
    });

    // Notification interne admin
    const adminEmail = process.env.ADMIN_EMAIL || "@";
    await resend.emails.send({
      from: "Notifications <noreply@>",
      to: adminEmail,
      subject: `Nouvelle réservation — ${data.nom} — ${data.date}`,
      html: `
        <p><strong>Nom :</strong> ${data.nom}</p>
        <p><strong>Email :</strong> ${data.email}</p>
        <p><strong>Téléphone :</strong> ${data.telephone || "—"}</p>
        <p><strong>Expérience :</strong> ${data.experience}</p>
        <p><strong>Date souhaitée :</strong> ${data.date}</p>
        <p><strong>Message :</strong> ${data.message || "—"}</p>
      `,
    });

    return { success: true };
  } catch (err) {
    console.error("Reservation error:", err);
    return { success: false, error: "Une erreur est survenue. Veuillez réessayer." };
  }
}
