# syntax=docker/dockerfile:1-labs
FROM node:24-slim AS base
WORKDIR /app
COPY package.json .yarnrc.yml /app/
RUN --mount=type=cache,id=corepack,target=/root/.cache/node/corepack corepack enable && corepack install

FROM base AS prod-deps
COPY --parents package.json yarn.lock packages/*/package.json packages/*/yarn.lock /app/
RUN --mount=type=cache,id=yarn,target=/usr/local/share/.cache/yarn yarn workspaces focus --production @example/server

FROM base AS build
COPY --parents package.json yarn.lock packages/*/package.json packages/*/yarn.lock /app/
RUN --mount=type=cache,id=yarn,target=/usr/local/share/.cache/yarn yarn install --immutable
COPY . /app
RUN yarn workspaces foreach -Rpt --from @example/server run build

FROM gcr.io/distroless/nodejs24-debian12
COPY --from=prod-deps --parents /app/node_modules /app/packages/*/node_modules /
COPY --from=build --exclude=*node_modules* /app /app
WORKDIR /app/packages/nest-server
EXPOSE 3000
CMD ["dist/main.js"]
