FROM node:lts-alpine as builder
WORKDIR /app
COPY . .
RUN yarn install && yarn build

FROM node:lts-alpine as final
ENV NODE_ENV=production
ENV PORT=9000
ENV DATABASE_URL="postgresql://postgres:postgres@0.0.0.0:5432/sette-game?schema=public"
WORKDIR /app
COPY --from=builder ./app/build .
COPY package.json .
COPY yarn.lock .
COPY prisma .
RUN yarn install --production
CMD [ "node", "index.js" ]
