# 🍷 Domaine — E-Commerce Next.js

Boutique en ligne pour un domaine viticole (Chinon). Vente de vins et produits artisanaux, réservations d'expériences, blog, newsletter et dashboard admin complet.

---

## Stack

| Couche      | Technologie                                 |
| ----------- | ------------------------------------------- |
| Framework   | Next.js 15 (App Router + Server Actions)    |
| UI          | shadcn/ui + Tailwind CSS v4                 |
| ORM         | Prisma 6 → PostgreSQL (Neon)                |
| Auth        | Better Auth — email/password + Google OAuth |
| Paiement    | Stripe Checkout Session + Webhooks          |
| Panier      | Zustand (persistant localStorage)           |
| Upload      | UploadThing                                 |
| Emails      | Resend                                      |
| Déploiement | Vercel                                      |

---

## Structure du projet

```
├── prisma/
│   ├── schema.prisma
│   ├── seed.ts
│   └── migrations/
│
└── src/
    ├── app/
    │   ├── (store)/                        # Layout public (Navbar + Footer + CartSidebar + AgeModal)
    │   │   ├── page.tsx                    # Homepage — hero + produits vedettes + sections marketing
    │   │   ├── products/
    │   │   │   ├── page.tsx                # Catalogue + filtres catégories + recherche
    │   │   │   └── [slug]/page.tsx         # Fiche produit
    │   │   ├── cart/page.tsx               # Panier
    │   │   ├── checkout/
    │   │   │   └── success/page.tsx        # Confirmation commande
    │   │   ├── account/
    │   │   │   ├── layout.tsx              # Protection route (redirect si non connecté)
    │   │   │   ├── orders/page.tsx         # Historique commandes
    │   │   │   └── profile/page.tsx        # Profil utilisateur
    │   │   ├── domaine/page.tsx            # Histoire + terroir + engagement
    │   │   ├── savoir-faire/page.tsx       # De la vigne à la bouteille
    │   │   ├── experiences/page.tsx        # Visites, dégustations, événements + formulaire réservation
    │   │   ├── journal/
    │   │   │   ├── page.tsx                # Liste articles (blog)
    │   │   │   └── [slug]/page.tsx         # Article
    │   │   ├── cgv/page.tsx
    │   │   ├── confidentialite/page.tsx
    │   │   └── mentions-legales/page.tsx
    │   │
    │   ├── (auth)/
    │   │   ├── login/page.tsx
    │   │   ├── register/page.tsx
    │   │   └── reset-password/
    │   │       ├── page.tsx
    │   │       └── confirm/page.tsx
    │   │
    │   ├── dashboard/                      # Admin — protégé rôle ADMIN
    │   │   ├── layout.tsx
    │   │   ├── page.tsx                    # Vue d'ensemble (stats + dernières commandes)
    │   │   ├── products/
    │   │   │   ├── page.tsx                # Liste produits
    │   │   │   ├── new/page.tsx            # Créer produit
    │   │   │   └── [id]/edit/page.tsx      # Éditer produit
    │   │   ├── orders/
    │   │   │   ├── page.tsx                # Liste commandes
    │   │   │   └── [id]/page.tsx           # Détail commande
    │   │   ├── posts/
    │   │   │   ├── page.tsx                # Liste articles
    │   │   │   ├── new/page.tsx            # Créer article
    │   │   │   └── [id]/edit/page.tsx      # Éditer article
    │   │   ├── experiences/
    │   │   │   ├── page.tsx                # Liste expériences
    │   │   │   ├── new/page.tsx
    │   │   │   └── [id]/edit/page.tsx
    │   │   ├── reservations/page.tsx       # Réservations (PENDING / CONFIRMED / CANCELLED)
    │   │   └── newsletter/page.tsx         # Abonnés + campagnes
    │   │
    │   └── api/
    │       ├── auth/[...all]/route.ts      # Better Auth handler
    │       ├── webhooks/stripe/route.ts    # Stripe webhooks
    │       └── checkout/route.ts          # Créer session Stripe
    │
    ├── components/
    │   ├── ui/                             # shadcn/ui
    │   ├── store/
    │   │   ├── Navbar.tsx
    │   │   ├── Footer.tsx
    │   │   ├── CartSidebar.tsx
    │   │   ├── ProductCard.tsx
    │   │   ├── AgeModal.tsx
    │   │   ├── SavoirFaireSection.tsx
    │   │   ├── ExperiencesSection.tsx
    │   │   └── NewsletterSection.tsx
    │   └── admin/
    │       ├── AdminSidebar.tsx
    │       ├── ProductForm.tsx
    │       ├── PostForm.tsx
    │       ├── ExperienceForm.tsx
    │       ├── DeleteExperienceButton.tsx
    │       └── ReservationStatusButton.tsx
    │
    ├── actions/                            # Server Actions
    │   ├── products.ts
    │   ├── orders.ts
    │   ├── posts.ts
    │   └── newsletter-reservations.ts      # Newsletter + réservations + expériences
    │
    ├── lib/
    │   ├── auth.ts                         # Config Better Auth
    │   ├── auth-client.ts                  # Client Better Auth
    │   ├── db.ts                           # Client Prisma
    │   ├── stripe.ts                       # Client Stripe
    │   └── utils.ts
    │
    └── hooks/
        └── useCart.ts                      # Zustand cart store
```

