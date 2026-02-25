# syntax=docker/dockerfile:1
FROM oven/bun:latest

WORKDIR /app

# Copy everything (source + lock files)
COPY . .

# Install **production** deps only (you can add --production if you like)
RUN bun install 

# Expose the preview port (default 5173)
ENV PORT=5173
EXPOSE ${PORT}

# Run preview directly; it will read the current vite.config.ts
CMD ["sh", "-c", "bun vite preview --host 0.0.0.0 --port $PORT"]
