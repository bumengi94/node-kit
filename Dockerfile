FROM alpine as base
RUN apk add nodejs yarn
RUN yarn global add nodemon concurrently
WORKDIR /app
COPY package.json .
COPY yarn.lock .
RUN yarn
COPY . .
