FROM node:18-slim

RUN mkdir -p /usr/app/build
WORKDIR /usr/app

COPY ./package.json /usr/app/package.json

RUN npm install --only=production --force

# Bundle app source
COPY . .

ENV PORT 80

EXPOSE 80
CMD [ "npm", "start" ]