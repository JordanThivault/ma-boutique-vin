// prisma/seed.ts

import { PrismaClient, Role, OrderStatus } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Seeding database...");

  // ─────────────────────────────────────────
  // CLEAN DATABASE
  // ─────────────────────────────────────────

  await prisma.orderItem.deleteMany();
  await prisma.order.deleteMany();
  await prisma.cartItem.deleteMany();
  await prisma.product.deleteMany();
  await prisma.category.deleteMany();
  await prisma.user.deleteMany();

  // ─────────────────────────────────────────
  // USERS
  // ─────────────────────────────────────────

  const admin = await prisma.user.create({
    data: {
      name: "Admin Boutique",
      email: "admin@chinon.fr",
      emailVerified: true,
      role: Role.ADMIN,
    },
  });

  const client1 = await prisma.user.create({
    data: {
      name: "Jean Dupont",
      email: "jean@example.com",
      emailVerified: true,
    },
  });

  const client2 = await prisma.user.create({
    data: {
      name: "Marie Laurent",
      email: "marie@example.com",
      emailVerified: true,
    },
  });

  // ─────────────────────────────────────────
  // CATEGORIES
  // ─────────────────────────────────────────

  const vins = await prisma.category.create({
    data: {
      name: "Vins",
      slug: "vins",
      description: "Sélection de vins de Chinon",
      image: "https://images.unsplash.com/photo-1510812431401-41d2bd2722f3",
    },
  });

  const condiments = await prisma.category.create({
    data: {
      name: "Condiments",
      slug: "condiments",
      description: "Produits artisanaux à base de vin",
      image: "https://images.unsplash.com/photo-1504674900247-0877df9cc836",
    },
  });

  // ─────────────────────────────────────────
  // PRODUCTS
  // ─────────────────────────────────────────

  const chinon2020 = await prisma.product.create({
    data: {
      name: "Chinon Rouge 2020",
      slug: "chinon-rouge-2020",
      description: "Vin rouge élégant aux notes de fruits noirs et d'épices.",
      price: 1890,
      comparePrice: 2290,
      stock: 24,
      sku: "VIN-CHINON-2020",
      weight: 1200,
      featured: true,
      images: ["https://images.unsplash.com/photo-1516594915697-87eb3b1c14ea"],
      categoryId: vins.id,
    },
  });

  const chinon2018 = await prisma.product.create({
    data: {
      name: "Chinon Vieilles Vignes 2018",
      slug: "chinon-vieilles-vignes-2018",
      description: "Vieilles vignes de Chinon avec une belle structure tannique.",
      price: 2990,
      stock: 12,
      sku: "VIN-VV-2018",
      weight: 1200,
      featured: true,
      images: ["https://images.unsplash.com/photo-1569919659476-f0852f6834b7"],
      categoryId: vins.id,
    },
  });

  const rose2022 = await prisma.product.create({
    data: {
      name: "Rosé de Chinon 2022",
      slug: "rose-chinon-2022",
      description: "Rosé frais et fruité idéal pour les repas estivaux.",
      price: 1490,
      stock: 30,
      sku: "ROSE-2022",
      weight: 1200,
      images: ["https://images.unsplash.com/photo-1558001373-7b93ee48ffa0"],
      categoryId: vins.id,
    },
  });

  const coffret = await prisma.product.create({
    data: {
      name: "Coffret Découverte Chinon",
      slug: "coffret-decouverte-chinon",
      description: "Coffret de 3 bouteilles emblématiques du domaine.",
      price: 5490,
      comparePrice: 6290,
      stock: 8,
      sku: "COFFRET-001",
      weight: 4200,
      featured: true,
      images: ["https://images.unsplash.com/photo-1609951651556-5334e2706168"],
      categoryId: vins.id,
    },
  });

  const selRouge = await prisma.product.create({
    data: {
      name: "Sel au Vin Rouge",
      slug: "sel-vin-rouge",
      description: "Sel artisanal infusé au vin rouge de Chinon.",
      price: 690,
      stock: 40,
      sku: "SEL-001",
      weight: 200,
      images: ["https://images.unsplash.com/photo-1515003197210-e0cd71810b5f"],
      categoryId: condiments.id,
    },
  });

  const confitureVin = await prisma.product.create({
    data: {
      name: "Confiture de Vin",
      slug: "confiture-vin",
      description: "Confiture artisanale au vin rouge parfaite avec le fromage.",
      price: 890,
      stock: 18,
      sku: "CONF-001",
      weight: 250,
      images: ["https://images.unsplash.com/photo-1571115764595-644a1f56a55c"],
      categoryId: condiments.id,
    },
  });

  // ─────────────────────────────────────────
  // CART ITEMS
  // ─────────────────────────────────────────

  await prisma.cartItem.create({
    data: {
      userId: client1.id,
      productId: chinon2020.id,
      quantity: 2,
    },
  });

  await prisma.cartItem.create({
    data: {
      userId: client1.id,
      productId: selRouge.id,
      quantity: 1,
    },
  });

  // ─────────────────────────────────────────
  // ORDERS
  // ─────────────────────────────────────────

  const order1 = await prisma.order.create({
    data: {
      orderNumber: "CMD-2026-001",
      status: OrderStatus.PAID,
      subtotal: 4870,
      total: 4870,
      shippingCost: 0,
      currency: "eur",

      shippingName: "Jean Dupont",
      shippingEmail: "jean@example.com",
      shippingAddress: "12 rue du Chinon",
      shippingCity: "Chinon",
      shippingPostal: "37500",
      shippingCountry: "France",

      userId: client1.id,
    },
  });

  await prisma.orderItem.create({
    data: {
      orderId: order1.id,
      productId: chinon2020.id,
      quantity: 2,
      price: 1890,
    },
  });

  await prisma.orderItem.create({
    data: {
      orderId: order1.id,
      productId: selRouge.id,
      quantity: 1,
      price: 690,
    },
  });

  const order2 = await prisma.order.create({
    data: {
      orderNumber: "CMD-2026-002",
      status: OrderStatus.SHIPPED,
      subtotal: 5490,
      total: 5490,
      shippingCost: 0,
      currency: "eur",

      shippingName: "Marie Laurent",
      shippingEmail: "marie@example.com",
      shippingAddress: "8 avenue des Vignes",
      shippingCity: "Tours",
      shippingPostal: "37000",
      shippingCountry: "France",

      userId: client2.id,
    },
  });

  await prisma.orderItem.create({
    data: {
      orderId: order2.id,
      productId: coffret.id,
      quantity: 1,
      price: 5490,
    },
  });

  console.log("✅ Database seeded successfully!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
