/*
  Warnings:

  - A unique constraint covering the columns `[unsubscribeToken]` on the table `newsletter_subscribers` will be added. If there are existing duplicate values, this will fail.
  - The required column `unsubscribeToken` was added to the `newsletter_subscribers` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.

*/
-- AlterTable
ALTER TABLE "newsletter_subscribers" ADD COLUMN     "confirmedAt" TIMESTAMP(3),
ADD COLUMN     "consentAt" TIMESTAMP(3),
ADD COLUMN     "consentIp" TEXT,
ADD COLUMN     "unsubscribeToken" TEXT NOT NULL,
ALTER COLUMN "active" SET DEFAULT false;

-- AlterTable
ALTER TABLE "products" ADD COLUMN     "isBottle" BOOLEAN NOT NULL DEFAULT true;

-- CreateIndex
CREATE UNIQUE INDEX "newsletter_subscribers_unsubscribeToken_key" ON "newsletter_subscribers"("unsubscribeToken");
