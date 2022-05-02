FROM node:15.12.0-alpine as build

WORKDIR /usr/app/

# Optimize building time. Cache npm install on this layer so that it is cached between code updates.
ADD package.json .
RUN npm install

ADD . .
RUN npm run clean
RUN npm run test
RUN npm run build


# Execution container
FROM node:15.12.0-alpine as prod

WORKDIR /usr/app/

COPY --from=build /usr/app/package.json .
COPY --from=build /usr/app/package-lock.json .

RUN npm install --production

COPY --from=build /usr/app/dist ./dist

EXPOSE 3000

CMD [ "npm", "run", "start:prod" ]