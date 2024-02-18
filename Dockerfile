FROM node:16-alpine

WORKDIR /usr/app

COPY package.json .
COPY pnpm-lock.yaml .
COPY tsconfig.json .

RUN node --version
RUN pnpm --version

RUN pnpm install

COPY . .

RUN pnpm run build

EXPOSE 4000
ENTRYPOINT [ "pnpm", "run", "start" ]