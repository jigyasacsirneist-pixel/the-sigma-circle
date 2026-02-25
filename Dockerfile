# syntax=docker/dockerfile:1
FROM oven/bun:latest AS build

WORKDIR /app

# ---- Install dependencies (including dev) ----
COPY package.json bun.lock ./
RUN bun install

# ---- Copy source and build ----
COPY . .
RUN bun run build         

# ---- Runtime image (same base, only production artefacts) ----
FROM oven/bun:latest AS runtime

WORKDIR /app

# Copy only what the container needs at runtime
COPY --from=build /app/dist ./dist
COPY --from=build /app/package.json .
COPY --from=build /app/node_modules ./node_modules

# Port the app will listen on (Vite default = 5173)
ENV PORT=5173
EXPOSE ${PORT}

# Run Vite’s preview server (static files) – wrapped in a shell so logs appear
CMD ["sh", "-c", "bun vite preview --host 0.0.0.0 --port $PORT"]
