import mongoose from 'mongoose';
import { UserSchema } from '../schema';

export const UserModel = mongoose.model<UserDocument>('users', UserSchema);
