FROM node:18-alpine

WORKDIR /backend

COPY ./package.json ./
COPY ./yarn.lock ./

RUN yarn install

COPY . /backend/

EXPOSE ${BACKEND_PORT}

CMD ["yarn", "start"]