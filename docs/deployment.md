# GETRYDE Deployment Guide

## 1. Hosting Architecture
- **Frontend (`apps/web`)**: Deployed on **Vercel** with Next.js edge caching and environment variable binding.
- **Backend (`apps/api`)**: Deployed on **Railway**, **Render**, or **AWS ECS** container service with automated health checks.
- **Database**: Managed **PostgreSQL** instance with PostGIS enabled (e.g. Supabase, Neon, AWS RDS).
- **Cache**: Managed **Redis** instance (e.g. Upstash, Redis Cloud) for session locking and low-latency geospatial caching.

## 2. Environment Variables Checklist
Make sure all variables from `.env.example` are configured in your production dashboard:
- `DATABASE_URL`: PostgreSQL connection URI with SSL mode.
- `REDIS_URL`: Redis URI.
- `JWT_SECRET` & `JWT_REFRESH_SECRET`: Cryptographically strong 256-bit secrets.
- `RAZORPAY_KEY_ID` & `RAZORPAY_KEY_SECRET`: Razorpay credentials (switch from `rzp_test_` to `rzp_live_` when launching production).
- `RAZORPAY_WEBHOOK_SECRET`: Signature verification secret.
- `FRONTEND_URL` & `BACKEND_URL`: CORS domain mapping.

## 3. Deployment Commands
```bash
# 1. Install all monorepo dependencies
pnpm install

# 2. Generate Prisma Client
pnpm db:generate

# 3. Apply PostgreSQL migrations
pnpm db:migrate

# 4. Seed initial database rules and demo records
pnpm db:seed

# 5. Build all packages and applications
pnpm build

# 6. Start production processes
pnpm --filter api start:prod
pnpm --filter web start
```
