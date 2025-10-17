# Base stage
FROM node:20-alpine AS base
RUN apk add --no-cache libc6-compat
WORKDIR /app

# Install dependencies only when needed
FROM base AS deps
COPY package.json yarn.lock ./
COPY apps/plode-desktop/package.json ./apps/plode-desktop/
COPY packages/core/package.json ./packages/core/
RUN yarn install --frozen-lockfile

# Build stage
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

# Build plode-desktop
ENV NEXT_TELEMETRY_DISABLED 1
RUN yarn turbo run build --filter=plode-desktop

# Production stage
FROM base AS runner
WORKDIR /app

ENV NODE_ENV production
ENV NEXT_TELEMETRY_DISABLED 1

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

# Copy necessary files
COPY --from=builder /app/apps/plode-desktop/public ./apps/plode-desktop/public
COPY --from=builder /app/apps/plode-desktop/.next/standalone ./
COPY --from=builder /app/apps/plode-desktop/.next/static ./apps/plode-desktop/.next/static

USER nextjs

EXPOSE 3000

ENV PORT 3000
ENV HOSTNAME "0.0.0.0"

CMD ["node", "apps/plode-desktop/server.js"]

