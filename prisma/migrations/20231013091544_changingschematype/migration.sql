-- AlterTable
ALTER TABLE "DateToTimer" ALTER COLUMN "total_time" DROP NOT NULL;

-- AlterTable
ALTER TABLE "Timer" ALTER COLUMN "end_time" DROP NOT NULL;
