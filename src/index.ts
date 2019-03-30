import companion from '@uppy/companion';
import bodyParser from 'body-parser';
import cors from 'cors';
import express from 'express';
import expressJwt from 'express-jwt';
import http from 'http';
import morgan from 'morgan';
import api from './api';
import config from './config.json';
import credentials from './credentials.json';
import middleware from './middleware';
import io from 'socket.io';

const app = express();
// app.server = http.createServer(app);

// logger
app.use(morgan('dev'));

app.use(cors());

app.use(
  bodyParser.json({
    limit: config.bodyLimit,
  }),
);

// api router
app.use('/api', api());

// require JWT authentication
const secret = credentials.jwtSecret;

app.use(
  expressJwt({ secret }).unless({
    path: [
      // public routes that don't require authentication
      '/api/users/authenticate',
      // client fetch images without headers, but the token is directly on the URL
      /\/api\/pictures/i,
      // TODO : use jwt for socket.io
      /\/socket.io.*/,
    ],
  }),
);

// app.server.listen(process.env.PORT || config.port, () => {
app.listen(process.env.PORT || config.port, () => {
  console.log(`Started on port ${process.env.PORT || config.port}`);
});

const options = {
  debug: true,
  filePath: './data/uppy_temp',
  providerOptions: {
    s3: {
      // The picture key is build from the request 'Album' header and the file name
      bucket: credentials.awsS3BucketNameImages,
      getKey: (req: any, filename: any) => req.get('Album') + '/' + filename,
      key: credentials.awsAccessKey,
      region: credentials.awsS3Region,
      secret: credentials.awsSecretKey,
    },
  },
  server: {
    host: 'localhost:8080',
    protocol: 'http',
  },
  // secret: 'mysecret',
  // uploadUrls: ['https://myuploadurl.com', 'http://myuploadurl2.com'],
};

app.use(companion.app(options));

// var http = require(‘http’).Server(app);
// var io = require(‘socket.io’)(http);

const server = http.createServer(app);
const socketIO = io(server);

socketIO.on('connection', (socket: io.Socket) => {
  socket.emit('news', { hello: 'world' });
  socket.on('my other event', data => {
    console.log(data);
  });
});

export default app;
