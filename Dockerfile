FROM node:15-buster-slim

RUN apt-get -qy update
RUN apt-get -qy install openssl

WORKDIR /usr/src/app

COPY package*.json .
COPY yarn*.lock .

RUN yarn

COPY . .

CMD ["yarn", "dev"]
