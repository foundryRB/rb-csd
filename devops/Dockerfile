# syntax=docker/dockerfile:1
# cognitive-software-delivery — Astro Starlight static site.
#
# Two stages: Node builds the site to ./dist, nginx serves it.
# Build context is the project root (set by docker-compose.yml: context: ..).

# ---- Build stage ----
# Static output is identical on every CPU, so build on the runner's own
# architecture (no QEMU emulation); only the nginx stage is per-target.
FROM --platform=$BUILDPLATFORM node:22-alpine AS build
WORKDIR /workspace

# Cache the dep install layer separately from source: the lockfile changes far
# less often than the markdown content.
COPY package.json package-lock.json ./
# @psa-department-of-engineering/* resolves from the public npm registry
# (csd-library ADR-0003), so this needs no .npmrc, no build secret, and no
# credential of any kind (INT-FOUNDRY-039).
RUN npm ci --ignore-scripts

COPY . .
# Canonical site URL baked into the build (sitemap + canonical links). The
# default is the public hostname; override for a differently-hosted build.
ARG CSD_DOCS_SITE=https://cognitive-software-delivery.rb-foundry.com
ENV CSD_DOCS_SITE=${CSD_DOCS_SITE}
RUN npm run build

# ---- Runtime image ----
FROM nginx:1.27-alpine
WORKDIR /usr/share/nginx/html
RUN rm -rf ./*

COPY --from=build /workspace/dist .
COPY devops/nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
