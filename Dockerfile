FROM node:14-alpine3.15

RUN mkdir -p /usr/app/build
WORKDIR /usr/app

COPY ./package.json /usr/app/package.json

RUN npm install --production --force --no-warnings || true

# Bundle app source
COPY . .

ENV PORT 80

EXPOSE 80
CMD [ "npm", "start" ]