FROM node:20-alpine3.18 AS base
ENV DIR /service-jetixSports
WORKDIR $DIR

############################## DEV ##################################
FROM base AS dev
ENV NODE_ENV=development
COPY package*.json .
COPY tsconfig*.json .
COPY nest-cli.json .
COPY src src
EXPOSE $PORT
RUN npm install
CMD ["npm", "run", "start:dev"]

############################## BUILD ##################################
FROM base AS build

RUN apk update && apk add --no-cache dumb-init=1.2.5-r2

COPY package*.json .
COPY tsconfig*.json .
COPY nest-cli.json .
COPY src src
RUN npm install
RUN npm run build && npm prune --production
############################## PRODUCTION ##################################
FROM base AS production

ENV NODE_ENV=production
ENV USER=node

COPY --from=build /usr/bin/dumb-init /usr/bin/dumb-init
COPY --from=build $DIR/package*.json .
COPY --from=build $DIR/node_modules node_modules
COPY --from=build $DIR/dist dist

USER $USER
EXPOSE $PORT
CMD ["dumb-init", "node", "dist/main"]
