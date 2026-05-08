# 🛒 E-Commerce MVP — Next.js + shadcn/ui + Prisma + Better Auth + Stripe

Stack complète pour une boutique de produits physiques.

## Stack

- **Next.js 15** (App Router + Server Actions)
- **shadcn/ui** + Tailwind CSS v4
- **Prisma** ORM → PostgreSQL (Neon/Supabase)
- **Better Auth** — auth email/password + OAuth (Google)
- **Stripe** — Checkout Session + Webhooks

---

## Structure du projet

```
ecommerce-mvp/
├── prisma/
│   └── schema.prisma              # Modèles DB
├── src/
│   ├── app/
│   │   ├── (store)/               # Layout public boutique
│   │   │   ├── page.tsx           # Accueil / Hero + produits vedettes
│   │   │   ├── products/
│   │   │   │   ├── page.tsx       # Catalogue complet
│   │   │   │   └── [slug]/page.tsx # Fiche produit
│   │   │   ├── cart/page.tsx      # Panier
│   │   │   └── checkout/
│   │   │       ├── page.tsx       # Récap avant paiement
│   │   │       └── success/page.tsx
│   │   ├── (auth)/
│   │   │   ├── login/page.tsx
│   │   │   └── register/page.tsx
│   │   ├── dashboard/             # Admin
│   │   │   ├── page.tsx           # Vue d'ensemble
│   │   │   ├── products/
│   │   │   │   ├── page.tsx       # Liste produits
│   │   │   │   └── new/page.tsx   # Créer produit
│   │   │   └── orders/page.tsx    # Commandes
│   │   ├── api/
│   │   │   ├── auth/[...all]/route.ts   # Better Auth handler
│   │   │   ├── webhooks/stripe/route.ts # Stripe webhooks
│   │   │   └── checkout/route.ts        # Créer session Stripe
│   │   └── layout.tsx
│   ├── components/
│   │   ├── ui/                    # shadcn/ui components
│   │   ├── store/
│   │   │   ├── Navbar.tsx
│   │   │   ├── ProductCard.tsx
│   │   │   ├── CartSidebar.tsx
│   │   │   └── Footer.tsx
│   │   └── admin/
│   │       ├── AdminSidebar.tsx
│   │       └── ProductForm.tsx
│   ├── lib/
│   │   ├── auth.ts                # Config Better Auth
│   │   ├── auth-client.ts         # Client Better Auth
│   │   ├── db.ts                  # Client Prisma
│   │   ├── stripe.ts              # Client Stripe
│   │   └── utils.ts
│   ├── hooks/
│   │   └── useCart.ts             # Zustand cart store
│   └── types/
│       └── index.ts
├── .env.example
└── package.json
```

---

## Installation

```bash
# 1. Cloner et installer
git clone <repo>
cd ecommerce-mvp
npm install

# 2. Copier les variables d'environnement
cp .env.example .env.local

# 3. Remplir .env.local (voir ci-dessous)

# 4. Initialiser la DB
npx prisma generate
npx prisma db push

# 5. Lancer en dev
npm run dev
```

## Variables d'environnement

```env
# Database (Neon ou Supabase)
DATABASE_URL="postgresql://..."

# Better Auth
BETTER_AUTH_SECRET="your-secret-32-chars-min"
BETTER_AUTH_URL="http://localhost:3000"

# Google OAuth (optionnel)
GOOGLE_CLIENT_ID=""
GOOGLE_CLIENT_SECRET=""

# Stripe
STRIPE_SECRET_KEY="sk_test_..."
STRIPE_PUBLISHABLE_KEY="pk_test_..."
STRIPE_WEBHOOK_SECRET="whsec_..."

# App
NEXT_PUBLIC_APP_URL="http://localhost:3000"
```

---

## Fonctionnalités

### Boutique publique
- ✅ Page d'accueil avec hero + produits vedettes
- ✅ Catalogue avec filtres par catégorie et recherche
- ✅ Fiche produit avec galerie, variantes, stock
- ✅ Panier persistant (Zustand + localStorage)
- ✅ Checkout via Stripe Checkout Session
- ✅ Page de confirmation de commande

### Auth
- ✅ Inscription / Connexion email + mot de passe
- ✅ OAuth Google
- ✅ Sessions sécurisées (Better Auth)
- ✅ Protection des routes

### Dashboard Admin
- ✅ Vue d'ensemble (stats, dernières commandes)
- ✅ CRUD produits (nom, prix, stock, images, catégorie)
- ✅ Liste et détail des commandes
- ✅ Rôle admin protégé

### Paiement
- ✅ Stripe Checkout Session
- ✅ Webhooks pour valider les commandes
- ✅ Gestion des statuts (pending → paid → shipped)

---

## Commandes utiles

```bash
npm run dev          # Dev server
npm run build        # Build production
npx prisma studio    # UI DB
npx prisma migrate dev --name init  # Migration
stripe listen --forward-to localhost:3000/api/webhooks/stripe  # Test webhooks
```
