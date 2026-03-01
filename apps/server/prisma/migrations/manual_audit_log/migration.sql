-- CreateEnum
CREATE TYPE "AdminAction" AS ENUM ('APPROVE_WITHDRAWAL', 'REJECT_WITHDRAWAL', 'BAN_USER', 'UNBAN_USER', 'UPDATE_USER_ROLE', 'END_STREAM', 'DELETE_CONTENT');

-- CreateTable
CREATE TABLE "AuditLog" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "adminId" TEXT NOT NULL,
    "action" "AdminAction" NOT NULL,
    "targetId" TEXT NOT NULL,
    "targetType" TEXT NOT NULL,
    "details" JSONB,
    "ipAddress" TEXT,

    CONSTRAINT "AuditLog_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "AuditLog_adminId_idx" ON "AuditLog"("adminId");

-- CreateIndex
CREATE INDEX "AuditLog_action_idx" ON "AuditLog"("action");

-- CreateIndex
CREATE INDEX "AuditLog_createdAt_idx" ON "AuditLog"("createdAt");

-- AddForeignKey
ALTER TABLE "AuditLog" ADD CONSTRAINT "AuditLog_adminId_fkey" FOREIGN KEY ("adminId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddColumn (idempotencyKey for deposits - from Fix 2)
-- Note: This column may already exist if you ran the migration before
DO $$
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM information_schema.columns 
        WHERE table_name = 'Transaction' AND column_name = 'idempotencyKey'
    ) THEN
        ALTER TABLE "Transaction" ADD COLUMN "idempotencyKey" TEXT;
        CREATE UNIQUE INDEX "Transaction_idempotencyKey_key" ON "Transaction"("idempotencyKey");
    END IF;
END $$;
