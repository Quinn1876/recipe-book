/* eslint-disable @typescript-eslint/camelcase */
import { AuthDatabase } from 'auth';
import { Knex } from 'knex';

const getCookieAuthBySelector = (db: Knex) => async (selector: string): Promise<AuthDatabase.CookieAuthRow> => {
  return db('cookie_auth')
    .where({
      selector
    })
    .first();
};

const deleteCookieAuthById = (db: Knex) => async (cookieAuthId: number): Promise<AuthDatabase.CookieAuthRow> =>
  db('cookie_auth')
    .delete()
    .where({
      id: cookieAuthId,
    })
    .returning('*')
    .first();

const createCookieAuthForUserId = (db: Knex) => async (userId: number, selector: string, hashedValidator: string): Promise<AuthDatabase.CookieAuthRow> =>
  db('cookie_auth')
    .insert({
      user_id: userId,
      selector,
      hashed_validator: hashedValidator,
      expires: Date.now() + (1000 * 3600 * 24 * 30),
    })
    .returning('*')
    .first();

const doesUserNameExist = (db: Knex) => async (userName: string): Promise<boolean> =>
  db('user_auth')
    .where({
      user_name: userName
    })
    .then((rows) => rows.length > 0);

const createUserAuth = (db: Knex) => async (userId: number, userName: string, hashedPassword: string): Promise<AuthDatabase.UserAuthRow> =>
  db('user_auth')
    .insert({
      user_id: userId,
      user_name: userName,
      hashed_password: hashedPassword
    })
    .returning('*')
    .then((rows) => rows[0]);

const getUserAuthDocument = (db: Knex) => async (userName: string, hashedPassword: string): Promise<AuthDatabase.UserAuthRow> =>
  db('user_auth')
    .where({
      user_name: userName,
      hashed_password: hashedPassword,
    })
    .first();

const getUserByGoogleId = (db: Knex) => async (googleId: string): Promise<AuthDatabase.GoogleAuthRow & UserRow | null> =>
  db('google_auth')
    .innerJoin('users', 'google_auth.user_id', 'users.id')
    .where('google_auth.id', googleId)
    .first();

const createNewGoogleUser = (db: Knex) => async (googleId: string, name: string): Promise<number | null> => {
  const [userId] = await db('users').insert({ name }).returning('id');
  return (await db('google_auth').insert({ user_id: userId, google_id: googleId }).returning('id'))[0];
};

export default (db: Knex) => ({
  getCookieAuthBySelector: getCookieAuthBySelector(db),
  deleteCookieAuthById: deleteCookieAuthById(db),
  createCookieAuthForUserId: createCookieAuthForUserId(db),
  doesUserNameExist: doesUserNameExist(db),
  createUserAuth: createUserAuth(db),
  getUserAuthDocument: getUserAuthDocument(db),
  getUserByGoogleId: getUserByGoogleId(db),
  createNewGoogleUser: createNewGoogleUser(db),
});



