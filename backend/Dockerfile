FROM node:lts
WORKDIR /usr/src/app
COPY package*.json ./
COPY yarn.lock ./
RUN yarn install
COPY . .
RUN yarn build
CMD [ "node","./dist/App.js" ]