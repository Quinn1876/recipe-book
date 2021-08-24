/* eslint-disable @typescript-eslint/explicit-function-return-type */

exports.up = function(knex) {
  return knex.schema.createTable('cookie_auth', (table) => {
    table.increments('id');
    table.integer('user_id');
    table.string('selector');
    table.string('hashed_validator');
    table.datetime('expires');

    table.unique('selector');
    table.foreign('user_id').references('users.id');
  });
};

exports.down = async function(knex) {
  await knex.schema.hasTable('cookie_auth', table => { table.dropForeign('user_id'); });
  return knex.schema.dropTableIfExists('cookie_auth');
};
