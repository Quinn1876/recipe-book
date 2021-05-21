import mongoose from 'mongoose';
import { CookieAuthSchema, UserAuthSchema } from '../schema';

export const CookieAuthModel = mongoose.model<CookieAuthDocument>('cookie-auth', CookieAuthSchema);
export const UserAuthModel = mongoose.model<UserAuthDocument>('user-auth', UserAuthSchema);
