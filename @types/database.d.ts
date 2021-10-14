import { ObjectId } from 'mongodb';

declare global {
  type PgDate = string;
}
declare module 'database' {
  export interface DatabaseController {
    auth: AuthController;
    recipe: RecipeController;
    user: UserController;
  }

  export interface AuthController {
    createCookieAuthObjectForUserId: (newAuthObject: NewUserAuthObject) => Promise<CookieAuthObject>;
    createUserAuthObject: (newUserAuthObject: NewUserAuthObject) => Promise<UserAuthObject>;
    deleteCookieAuthObjectById: (cookieAuthId: DbObjectId) => Promise<CookieAuthObject>;
    doesUserNameExist: (userName: string) => Promise<boolean>;
    getCookieAuthObjectBySelector: (selector: string) => Promise<CookieAuthObject>;
    getUserAuthObject: (userAuthRequest: UserAuthRequest) => Promise<UserAuthObject>;
  }

  export interface RecipeController {
    getRecipesByUserId: (userId: DbObjectId) => Promise<RecipeObject[]>;
    getRecipeById: (recipeId: DbObjectId) => Promise<RecipeObject>;
    createRecipe: (newRecipe: NewRecipe) => Promise<RecipeObject>;
    updateRecipe: (updatedRecipe: UpdateRecipeRequest) => Promise<RecipeObject>;
  }

  export interface UserController {
    createUserObject: (newUser: NewUser) => Promise<UserObject>;
  }

  export interface PG {
    readonly dbType: 'pg';
  }

  export interface MONGO {
    readonly dbType: 'mongo';
  }

  export interface PgId extends PG {
    id: number;
  }

  export interface MongoId extends MONGO {
    _id: ObjectId;
  }

  export type DbObjectId = PgId | MongoId;
}
