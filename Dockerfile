FROM node:10 as builder

RUN npm install webpack -g

WORKDIR /usr/src/app
COPY ./package.json /usr/src/app/
RUN npm i

COPY . /usr/src/app/

RUN npm run build

FROM pierrezemb/gostatic

COPY --from=builder ./dist /srv/http