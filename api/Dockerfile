FROM node:16.15.0-alpine3.15
WORKDIR /usr/src/app
COPY . .
RUN npm ci
RUN npm run build
RUN mkdir -p dist/data/
RUN cp src/data/*.csv dist/data/
EXPOSE 3000
CMD npm run api-start
