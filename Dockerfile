FROM node:16.20.2-alpine3.18

#RUN apk add --update nodejs npm
ARG env=main
WORKDIR /app

RUN node -v; npm -v

COPY package*.json ./
RUN npm i --force

# Copying source files
COPY . .

# Building app
RUN npm run build:$env
EXPOSE 3002
# Running the app
CMD "npm" "start"


