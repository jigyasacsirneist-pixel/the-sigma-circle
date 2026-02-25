# --------------------------------------------------------------
# 1️⃣  Builder stage – install all deps (including dev) and build
# --------------------------------------------------------------
FROM oven/bun:latest AS builder

# Set a deterministic working directory
WORKDIR /app

# -----------------------------------------------------------------
# Copy only the lock‑file and package.json first – this gives us a
# cache layer that only invalidates when dependencies change.
# -----------------------------------------------------------------
COPY package.json bun.lock ./

# Install **all** dependencies (dev + prod) because the build step
# may need dev tools (e.g., Vite, TypeScript, etc.).
RUN bun install

# -----------------------------------------------------------------
# Copy the rest of the source code and run the Vite build.
# -----------------------------------------------------------------
COPY . .
RUN bun run build          # <-- assumes you have a "build" script

# --------------------------------------------------------------
# 2️⃣  Runtime stage – minimal image, only production deps + build
# --------------------------------------------------------------
FROM oven/bun:latest AS runtime

# Create a non‑root user (safer for production)
RUN addgroup -S app && adduser -S -G app app

WORKDIR /app
USER app

# -----------------------------------------------------------------
# Copy only what the production container needs:
#   • compiled output (dist)
#   • production‑only node_modules
#   • package.json (so the app can read its own metadata)
# -----------------------------------------------------------------
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/package.json .
COPY --from=builder /app/node_modules ./node_modules

# -----------------------------------------------------------------
# Expose the port your Vite server runs on (default 3000)
# -----------------------------------------------------------------
EXPOSE 3000

# -----------------------------------------------------------------
# Production start command – Vite’s built‑in server
# -----------------------------------------------------------------
CMD ["bun", "vite", "start"]
