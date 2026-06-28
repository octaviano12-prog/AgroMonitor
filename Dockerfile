# Multi-stage Dockerfile for AgroMonitor Pro

# Stage 1: Build
FROM node:20-alpine AS builder

WORKDIR /app

# Copy package files
COPY package*.json ./
COPY server/package*.json ./server/
COPY client/package*.json ./client/

# Install dependencies
RUN npm ci

# Copy source code
COPY . .

# Generate Prisma client
RUN cd server && npx prisma generate

# Build TypeScript
RUN cd server && npm run build

# Stage 2: Production
FROM node:20-alpine AS production

WORKDIR /app

# Install PM2 globally
RUN npm install -g pm2

# Copy package files and install production dependencies
COPY package*.json ./
COPY server/package*.json ./server/
RUN cd server && npm ci --only=production

# Copy built application
COPY --from=builder /app/server/dist ./server/dist
COPY --from=builder /app/node_modules/.prisma ./node_modules/.prisma

# Copy Prisma schema
COPY database ./database
COPY ecosystem.config.js ./ecosystem.config.js

# Create uploads and logs directories
RUN mkdir -p uploads logs

# Set permissions
RUN chown -R node:node /app
USER node

# Expose port
EXPOSE 3001

# Health check
HEALTHCHECK --interval=30s --timeout=10s --start-period=40s --retries=3 \
  CMD node -e "require('http').get('http://localhost:3001/health', (r) => {process.exit(r.statusCode === 200 ? 0 : 1)})"

# Start application with PM2
CMD ["pm2-runtime", "ecosystem.config.js"]
