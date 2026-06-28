# 🚀 Guia de Instalação Rápida - AgroMonitor Pro

## Pré-requisitos

- Node.js 18+ e npm 9+
- PostgreSQL 14+
- Git

## Instalação

### 1. Extraia o projeto

```bash
tar -xzf agromonitor-pro-nodejs.tar.gz
cd agromonitor-pro-full
```

### 2. Execute o setup automático

```bash
chmod +x scripts/setup.sh
./scripts/setup.sh
```

### 3. Configure o banco de dados PostgreSQL

```bash
# Crie o banco de dados
createdb agromonitor_pro

# Ou via psql
psql -U postgres
CREATE DATABASE agromonitor_pro;
\q
```

### 4. Edite o arquivo .env

```bash
nano .env
```

Configure:
```env
DATABASE_URL="postgresql://user:password@localhost:5432/agromonitor_pro?schema=public"
JWT_SECRET="seu-secret-jwt-super-seguro"
OPENAI_API_KEY="sk-sua-chave-openai"
```

### 5. Execute as migrations

```bash
npm run prisma:migrate
```

### 6. Popule o banco de dados

```bash
npm run seed
```

### 7. Inicie a aplicação

```bash
npm run dev
```

## 🌐 Acessar

- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:3001
- **Swagger Docs**: http://localhost:3001/api/docs

## 🔐 Login Padrão

Após executar o seed:
- **Email**: admin@agromonitor.pro
- **Senha**: admin123

## 🐳 Docker (Alternativa)

Se preferir usar Docker:

```bash
# Desenvolvimento
docker-compose up -d

# Produção
docker-compose --profile production up -d
```

## 🚀 Deploy na Hostinger

```bash
chmod +x scripts/deploy-hostinger.sh
./scripts/deploy-hostinger.sh
```

## 📋 Comandos Úteis

```bash
# Ver status do banco
npm run prisma:studio

# Resetar banco de dados
npx prisma migrate reset

# Ver logs
pm2 logs agromonitor-api

# Reiniciar aplicação
pm2 restart agromonitor-api
```

## 🆘 Problemas Comuns

### Erro de conexão com PostgreSQL
- Verifique se o PostgreSQL está rodando
- Confirme as credenciais no .env
- Verifique se o banco de dados foi criado

### Erro de porta em uso
- Altere a porta no .env (PORT=3001)
- Ou pare o processo que está usando a porta

### Erro ao gerar Prisma Client
```bash
cd server
npx prisma generate
```

## 📞 Suporte

- Documentação completa: README.md
- API Docs: http://localhost:3001/api/docs
- Email: support@agromonitor.pro

---

**Desenvolvido com ❤️ para o agronegócio brasileiro**
