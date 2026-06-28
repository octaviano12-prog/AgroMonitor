# Guia de Instalacao - AgroMonitor Pro

## Pre-requisitos

- Node.js 20+
- npm 9+
- MySQL 8+
- Git

## Banco de dados MySQL

Crie um banco MySQL:

```sql
CREATE DATABASE agromonitor_pro CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
CREATE USER 'agromonitor'@'%' IDENTIFIED BY 'troque_esta_senha';
GRANT ALL PRIVILEGES ON agromonitor_pro.* TO 'agromonitor'@'%';
FLUSH PRIVILEGES;
```

Na Hostinger, use o painel de **Bancos de dados MySQL** e copie:

- host
- porta
- nome do banco
- usuario
- senha

Depois adicione esta variavel no app Node:

```env
DATABASE_URL="mysql://USUARIO:SENHA@HOST:3306/NOME_DO_BANCO"
```

Tambem configure:

```env
NODE_ENV="production"
JWT_SECRET="troque-este-segredo"
JWT_REFRESH_SECRET="troque-este-segredo-refresh"
CORS_ORIGIN="https://ghostwhite-herring-312763.hostingersite.com"
NEXT_PUBLIC_API_URL="https://ghostwhite-herring-312763.hostingersite.com"
NEXT_PUBLIC_SOCKET_URL="https://ghostwhite-herring-312763.hostingersite.com"
```

## Instalar e compilar

```bash
npm install
npm run build
npm run prisma:migrate:prod
npm run seed
npm start
```

## Configuracao Hostinger

- Diretorio raiz: `./`
- Comando de construcao: `npm run build`
- Diretorio de saida: `./`
- Arquivo de entrada: `server/dist/server.js`
- Node: 20 ou superior

## Login inicial

Depois de rodar `npm run seed`:

- Email: `admin@agromonitor.pro`
- Senha: `admin123`

## Problemas comuns

Se cadastro, edicao e exclusao nao salvarem de verdade:

- confira se `DATABASE_URL` esta usando `mysql://`
- confira se o banco MySQL aceita conexao do app
- rode `npm run prisma:migrate:prod`
- rode `npm run seed` para criar o usuario inicial

Se o site abrir mas entrar em modo demonstracao, significa que a API ou o banco ainda nao responderam.
