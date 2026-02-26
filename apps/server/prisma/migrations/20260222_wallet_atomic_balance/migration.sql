-- Migration: wallet_atomic_balance
-- Description: Migrate balance/amount from Float to BigInt (centimos) for financial precision.
--              Add idempotencyKey to Transaction for webhook deduplication.

-- Step 1: Convert User.balance from Float to BigInt (centimos)
-- 1 Kz = 100 centimos, so multiply by 100 and round
ALTER TABLE "User" ALTER COLUMN "balance" TYPE BIGINT USING ROUND("balance" * 100)::BIGINT;
ALTER TABLE "User" ALTER COLUMN "balance" SET DEFAULT 0;

-- Step 2: Convert Transaction.amount from Float to BigInt (centimos)
ALTER TABLE "Transaction" ALTER COLUMN "amount" TYPE BIGINT USING ROUND("amount" * 100)::BIGINT;

-- Step 3: Convert Donation.amount from Float to BigInt (centimos)
ALTER TABLE "Donation" ALTER COLUMN "amount" TYPE BIGINT USING ROUND("amount" * 100)::BIGINT;

-- Step 4: Add idempotency key for webhook deduplication
ALTER TABLE "Transaction" ADD COLUMN "idempotencyKey" TEXT;
CREATE UNIQUE INDEX "Transaction_idempotencyKey_key" ON "Transaction"("idempotencyKey");
