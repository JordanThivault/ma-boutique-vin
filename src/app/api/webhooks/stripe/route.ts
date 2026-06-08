// src/app/api/webhooks/stripe/route.ts
import type { NextRequest} from "next/server";
import { NextResponse } from "next/server";
import { stripe } from "@/lib/stripe";
import { db } from "@/lib/db";
import type Stripe from "stripe";

// ✅ Emails
import { resend } from "@/lib/emails/resend";
import { OrderConfirmationEmail } from "@/lib/emails/order-confirmation";

export async function POST(req: NextRequest) {
  const body = await req.text();
  const signature = req.headers.get("stripe-signature");

  if (!signature) {
    return NextResponse.json({ error: "Signature manquante" }, { status: 400 });
  }

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(body, signature, process.env.STRIPE_WEBHOOK_SECRET!);
  } catch (err) {
    console.error("[WEBHOOK] Signature invalide:", err);

    return NextResponse.json({ error: "Signature invalide" }, { status: 400 });
  }

  switch (event.type) {
    case "checkout.session.completed": {
      const session = event.data.object as Stripe.Checkout.Session;

      await handleCheckoutCompleted(session);

      break;
    }

    case "payment_intent.payment_failed": {
      const paymentIntent = event.data.object as Stripe.PaymentIntent;

      console.log("[WEBHOOK] Paiement échoué:", paymentIntent.id);

      break;
    }

    default:
      console.log(`[WEBHOOK] Événement non géré: ${event.type}`);
  }

  return NextResponse.json({ received: true });
}

async function handleCheckoutCompleted(session: Stripe.Checkout.Session) {
  if (session.payment_status !== "paid") return;

  // ✅ Guard anti-doublon — crucial en prod
  const existing = await db.order.findUnique({
    where: {
      stripeSessionId: session.id,
    },
  });

  if (existing) {
    console.log(`[WEBHOOK] Commande déjà existante: ${existing.id}`);

    return;
  }

  const metadata = session.metadata as {
    userId: string;
    items: string;
  };

  const items: Array<{
    productId: string;
    quantity: number;
  }> = JSON.parse(metadata.items);

  const products = await db.product.findMany({
    where: {
      id: {
        in: items.map((i) => i.productId),
      },
    },
  });

  const customerDetails = session.customer_details;

  const subtotal = session.amount_subtotal ?? 0;
  const total = session.amount_total ?? 0;
  const shippingCost = total - subtotal;

  try {
    await db.$transaction(async (tx) => {
      const order = await tx.order.create({
        data: {
          stripeSessionId: session.id,

          stripePaymentId: session.payment_intent as string,

          status: "PAID",

          subtotal,
          shippingCost,
          total,

          currency: session.currency ?? "eur",

          shippingName: customerDetails?.name ?? "Inconnu",

          shippingEmail: customerDetails?.email ?? "",

          shippingAddress: customerDetails?.address?.line1 ?? "",

          shippingCity: customerDetails?.address?.city ?? "",

          shippingPostal: customerDetails?.address?.postal_code ?? "",

          shippingCountry: customerDetails?.address?.country ?? "",

          userId: metadata.userId !== "guest" ? metadata.userId : undefined,

          items: {
            create: items.map((item) => {
              const product = products.find((p) => p.id === item.productId)!;

              return {
                productId: item.productId,
                quantity: item.quantity,
                price: product.price,
              };
            }),
          },
        },
      });

      // ✅ Décrémenter le stock
      for (const item of items) {
        await tx.product.update({
          where: {
            id: item.productId,
          },

          data: {
            stock: {
              decrement: item.quantity,
            },
          },
        });
      }

      // ✅ Vider le panier si connecté
      if (metadata.userId !== "guest") {
        await tx.cartItem.deleteMany({
          where: {
            userId: metadata.userId,
          },
        });
      }

      console.log(`[WEBHOOK] Commande créée: ${order.id}`);

      // ✅ Envoi email confirmation
      try {
        await resend.emails.send({
          from: "Domaine Gaud <onboarding@resend.dev>", // Mode test (sans domaine vérifié) // Mode prod <commandes@tondomaine.fr> (avec domaine vérifié sur resend.com)

          to: customerDetails?.email ?? "",

          subject: `Confirmation de votre commande #${order.orderNumber.slice(-8).toUpperCase()}`,

          html: OrderConfirmationEmail({
            orderNumber: order.orderNumber,

            customerName: customerDetails?.name ?? "Client",

            items: items.map((item) => {
              const product = products.find((p) => p.id === item.productId)!;

              return {
                name: product.name,
                quantity: item.quantity,
                price: product.price,
              };
            }),

            subtotal,
            shippingCost,
            total,

            shippingAddress: customerDetails?.address?.line1 ?? "",

            shippingCity: customerDetails?.address?.city ?? "",

            shippingPostal: customerDetails?.address?.postal_code ?? "",

            shippingCountry: customerDetails?.address?.country ?? "",
          }),
        });

        console.log(`[EMAIL] Confirmation envoyée à: ${customerDetails?.email}`);
      } catch (emailError) {
        // ✅ Ne pas bloquer la commande si l'email échoue
        console.error("[EMAIL] Erreur envoi confirmation:", emailError);
      }
    });
  } catch (error) {
    console.error("[WEBHOOK] Erreur création commande:", error);

    throw error;
  }
}
