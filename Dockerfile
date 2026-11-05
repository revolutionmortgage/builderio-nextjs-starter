# Container image for RevStack (revolutionmortgage/revstack).
# Builds Next.js in "standalone" mode: the final image holds only the server and the
# files it needs, and runs as a non-root user on port 3000.

FROM node:26-alpine AS deps
WORKDIR /app
RUN npm install -g pnpm@10
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./
RUN pnpm install --frozen-lockfile

FROM node:26-alpine AS build
WORKDIR /app
RUN npm install -g pnpm@10
COPY --from=deps /app/node_modules ./node_modules
COPY . .
ENV NEXT_TELEMETRY_DISABLED=1
RUN pnpm build

FROM node:26-alpine AS run
WORKDIR /app
ENV NODE_ENV=production \
    NEXT_TELEMETRY_DISABLED=1 \
    NODE_EXTRA_CA_CERTS=/etc/ssl/certs/rds-global-bundle.pem \
    PORT=3000 \
    HOSTNAME=0.0.0.0
RUN addgroup -g 1001 -S app && adduser -S app -u 1001 -G app
# Where the built-in database (lib/db.ts) keeps its files when there is no DATABASE_URL.
# On RevStack the app has a real database, so this only matters when running the image
# by itself; those files last only as long as the container.
RUN mkdir -p /app/.data && chown 1001:1001 /app/.data
# Certificate authorities for AWS-managed Postgres, so database connections are verified.
ADD --chmod=644 https://truststore.pki.rds.amazonaws.com/global/global-bundle.pem /etc/ssl/certs/rds-global-bundle.pem
COPY --from=build --chown=1001:1001 /app/public ./public
COPY --from=build --chown=1001:1001 /app/.next/standalone ./
COPY --from=build --chown=1001:1001 /app/.next/static ./.next/static
USER 1001
EXPOSE 3000
CMD ["node", "server.js"]
