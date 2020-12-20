FROM node:14-alpine3.11

# create & set working directory
RUN mkdir -p /usr/src
WORKDIR /usr/src

# copy source files
COPY . /usr/src

# install dependencies
RUN yarn

ENV NEXT_PUBLIC_API_URL=api.js-quiz.me/graphql
# start app
RUN yarn build

EXPOSE 3003
CMD [ "yarn", "start" ]