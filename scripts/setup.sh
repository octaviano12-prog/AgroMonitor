#!/bin/bash

# ============================================
# AgroMonitor Pro - Quick Setup Script
# ============================================

set -e

GREEN='\033[0;32m'
BLUE='\033[0;34m'
RED='\033[0;31m'
NC='\033[0m'

echo -e "${BLUE}"
echo "╔═══════════════════════════════════════════════════════════╗"
echo "║                                                           ║"
echo "║   🌱 AgroMonitor Pro - Setup Rápido                      ║"
echo "║                                                           ║"
echo "╚═══════════════════════════════════════════════════════════╝"
echo -e "${NC}"

# Check Node.js
if ! command -v node &> /dev/null; then
    echo -e "${RED}❌ Node.js não encontrado. Instale Node.js 18+${NC}"
    exit 1
fi

echo -e "${GREEN}✅ Node.js $(node --version)${NC}"

# Check PostgreSQL
if ! command -v psql &> /dev/null; then
    echo -e "${RED}⚠️  PostgreSQL não encontrado. Instale PostgreSQL 14+${NC}"
    echo "   Continuando sem verificação do PostgreSQL..."
else
    echo -e "${GREEN}✅ PostgreSQL encontrado${NC}"
fi

# Setup .env
if [ ! -f .env ]; then
    echo -e "\n📝 Criando arquivo .env..."
    cp .env.example .env
    echo -e "${GREEN}✅ .env criado. Edite com suas configurações!${NC}"
else
    echo -e "\n📝 Arquivo .env já existe"
fi

# Install dependencies
echo -e "\n📦 Instalando dependências..."
npm install

# Generate Prisma Client
echo -e "\n🔧 Gerando Prisma Client..."
cd server
npx prisma generate
cd ..

echo -e "\n${BLUE}═══════════════════════════════════════════════════════════${NC}"
echo -e "${GREEN}✅ Setup básico concluído!${NC}"
echo -e "${BLUE}═══════════════════════════════════════════════════════════${NC}"

echo -e "\n📋 Próximos passos:"
echo -e "   1. Configure o PostgreSQL em .env"
echo -e "   2. Execute: ${GREEN}npm run prisma:migrate${NC}"
echo -e "   3. Execute: ${GREEN}npm run seed${NC}"
echo -e "   4. Execute: ${GREEN}npm run dev${NC}"

echo -e "\n🌐 URLs:"
echo -e "   Frontend: http://localhost:3000"
echo -e "   Backend:  http://localhost:3001"
echo -e "   Swagger:  http://localhost:3001/api/docs"

echo -e "\n🔐 Credenciais padrão (após seed):"
echo -e "   Email: admin@agromonitor.pro"
echo -e "   Senha: admin123"

echo -e "\n${BLUE}═══════════════════════════════════════════════════════════${NC}\n"
