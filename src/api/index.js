import { version } from '../../package.json';
import { Router } from 'express';
import facets from './facets';
import albums from './albums';
import pictures from './pictures.js';

export default ({ config, db }) => {
  let api = Router();

  // mount the facets resource
  api.use('/facets', facets({ config, db }));

  // mount the albums resource
  api.use('/albums', albums({ config, db }));

  // mount the albums resource
  api.use('/pictures', pictures({ config, db }));

  // perhaps expose some API metadata at the root
  api.get('/', (req, res) => {
    res.json({ version });
  });

  return api;
};
