import { Knex } from 'knex';

const addUser = (db: Knex) => (newUser: NewUser): Promise<{ id: number }> => db('users')
  .insert({
    name: newUser.name
  })
  .returning('id')
  .then((values) => {
    return { id: values[0] };
  });

const getUserById = (db: Knex) => (userId: number): Promise<UserRow | null> => db('users').where({ id: userId }).first();

export default (db: Knex) => ({
  addUser: addUser(db),
  getUserById: getUserById(db),
});
