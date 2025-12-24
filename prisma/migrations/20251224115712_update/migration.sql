-- CreateEnum
CREATE TYPE "Sex" AS ENUM ('Male', 'FEMALE', 'OTHER');

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "age" TEXT,
ADD COLUMN     "contact" TEXT,
ADD COLUMN     "sex" "Sex";
