# ॐ Mind Travel API

Mind Travel is a picture gallery web application, which aims little circles of friends who want to share their images on a secure and self-hosted environment.

This is the repository of the Mind Travel API. The client part is a PWA made with React, and can be found [here](https://github.com/maximeMD/mind-travel-api).

This API is developped with :

- [Node.js](https://nodejs.org) and the [Express](https://expressjs.com/) framework
- [TypeScript](https://www.typescriptlang.org/)
- REST resources as middleware via [resource-router-middleware](https://github.com/developit/resource-router-middleware)
- CORS support via [cors](https://github.com/troygoode/node-cors)
- Body Parsing via [body-parser](https://github.com/expressjs/body-parser)

> Tip: If you are using [Mongoose](https://github.com/Automattic/mongoose), you can automatically expose your Models as REST resources using [restful-mongoose](https://git.io/restful-mongoose).

## Getting Started

```sh
# clone it
git clone git@github.com:developit/express-es6-rest-api.git
cd express-es6-rest-api

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

MIT
