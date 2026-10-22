# Production image for the Medusa backend (apps/backend).
# Build context is the backend/ folder (the npm workspace root).
#
#   docker build --build-arg MEDUSA_BACKEND_URL=https://api.vistaaram.in -t vistaaram-backend .

# ---- build: install workspace deps and compile server + admin dashboard ----
FROM node:22-bookworm-slim AS build
WORKDIR /app

COPY package.json package-lock.json .npmrc ./
COPY apps/backend/package.json apps/backend/
RUN npm ci --no-audit --no-fund

COPY . .

# The admin dashboard is compiled with the public backend URL baked in.
ARG MEDUSA_BACKEND_URL
ENV MEDUSA_BACKEND_URL=${MEDUSA_BACKEND_URL}
WORKDIR /app/apps/backend
RUN npx medusa build

# ---- runtime: only the compiled server and its production dependencies ----
FROM node:22-bookworm-slim AS runtime
ENV NODE_ENV=production
WORKDIR /app

COPY --from=build /app/apps/backend/.medusa/server ./
RUN npm install --omit=dev --no-audit --no-fund && npm cache clean --force

COPY deploy/entrypoint.sh /usr/local/bin/entrypoint.sh
RUN chmod +x /usr/local/bin/entrypoint.sh

EXPOSE 9000
ENTRYPOINT ["/usr/local/bin/entrypoint.sh"]
