# --------------------------------------------------------------
# Builder stage (unchanged except we also install a static server)
# --------------------------------------------------------------
FROM oven/bun:latest AS builder
WORKDIR /app

COPY package.json bun.lock ./
RUN bun install          # installs all deps, including dev

COPY . .
RUN bun run build

# Install a tiny static server (no extra dev deps needed)
RUN bun add -g serve     # global install of the "serve" package


# --------------------------------------------------------------
# Runtime stage – minimal image
# --------------------------------------------------------------
FROM oven/bun:latest AS runtime
WORKDIR /app

COPY --from=builder /app/dist ./dist
COPY --from=builder /app/package.json .
COPY --from=builder /app/node_modules ./node_modules

# Copy the globally‑installed `serve` binary
COPY --from=builder /root/.bun/bin/serve /usr/local/bin/serve

ENV PORT=5173
EXPOSE ${PORT}

# `-s` = single‑page‑app mode (fallback to index.html)
CMD ["sh", "-c", "serve -s ./dist -l tcp://0.0.0.0:${PORT}"]
