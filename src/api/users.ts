import aws from 'aws-sdk';
import bcrypt from 'bcrypt';
import { Router } from 'express';
import jwt from 'jsonwebtoken';
import credentials from '../credentials.json';

const usersRouter = Router();

//  AWS config
aws.config.update({
  accessKeyId: credentials.awsAccessKey,
  region: credentials.awsS3Region,
  secretAccessKey: credentials.awsSecretKey,
});
const docClient = new aws.DynamoDB.DocumentClient();
const table = 'mind-travel-users';

// hash pass
const saltRounds = 10;

/* Authenticate user */
usersRouter.post('/authenticate', (req, res) => {
  console.log('test');
  console.log(req.body);
  // Prepare the db query
  const readParams = {
    Key: {
      username: req.body.username,
    },
    TableName: table,
  };
  // Get the user from his username
  docClient.get(readParams, (err, data) => {
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

    // check if the password is correct
    bcrypt
      .compare(req.body.password, user.password)
      .then((isPasswordCorrect: boolean) => {
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
        Item: {
          password: hash,
          username: req.body.username,
        },
        TableName: table,
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
