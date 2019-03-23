import { Router } from 'express';
import aws from 'aws-sdk';
import * as credentials from '../credentials.json';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

var usersRouter = Router();

//  AWS config
aws.config.update({
  secretAccessKey: credentials.awsSecretKey,
  accessKeyId: credentials.awsAccessKey,
  region: credentials.awsS3Region,
});
const docClient = new aws.DynamoDB.DocumentClient();
const table = 'mind-travel-users';

// hash pass
const saltRounds = 10;

/* Authenticate user */
usersRouter.post('/authenticate', (req, res) => {
  console.log(req.body);
  // Prepare the db query
  const readParams = {
    TableName: table,
    Key: {
      username: req.body.username,
    },
  };
  // Get the user from his username
  docClient.get(readParams, function(err, data) {
    if (err) {
      console.error(
        'Unable to read item. Error JSON:',
        JSON.stringify(err, null, 2),
      );
      res.sendStatus(401);
      return;
    }
    if (!data.Item) {
      console.error('User does not exist');
      res.sendStatus(401);
      return;
    }
    const user = data.Item;

    //check if the password is correct
    bcrypt
      .compare(req.body.password, user.password)
      .then(isPasswordCorrect => {
        if (isPasswordCorrect) {
          const jwtSecret = credentials.jwtSecret;
          const token = jwt.sign({ sub: user.username }, jwtSecret);
          const { password, ...userWithoutPassword } = user;
          res.json({
            ...userWithoutPassword,
            token,
          });
        } else {
          res.sendStatus(401);
        }
      })
      .catch(error => {
        console.log(error);
        res.sendStatus(500);
      });
  });
});

usersRouter.post('/', (req, res) => {
  bcrypt
    .hash(req.body.password, saltRounds)
    .then(hash => {
      const dynamoPutUserParams = {
        TableName: table,
        Item: {
          username: req.body.username,
          password: hash,
        },
      };
      docClient.put(dynamoPutUserParams, (err, data) => {
        if (err) {
          console.log(err);
          res.sendStatus(500);
        } else {
          console.log('PutUser succeeded, username : ' + req.body.username);
          res.sendStatus(201);
        }
      });
    })
    .catch(error => {
      console.log(error);
      res.sendStatus(500);
    });
});
export default usersRouter;
