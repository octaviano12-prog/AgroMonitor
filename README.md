# AgroMonitor Pro

Sistema web para monitoramento operacional agricola, com painel em tempo real, gestao de equipamentos, operadores, fazendas, talhoes, CSV, notificacoes, relatorios e assistente de IA.

## Stack

- Backend: Node.js, Express, TypeScript, Prisma, PostgreSQL, JWT, Socket.IO.
- Frontend: Next.js, React, TypeScript, Tailwind CSS, Recharts, Leaflet.
- Deploy: PM2/Nginx ou Docker.

## Requisitos

- Node.js 20 recomendado.
- npm 9 ou superior.
- PostgreSQL 14 ou superior.

## Configuracao

Copie o exemplo de variaveis:

```bash
cp .env.example .env
```

Configure no `.env`:

```env
DATABASE_URL="postgresql://usuario:senha@localhost:5432/agromonitor_pro?schema=public"
JWT_SECRET="troque-este-segredo"
JWT_REFRESH_SECRET="troque-este-segredo-refresh"
CORS_ORIGIN="http://localhost:3000"
NEXT_PUBLIC_API_URL="http://localhost:3001"
NEXT_PUBLIC_SOCKET_URL="http://localhost:3001"
```

## Desenvolvimento

```bash
npm install
npm run prisma:generate
npm run prisma:migrate
npm run seed
npm run dev
```

URLs locais:

- Frontend: http://localhost:3000
- Backend: http://localhost:3001
- Swagger: http://localhost:3001/api/docs

## Build

```bash
npm run build
```

## Deploy na Hostinger

Para Hostinger com VPS ou plano Node.js com SSH:

```bash
npm install
npm run prisma:generate
npm run build
npm run prisma:migrate:prod
pm2 start ecosystem.config.js --env production
pm2 save
```

Configure o Nginx para apontar:

- `/` para o frontend.
- `/api` e `/socket.io` para o backend na porta `3001`.

Importante: hospedagem compartilhada comum de PHP/HTML nao e suficiente para este backend. O projeto precisa de Node.js rodando e banco PostgreSQL.

## Docker

```bash
docker compose up -d
```

Para perfil com Nginx:

```bash
docker compose --profile production up -d
```

## Validacao feita

- `npm run build`
- `prisma validate`

