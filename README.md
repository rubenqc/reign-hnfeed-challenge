# HNFeed Challenge Monorepo

## Requirements
- Node 14.7
- Git
- Yarn

Node, git, and yarn can be installed through [homebrew](https://brew.sh/) on MacOS. If you need to support more than one version of node at the same time, you can consider installing it though [nvm](https://github.com/nvm-sh/nvm) instead of homebrew

## Getting started

### Docker
You can run the code locally in Docker, which avoids needing to install yarn.

```sh
git clone git@gitlab.com:rubenqc/hnfeed-reign.git
cd hnfeed-reign
docker-compose build
```

`docker-compose up` runs local production builds of the client app at http://localhost:3000 and the server app at http://localhost:3001

`docker-compose down` stops the running container.

`docker-compose run --rm bash` runs an interactive shell on the Docker image.

## Helpful Guides

- [Yarn docs](https://yarnpkg.com/en/docs)

### Environment variables - app server

- `PORT`: sets app server port. 
- `MONGO_INITDB_ROOT_USERNAME`: sets mongodb username.
- `MONGO_INITDB_ROOT_PASSWORD`: sets mongodb password.
- `MONGO_DB`: sets mongodb database name.
- `MONGO_PORT`: sets mongodb port.
- `MONGO_HOST`: sets mongodb hostname.
- `MONGO_CONNECTION`: sets mongodb connection type.

## License
MIT
