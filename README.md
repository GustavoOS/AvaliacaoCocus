<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

## Description

Github Explorer is a project to explore Github API and is intented to show all repositories of a given user that are not forks.

- Written in TypeScript, using [Nest](https://nestjs.com/) framework.

- Deployed with [Docker compose](https://docs.docker.com/compose/).

- Has [Swagger](https://swagger.io/) enabled.

- Uses [Redis](https://redis.io/) as cache in order to save API resources


## Installation

Full instalation requires Docker and Docker compose installed.

Before running the app, create a .env file in the following format:
```
API_KEY="My Github API key goes inside here"
REDIS_PASSWORD="Redis2022!"
REDIS_EXPIRATION_IN_SECONDS=3600
```

- Check [Github Api Doc](https://docs.github.com/pt/authentication/keeping-your-account-and-data-secure/creating-a-personal-access-token#creating-a-personal-access-token-classic) to get the API code

- To change Redis password, you might need to specify it both in .env file and docker-compose.

- Expiration of cache is suggested to 3600 seconds for the limitation of requests per hour.


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
