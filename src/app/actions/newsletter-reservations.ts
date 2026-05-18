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
// NEWSLETTER — INSCRIPTION
// ============================================================

export async function subscribeToNewsletter(
  email: string
): Promise<{ success: boolean; error?: string }> {
  if (!email || !email.includes("@")) {
    return { success: false, error: "Email invalide." };
  }

  try {
    const normalizedEmail = email.toLowerCase().trim();

    const existing = await db.newsletterSubscriber.findUnique({
      where: { email: normalizedEmail },
    });

    if (existing) {
      if (existing.active) return { success: true };
      await db.newsletterSubscriber.update({
        where: { email: normalizedEmail },
        data: { active: true },
      });
      return { success: true };
    }

    await db.newsletterSubscriber.create({
      data: { email: normalizedEmail },
    });

    return { success: true };
  } catch (err) {
    console.error("Newsletter subscribe error:", err);
    return { success: false, error: "Une erreur est survenue." };
  }
}

// ============================================================
// RÉSERVATION EXPERIENCE
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
        <div style="font-family: Georgia, serif; max-width: 600px; margin: 0 auto; color: #292524; line-height: 1.6;">
          <h1>Demande reçue</h1>
          <p>Bonjour ${data.nom},</p>
          <p>Nous avons bien reçu votre demande de réservation pour <strong>${data.experience}</strong>.</p>
          <p>Date souhaitée : <strong>${data.date}</strong></p>
          ${data.message ? `<p><strong>Message :</strong> ${data.message}</p>` : ""}
          <p>Notre équipe vous répondra rapidement.</p>
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
// EXPERIENCES
// ============================================================

export interface ExperiencePayload {
  title: string;
  type: string;
  duration: string;
  price: string;
  description: string;
  includes: string;
  image?: string;
  order?: number;
  active?: boolean;
}

function parseIncludes(raw: string): string[] {
  return raw.split("\n").map((line) => line.trim()).filter(Boolean);
}

export async function createExperience(data: ExperiencePayload) {
  try {
    await requireAdmin();

    await db.experience.create({
      data: {
        title: data.title,
        type: data.type,
        duration: data.duration,
        price: data.price,
        description: data.description,
        includes: parseIncludes(data.includes),
        image: data.image || null,
        order: Number(data.order ?? 0),
        active: data.active ?? true,
      },
    });

    revalidatePath("/experiences");
    revalidatePath("/dashboard/experiences");
    return { success: true };
  } catch (err) {
    console.error("Create experience error:", err);
    return { success: false, error: "Une erreur est survenue." };
  }
}

export async function updateExperience(id: string, data: ExperiencePayload) {
  try {
    await requireAdmin();

    await db.experience.update({
      where: { id },
      data: {
        title: data.title,
        type: data.type,
        duration: data.duration,
        price: data.price,
        description: data.description,
        includes: parseIncludes(data.includes),
        image: data.image || null,
        order: Number(data.order ?? 0),
        active: data.active ?? true,
      },
    });

    revalidatePath("/experiences");
    revalidatePath("/dashboard/experiences");
    return { success: true };
  } catch (err) {
    console.error("Update experience error:", err);
    return { success: false, error: "Une erreur est survenue." };
  }
}

export async function deleteExperience(id: string) {
  try {
    await requireAdmin();

    await db.experience.delete({ where: { id } });

    revalidatePath("/experiences");
    revalidatePath("/dashboard/experiences");
    return { success: true };
  } catch (err) {
    console.error("Delete experience error:", err);
    return { success: false, error: "Une erreur est survenue." };
  }
}

// ============================================================
// RESERVATION STATUS
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

// ============================================================
// NEWSLETTER CAMPAIGNS
// ============================================================

export interface CampaignPayload {
  subject: string;
  content: string;
}

export async function createCampaign(data: CampaignPayload) {
  try {
    await requireAdmin();

    const campaign = await db.newsletterCampaign.create({
      data: { subject: data.subject, content: data.content },
    });

    revalidatePath("/dashboard/newsletter");
    return { success: true, id: campaign.id };
  } catch (err) {
    console.error("Create campaign error:", err);
    return { success: false, error: "Une erreur est survenue." };
  }
}

