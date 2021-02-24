import mongoose from 'mongoose';
import { ObjectId } from 'mongodb';
import { CookieAuthSchema, UserAuthSchema } from '../schema';

const CookieAuthModel = mongoose.model<CookieAuthDocument>('cookie-auth', CookieAuthSchema);
const UserAuthModel = mongoose.model<UserAuthDocument>('user-auth', UserAuthSchema);

const getCookieAuthDocumentBySelector: DbMethod<string, CookieAuthDocument | null> = async (selector) => CookieAuthModel.findOne({ selector }).exec();

const deleteCookieAuthDocumentByDocumentId: DbMethod<mongoose.ObjectId, CookieAuthDocument | null> = async (documentId) => CookieAuthModel.findByIdAndDelete(documentId).exec();

const createCookieAuthDocumentForUserId: DbMethod<NewAuthDocument, CookieAuthDocument | null> = async (newDoc) => (new CookieAuthModel({
  ...newDoc,
  expires: Date.now() + (1000 * 3600 * 24 * 30), // 30 days in ms
  _id: new ObjectId(),
})).save();

const getUserAuthDocument: DbMethod<UserAuthDocumentRequest, UserAuthDocument | null> = async (documentRequest) => await UserAuthModel.findOne(documentRequest).exec();

const doesUserNameExist: DbMethod<string, boolean> = async (userName) => UserAuthModel
  .findOne({ userName })
  .exec()
  .then((document) => {
    if (document) {
      return true;
    }
    return false;
  });

const createUserAuthDocument: DbMethod<NewUserAuthDocument, UserAuthDocument> = async (newUserAuthDocument) => (
  new UserAuthModel({
    ...newUserAuthDocument,
    _id: new ObjectId()
  })
).save();

export default {
  createCookieAuthDocumentForUserId,
  createUserAuthDocument,
  deleteCookieAuthDocumentByDocumentId,
  doesUserNameExist,
  getCookieAuthDocumentBySelector,
  getUserAuthDocument,
};
