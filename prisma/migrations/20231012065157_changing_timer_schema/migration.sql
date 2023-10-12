/*
  Warnings:

  - You are about to drop the `TimeEntry` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "TimeEntry" DROP CONSTRAINT "TimeEntry_projectId_fkey";

-- DropForeignKey
ALTER TABLE "TimeEntry" DROP CONSTRAINT "TimeEntry_userId_fkey";

-- DropTable
DROP TABLE "TimeEntry";

-- CreateTable
CREATE TABLE "Timer" (
    "id" SERIAL NOT NULL,
    "start_time" TIMESTAMP(3) NOT NULL,
    "end_time" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Timer_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "DateToTimer" (
    "id" SERIAL NOT NULL,
    "Date" TIMESTAMP(3) NOT NULL,
    "userId" INTEGER NOT NULL,
    "projectId" INTEGER NOT NULL,
    "total_time" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "DateToTimer_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_DateToTimerToTimer" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_DateToTimerToTimer_AB_unique" ON "_DateToTimerToTimer"("A", "B");

-- CreateIndex
CREATE INDEX "_DateToTimerToTimer_B_index" ON "_DateToTimerToTimer"("B");

-- AddForeignKey
ALTER TABLE "DateToTimer" ADD CONSTRAINT "DateToTimer_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "Project"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DateToTimer" ADD CONSTRAINT "DateToTimer_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_DateToTimerToTimer" ADD CONSTRAINT "_DateToTimerToTimer_A_fkey" FOREIGN KEY ("A") REFERENCES "DateToTimer"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_DateToTimerToTimer" ADD CONSTRAINT "_DateToTimerToTimer_B_fkey" FOREIGN KEY ("B") REFERENCES "Timer"("id") ON DELETE CASCADE ON UPDATE CASCADE;
