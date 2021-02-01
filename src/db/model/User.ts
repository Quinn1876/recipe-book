import mongoose from 'mongoose';
import { UserSchema } from '../schema';

const UserModel = mongoose.model('users', UserSchema);
