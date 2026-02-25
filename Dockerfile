# syntax=docker/dockerfile:1
ARG NODE_VERSION=22
FROM node:${NODE_VERSION}-alpine AS builder

# Install required packages to install bun (only in builder)
RUN apk add --no-cache ca-certificates bash gnupg

# Install Bun into /usr/local/bin
RUN wget -qO- https://bun.sh/install | bash -s -- --prefix /usr/local \
 && ln -s /root/.bun/bin/bun /usr/local/bin/bun

WORKDIR /usr/src/app

# Copy lock and package files first for caching
COPY package.json bun.lock ./

# Install all deps (including dev) for build
RUN bun install

# Copy source and build
COPY . .
RUN bun run build

# Final minimal image
FROM node:${NODE_VERSION}-alpine AS runtime

# Create non-root user
RUN addgroup -S app && adduser -S -G app app

WORKDIR /usr/src/app

# Copy runtime bun binary from builder
COPY --from=builder /root/.bun /root/.bun
ENV PATH="/root/.bun/bin:${PATH}"

# Copy only production deps and built output
COPY --from=builder /usr/src/app/node_modules ./node_modules
COPY --from=builder /usr/src/app/dist ./dist
COPY package.json ./

# Use non-root user
USER app

# Expose port your app uses
EXPOSE 3000

# Run production start (adjust if your port/file differs)
CMD ["bun", "vite", "start"]
