import mongoose from 'mongoose';
import { ObjectId } from 'mongodb';
import { UserSchema } from '../schema';

const UserModel = mongoose.model<UserDocument>('users', UserSchema);

const createUserDocument: DbMethod<NewUserDocument, UserDocument> = async ({ name }) => (new UserModel({
  _id: new ObjectId(),
  name,
})).save();

export default {
  createUserDocument,
};
