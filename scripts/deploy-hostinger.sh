#!/bin/bash

# ============================================
# AgroMonitor Pro - Hostinger Deployment Script
# ============================================

set -e

echo "🚀 Starting Hostinger deployment..."

# Colors
GREEN='\033[0;32m'
RED='\033[0;31m'
NC='\033[0m'

# Check if .env exists
if [ ! -f .env ]; then
  echo -e "${RED}❌ .env file not found. Copy from .env.example${NC}"
  exit 1
fi

# Install dependencies
echo "📦 Installing dependencies..."
npm install

# Build server
echo "🔨 Building server..."
npm run build:server

# Build client
echo "🎨 Building client..."
npm run build:client

# Run database migrations
echo "🗄️  Running database migrations..."
npm run prisma:migrate:prod

# Seed database (first time only)
echo "🌱 Seeding database..."
npm run seed

# Start with PM2
echo "⚡ Starting application with PM2..."
pm2 start ecosystem.config.js --env production

# Save PM2 configuration
pm2 save

# Setup PM2 to start on boot
pm2 startup

echo -e "${GREEN}✅ Deployment completed successfully!${NC}"
echo ""
echo "📋 Next steps:"
echo "1. Configure Nginx as reverse proxy"
echo "2. Setup SSL with Let's Encrypt"
echo "3. Configure domain DNS"
echo ""
echo "🔍 Useful commands:"
echo "  pm2 logs agromonitor-api    # View logs"
echo "  pm2 status                  # Check status"
echo "  pm2 restart agromonitor-api # Restart app"
echo ""
