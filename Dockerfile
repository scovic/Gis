# FROM node:16-alpine as builder

# WORKDIR /usr

# COPY package.json ./
# COPY tsconfig.json ./
# COPY src ./src

# RUN npm i
# RUN npm run build

# FROM node:16-alpine
# WORKDIR /usr
# COPY package.json ./
# COPY ./.env ./
# COPY --from=builder /usr/build ./
# RUN npm i
# EXPOSE 3000
# CMD ["node", "./src/index.js"]


FROM node:16-alpine as builder

WORKDIR /usr

COPY package.json ./
COPY tsconfig.json ./
COPY src ./src
COPY .env ./.env

RUN npm i

CMD [ "yarn", "dev"]

