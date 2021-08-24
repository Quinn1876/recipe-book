import { ObjectId } from 'mongodb';
import { Document } from 'mongoose';

import { PG, MONGO } from 'database';
declare global {

  export interface CookieAuthGeneric {
    selector: string;
    hashedValidator: string;
    expires: Date;
  }
  export interface CookieAuthDocument extends CookieAuthGeneric, Document, MONGO {
    _id: ObjectId;
    userId: ObjectId;
  }

  export interface CookieAuthRow extends CookieAuthGeneric, PG {
    id: number;
    userId: number;
  }

  export type CookieAuthObject = CookieAuthDocument | CookieAuthRow;

  export interface AuthResponse {
    auth: boolean;
    userId: number;
  }

  export interface NewAuthDocument {
    userId: ObjectId;
    selector: string;
    hashedValidator: string;
  }

  export interface SignInBody {
    userName: string;
    password: string;
    remember?: boolean | number | string | null;
  }

  export interface SignUpBody extends SignInBody {
    name: string;
  }

  export interface UserAuthGeneric {
    userName: string;
    hashedPassword: string;
  }
  export interface UserAuthDocument extends Document, UserAuthGeneric, MONGO {
    _id: ObjectId;
    userId: ObjectId;
  }

  export interface UserAuthRow extends UserAuthGeneric, PG {
    id: number;
    userId: number;
  }

  export type UserAuthObject = UserAuthRow | UserAuthDocument;

  export type UserAuthRequest = UserAuthGeneric;

  export interface NewUserAuthDocument extends UserAuthGeneric, MONGO {
    userId: ObjectId;
  }

  export interface NewUserAuthRow extends UserAuthGeneric, PG {
    userId: number;
  }

  export type NewUserAuthObject = NewUserAuthDocument | NewUserAuthRow;
}
