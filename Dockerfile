FROM node:10 as builder

RUN npm install webpack -g

WORKDIR /usr/src/app
COPY . /usr/src/app/

RUN npm i
RUN npm run build

FROM pierrezemb/gostatic

COPY --from=builder /src/dist /srv/http