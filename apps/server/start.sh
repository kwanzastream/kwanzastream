#!/bin/sh
# ============================================================
# Kwanza Stream — Production/Staging Start Script
# ============================================================
# This script ensures migrations are applied before the app starts.
# Used in Docker/Render/Railway deployments.

set -e

echo "🔄 Running database migrations..."
npx prisma migrate deploy
echo "✅ Migrations applied"

echo "🚀 Starting Kwanza Stream API..."
node dist/index.js
