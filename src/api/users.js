import { Router } from 'express';

var usersRouter = Router();

/* Authenticate user */
usersRouter.post('/authenticate', (req, res) => {
  console.log(req.body);
  res.json({
    id: 1,
    username: 'test',
    password: 'test',
    firstName: 'test',
    lastName: 'test'
  });
});
export default usersRouter;
