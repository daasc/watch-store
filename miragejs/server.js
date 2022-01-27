import { Server } from 'miragejs';
import factories from './factories';
import fixtures from './fixtures';
import routes from './routes';
import models from './models';
import seeds from './seeds';

// eslint-disable-next-line prettier/prettier
const config = environment => {
  const config = {
    environment,
    factories,
    models,
    routes,
    seeds,
  };

  if (Object.keys(fixtures).length) {
    config.fixtures = fixtures;
  }

  return config;
};

export function makeServer({ environment = 'development' } = {}) {
  return new Server(config(environment));
}
