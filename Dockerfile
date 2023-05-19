FROM node:lts-alpine
ENV NODE_ENV=production
ENV PORT=9000
ENV DATABASE_URL="postgresql://postgres:postgres@localhost:5432/sette-game?schema=public"
WORKDIR /usr/src/app
COPY ["package.json", "package-lock.json*", "npm-shrinkwrap.json*", "./"]
RUN npm install --production --silent && mv node_modules ../
COPY . .
EXPOSE 8080
RUN chown -R node /usr/src/app
USER node
CMD ["node", "index.js"]
