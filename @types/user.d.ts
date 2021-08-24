import { Document } from 'mongoose';
import { ObjectId } from 'mongodb';
import { MONGO, PG } from 'database';
declare global {
  export interface UserGeneric {
    name: string;
  }

  export interface UserDocument extends UserGeneric, Document, MONGO {
    _id: ObjectId;
  }

  export interface UserRow extends UserGeneric, PG {
    id: number;
  }

  export type UserObject = UserRow | UserDocument;

  export interface NewUser {
    name: string;
  }

}
