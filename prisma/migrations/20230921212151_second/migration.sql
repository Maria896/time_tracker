/*
  Warnings:

  - Changed the type of `status` on the `Project` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Added the required column `token_expiration` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `verification_token` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "ProjectStatus" AS ENUM ('COMPLETED', 'INPROGRESS', 'STOPPED');

-- AlterTable
ALTER TABLE "Project" DROP COLUMN "status",
ADD COLUMN     "status" "ProjectStatus" NOT NULL;

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "is_verified" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "token_expiration" TEXT NOT NULL,
ADD COLUMN     "verification_token" TEXT NOT NULL;
