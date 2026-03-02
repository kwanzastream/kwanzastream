-- Phase 1: Identity & Onboarding
-- Add bannerUrl, interests, onboardingCompleted to User table
-- Add WatchHistory model

ALTER TABLE "User" ADD COLUMN "bannerUrl" TEXT;
ALTER TABLE "User" ADD COLUMN "interests" TEXT[] DEFAULT '{}';
ALTER TABLE "User" ADD COLUMN "onboardingCompleted" BOOLEAN NOT NULL DEFAULT false;

-- WatchHistory table
CREATE TABLE "WatchHistory" (
    "id" TEXT NOT NULL,
    "watchedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "duration" INTEGER NOT NULL DEFAULT 0,
    "userId" TEXT NOT NULL,
    "streamId" TEXT NOT NULL,
    
    CONSTRAINT "WatchHistory_pkey" PRIMARY KEY ("id")
);

CREATE UNIQUE INDEX "WatchHistory_userId_streamId_key" ON "WatchHistory"("userId", "streamId");
CREATE INDEX "WatchHistory_userId_idx" ON "WatchHistory"("userId");
CREATE INDEX "WatchHistory_streamId_idx" ON "WatchHistory"("streamId");

ALTER TABLE "WatchHistory" ADD CONSTRAINT "WatchHistory_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "WatchHistory" ADD CONSTRAINT "WatchHistory_streamId_fkey" FOREIGN KEY ("streamId") REFERENCES "Stream"("id") ON DELETE CASCADE ON UPDATE CASCADE;
