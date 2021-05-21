import { Document } from 'mongoose';
import { ObjectId } from 'mongodb';
declare global {
  export interface User {
    _id: ObjectId;
    name: string;
  }

  export interface UserDocument extends User, Document {}

  export interface NewUserDocument {
    name: string;
  }

}
