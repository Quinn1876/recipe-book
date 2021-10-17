import { Knex } from 'knex';

interface PGUserController {
  addUser: (newUser: NewUser) => Promise<{ id: number }>;
}

const addUser = (db: Knex) => (newUser: NewUser): Promise<{ id: number }> => db('users')
  .insert({
    name: newUser.name
  })
  .returning('id')
  .then((values) => {
    return { id: values[0] };
  });

export default (db: Knex): PGUserController => ({
  addUser: addUser(db),
});
