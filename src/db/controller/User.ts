import { ObjectId } from 'mongodb';
import { UserModel } from '../models/User';

const createUserDocument: DbMethod<NewUserDocument, UserDocument> = async ({ name }) => (new UserModel({
  _id: new ObjectId(),
  name,
})).save();

export default {
  createUserDocument,
};
