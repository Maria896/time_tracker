/*
  Warnings:

  - You are about to drop the column `userId` on the `Project` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[creatorId]` on the table `Project` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `creatorId` to the `Project` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Project" DROP COLUMN "userId",
ADD COLUMN     "creatorId" INTEGER NOT NULL,
ALTER COLUMN "estimated_time" DROP NOT NULL,
ALTER COLUMN "actual_time" DROP NOT NULL,
ALTER COLUMN "status" SET DEFAULT 'INPROGRESS';

-- CreateIndex
CREATE UNIQUE INDEX "Project_creatorId_key" ON "Project"("creatorId");
