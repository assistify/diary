FROM node:10 as builder

RUN npm install webpack -g

WORKDIR /usr/src/app

# Optimize build: Get dependencies before toher src for better caching
COPY ./package.json /usr/src/app/
RUN npm i

COPY . /usr/src/app/

RUN npm run build

FROM nginx:mainline-alpine
RUN rm /etc/nginx/conf.d/*
COPY nginx.conf /etc/nginx/nginx.conf

COPY --from=builder /usr/src/app/build /usr/share/nginx/html
EXPOSE 80

RUN chown nginx.nginx /usr/share/nginx/html/ -R