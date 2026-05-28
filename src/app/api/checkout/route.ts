// src/app/api/checkout/route.ts
import { type NextRequest, NextResponse } from "next/server";
import { stripe } from "@/lib/stripe";
import { auth } from "@/lib/auth";
import { db } from "@/lib/db";
import { SHIPPING_COST,EXPRESS_SHIPPING_COST } from "@/lib/shipping";
import { headers } from "next/headers";

export async function POST(req: NextRequest) {
  try {
    const session = await auth.api.getSession({ headers: await headers() });
    const body = await req.json();
    const { items } = body as {
      items: Array<{ productId: string; quantity: number }>;
    };

    if (!items || items.length === 0) {
      return NextResponse.json({ error: "Panier vide" }, { status: 400 });
    }

    // Récupérer les produits depuis la DB
    const products = await db.product.findMany({
      where: { id: { in: items.map((i) => i.productId) }, published: true },
    });

    if (products.length !== items.length) {
      return NextResponse.json({ error: "Produit(s) introuvable(s)" }, { status: 400 });
    }

    // Vérifier le stock
    for (const item of items) {
      const product = products.find((p) => p.id === item.productId)!;
      if (product.stock < item.quantity) {
        return NextResponse.json(
          { error: `Stock insuffisant pour "${product.name}"` },
          { status: 400 }
        );
      }
    }

    // Construire les line_items Stripe
    const lineItems = items.map((item) => {
      const product = products.find((p) => p.id === item.productId)!;
      return {
        price_data: {
          currency: "eur",
          product_data: {
            name: product.name,
            images: product.images.slice(0, 1),
            metadata: { productId: product.id },
          },
          unit_amount: product.price,
        },
        quantity: item.quantity,
      };
    });

    const appUrl = process.env.NEXT_PUBLIC_APP_URL;

    // Créer la session Stripe Checkout
    const checkoutSession = await stripe.checkout.sessions.create({
      mode: "payment",
      line_items: lineItems,
      success_url: `${appUrl}/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${appUrl}/cart`,
      customer_email: session?.user?.email ?? undefined,
      shipping_address_collection: {
        allowed_countries: ["FR", "BE", "CH", "LU", "MC"],
      },
      shipping_options: [
        {
          shipping_rate_data: {
            type: "fixed_amount",
            fixed_amount: { amount: SHIPPING_COST, currency: "eur" },
            display_name: "Livraison standard",
            delivery_estimate: {
              minimum: { unit: "business_day", value: 3 },
              maximum: { unit: "business_day", value: 5 },
            },
          },
        },
        {
          shipping_rate_data: {
            type: "fixed_amount",
            fixed_amount: { amount: EXPRESS_SHIPPING_COST, currency: "eur" },
            display_name: "Livraison express",
            delivery_estimate: {
              minimum: { unit: "business_day", value: 1 },
              maximum: { unit: "business_day", value: 2 },
            },
          },
        },
      ],
      metadata: {
        userId: session?.user?.id ?? "guest",
        items: JSON.stringify(items),
      },
    });

    return NextResponse.json({ url: checkoutSession.url });
  } catch (error) {
    console.error("[CHECKOUT_ERROR]", error);
    return NextResponse.json({ error: "Erreur lors de la création du paiement" }, { status: 500 });
  }
}
