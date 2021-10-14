require('dotenv').config();
// Update with your config settings.
let config;
if (process.env.NODE_ENV === 'production') {
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  const { parse } = require('pg-connection-string');
  config = parse(process.env.DATABASE_URL);
  // NOTE: Comment this out if you're testing the production environment on a local postgres database!
  config.ssl = {
    rejectUnauthorized: false
  };
}

module.exports = {
  development: {
    client: 'pg',
    connection: 'postgresql://docker:docker@localhost:5464',
    useNullAsDefault: true,
    migrations: {
      tableName: 'knex_migrations'
    }
  },
  test: {
    client: 'pg',
    connection: 'postgresql://docker:docker@localhost:5474',
    useNullAsDefault: true,
    migrations: {
      tableName: 'knex_migrations'
    }
  },
  production: {
    client: 'postgresql',
    connection: config,
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations'
    }
  },
};
