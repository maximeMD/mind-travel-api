import http from 'http';
import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import bodyParser from 'body-parser';
import middleware from './middleware';
import api from './api';
import config from './config.json';
import credentials from './credentials.json';
import expressJwt from 'express-jwt';
import companion from '@uppy/companion';

let app = express();
// app.server = http.createServer(app);

// logger
app.use(morgan('dev'));

app.use(cors());

app.use(
  bodyParser.json({
    limit: config.bodyLimit,
  }),
);
// require JWT authentication
const secret = credentials.jwtSecret;

app.use(
  expressJwt({ secret }).unless({
    path: [
      // public routes that don't require authentication
      '/api/users/authenticate',
      // client fetch images without headers, but the token is directly on the URL
      /\/api\/pictures/i,
    ],
  }),
);

// app.server.listen(process.env.PORT || config.port, () => {
app.listen(process.env.PORT || config.port, () => {
  // console.log(`Started on port ${app.server.address().port}`);
  console.log(`Started on port ${process.env.PORT || config.port}`);
});

const options = {
  providerOptions: {
    s3: {
      // The picture key is build from the request 'Album' header and the file name
      getKey: (req: any, filename: any) => req.get('Album') + '/' + filename,
      key: credentials.awsAccessKey,
      secret: credentials.awsSecretKey,
      bucket: credentials.awsS3BucketNameImages,
      region: credentials.awsS3Region,
    },
  },
  server: {
    host: 'localhost:8080',
    protocol: 'http',
  },
  filePath: './data/uppy_temp',
  // secret: 'mysecret',
  // uploadUrls: ['https://myuploadurl.com', 'http://myuploadurl2.com'],
  debug: true,
};

app.use(companion.app(options));

export default app;
