// src/lib/emails/order-confirmation.tsx

interface OrderItem {
  name: string;
  quantity: number;
  price: number;
}

interface OrderConfirmationProps {
  orderNumber: string;
  customerName: string;
  items: OrderItem[];
  subtotal: number;
  shippingCost: number;
  total: number;
  shippingAddress: string;
  shippingCity: string;
  shippingPostal: string;
  shippingCountry: string;
}

function formatPrice(amount: number): string {
  return new Intl.NumberFormat("fr-FR", {
    style: "currency",
    currency: "EUR",
  }).format(amount / 100);
}

export function OrderConfirmationEmail({
  orderNumber,
  customerName,
  items,
  subtotal,
  shippingCost,
  total,
  shippingAddress,
  shippingCity,
  shippingPostal,
  shippingCountry,
}: OrderConfirmationProps) {
  return `
    <!DOCTYPE html>
    <html lang="fr">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Confirmation de commande</title>
    </head>
    <body style="margin:0;padding:0;background:#f5f5f5;font-family:sans-serif;">
      
      <div style="max-width:600px;margin:40px auto;background:white;border-radius:16px;overflow:hidden;box-shadow:0 2px 8px rgba(0,0,0,0.08);">
        
        <!-- Header -->
        <div style="background:#171717;padding:32px;text-align:center;">
          <h1 style="color:white;margin:0;font-size:24px;font-weight:700;">
            Domaine Gaud
          </h1>
          <p style="color:#a3a3a3;margin:8px 0 0;font-size:14px;">
            Confirmation de commande
          </p>
        </div>

        <!-- Body -->
        <div style="padding:32px;">
          
          <!-- Intro -->
          <h2 style="color:#171717;font-size:20px;margin:0 0 8px;">
            Merci pour votre commande ! 🎉
          </h2>
          <p style="color:#525252;margin:0 0 24px;line-height:1.6;">
            Bonjour ${customerName},<br>
            Votre commande a bien été reçue et est en cours de préparation.
          </p>

          <!-- Numéro commande -->
          <div style="background:#f5f5f5;border-radius:12px;padding:16px;margin-bottom:24px;">
            <p style="margin:0;font-size:13px;color:#737373;">Numéro de commande</p>
            <p style="margin:4px 0 0;font-size:16px;font-weight:700;color:#171717;font-family:monospace;">
              #${orderNumber.slice(-8).toUpperCase()}
            </p>
          </div>

          <!-- Articles -->
          <h3 style="color:#171717;font-size:16px;margin:0 0 12px;">
            Votre commande
          </h3>
          <table style="width:100%;border-collapse:collapse;margin-bottom:24px;">
            <thead>
              <tr style="border-bottom:2px solid #e5e5e5;">
                <th style="text-align:left;padding:8px 0;font-size:13px;color:#737373;font-weight:500;">Produit</th>
                <th style="text-align:center;padding:8px 0;font-size:13px;color:#737373;font-weight:500;">Qté</th>
                <th style="text-align:right;padding:8px 0;font-size:13px;color:#737373;font-weight:500;">Prix</th>
              </tr>
            </thead>
            <tbody>
              ${items
                .map(
                  (item) => `
                <tr style="border-bottom:1px solid #f5f5f5;">
                  <td style="padding:12px 0;font-size:14px;color:#171717;">${item.name}</td>
                  <td style="padding:12px 0;font-size:14px;color:#525252;text-align:center;">${item.quantity}</td>
                  <td style="padding:12px 0;font-size:14px;color:#171717;text-align:right;font-weight:500;">
                    ${formatPrice(item.price * item.quantity)}
                  </td>
                </tr>
              `
                )
                .join("")}
            </tbody>
          </table>

          <!-- Totaux -->
          <div style="border-top:2px solid #e5e5e5;padding-top:16px;margin-bottom:24px;">
            <div style="display:flex;justify-content:space-between;margin-bottom:8px;">
              <span style="font-size:14px;color:#525252;">Sous-total</span>
              <span style="font-size:14px;color:#171717;">${formatPrice(subtotal)}</span>
            </div>
            <div style="display:flex;justify-content:space-between;margin-bottom:12px;">
              <span style="font-size:14px;color:#525252;">Livraison</span>
              <span style="font-size:14px;color:#171717;">
                ${shippingCost === 0 ? "Offerte 🎉" : formatPrice(shippingCost)}
              </span>
            </div>
            <div style="display:flex;justify-content:space-between;">
              <span style="font-size:16px;font-weight:700;color:#171717;">Total</span>
              <span style="font-size:16px;font-weight:700;color:#171717;">${formatPrice(total)}</span>
            </div>
          </div>

          <!-- Adresse livraison -->
          <h3 style="color:#171717;font-size:16px;margin:0 0 12px;">
            Adresse de livraison
          </h3>
          <div style="background:#f5f5f5;border-radius:12px;padding:16px;margin-bottom:24px;">
            <p style="margin:0;font-size:14px;color:#171717;line-height:1.8;">
              ${customerName}<br>
              ${shippingAddress}<br>
              ${shippingPostal} ${shippingCity}<br>
              ${shippingCountry}
            </p>
          </div>

          <!-- Message -->
          <div style="background:#fef3c7;border-radius:12px;padding:16px;margin-bottom:24px;">
            <p style="margin:0;font-size:14px;color:#92400e;line-height:1.6;">
              📦 Vous recevrez un email dès l'expédition de votre commande avec le numéro de suivi.
            </p>
          </div>

          <!-- CTA -->
          <div style="text-align:center;">
            <a href="${process.env.NEXT_PUBLIC_APP_URL}" 
               style="display:inline-block;background:#171717;color:white;padding:14px 32px;border-radius:12px;text-decoration:none;font-weight:600;font-size:14px;">
              Retourner sur la boutique
            </a>
          </div>

        </div>

        <!-- Footer -->
        <div style="background:#f5f5f5;padding:24px;text-align:center;border-top:1px solid #e5e5e5;">
          <p style="margin:0;font-size:12px;color:#a3a3a3;">
            © ${new Date().getFullYear()} Domaine Gaud — Tous droits réservés
          </p>
          <p style="margin:8px 0 0;font-size:12px;color:#a3a3a3;">
            Cet email a été envoyé suite à votre commande sur notre boutique.
          </p>
        </div>

      </div>
    </body>
    </html>
  `;
}
