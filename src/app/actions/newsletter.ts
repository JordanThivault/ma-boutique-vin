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
// HELPER — Échappement HTML (protection XSS)
// ============================================================

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

// ============================================================
// INSCRIPTION (double opt-in)
// ============================================================

export async function subscribeToNewsletter(
  email: string,
  consentGiven: boolean
): Promise<{ success: boolean; error?: string }> {
  if (!email || !email.includes("@")) {
    return { success: false, error: "Email invalide." };
  }
  if (!consentGiven) {
    return { success: false, error: "Vous devez accepter de recevoir la newsletter." };
  }

  try {
    const normalizedEmail = email.toLowerCase().trim();
    const headersList = await headers();
    const ip =
      headersList.get("x-forwarded-for")?.split(",")[0].trim() ??
      headersList.get("x-real-ip") ??
      "unknown";

    const existing = await db.newsletterSubscriber.findUnique({
      where: { email: normalizedEmail },
    });

    if (existing) {
      if (existing.active) return { success: true };
      await db.newsletterSubscriber.update({
        where: { email: normalizedEmail },
        data: { consentAt: new Date(), consentIp: ip, active: false, confirmedAt: null },
      });
      await sendConfirmationEmail(normalizedEmail, existing.unsubscribeToken);
      return { success: true };
    }

    const subscriber = await db.newsletterSubscriber.create({
      data: { email: normalizedEmail, active: false, consentAt: new Date(), consentIp: ip },
    });

    await sendConfirmationEmail(normalizedEmail, subscriber.unsubscribeToken);
    return { success: true };
  } catch (err) {
    console.error("Newsletter subscribe error:", err);
    return { success: false, error: "Une erreur est survenue." };
  }
}

// ============================================================
// CONFIRMATION double opt-in
// ============================================================

export async function confirmNewsletterSubscription(
  token: string
): Promise<{ success: boolean; error?: string }> {
  if (!token) return { success: false, error: "Token manquant." };

  try {
    const subscriber = await db.newsletterSubscriber.findUnique({
      where: { unsubscribeToken: token },
    });
    if (!subscriber) return { success: false, error: "Lien invalide." };
    if (subscriber.active) return { success: true };

    await db.newsletterSubscriber.update({
      where: { unsubscribeToken: token },
      data: { active: true, confirmedAt: new Date() },
    });
    return { success: true };
  } catch (err) {
    console.error("Confirm newsletter error:", err);
    return { success: false, error: "Une erreur est survenue." };
  }
}

// ============================================================
// DÉSINSCRIPTION
// ============================================================

export async function unsubscribeNewsletter(
  token: string
): Promise<{ success: boolean; error?: string }> {
  if (!token) return { success: false, error: "Token manquant." };

  try {
    const subscriber = await db.newsletterSubscriber.findUnique({
      where: { unsubscribeToken: token },
    });
    if (!subscriber) return { success: false, error: "Lien invalide ou déjà utilisé." };
    if (!subscriber.active) return { success: true };

    await db.newsletterSubscriber.update({
      where: { unsubscribeToken: token },
      data: { active: false },
    });
    return { success: true };
  } catch (err) {
    console.error("Unsubscribe error:", err);
    return { success: false, error: "Une erreur est survenue." };
  }
}

// ============================================================
// CAMPAGNES
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

    const campaign = await db.newsletterCampaign.findUnique({ where: { id: campaignId } });
    if (!campaign) return { success: false, error: "Campagne introuvable." };
    if (campaign.status === "SENT") return { success: false, error: "Cette campagne a déjà été envoyée." };

    const subscribers = await db.newsletterSubscriber.findMany({
      where: { active: true, confirmedAt: { not: null } },
    });
    if (subscribers.length === 0) return { success: false, error: "Aucun abonné confirmé." };

    const BATCH_SIZE = 100;
    for (let i = 0; i < subscribers.length; i += BATCH_SIZE) {
      const chunk = subscribers.slice(i, i + BATCH_SIZE);
      await resend.batch.send(
        chunk.map((sub) => ({
          from: "Domaine de la Rochette <newsletter@votredomaine.fr>",
          to: sub.email,
          subject: campaign.subject,
          html: buildNewsletterHtml(campaign.subject, campaign.content, sub.unsubscribeToken),
        }))
      );
    }

    await db.newsletterCampaign.update({
      where: { id: campaignId },
      data: { status: "SENT", sentAt: new Date(), recipientCount: subscribers.length },
    });

    revalidatePath("/dashboard/newsletter");
    return { success: true, sentCount: subscribers.length };
  } catch (err) {
    console.error("Send campaign error:", err);
    return { success: false, error: "Erreur lors de l'envoi." };
  }
}

