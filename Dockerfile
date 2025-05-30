FROM node:23-slim AS builder
WORKDIR /app

COPY package.json package-lock.json ./
RUN npm ci

COPY tsconfig.json ./
COPY src ./src
COPY openapi.yaml ./

RUN npm run build

FROM node:23-slim AS runner
WORKDIR /app

COPY --from=builder /app/package.json ./
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/dist ./dist

COPY --from=builder /app/openapi.yaml ./

EXPOSE 8080

CMD ["node", "dist/index.js"]
