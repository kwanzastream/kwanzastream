# ============ Stage 1: Build ============
FROM node:20-alpine AS builder

WORKDIR /app

COPY package.json ./
COPY prisma ./prisma/
# Install ALL dependencies (including devDeps like typescript)
RUN npm install

# Generate Prisma client
RUN npx prisma generate

# Copy source and build TypeScript
COPY . .
RUN npm run build

# ============ Stage 2: Production ============
FROM node:20-alpine AS production

WORKDIR /app

COPY package.json ./
COPY prisma ./prisma/
# Install ONLY production dependencies
RUN npm install --omit=dev

# Generate Prisma client for production
RUN npx prisma generate

# Copy compiled output from builder
COPY --from=builder /app/dist ./dist
COPY start.sh ./start.sh
RUN chmod +x ./start.sh

EXPOSE 5000

HEALTHCHECK --interval=30s --timeout=5s --start-period=10s \
  CMD wget --no-verbose --tries=1 --spider http://localhost:5000/api/health || exit 1

CMD ["./start.sh"]
