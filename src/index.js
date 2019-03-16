import http from 'http';
import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import bodyParser from 'body-parser';
import middleware from './middleware';
import api from './api';
import config from './config.json';
import path from 'path';
import aws from 'aws-sdk';
import * as credentials from './credentials.json';
import bcrypt from 'bcrypt';
import expressJwt from 'express-jwt';

let app = express();
app.server = http.createServer(app);

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

// api router
app.use('/api', api({ config }));

app.server.listen(process.env.PORT || config.port, () => {
  console.log(`Started on port ${app.server.address().port}`);
});

// bcrypt.hash(myPlaintextPassword, saltRounds).then(function(hash) {
//   // store user with pass in AWS DynamoDB

//   var params = {
//     TableName: table,
//     Item: {
//       username: username,
//       password: hash
//     }
//   };

//   console.log("Adding a new item...");
//   docClient.put(params, function(err, data) {
//     if (err) {
//       console.error(
//         "Unable to add item. Error JSON:",
//         JSON.stringify(err, null, 2)
//       );
//     } else {
//       console.log("Added item:", JSON.stringify(data, null, 2));
//     }
//   });
// });

export default app;
