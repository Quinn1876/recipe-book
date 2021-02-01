import mongoose from 'mongoose';
import { AuthSchema } from '../schema';

const AuthModel = mongoose.model('auth', AuthSchema);

const getAuthDocumentBySelector = async (selector: string): Promise<Auth> => new Promise ((resolve, reject) => {
  AuthModel.findOne({ selector }, (err: mongoose.Error, authDocument: Auth) => {
    if (err) {
      reject(err);
    }
    resolve(authDocument);
  });
});

export default {
  getAuthDocumentBySelector,
};
