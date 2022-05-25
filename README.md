# Code Interview 

## Comments
  - Its necessary change the env variables to connect to the db, for docker execution im using "db" because of the container name
  - I created an endpoint to create publishers so i can create games and relation it with the publisher

## How to local run:
```sh
yarn install
yarn start:dev
```


## How to run in docker:
```sh
docker-compose build
docker-compose up
```

## Process to create a game: 
  - First we need a publisher, so send a post request to http://{host}/publishers
  - Now we can create a game sending a post request to: http://{host}/games

## "Special endpoint" 
  - The requiered point of auto remove old games and apply a discount on others is a post request to: http://{host}/games/cleanup


## Endpoints
[![Run in Postman](https://run.pstmn.io/button.svg)](https://app.getpostman.com/run-collection/10936341-82f94dd5-f3d7-4ceb-975e-1f35a26618d2?action=collection%2Ffork&collection-url=entityId%3D10936341-82f94dd5-f3d7-4ceb-975e-1f35a26618d2%26entityType%3Dcollection%26workspaceId%3Dbb365453-b299-4bcc-af6b-1cfc1b662544) <br>
[Json Link Collection](https://www.getpostman.com/collections/4d031f795afe3f394de7)
