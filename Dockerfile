FROM node:18-alpine AS base

WORKDIR /app

COPY package.json ./
COPY yarn.lock ./


RUN yarn install --pure-lockfile

COPY . .


FROM nginx:alpine as runtime

COPY ./nginx/nginx.conf /etc/nginx/nginx.conf
COPY --from=base /app/dist /usr/share/nginx/html

EXPOSE 8080
