# AgroMonitor Server

API REST em Node.js, Express, TypeScript, Prisma e MySQL.

## Variaveis obrigatorias

```env
DATABASE_URL="mysql://USUARIO:SENHA@HOST:3306/NOME_DO_BANCO"
JWT_SECRET="troque-este-segredo"
JWT_REFRESH_SECRET="troque-este-segredo-refresh"
NODE_ENV="production"
```

## Comandos

```bash
npm run prisma:generate
npm run prisma:migrate:prod
npm run build
npm start
```

## Rotas uteis

- `GET /health`
- `POST /api/auth/login`
- `POST /api/auth/register`
- `GET /api/equipment`
- `GET /api/operators`
- `GET /api/farms`
- `GET /api/dashboard/overview`
- `GET /api/docs`
