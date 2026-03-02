FROM node:20-alpine AS base

WORKDIR /app

# Install deps
COPY package.json ./
COPY prisma ./prisma/
RUN npm install --omit=dev

# Generate Prisma client
RUN npx prisma generate

# Copy source
COPY . .

# Build TypeScript (fail on errors — do NOT silence)
RUN npm run build

EXPOSE 5000

# Healthcheck
HEALTHCHECK --interval=30s --timeout=5s --start-period=10s \
  CMD wget --no-verbose --tries=1 --spider http://localhost:5000/api/health || exit 1

# Use start.sh for auto-migration on deploy
COPY start.sh ./start.sh
RUN chmod +x ./start.sh

CMD ["./start.sh"]
