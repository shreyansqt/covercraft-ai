-- CreateEnum
CREATE TYPE "Step" AS ENUM ('JobDescription', 'CompanyInfo', 'Keywords', 'Review', 'Chat');

-- AlterTable
ALTER TABLE "CoverLetter" ADD COLUMN     "companyInfo" TEXT,
ADD COLUMN     "currentStep" "Step" NOT NULL DEFAULT 'JobDescription',
ALTER COLUMN "keywords" SET DEFAULT ARRAY[]::JSONB[],
ALTER COLUMN "chat" SET DATA TYPE TEXT;
