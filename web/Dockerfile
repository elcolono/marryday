FROM node:14.15.0-alpine

# Create app directory
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

# Install app dependencies
RUN apk update && apk upgrade && apk add git


ADD ./package.json /usr/src/app/

# Shap error fix: You need a different version of Sharp on Docker and on your local machine.
# Therefore add another yarn version under docker   
RUN yarn add sharp
RUN yarn install

ADD . /usr/src/app/

# As you are working in SPA mod, you need your environment variables to be available during build time.
# The docker run command is therefore already too late to define these variables, and that is what you are doing with your docker-compose's 'environment' key.
# So what you need to do to make these variables available during buildtime is to define them in your Dockerfile with ENV PUBLIC_API_URL http://localhost:9061. However, if you want them to be defined by your docker-compose, you need to pass them as build args. I.e. in your docker-compose :
ARG BASE_URL
ARG BASE_SERVER_URL
ENV BASE_URL=$BASE_URL
ENV BASE_SERVER_URL=$BASE_SERVER_URL
# Build app
RUN yarn build

ENV HOST 0.0.0.0
EXPOSE 3000

# start command
CMD [ "yarn", "start" ]