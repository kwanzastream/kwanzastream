-- CreateEnum
CREATE TYPE "NotificationType" AS ENUM ('LIVE_STARTED', 'DONATION_RECEIVED', 'NEW_FOLLOWER', 'SYSTEM');

-- CreateTable
CREATE TABLE "Notification" (
    "id" TEXT NOT NULL,
    "type" "NotificationType" NOT NULL,
    "title" TEXT NOT NULL,
    "body" TEXT NOT NULL,
    "imageUrl" TEXT,
    "linkUrl" TEXT,
    "read" BOOLEAN NOT NULL DEFAULT false,
    "eventId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "userId" TEXT NOT NULL,

    CONSTRAINT "Notification_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "FavoriteCreator" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "userId" TEXT NOT NULL,
    "creatorId" TEXT NOT NULL,

    CONSTRAINT "FavoriteCreator_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "FavoriteStream" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "userId" TEXT NOT NULL,
    "streamId" TEXT NOT NULL,

    CONSTRAINT "FavoriteStream_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Notification_eventId_key" ON "Notification"("eventId");

-- CreateIndex
CREATE INDEX "Notification_userId_read_idx" ON "Notification"("userId", "read");

-- CreateIndex
CREATE INDEX "Notification_userId_createdAt_idx" ON "Notification"("userId", "createdAt");

-- CreateIndex
CREATE INDEX "FavoriteCreator_userId_idx" ON "FavoriteCreator"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "FavoriteCreator_userId_creatorId_key" ON "FavoriteCreator"("userId", "creatorId");

-- CreateIndex
CREATE INDEX "FavoriteStream_userId_idx" ON "FavoriteStream"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "FavoriteStream_userId_streamId_key" ON "FavoriteStream"("userId", "streamId");

-- CreateIndex
CREATE INDEX "Stream_streamerId_status_idx" ON "Stream"("streamerId", "status");

-- AddForeignKey
ALTER TABLE "Notification" ADD CONSTRAINT "Notification_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FavoriteCreator" ADD CONSTRAINT "FavoriteCreator_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FavoriteStream" ADD CONSTRAINT "FavoriteStream_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
