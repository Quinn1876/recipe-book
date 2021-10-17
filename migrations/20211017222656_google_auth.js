
exports.up = function(knex) {
  return knex.schema.createTable('google_auth', (table) => {
    table.string('google_id').pkey();
    table.id('user_id');

    table.foreign('user_id').references('users.id').onDelete('CASCADE');
  });
};

exports.down = function(knex) {
  await knex.schema.hasTable('google_auth', table => { table.dropForeign('user_id'); });
  return knex.schema.dropTableIfExists('google_auth');
};
