FROM node:12 AS ui-build
WORKDIR /usr/src/app
COPY front-end/ .
RUN npm install @angular/cli && npm install && npm run build

FROM node:12 AS server-build
WORKDIR /root/
COPY --from=ui-build /usr/src/app/dist/front-end ./public
COPY back-end/ .
RUN npm install && npm run build

EXPOSE $PORT
CMD ["npm", "run", "start:prod"]
