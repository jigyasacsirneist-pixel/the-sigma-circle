# syntax=docker/dockerfile:1
FROM oven/bun:latest AS builder

WORKDIR /app

# --------------------------------------------------------------
# 1️⃣ Install all deps (dev + prod) – needed for the Vite build
# --------------------------------------------------------------
COPY package.json bun.lock ./
RUN bun install

# --------------------------------------------------------------
# 2️⃣ Copy source and build the SPA
# --------------------------------------------------------------
COPY . .
RUN bun run build          # produces ./dist

# --------------------------------------------------------------
# 3️⃣ Install the static server globally (adds a binary to ~/.bun)
# --------------------------------------------------------------
RUN bun add -g serve       # installs the `serve` CLI

# --------------------------------------------------------------
# 4️⃣ Runtime stage – minimal image, only what we need to serve
# --------------------------------------------------------------
FROM oven/bun:latest AS runtime

WORKDIR /app

# Copy built assets
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/package.json .
COPY --from=builder /app/node_modules ./node_modules

# Copy the globally‑installed `serve` binary
COPY --from=builder /root/.bun/bin/serve /usr/local/bin/serve

# Port the server will listen on (default for `serve` is 3000, we expose 5173)
ENV PORT=5173
EXPOSE ${PORT}

# Run `serve` in SPA mode (`-s`) and bind to all interfaces
CMD ["sh", "-c", "serve -s ./dist -l tcp://0.0.0.0:${PORT}"]
