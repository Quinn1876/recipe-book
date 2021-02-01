import {ObjectId} from 'mongodb';
declare global {
  export interface Auth {
    _id: ObjectId;
    userId: ObjectId;
    selector: string;
    hashedValidator: string;
    expires: Date;
  }

}
