/*
  Warnings:

  - Added the required column `seat_count` to the `reservations` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "reservations" ADD COLUMN     "seat_count" INTEGER NOT NULL;
