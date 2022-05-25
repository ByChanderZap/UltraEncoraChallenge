FROM node AS builder
WORKDIR /app
COPY . .
RUN yarn install

EXPOSE 3000