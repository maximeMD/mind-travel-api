import { Router } from 'express';
import aws from 'aws-sdk';
import * as credentials from '../credentials.json';
import jwt from 'jsonwebtoken';

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
const myPlaintextPassword = 'myPass';
const someOtherPlaintextPassword = 'not_bacon';

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
    } else {
      const user = data.Item;
      //check if the password is correct
      if (req.body.password === user.password) {
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
    }
  });
});
export default usersRouter;
