import { Router } from 'express';
import { version } from '../../package.json';
import albumsRouter from './albums';
import picturesRouter from './pictures';
import usersRouter from './users';

export default () => {
  const api = Router();

  // mount the albums resource
  api.use('/albums', albumsRouter);

  // mount the albums resource
  api.use('/pictures', picturesRouter);

  // mount the users resource
  api.use('/users', usersRouter);

  // perhaps expose some API metadata at the root
  api.get('/', (req, res) => {
    res.json({ version });
  });

  return api;
};
