-- CreateEnum
CREATE TYPE "SupportPriority" AS ENUM ('LOW', 'NORMAL', 'HIGH', 'URGENT');

-- CreateEnum
CREATE TYPE "SupportStatus" AS ENUM ('OPEN', 'IN_PROGRESS', 'RESOLVED', 'CLOSED');

-- AlterEnum
-- Add enum values one by one to avoid PostgreSQL constraints
ALTER TYPE "UserRole" ADD VALUE 'USER';

-- Commit the transaction to make USER available
COMMIT;
BEGIN;

ALTER TYPE "UserRole" ADD VALUE 'VIP';

-- Commit the transaction to make VIP available  
COMMIT;
BEGIN;

ALTER TYPE "UserRole" ADD VALUE 'ADMIN';

-- Commit the transaction to make ADMIN available
COMMIT;
BEGIN;

-- CreateTable
CREATE TABLE "SupportRequest" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "subject" TEXT NOT NULL,
    "message" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "userId" TEXT,
    "userRole" "UserRole" NOT NULL DEFAULT 'AUTHENTICATED',
    "priority" "SupportPriority" NOT NULL DEFAULT 'NORMAL',
    "status" "SupportStatus" NOT NULL DEFAULT 'OPEN',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "resolvedAt" TIMESTAMP(3),
    "assignedTo" TEXT,
    "response" TEXT,

    CONSTRAINT "SupportRequest_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "SupportRequest" ADD CONSTRAINT "SupportRequest_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
