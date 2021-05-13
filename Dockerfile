FROM node:lts-alpine3.13 AS node-builder

COPY ./package.json ./package-lock.json /app/
WORKDIR /app
RUN npm install
COPY ./src/ /app/src/
RUN npm run build


FROM golang:buster AS go-builder

COPY --from=node-builder /app/dist /app/dist/
COPY server.go go.mod /app/
WORKDIR /app
RUN CGO_ENABLED=0 go build -ldflags '-s -w' -o web-server ./server.go


FROM scratch

COPY --from=go-builder /app/web-server /bin/web-server
ENTRYPOINT ["/bin/web-server"]
