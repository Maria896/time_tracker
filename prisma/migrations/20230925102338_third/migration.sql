/*
  Warnings:

  - The `token_expiration` column on the `User` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - Added the required column `password` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "User" ADD COLUMN     "password" TEXT NOT NULL,
ALTER COLUMN "designation" DROP NOT NULL,
DROP COLUMN "token_expiration",
ADD COLUMN     "token_expiration" TIMESTAMP(3),
ALTER COLUMN "verification_token" DROP NOT NULL;
