/*
  Warnings:

  - The `chat` column on the `CoverLetter` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "CoverLetter" DROP COLUMN "chat",
ADD COLUMN     "chat" JSONB[] DEFAULT ARRAY[]::JSONB[];
