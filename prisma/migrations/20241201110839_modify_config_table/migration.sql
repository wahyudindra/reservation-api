/*
  Warnings:

  - The `daysOff` column on the `configs` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "configs" DROP COLUMN "daysOff",
ADD COLUMN     "daysOff" TIMESTAMP(3)[],
ALTER COLUMN "opened_at" SET DATA TYPE TEXT,
ALTER COLUMN "closed_at" SET DATA TYPE TEXT;
