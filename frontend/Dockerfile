FROM node:18-alpine

WORKDIR /frontend

COPY ./package.json ./
COPY ./yarn.lock ./

RUN yarn 

COPY . /frontend/

EXPOSE ${FRONTEND_PORT}
CMD ["yarn", "dev"]