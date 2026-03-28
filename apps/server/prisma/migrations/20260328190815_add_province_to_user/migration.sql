-- AlterTable
ALTER TABLE "User" ADD COLUMN     "featuredChannels" TEXT[] DEFAULT ARRAY[]::TEXT[],
ADD COLUMN     "featuredMode" TEXT NOT NULL DEFAULT 'auto',
ADD COLUMN     "isLive" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "offlineBannerUrl" TEXT,
ADD COLUMN     "province" TEXT,
ADD COLUMN     "shelfChannels" TEXT[] DEFAULT ARRAY[]::TEXT[],
ADD COLUMN     "shelfType" TEXT NOT NULL DEFAULT 'disabled',
ADD COLUMN     "trailerUrl" TEXT;

-- CreateTable
CREATE TABLE "RadioConfig" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "programName" TEXT,
    "description" TEXT,
    "primaryGenre" TEXT,
    "extraGenres" TEXT[] DEFAULT ARRAY[]::TEXT[],
    "quality" INTEGER NOT NULL DEFAULT 128,
    "artworkUrl" TEXT,
    "streamKey" TEXT NOT NULL,
    "isEnabled" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "RadioConfig_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "RadioSchedule" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "dayOfWeek" INTEGER NOT NULL,
    "startHour" INTEGER NOT NULL,
    "durationMin" INTEGER NOT NULL,
    "notifyFollowers" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "RadioSchedule_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UserCampProgress" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "chapterSlug" TEXT NOT NULL,
    "completedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "UserCampProgress_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CampCertificate" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "level" INTEGER NOT NULL,
    "issuedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "certCode" TEXT NOT NULL,

    CONSTRAINT "CampCertificate_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AdCampaign" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "objective" TEXT NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'draft',
    "budget" DOUBLE PRECISION NOT NULL,
    "spent" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "startDate" TIMESTAMP(3) NOT NULL,
    "endDate" TIMESTAMP(3) NOT NULL,
    "targetProvinces" TEXT[] DEFAULT ARRAY[]::TEXT[],
    "targetCategories" TEXT[] DEFAULT ARRAY[]::TEXT[],
    "targetInterests" TEXT[] DEFAULT ARRAY[]::TEXT[],
    "creativeUrl" TEXT,
    "destinationUrl" TEXT,
    "ctaText" TEXT,
    "impressions" INTEGER NOT NULL DEFAULT 0,
    "clicks" INTEGER NOT NULL DEFAULT 0,
    "reference" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "AdCampaign_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "DeveloperApp" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "clientId" TEXT NOT NULL,
    "clientSecret" TEXT NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'sandbox',
    "category" TEXT NOT NULL DEFAULT 'other',
    "websiteUrl" TEXT,
    "privacyUrl" TEXT,
    "tosUrl" TEXT,
    "redirectUris" TEXT[] DEFAULT ARRAY[]::TEXT[],
    "logoUrl" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "DeveloperApp_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "DeveloperWebhook" (
    "id" TEXT NOT NULL,
    "appId" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "events" TEXT[] DEFAULT ARRAY[]::TEXT[],
    "secret" TEXT NOT NULL,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "lastDelivery" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "DeveloperWebhook_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AwardsNominee" (
    "id" TEXT NOT NULL,
    "year" INTEGER NOT NULL,
    "category" TEXT NOT NULL,
    "channelId" TEXT NOT NULL,
    "votes" INTEGER NOT NULL DEFAULT 0,
    "isWinner" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "AwardsNominee_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AwardsVote" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "year" INTEGER NOT NULL,
    "category" TEXT NOT NULL,
    "nomineeId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "AwardsVote_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "EducationWorkshop" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "registrations" TEXT[] DEFAULT ARRAY[]::TEXT[],
    "maxAttendees" INTEGER NOT NULL DEFAULT 50,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "EducationWorkshop_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AdminAuditLog" (
    "id" TEXT NOT NULL,
    "adminId" TEXT NOT NULL,
    "action" TEXT NOT NULL,
    "targetId" TEXT,
    "targetType" TEXT,
    "details" JSONB,
    "ip" TEXT NOT NULL,
    "timestamp" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "AdminAuditLog_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AdminSession" (
    "id" TEXT NOT NULL,
    "adminId" TEXT NOT NULL,
    "ip" TEXT NOT NULL,
    "userAgent" TEXT NOT NULL DEFAULT '',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "expiresAt" TIMESTAMP(3) NOT NULL,
    "lastSeen" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "AdminSession_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SupportTicket" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "reference" TEXT NOT NULL,
    "category" TEXT NOT NULL,
    "subject" TEXT NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'open',
    "priority" TEXT NOT NULL DEFAULT 'normal',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "SupportTicket_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TicketMessage" (
    "id" TEXT NOT NULL,
    "ticketId" TEXT NOT NULL,
    "authorId" TEXT NOT NULL,
    "isAdmin" BOOLEAN NOT NULL DEFAULT false,
    "content" TEXT NOT NULL,
    "attachments" TEXT[],
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "TicketMessage_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ViewHistory" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "contentId" TEXT NOT NULL,
    "contentType" TEXT NOT NULL,
    "watchedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "watchedSecs" INTEGER NOT NULL DEFAULT 0,
    "progress" DOUBLE PRECISION NOT NULL DEFAULT 0,

    CONSTRAINT "ViewHistory_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SearchHistory" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "query" TEXT NOT NULL,
    "searchedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "SearchHistory_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ChannelVisitHistory" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "channelId" TEXT NOT NULL,
    "visitedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ChannelVisitHistory_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SavedItem" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "contentId" TEXT NOT NULL,
    "contentType" TEXT NOT NULL,
    "savedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "SavedItem_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Collection" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "isPublic" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Collection_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CollectionItem" (
    "id" TEXT NOT NULL,
    "collectionId" TEXT NOT NULL,
    "savedItemId" TEXT NOT NULL,
    "addedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "CollectionItem_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "FavoriteItem" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "targetId" TEXT NOT NULL,
    "targetType" TEXT NOT NULL,
    "addedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "FavoriteItem_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "WatchParty" (
    "id" TEXT NOT NULL,
    "code" TEXT NOT NULL,
    "hostId" TEXT NOT NULL,
    "streamId" TEXT,
    "name" TEXT,
    "isPublic" BOOLEAN NOT NULL DEFAULT false,
    "maxParticipants" INTEGER NOT NULL DEFAULT 10,
    "status" TEXT NOT NULL DEFAULT 'active',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "endedAt" TIMESTAMP(3),

    CONSTRAINT "WatchParty_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "WatchPartyParticipant" (
    "id" TEXT NOT NULL,
    "partyId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "joinedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "leftAt" TIMESTAMP(3),
    "isOnline" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "WatchPartyParticipant_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ReferralCode" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "code" TEXT NOT NULL,
    "clicks" INTEGER NOT NULL DEFAULT 0,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ReferralCode_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Referral" (
    "id" TEXT NOT NULL,
    "referrerId" TEXT NOT NULL,
    "referredId" TEXT NOT NULL,
    "codeId" TEXT NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'pending',
    "referrerSalos" INTEGER NOT NULL DEFAULT 200,
    "referredSalos" INTEGER NOT NULL DEFAULT 100,
    "completedAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Referral_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "IosWaitlist" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "IosWaitlist_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PreLaunchSubscriber" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "source" TEXT NOT NULL DEFAULT 'web',
    "notified" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "PreLaunchSubscriber_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "RadioConfig_userId_key" ON "RadioConfig"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "RadioConfig_streamKey_key" ON "RadioConfig"("streamKey");

-- CreateIndex
CREATE INDEX "RadioSchedule_userId_dayOfWeek_idx" ON "RadioSchedule"("userId", "dayOfWeek");

-- CreateIndex
CREATE INDEX "UserCampProgress_userId_idx" ON "UserCampProgress"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "UserCampProgress_userId_chapterSlug_key" ON "UserCampProgress"("userId", "chapterSlug");

-- CreateIndex
CREATE UNIQUE INDEX "CampCertificate_certCode_key" ON "CampCertificate"("certCode");

-- CreateIndex
CREATE INDEX "CampCertificate_userId_idx" ON "CampCertificate"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "AdCampaign_reference_key" ON "AdCampaign"("reference");

-- CreateIndex
CREATE INDEX "AdCampaign_userId_idx" ON "AdCampaign"("userId");

-- CreateIndex
CREATE INDEX "AdCampaign_status_idx" ON "AdCampaign"("status");

-- CreateIndex
CREATE UNIQUE INDEX "DeveloperApp_clientId_key" ON "DeveloperApp"("clientId");

-- CreateIndex
CREATE INDEX "DeveloperApp_userId_idx" ON "DeveloperApp"("userId");

-- CreateIndex
CREATE INDEX "DeveloperApp_clientId_idx" ON "DeveloperApp"("clientId");

-- CreateIndex
CREATE INDEX "DeveloperWebhook_appId_idx" ON "DeveloperWebhook"("appId");

-- CreateIndex
CREATE INDEX "AwardsNominee_year_category_idx" ON "AwardsNominee"("year", "category");

-- CreateIndex
CREATE UNIQUE INDEX "AwardsVote_userId_year_category_key" ON "AwardsVote"("userId", "year", "category");

-- CreateIndex
CREATE INDEX "AdminAuditLog_adminId_idx" ON "AdminAuditLog"("adminId");

-- CreateIndex
CREATE INDEX "AdminAuditLog_action_idx" ON "AdminAuditLog"("action");

-- CreateIndex
CREATE INDEX "AdminAuditLog_timestamp_idx" ON "AdminAuditLog"("timestamp");

-- CreateIndex
CREATE INDEX "AdminSession_adminId_idx" ON "AdminSession"("adminId");

-- CreateIndex
CREATE UNIQUE INDEX "SupportTicket_reference_key" ON "SupportTicket"("reference");

-- CreateIndex
CREATE INDEX "SupportTicket_userId_idx" ON "SupportTicket"("userId");

-- CreateIndex
CREATE INDEX "SupportTicket_status_idx" ON "SupportTicket"("status");

-- CreateIndex
CREATE INDEX "SupportTicket_reference_idx" ON "SupportTicket"("reference");

-- CreateIndex
CREATE INDEX "TicketMessage_ticketId_idx" ON "TicketMessage"("ticketId");

-- CreateIndex
CREATE INDEX "ViewHistory_userId_watchedAt_idx" ON "ViewHistory"("userId", "watchedAt");

-- CreateIndex
CREATE UNIQUE INDEX "ViewHistory_userId_contentId_key" ON "ViewHistory"("userId", "contentId");

-- CreateIndex
CREATE INDEX "SearchHistory_userId_searchedAt_idx" ON "SearchHistory"("userId", "searchedAt");

-- CreateIndex
CREATE INDEX "ChannelVisitHistory_userId_visitedAt_idx" ON "ChannelVisitHistory"("userId", "visitedAt");

-- CreateIndex
CREATE UNIQUE INDEX "ChannelVisitHistory_userId_channelId_key" ON "ChannelVisitHistory"("userId", "channelId");

-- CreateIndex
CREATE INDEX "SavedItem_userId_contentType_idx" ON "SavedItem"("userId", "contentType");

-- CreateIndex
CREATE UNIQUE INDEX "SavedItem_userId_contentId_contentType_key" ON "SavedItem"("userId", "contentId", "contentType");

-- CreateIndex
CREATE UNIQUE INDEX "CollectionItem_collectionId_savedItemId_key" ON "CollectionItem"("collectionId", "savedItemId");

-- CreateIndex
CREATE UNIQUE INDEX "FavoriteItem_userId_targetId_targetType_key" ON "FavoriteItem"("userId", "targetId", "targetType");

-- CreateIndex
CREATE UNIQUE INDEX "WatchParty_code_key" ON "WatchParty"("code");

-- CreateIndex
CREATE UNIQUE INDEX "WatchPartyParticipant_partyId_userId_key" ON "WatchPartyParticipant"("partyId", "userId");

-- CreateIndex
CREATE UNIQUE INDEX "ReferralCode_userId_key" ON "ReferralCode"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "ReferralCode_code_key" ON "ReferralCode"("code");

-- CreateIndex
CREATE UNIQUE INDEX "Referral_referredId_key" ON "Referral"("referredId");

-- CreateIndex
CREATE UNIQUE INDEX "IosWaitlist_email_key" ON "IosWaitlist"("email");

-- CreateIndex
CREATE UNIQUE INDEX "PreLaunchSubscriber_email_key" ON "PreLaunchSubscriber"("email");

-- CreateIndex
CREATE INDEX "PreLaunchSubscriber_createdAt_idx" ON "PreLaunchSubscriber"("createdAt");

-- AddForeignKey
ALTER TABLE "RadioConfig" ADD CONSTRAINT "RadioConfig_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RadioSchedule" ADD CONSTRAINT "RadioSchedule_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserCampProgress" ADD CONSTRAINT "UserCampProgress_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CampCertificate" ADD CONSTRAINT "CampCertificate_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AdCampaign" ADD CONSTRAINT "AdCampaign_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DeveloperApp" ADD CONSTRAINT "DeveloperApp_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DeveloperWebhook" ADD CONSTRAINT "DeveloperWebhook_appId_fkey" FOREIGN KEY ("appId") REFERENCES "DeveloperApp"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AwardsVote" ADD CONSTRAINT "AwardsVote_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AdminAuditLog" ADD CONSTRAINT "AdminAuditLog_adminId_fkey" FOREIGN KEY ("adminId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AdminSession" ADD CONSTRAINT "AdminSession_adminId_fkey" FOREIGN KEY ("adminId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SupportTicket" ADD CONSTRAINT "SupportTicket_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TicketMessage" ADD CONSTRAINT "TicketMessage_ticketId_fkey" FOREIGN KEY ("ticketId") REFERENCES "SupportTicket"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ViewHistory" ADD CONSTRAINT "ViewHistory_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SearchHistory" ADD CONSTRAINT "SearchHistory_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ChannelVisitHistory" ADD CONSTRAINT "ChannelVisitHistory_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SavedItem" ADD CONSTRAINT "SavedItem_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Collection" ADD CONSTRAINT "Collection_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CollectionItem" ADD CONSTRAINT "CollectionItem_collectionId_fkey" FOREIGN KEY ("collectionId") REFERENCES "Collection"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CollectionItem" ADD CONSTRAINT "CollectionItem_savedItemId_fkey" FOREIGN KEY ("savedItemId") REFERENCES "SavedItem"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FavoriteItem" ADD CONSTRAINT "FavoriteItem_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "WatchParty" ADD CONSTRAINT "WatchParty_hostId_fkey" FOREIGN KEY ("hostId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "WatchPartyParticipant" ADD CONSTRAINT "WatchPartyParticipant_partyId_fkey" FOREIGN KEY ("partyId") REFERENCES "WatchParty"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "WatchPartyParticipant" ADD CONSTRAINT "WatchPartyParticipant_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ReferralCode" ADD CONSTRAINT "ReferralCode_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Referral" ADD CONSTRAINT "Referral_referrerId_fkey" FOREIGN KEY ("referrerId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Referral" ADD CONSTRAINT "Referral_referredId_fkey" FOREIGN KEY ("referredId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Referral" ADD CONSTRAINT "Referral_codeId_fkey" FOREIGN KEY ("codeId") REFERENCES "ReferralCode"("id") ON DELETE CASCADE ON UPDATE CASCADE;