---

## Modèles Prisma

```
User · Session · Account · Verification   ← Better Auth
Category · Product · CartItem             ← Boutique
Order · OrderItem                         ← Commandes
Post                                      ← Blog / Journal
NewsletterSubscriber · NewsletterCampaign ← Newsletter
Reservation · Experience                  ← Expériences domaine
```

---

## Fonctionnalités

### Boutique publique

- Page d'accueil avec hero, produits vedettes et sections éditoriales
- Catalogue produits avec filtres catégories et recherche
- Fiche produit avec galerie et gestion du stock
- Panier persistant via Zustand + localStorage
- Checkout Stripe avec page de confirmation
- Modal de vérification d'âge (alcool)

### Pages éditoriales

- `/domaine` — histoire, terroir, engagements environnementaux
- `/savoir-faire` — étapes de vinification (vendanges → mise en bouteille)
- `/experiences` — visites, dégustations, événements + formulaire de réservation
- `/journal` — blog avec articles par catégories

### Auth

- Inscription / Connexion email + mot de passe
- OAuth Google
- Sessions sécurisées (Better Auth)
- Protection des routes (middleware + layout guards)
- Espace client : historique commandes + profil

### Dashboard Admin

- Vue d'ensemble avec stats et dernières commandes
- CRUD produits (images via UploadThing, catégories, stock, prix barré)
- Gestion commandes avec changement de statut
- CRUD articles blog (contenu HTML, image de couverture, publication)
- CRUD expériences (type, durée, prix, prestations incluses)
- Gestion réservations (PENDING → CONFIRMED / CANCELLED)
- Newsletter : abonnés actifs + campagnes (DRAFT → SENT via Resend)

### Paiement & Emails

- Stripe Checkout Session (mode hosted)
- Webhooks pour validation automatique des commandes
- Emails transactionnels via Resend (confirmation commande, réservation, newsletter)

---

## Installation

```bash
# 1. Cloner et installer
git clone <repo>
cd <projet>
npm install

# 2. Variables d'environnement
cp .env.example .env.local
# Remplir .env.local (voir ci-dessous)

# 3. Initialiser la base de données
npx prisma generate
npx prisma db push

# 4. (Optionnel) Seed de démonstration
npx prisma db seed

# 5. Lancer en dev
npm run dev
```

## Variables d'environnement

```env
# Base de données (Neon ou Supabase)
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

# UploadThing
UPLOADTHING_TOKEN=""

# Resend
RESEND_API_KEY="re_..."
ADMIN_EMAIL="admin@exemple.fr"

# App
NEXT_PUBLIC_APP_URL="http://localhost:3000"
```

---

## Commandes utiles

```bash
npm run dev                                              # Serveur de développement
npm run build                                           # Build production
npx prisma studio                                       # UI base de données
npx prisma migrate dev --name <nom>                     # Nouvelle migration
stripe listen --forward-to localhost:3000/api/webhooks/stripe  # Test webhooks Stripe
```
