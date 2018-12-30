FROM node:10-alpine

RUN yarn

CMD [ "yarn", "dev" ]