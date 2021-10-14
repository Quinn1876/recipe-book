
exports.up = function(knex) {
  return knex.schema.hasTable('user_sessions').then((hasTable) => hasTable || knex.schema.createTable('user_sessions', (table) => {
    table.string('sid').primary().notNullable(); // Session Id
    table.json('sess').notNullable();            // Session Data
    table.timestamp('expire').notNullable();

    table.index('expire', 'IDX_session_expire');
  }));
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists('user_sessions');
};
