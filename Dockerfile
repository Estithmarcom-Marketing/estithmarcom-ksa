FROM node:20-alpine AS builder

WORKDIR /app

COPY package*.json ./

RUN npm ci

COPY . .

# Build-time environment variables
ARG NEXT_PUBLIC_BASE_URL
ENV NEXT_PUBLIC_BASE_URL=$NEXT_PUBLIC_BASE_URL

RUN npm run build

# ── Final Stage ───────────────────────────────────────────────────────────────
# Warum node:20-alpine und nicht nginx?
# Next.js standalone braucht Node.js zur Laufzeit (kein reiner Static Build)
FROM node:20-alpine AS runner

WORKDIR /app

ENV NODE_ENV=production

# Nur das kopieren was wirklich gebraucht wird (dank output: standalone)
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static
COPY --from=builder /app/public ./public

EXPOSE 3000

ENV PORT=3000
ENV HOSTNAME="0.0.0.0"

CMD ["node", "server.js"]
