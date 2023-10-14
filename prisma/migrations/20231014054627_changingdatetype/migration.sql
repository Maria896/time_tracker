/*
  Warnings:

  - A unique constraint covering the columns `[Date]` on the table `DateToTimer` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "DateToTimer_Date_key" ON "DateToTimer"("Date");
