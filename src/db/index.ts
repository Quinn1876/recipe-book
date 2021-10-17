import config from '../../knexfile';
import knex from 'knex';
import auth from './auth';
import recipe from './recipe';
import user from './user';

let env: 'test' | 'development' | 'production' = 'test';
if (process.env.NODE_ENV === 'development' || process.env.NODE_ENV === 'production') {
  env = process.env.NODE_ENV;
}

const connection = config[env];
// Ugly, but the types for pg-connection-string don't align with those for knex,
// even though knex is just passing them into pg,
// which is what pg-connection-string is based on
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const db = knex(connection as any);

export default {
  auth: auth(db),
  recipe: recipe(db),
  user: user(db),
};
