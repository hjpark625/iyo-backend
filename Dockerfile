FROM node:16-slim AS base

WORKDIR /usr/app

COPY package.json .
COPY pnpm-lock.yaml .
COPY tsconfig.build.json .
COPY tsconfig.json .

RUN npm install -g pnpm

RUN node --version
RUN pnpm --version

RUN pnpm install

COPY . .

RUN pnpm run build

EXPOSE 4000
ENTRYPOINT [ "pnpm", "run", "start:prod" ]