// ============================================================
// HELPERS EMAIL
// ============================================================

async function sendConfirmationEmail(email: string, token: string) {
  const appUrl = process.env.NEXT_PUBLIC_APP_URL ?? "https://votredomaine.fr";
  const confirmUrl = `${appUrl}/confirm-newsletter?token=${token}`;

  await resend.emails.send({
    from: "Domaine de la Rochette <newsletter@votredomaine.fr>",
    to: email,
    subject: "Confirmez votre inscription à la newsletter",
    html: `<!DOCTYPE html>
<html lang="fr"><head><meta charset="UTF-8"/><title>Confirmation newsletter</title></head>
<body style="margin:0;padding:0;background:#f5f5f0;font-family:Georgia,serif;">
<table width="100%" cellpadding="0" cellspacing="0" style="padding:40px 20px;">
  <tr><td align="center">
    <table width="600" cellpadding="0" cellspacing="0" style="background:#fff;max-width:600px;width:100%;">
      <tr>
        <td style="background:#1c1917;padding:32px 40px;text-align:center;">
          <p style="margin:0;font-family:sans-serif;font-size:9px;letter-spacing:0.3em;text-transform:uppercase;color:#78716c;">Domaine</p>
          <p style="margin:4px 0 0;font-size:22px;color:#fff;font-weight:300;letter-spacing:0.05em;">de la Rochette</p>
          <p style="margin:2px 0 0;font-family:sans-serif;font-size:9px;letter-spacing:0.3em;text-transform:uppercase;color:#78716c;">Chinon</p>
        </td>
      </tr>
      <tr>
        <td style="padding:40px;color:#292524;line-height:1.7;font-size:16px;">
          <p style="margin:0 0 16px;">Bonjour,</p>
          <p style="margin:0 0 24px;">Merci de votre intérêt pour la newsletter du Domaine de la Rochette. Cliquez sur le bouton ci-dessous pour confirmer votre inscription.</p>
          <p style="text-align:center;margin:32px 0;">
            <a href="${confirmUrl}" style="background:#92400e;color:#fff;padding:14px 32px;text-decoration:none;font-family:sans-serif;font-size:13px;letter-spacing:0.15em;text-transform:uppercase;display:inline-block;">
              Confirmer mon inscription
            </a>
          </p>
          <p style="margin:24px 0 0;font-family:sans-serif;font-size:12px;color:#a8a29e;">
            Si vous n'avez pas demandé cette inscription, ignorez simplement cet email.
          </p>
        </td>
      </tr>
      <tr>
        <td style="border-top:1px solid #e7e5e4;padding:24px 40px;text-align:center;">
          <p style="margin:0;font-family:sans-serif;font-size:11px;color:#a8a29e;">L'abus d'alcool est dangereux pour la santé. À consommer avec modération.</p>
        </td>
      </tr>
    </table>
  </td></tr>
</table>
</body></html>`,
  });
}

function buildNewsletterHtml(subject: string, body: string, unsubscribeToken: string): string {
  const appUrl = process.env.NEXT_PUBLIC_APP_URL ?? "https://votredomaine.fr";
  const unsubscribeUrl = `${appUrl}/unsubscribe?token=${unsubscribeToken}`;
  const safeSubject = escapeHtml(subject);

  return `<!DOCTYPE html>
<html lang="fr"><head><meta charset="UTF-8"/><title>${safeSubject}</title></head>
<body style="margin:0;padding:0;background:#f5f5f0;font-family:Georgia,serif;">
<table width="100%" cellpadding="0" cellspacing="0" style="padding:40px 20px;">
  <tr><td align="center">
    <table width="600" cellpadding="0" cellspacing="0" style="background:#fff;max-width:600px;width:100%;">
      <tr>
        <td style="background:#1c1917;padding:32px 40px;text-align:center;">
          <p style="margin:0;font-family:sans-serif;font-size:9px;letter-spacing:0.3em;text-transform:uppercase;color:#78716c;">Domaine</p>
          <p style="margin:4px 0 0;font-size:22px;color:#fff;font-weight:300;letter-spacing:0.05em;">de la Rochette</p>
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
          <p style="margin:8px 0 0;">
            <a href="${unsubscribeUrl}" style="font-family:sans-serif;font-size:11px;color:#a8a29e;text-decoration:underline;">Se désinscrire</a>
          </p>
        </td>
      </tr>
    </table>
  </td></tr>
</table>
</body></html>`;
}
