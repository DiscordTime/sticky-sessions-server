# Sticky Sessions Server

[![CircleCI](https://circleci.com/gh/DiscordTime/sticky-sessions-server.svg?style=svg)](https://circleci.com/gh/DiscordTime/sticky-sessions-server)

> Sticky Sessions is an application that helps medium to large teams to share and store their thoughts through digital-like retrospective sessions. This is the repository of the Server API.

## Build Setup

``` bash
# install dependencies
npm install

# serve at localhost:3000
npm start
```

## Docker Setup

There is also the option to build the application using Docker with the following command:

```
docker build -t sticky-server-api .
```

In order to run the application you can eith run:

```
docker run -it -p 3000:3000 --rm sticky-server-api
```
