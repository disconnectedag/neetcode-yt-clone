# Stage 1: Build stage, named as builder
FROM node:18 AS builder

# set working directory
WORKDIR /app

# copy package json files
COPY package*.json ./

RUN npm install

COPY . .

# build the app
RUN npm run build

# stage 2: production stage, uses result of the build
FROM node:18

WORKDIR /app

COPY package*.json ./

RUN npm install --only=production

# copy built app from the builder stage
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public

EXPOSE 3000
CMD [ "npm", "start" ]

