FROM node:16.13
ARG BUILD_CONTEXT
WORKDIR /app
COPY package.json yarn.lock ./
COPY ./packages/$BUILD_CONTEXT/package.json packages/$BUILD_CONTEXT/
COPY ./packages/lib ./packages/lib
RUN yarn install
COPY ./tsconfig.base.json ./tsconfig.base.json
COPY ./packages/$BUILD_CONTEXT ./packages/$BUILD_CONTEXT
RUN yarn $BUILD_CONTEXT build
