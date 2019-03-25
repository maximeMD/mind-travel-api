# ॐ Mind Travel API

Mind Travel is a picture gallery web application, which aims little circles of friends who want to share their images on a secure and self-hosted environment. This project is experimental, and the main goal is to discover, learn and implement new technologies. Mind Travel could, in the future, include many feature and evolve to be more than just an image gallery.

> The project is in development phase, do not use this app in production. This is a personal project, but open to everybody who wants to collaborate ;p

This is the repository of the Mind Travel API. The client part is a PWA made with React, and can be found [here](https://github.com/maximeMD/mind-travel-api).

This API is developped with :

- [Node.js](https://nodejs.org) and the [Express](https://expressjs.com/) framework
- [TypeScript](https://www.typescriptlang.org/) run with [ts-node](https://www.npmjs.com/package/ts-node)
- [JWT](https://jwt.io/introduction/) authentication
- [AWS S3](https://en.wikipedia.org/wiki/Amazon_S3) to store pictures and thumbnails
- [AWS Lambda](https://en.wikipedia.org/wiki/AWS_Lambda) function to generate thumbnail pictures
- [Uppy Companion](https://uppy.io/docs/companion/) to easily upload pictures so the S3 bucket

## Getting Started

```sh
# clone it
git clone https://github.com/maximeMD/mind-travel-api
```

Copy the example.credentials.json file to a credentials.json file, then edit it to set your own credentials. Then, you can run the project as following :

```sh
# Install dependencies
npm install

# Start development live-reload server
npm run dev

# Start 'production' server:
npm start
```

## Running with docker

```sh
cd express-es6-rest-api

# Build your docker
docker build -t mind-travel/api .
#            ^      ^           ^
#          tag  tag name      Dockerfile location

# run your docker
docker run -p 8080:8080 mind-travel/api
#                 ^            ^
#          bind the port    container tag
#          to your host
#          machine port

```

## License

This project ins under [MIT License](https://opensource.org/licenses/MIT)
It is made (and hardly modified) from the [Express & ES6 REST API Boilerplate](https://github.com/developit/express-es6-rest-api)
