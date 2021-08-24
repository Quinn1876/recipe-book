import config from '../../knexfile';
import knex from 'knex';
import auth from './auth';
import recipe from './recipe';
import user from './user';


const connection = config[process.env.NODE_ENV || 'test'];
export const db = knex(connection);

export default {
  auth: auth(db),
  recipe: recipe(db),
  user: user(db),
};