export async function updateCampaign(id: string, data: CampaignPayload) {
  try {
    await requireAdmin();

    const campaign = await db.newsletterCampaign.findUnique({ where: { id } });
    if (campaign?.status === "SENT") {
      return { success: false, error: "Impossible de modifier une campagne déjà envoyée." };
    }

    await db.newsletterCampaign.update({
      where: { id },
      data: { subject: data.subject, content: data.content },
    });

    revalidatePath("/dashboard/newsletter");
    return { success: true };
  } catch (err) {
    console.error("Update campaign error:", err);
    return { success: false, error: "Une erreur est survenue." };
  }
}

export async function deleteCampaign(id: string) {
  try {
    await requireAdmin();

    await db.newsletterCampaign.delete({ where: { id } });

    revalidatePath("/dashboard/newsletter");
    return { success: true };
  } catch (err) {
    console.error("Delete campaign error:", err);
    return { success: false, error: "Une erreur est survenue." };
  }
}

export async function sendCampaign(
  campaignId: string
): Promise<{ success: boolean; error?: string; sentCount?: number }> {
  try {
    await requireAdmin();

    const campaign = await db.newsletterCampaign.findUnique({
      where: { id: campaignId },
    });

    if (!campaign) return { success: false, error: "Campagne introuvable." };
    if (campaign.status === "SENT") return { success: false, error: "Cette campagne a déjà été envoyée." };

    const subscribers = await db.newsletterSubscriber.findMany({
      where: { active: true },
    });

    if (subscribers.length === 0) {
      return { success: false, error: "Aucun abonné actif." };
    }

    const html = buildNewsletterHtml(campaign.subject, campaign.content);

    // Envoi par batch de 100 (limite Resend)
    const BATCH_SIZE = 100;
    for (let i = 0; i < subscribers.length; i += BATCH_SIZE) {
      const chunk = subscribers.slice(i, i + BATCH_SIZE);
      await resend.batch.send(
        chunk.map((sub) => ({
          from: "Domaine test <onboarding@resend.dev>",
          to: sub.email,
          subject: campaign.subject,
          html,
        }))
      );
    }

    await db.newsletterCampaign.update({
      where: { id: campaignId },
      data: {
        status: "SENT",
        sentAt: new Date(),
        recipientCount: subscribers.length,
      },
    });

    revalidatePath("/dashboard/newsletter");
    return { success: true, sentCount: subscribers.length };
  } catch (err) {
    console.error("Send campaign error:", err);
    return { success: false, error: "Erreur lors de l'envoi." };
  }
}

// ============================================================
// HELPER — Template HTML email newsletter
// ============================================================

function buildNewsletterHtml(subject: string, body: string): string {
  return `<!DOCTYPE html>
<html lang="fr"><head><meta charset="UTF-8"/><title>${subject}</title></head>
<body style="margin:0;padding:0;background:#f5f5f0;font-family:Georgia,serif;">
<table width="100%" cellpadding="0" cellspacing="0" style="padding:40px 20px;">
  <tr><td align="center">
    <table width="600" cellpadding="0" cellspacing="0" style="background:#fff;max-width:600px;width:100%;">
      <tr>
        <td style="background:#1c1917;padding:32px 40px;text-align:center;">
          <p style="margin:0;font-family:sans-serif;font-size:9px;letter-spacing:0.3em;text-transform:uppercase;color:#78716c;">Domaine</p>
          <p style="margin:4px 0 0;font-size:22px;color:#fff;font-weight:300;letter-spacing:0.05em;">test</p>
          <p style="margin:2px 0 0;font-family:sans-serif;font-size:9px;letter-spacing:0.3em;text-transform:uppercase;color:#78716c;">Chinon</p>
        </td>
      </tr>
      <tr>
        <td style="padding:40px;color:#292524;line-height:1.7;font-size:16px;">
          ${body}
        </td>
      </tr>
      <tr>
        <td style="border-top:1px solid #e7e5e4;padding:24px 40px;text-align:center;">
          <p style="margin:0;font-family:sans-serif;font-size:11px;color:#a8a29e;">L'abus d'alcool est dangereux pour la santé. À consommer avec modération.</p>
          <p style="margin:8px 0 0;font-family:sans-serif;font-size:11px;color:#a8a29e;">Vous recevez cet email car vous êtes inscrit(e) à la newsletter du Domaine de la Rochette.</p>
        </td>
      </tr>
    </table>
  </td></tr>
</table>
</body></html>`;
}