/*
  Warnings:

  - You are about to drop the column `email` on the `Organization` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[owner]` on the table `Organization` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `owner` to the `Organization` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "Organization_email_key";

-- AlterTable
ALTER TABLE "Organization" DROP COLUMN "email",
ADD COLUMN     "owner" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "User" ALTER COLUMN "role" DROP NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Organization_owner_key" ON "Organization"("owner");
