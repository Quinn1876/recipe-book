
exports.up = function(knex) {
  return knex.schema.createTable('google_auth', (table) => {
    table.string('google_id').primary();
    table.integer('user_id');

    table.foreign('user_id').references('users.id').onDelete('CASCADE');
  });
};

exports.down = async function(knex) {
  await knex.schema.hasTable('google_auth', table => { table.dropForeign('user_id'); });
  return knex.schema.dropTableIfExists('google_auth');
};
