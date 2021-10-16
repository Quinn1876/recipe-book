/* eslint-disable @typescript-eslint/camelcase */
/* eslint-disable @typescript-eslint/explicit-function-return-type */

exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('recipes').del();
  await knex('ingredients').del();
  await knex('directions').del();
  await knex('units').del();

  // Inserts seed entries
  await knex('recipes').insert([
    {id: 1, name: 'Recipe', owner: 1, description: 'test Recipe Description'},
    {id: 2, name: 'Recipe', owner: 1, description: 'test Recipe Description'},
    {id: 3, name: 'Recipe', owner: 1, description: 'test Recipe Description'},
    {id: 4, name: 'Recipe', owner: 2, description: 'test Recipe Description'},
  ]);
  await knex.raw('ALTER SEQUENCE recipes_id_seq RESTART WITH 5'); // inserting with ID does not increment

  await knex('units').insert([
    { id: 1, name: 'Cups' },
    { id: 2, name: 'Tbsp' },
    { id: 3, name: 'tsp' },
    { id: 4, name: 'oz' },
  ]);
  await knex.raw('ALTER SEQUENCE units_id_seq RESTART WITH 5'); // inserting with ID does not increment

  await knex('ingredients').insert([
    { id: 1, name: 'carrots', recipe_id: 1, amount: 1.5, unit_id: 1 },
    { id: 2, name: 'carrots', recipe_id: 1, amount: 1.5, unit_id: 1 },
    { id: 3, name: 'carrots', recipe_id: 1, amount: 1.5, unit_id: 1 },
  ]);
  await knex.raw('ALTER SEQUENCE ingredients_id_seq RESTART WITH 5'); // inserting with ID does not increment

  await knex('directions').insert([
    { id: 1, direction: 'peal carrots', recipe_id: 1, direction_number: 1},
    { id: 2, direction: 'cut carrots', recipe_id: 1, direction_number: 2},
    { id: 3, direction: 'cook carrots', recipe_id: 1, direction_number: 3},
    { id: 4, direction: 'eat carrots', recipe_id: 1, direction_number: 4},
  ]);
  await knex.raw('ALTER SEQUENCE directions_id_seq RESTART WITH 5'); // inserting with ID does not increment
};
