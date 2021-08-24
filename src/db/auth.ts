/* eslint-disable @typescript-eslint/camelcase */
import { Knex } from 'knex';

const getCookieAuthBySelector = (db: Knex) => async (selector: string): Promise<CookieAuthRow> => {
  return db('cookie_auth')
    .where({
      selector
    })
    .first();
};

const deleteCookieAuthById = (db: Knex) => async (cookieAuthId: number): Promise<CookieAuthRow> =>
  db('cookie_auth')
    .delete()
    .where({
      id: cookieAuthId,
    })
    .returning('*')
    .first();

const createCookieAuthForUserId = (db: Knex) => async (userId: number, selector: string, hashedValidator: string): Promise<CookieAuthRow> =>
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
  db('user-auth')
    .where({
      user_name: userName
    })
    .then((rows) => rows.length > 0);

const createUserAuth = (db: Knex) => async (newUserAuth: NewUserAuthRow): Promise<UserAuthRow> =>
  db('user_auth')
    .insert({
      user_id: newUserAuth.userId,
      user_name: newUserAuth.userName,
      hashed_password: newUserAuth.hashedPassword
    })
    .returning('*')
    .first();

const getUserAuthDocument = (db: Knex) => async (userName: string, hashedPassword: string): Promise<UserAuthRow> =>
  db('user_auth')
    .where({
      user_name: userName,
      hashed_password: hashedPassword,
    })
    .first();

export default (db: Knex) => ({
  getCookieAuthBySelector: getCookieAuthBySelector(db),
  deleteCookieAuthById: deleteCookieAuthById(db),
  createCookieAuthForUserId: createCookieAuthForUserId(db),
  doesUserNameExist: doesUserNameExist(db),
  createUserAuth: createUserAuth(db),
  getUserAuthDocument: getUserAuthDocument(db),
});
