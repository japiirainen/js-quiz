FROM node:15-alpine3.11

# create & set working directory
RUN mkdir -p /usr/src
WORKDIR /usr/src

# copy source files
COPY . /usr/src

# install dependencies
RUN yarn

# start app
RUN yarn build:client
EXPOSE 3003
CMD [ "yarn", "start:client" ]