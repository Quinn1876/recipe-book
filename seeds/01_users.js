
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('users').del()
    .then(async function () {
      // Inserts seed entries
      await knex('users').insert([
        { id: 1, name: 'Jim'  },
        { id: 2, name: 'John' },
        { id: 3, name: 'jane' }
      ]);
      await knex.raw('ALTER SEQUENCE users_id_seq RESTART WITH 4'); // inserting with ID does not increment
    });
};
