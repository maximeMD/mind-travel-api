import aws from 'aws-sdk';
import bcrypt from 'bcrypt';
import { Request, Response, Router } from 'express';
import { check, validationResult } from 'express-validator/check';
import jwt from 'jsonwebtoken';
import credentials from '../credentials.json';

const usersRouter = Router();

/**
 * POST /users/authenticate
 * Authenticate user
 * @param username
 */
usersRouter.post(
  '/authenticate',
  [
    // Check if the request body is correct
    check('username')
      .isLength({ min: 3 })
      .withMessage('Must be at least 5 chars long'),
    check('password')
      .isString()
      .withMessage('Must be a string'),
  ],
  (req: Request, res: Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    // Prepare the db query
    const docClient = new aws.DynamoDB.DocumentClient();
    const queryParams = {
      Key: {
        username: req.body.username,
      },
      TableName: credentials.awsDynamoTableUsers,
    };
    // Get the user from his username
    docClient.get(queryParams, (err, data) => {
      if (err) {
        console.error(
          'Unable to read item. Error JSON:',
          JSON.stringify(err, null, 2),
        );
        return res.sendStatus(401);
      }
      if (!data.Item) {
        console.error('User does not exist');
        return res.sendStatus(401);
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
            return res.sendStatus(401);
          }
        })
        .catch(error => {
          console.log(error);
          return res.sendStatus(500);
        });
    });
  },
);

/**
 * POST /users/
 * Create a new user
 */
usersRouter.post(
  '/',
  [
    // Check if the request body is correct
    check('username')
      .isLength({ min: 5 })
      .withMessage('Must be at least 5 chars long'),
    check('password')
      .isString()
      .withMessage('Must be a string'),
  ],
  (req: Request, res: Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const saltRounds = 10;
    bcrypt
      .hash(req.body.password, saltRounds)
      .then(hash => {
        const docClient = new aws.DynamoDB.DocumentClient();
        const dynamoPutUserParams = {
          Item: {
            password: hash,
            username: req.body.username,
          },
          TableName: credentials.awsDynamoTableUsers,
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
  },
);
export default usersRouter;
