# syntax=docker/dockerfile:1

# ============================================================
# 1. Dependencies
# ============================================================

FROM node:20-alpine AS deps

RUN apk add --no-cache libc6-compat openssl

WORKDIR /app

ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"

RUN corepack enable && \
    corepack prepare pnpm@12.5.1 --activate

COPY package.json pnpm-lock.yaml pnpm-workspace.yaml* ./

RUN pnpm config set ignore-scripts false && \
    pnpm install --frozen-lockfile


# ============================================================
# 2. Builder
# ============================================================

FROM node:20-alpine AS builder

RUN apk add --no-cache libc6-compat openssl

WORKDIR /app

ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"

RUN corepack enable && \
    corepack prepare pnpm@12.5.1 --activate

# Reuse installed dependencies
COPY --from=deps /app/node_modules ./node_modules

# Copy application
COPY . .

# Generate Prisma Client
RUN pnpm prisma generate

ENV NEXT_TELEMETRY_DISABLED=1

# Build Next.js
RUN --mount=type=secret,id=DATABASE_URL,env=DATABASE_URL \
    --mount=type=secret,id=PRISMA_DATABASE_URL,env=PRISMA_DATABASE_URL \
    --mount=type=secret,id=AUTH_TRUST_HOST,env=AUTH_TRUST_HOST \
    --mount=type=secret,id=AUTH_SECRET,env=AUTH_SECRET \
    --mount=type=secret,id=AUTH_URL,env=AUTH_URL \
    --mount=type=secret,id=ADMIN_EMAIL,env=ADMIN_EMAIL \
    --mount=type=secret,id=ADMIN_PASSWORD,env=ADMIN_PASSWORD \
    --mount=type=secret,id=CLOUDINARY_CLOUD_NAME,env=CLOUDINARY_CLOUD_NAME \
    --mount=type=secret,id=CLOUDINARY_API_KEY,env=CLOUDINARY_API_KEY \
    --mount=type=secret,id=CLOUDINARY_API_SECRET,env=CLOUDINARY_API_SECRET \
    --mount=type=secret,id=RESEND_API_KEY,env=RESEND_API_KEY \
    --mount=type=secret,id=NEXT_PUBLIC_SOCIAL_FACEBOOK,env=NEXT_PUBLIC_SOCIAL_FACEBOOK \
    --mount=type=secret,id=NEXT_PUBLIC_SOCIAL_INSTAGRAM,env=NEXT_PUBLIC_SOCIAL_INSTAGRAM \
    --mount=type=secret,id=NEXT_PUBLIC_SOCIAL_GOOGLE,env=NEXT_PUBLIC_SOCIAL_GOOGLE \
    --mount=type=secret,id=NEXT_PUBLIC_SOCIAL_BEHANCE,env=NEXT_PUBLIC_SOCIAL_BEHANCE \
    --mount=type=secret,id=NEXT_PUBLIC_EMAIL_1,env=NEXT_PUBLIC_EMAIL_1 \
    --mount=type=secret,id=NEXT_PUBLIC_EMAIL_2,env=NEXT_PUBLIC_EMAIL_2 \
    --mount=type=secret,id=NEXT_PUBLIC_EMAIL_3,env=NEXT_PUBLIC_EMAIL_3 \
    --mount=type=secret,id=NEXT_PUBLIC_PHONE,env=NEXT_PUBLIC_PHONE \
    --mount=type=secret,id=NEXT_PUBLIC_WHATSAPP_NUMBER,env=NEXT_PUBLIC_WHATSAPP_NUMBER \
    --mount=type=secret,id=NEXT_PUBLIC_PHONE_LABEL,env=NEXT_PUBLIC_PHONE_LABEL \
    --mount=type=secret,id=NEXT_PUBLIC_LOCATION,env=NEXT_PUBLIC_LOCATION \
    --mount=type=secret,id=NEXT_PUBLIC_SITE_URL,env=NEXT_PUBLIC_SITE_URL \
    --mount=type=secret,id=NEXT_PUBLIC_COMPANY_NAME,env=NEXT_PUBLIC_COMPANY_NAME \
    --mount=type=secret,id=NEXT_PUBLIC_TWITTER_HANDLE,env=NEXT_PUBLIC_TWITTER_HANDLE \
    --mount=type=secret,id=NEXT_PUBLIC_GA_ID,env=NEXT_PUBLIC_GA_ID \
    pnpm run build


# ============================================================
# 3. Production Runner
# ============================================================

FROM node:20-alpine AS runner

WORKDIR /app

ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1
ENV PATH="/app/node_modules/.bin:$PATH"

RUN apk add --no-cache openssl libc6-compat

RUN addgroup --system --gid 1001 nodejs && \
    adduser --system --uid 1001 nextjs


# ------------------------------------------------------------
# Next.js standalone
# ------------------------------------------------------------

COPY --from=builder \
    /app/public ./public

COPY --from=builder \
    --chown=nextjs:nodejs \
    /app/.next/standalone ./

COPY --from=builder \
    --chown=nextjs:nodejs \
    /app/.next/static ./.next/static


# ------------------------------------------------------------
# Application runtime files
# ------------------------------------------------------------

# Required by Prisma seed and application runtime
# Contains:
#   lib/db.ts
#   lib/auth.ts
#   lib/generated/prisma/*
COPY --from=builder \
    --chown=nextjs:nodejs \
    /app/lib ./lib


# ------------------------------------------------------------
# Prisma
# ------------------------------------------------------------

# Prisma schema + migrations
COPY --from=builder \
    --chown=nextjs:nodejs \
    /app/prisma ./prisma

# Prisma 7 config
COPY --from=builder \
    --chown=nextjs:nodejs \
    /app/prisma.config.ts ./prisma.config.ts


# ------------------------------------------------------------
# Reuse the already-installed dependencies from builder
# This includes Prisma CLI, Prisma engines and tsx.
# ------------------------------------------------------------

COPY --from=builder \
    --chown=nextjs:nodejs \
    /app/node_modules ./node_modules


# ------------------------------------------------------------
# Runtime
# ------------------------------------------------------------

USER nextjs

EXPOSE 3000

ENV PORT=3000
ENV HOSTNAME="0.0.0.0"

CMD ["node", "server.js"]