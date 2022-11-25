<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

## Description

Github Explorer is a project to explore Github API.

It is written in TypeScript, using [Nest](https://nestjs.com/) framework.

It can be deployed with [Docker compose](https://docs.docker.com/compose/).

It has [Swagger](https://swagger.io/) enabled.

It uses [Redis](https://redis.io/) as cache in order to save API resources


## Installation

Full instalation requires Docker and Docker compose installed.


## Running the app

```bash
$ docker-compose up --build
```


## Test
Tests can be ran accessing the container of the application or in the local computer (with Docker compose running). To access the container, run the following command:
```bash
docker compose exec backend bash
```

Running scripts
```bash
# unit tests
$ yarn test

# e2e tests
$ yarn test:e2e
```

## API

With docker compose running, acces [Swagger](http://localhost:3000/api) and give it a try.
