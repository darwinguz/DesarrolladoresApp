FROM node:12 AS ui-build
WORKDIR /usr/src/app
COPY front-end/ ./front-end/
RUN cd front-end && npm install @angular/cli && npm install && npm run build

FROM node:12 AS server-build
WORKDIR /root/
COPY --from=ui-build /usr/src/app/front-end/dist ./public
COPY back-end/ .
RUN npm install
RUN npm install sqlite3

EXPOSE $PORT

CMD ["npm", "run", "start:prod"]
