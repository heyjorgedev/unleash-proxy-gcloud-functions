FROM node:16-alpine
WORKDIR /usr/src/app

COPY package.json package*.json ./
RUN npm ci

CMD [ "npm", "start" ]
