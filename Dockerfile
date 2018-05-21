FROM node:carbon
WORKDIR /usr/src/app

COPY package*.json ./
RUN npm install

COPY . .

EXPOSE 42506
CMD [ "npm", "start" ]
