# AgroMonitor Pro - Servidor Backend

API REST desenvolvida com Node.js, Express, TypeScript, Prisma e PostgreSQL.

## 🚀 Quick Start

### 1. Instalar dependências

```bash
cd server
npm install
```

### 2. Configurar banco de dados

Certifique-se de que o PostgreSQL está rodando e crie o banco de dados:

```bash
createdb agromonitor_pro
```

### 3. Configurar variáveis de ambiente

```bash
cp ../.env.example ../.env
# Edite ../.env com suas configurações
```

### 4. Gerar Prisma Client

```bash
npx prisma generate
```

### 5. Executar migrations

```bash
npx prisma migrate dev
```

### 6. Popular banco de dados

```bash
npm run seed
```

### 7. Iniciar servidor

```bash
# Desenvolvimento
npm run dev

# Produção
npm run build
npm start
```

## 📚 API Documentation

Acesse a documentação Swagger em: http://localhost:3001/api/docs

## 🔌 Endpoints Principais

### Autenticação
- `POST /api/auth/login` - Login
- `POST /api/auth/register` - Registro
- `POST /api/auth/refresh` - Refresh token
- `POST /api/auth/logout` - Logout

### Equipamentos
- `GET /api/equipment` - Listar
- `POST /api/equipment` - Criar
- `GET /api/equipment/:id` - Obter
- `PUT /api/equipment/:id` - Atualizar
- `DELETE /api/equipment/:id` - Deletar

### Operadores
- `GET /api/operators` - Listar
- `POST /api/operators` - Criar
- `GET /api/operators/:id` - Obter
- `PUT /api/operators/:id` - Atualizar
- `DELETE /api/operators/:id` - Deletar

### Fazendas
- `GET /api/farms` - Listar
- `POST /api/farms` - Criar
- `GET /api/farms/:id` - Obter
- `PUT /api/farms/:id` - Atualizar
- `DELETE /api/farms/:id` - Deletar

### Dashboard
- `GET /api/dashboard/overview` - Visão geral
- `GET /api/dashboard/kpis` - KPIs

## 🔒 Credenciais Padrão

Após executar o seed, use:
- Email: `admin@agromonitor.pro`
- Senha: `admin123`

## 🧪 Testes

```bash
npm test
```

## 📦 Estrutura

```
server/
├── src/
│   ├── config/          # Configurações
│   ├── middleware/      # Middlewares
│   ├── modules/         # Módulos da aplicação
│   │   ├── auth/
│   │   ├── equipment/
│   │   ├── operator/
│   │   ├── farm/
│   │   ├── plot/
│   │   ├── front/
│   │   ├── csv/
│   │   ├── timeline/
│   │   ├── map/
│   │   ├── ai/
│   │   ├── report/
│   │   ├── notification/
│   │   ├── dashboard/
│   │   └── user/
│   ├── websocket/       # Socket.IO
│   ├── validators/      # Validações Zod
│   └── server.ts        # Entry point
├── package.json
└── tsconfig.json
```

## 🔧 Comandos Úteis

```bash
# Ver logs do Prisma
npx prisma studio

# Resetar banco de dados
npx prisma migrate reset

# Criar nova migration
npx prisma migrate dev --name nome_da_migration

# Gerar Prisma Client
npx prisma generate
```

---

Desenvolvido com ❤️ para o agronegócio brasileiro
