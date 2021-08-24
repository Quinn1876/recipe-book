/* eslint-disable @typescript-eslint/explicit-function-return-type */

exports.up = function(knex) {
  return knex.schema.createTable('user_auth', (table) => {
    table.increments('id');
    table.integer('user_id');
    table.string('user_name');
    table.string('hashed_password');

    table.unique('user_id');
    table.unique('user_name');
    table.foreign('user_id').references('users.id').onDelete('CASCADE');
  });
};

exports.down = async function(knex) {
  await knex.schema.hasTable('user_auth', table => { table.dropForeign('user_id'); });
  return knex.schema.dropTableIfExists('user_auth');
};
