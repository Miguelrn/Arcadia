FROM node:18-alpine

WORKDIR /backend

COPY ./package.json ./
COPY ./yarn.lock ./

RUN yarn install

COPY . /backend/
# COPY src/data-source.docker.ts ./src/data-source.ts

EXPOSE 3001
# ENV TSC_WATCHFILE "UseFsEventsWithFallbackDynamicPolling"
CMD ["yarn", "start"]