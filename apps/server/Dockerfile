FROM node:20-alpine

# Native build tools for bcrypt
RUN apk add --no-cache python3 make g++

WORKDIR /app

# Install ALL dependencies (including devDeps for tsc)
COPY package.json ./
COPY prisma ./prisma/
RUN npm install

# Generate Prisma client
RUN npx prisma generate

# Copy source and build TypeScript
COPY . .
RUN npm run build

# Remove devDependencies after build
RUN npm prune --omit=dev

# Copy start script
COPY start.sh ./start.sh
RUN chmod +x ./start.sh

EXPOSE 5000

HEALTHCHECK --interval=30s --timeout=5s --start-period=10s \
  CMD wget --no-verbose --tries=1 --spider http://localhost:5000/api/health || exit 1

CMD ["./start.sh"]
