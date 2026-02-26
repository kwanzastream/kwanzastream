FROM node:20-alpine AS base

WORKDIR /app

# Install deps
COPY package.json package-lock.json* ./
COPY prisma ./prisma/
RUN npm ci --omit=dev

# Generate Prisma client
RUN npx prisma generate

# Copy source
COPY . .

# Build
RUN npm run build 2>/dev/null || true

EXPOSE 5000

# Healthcheck
HEALTHCHECK --interval=30s --timeout=5s --start-period=10s \
  CMD wget --no-verbose --tries=1 --spider http://localhost:5000/health || exit 1

CMD ["node", "dist/index.js"]
