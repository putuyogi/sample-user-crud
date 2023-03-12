FROM node:lts AS build
WORKDIR /build/
RUN npm install -g @angular/cli
COPY package*.json ./
COPY yarn.lock ./
RUN yarn install
COPY . .
RUN yarn build

FROM nginx:latest AS publish
COPY --from=build /build/dist/front-end /usr/share/nginx/html
COPY /nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80