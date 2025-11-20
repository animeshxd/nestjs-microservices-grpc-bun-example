FROM oven/bun:latest AS base

WORKDIR /app

COPY package.json ./

RUN bun install

COPY ./ ./

RUN bun run scripts/build.ts

FROM gcr.io/distroless/base-debian12 AS production

ARG APP=gateway

WORKDIR /app

COPY --from=base /app/dist/apps/${APP}/src/main /app/main

ENTRYPOINT [ "/app/main" ]
