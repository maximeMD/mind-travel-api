# ॐ Mind Travel API

Mind Travel is a picture gallery web application, which aims little circles of friends who want to share their images on a secure and self-hosted environment.

> The project is in development phase, do not use this app in production. This is a personal project, but open to everybody who wants to collaborate ;p

This is the repository of the Mind Travel API. The client part is a PWA made with React, and can be found [here](https://github.com/maximeMD/mind-travel-api).

This API is developped with :

- [Node.js](https://nodejs.org) and the [Express](https://expressjs.com/) framework
- [TypeScript](https://www.typescriptlang.org/) run with [ts-node](https://www.npmjs.com/package/ts-node)
- [JWT](https://jwt.io/introduction/) authentication
- [AWS S3](https://en.wikipedia.org/wiki/Amazon_S3) to store pictures and thumbnails
- [AWS Lambda](https://en.wikipedia.org/wiki/AWS_Lambda) function to generate thumbnail pictures

## Getting Started

```sh
# clone it
git clone https://github.com/maximeMD/mind-travel-api
cd mind-travel-api

# Make it your own
rm -rf .git && git init && npm init

# Install dependencies
npm install

# Start development live-reload server
PORT=8080 npm run dev

# Start production server:
PORT=8080 npm start
```

## Docker Support

```sh
cd express-es6-rest-api

# Build your docker
docker build -t es6/api-service .
#            ^      ^           ^
#          tag  tag name      Dockerfile location

# run your docker
docker run -p 8080:8080 es6/api-service
#                 ^            ^
#          bind the port    container tag
#          to your host
#          machine port

```

## License

This project ins under [MIT License](https://opensource.org/licenses/MIT)
