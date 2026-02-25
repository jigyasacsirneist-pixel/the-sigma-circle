# syntax=docker/dockerfile:1
FROM oven/bun:latest AS builder

WORKDIR /app

# 1️⃣ Install all deps (dev + prod) because the build may need them
COPY package.json bun.lock ./
RUN bun install

# 2️⃣ Copy source code (including vite.config.ts) and build
COPY . .
RUN bun run build          # uses the updated vite.config.ts with allowedHosts

# --------------------------------------------------------------
# 3️⃣ Runtime stage – only production artefacts
# --------------------------------------------------------------
FROM oven/bun:latest AS runtime

WORKDIR /app

# Copy the built output and production deps
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/package.json .
COPY --from=builder /app/node_modules ./node_modules

# Port the preview server will listen on (default Vite preview = 5173)
ENV PORT=5173
EXPOSE ${PORT}

# Run preview via a shell so logs appear
CMD ["sh", "-c", "bun vite preview --host 0.0.0.0 --port $PORT"]
