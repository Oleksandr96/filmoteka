FROM node:16.15.0-alpine3.15
WORKDIR /usr/src/app
COPY . .
RUN npm ci
EXPOSE 4200
CMD npm run start
