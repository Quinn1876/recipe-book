/* eslint-disable @typescript-eslint/explicit-function-return-type */

exports.up = async function(knex) {
  await knex.schema.createTable('recipes', (table) => {
    table.increments('id');
    table.string('name');
    table.integer('owner');
    table.string('description');
    table.string('image');

    table.timestamps(true, true);

    table.foreign('owner').references('users.id').onDelete('CASCADE');
  });

  await knex.schema.createTable('units', (table) => {
    table.increments('id');
    table.string('name');
  });

  await knex.schema.createTable('ingredients', (table) => {
    table.increments('id');
    table.string('name');
    table.integer('recipe_id');
    table.decimal('amount', 8, 4);
    table.integer('unit_id');

    table.foreign('unit_id').references('units.id');
    table.foreign('recipe_id').references('recipes.id').onDelete('CASCADE');
  });

  return knex.schema.createTable('directions', (table) => {
    table.increments('id');
    table.string('direction');
    table.integer('recipe_id');
    table.integer('direction_number');

    table.foreign('recipe_id').references('recipes.id').onDelete('CASCADE');
  });
};

exports.down = async function(knex) {
  await knex.schema.hasTable('ingredients', table => { table.dropForeign('recipe_id'); });
  await knex.schema.hasTable('ingredients', table => { table.dropForeign('unit_id'); });
  await knex.schema.hasTable('directions', table => { table.dropForeign('recipe_id'); });
  await knex.schema.dropTableIfExists('directions');
  await knex.schema.dropTableIfExists('ingredients');
  await knex.schema.dropTableIfExists('units');
  return knex.schema.dropTableIfExists('recipes');
};
