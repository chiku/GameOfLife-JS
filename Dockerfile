FROM node:14 AS builder

COPY ./package.json ./package-lock.json /app/

WORKDIR /app
RUN npm install

COPY ./src/ /app/src/
RUN npm run build

FROM nginx:stable-alpine
COPY --from=builder /app/dist/ /usr/share/nginx/html
