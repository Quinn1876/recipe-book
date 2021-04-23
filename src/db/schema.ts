import mongoose from 'mongoose';
const Schema = mongoose.Schema;

export const UserSchema = new Schema({
  _id: Schema.Types.ObjectId,
  name: String,
});

export const CookieAuthSchema = new Schema({
  _id: Schema.Types.ObjectId,
  userId: { type: Schema.Types.ObjectId, ref: 'users', required: true },
  selector: { type: String, required: true, unique: true },
  hashedValidator: { type: String, required: true },
  expires: { type: Schema.Types.Date, required: true }
});

export const UserAuthSchema = new Schema({
  _id: Schema.Types.ObjectId,
  userId: { type: Schema.Types.ObjectId, ref: 'users', required: true },
  userName: { type: String, required: true, unique: true },
  hashedPassword: String,
});

export const RecipeSchema = new Schema({
  _id: Schema.Types.ObjectId,
  name: String,
  owner: { type: Schema.Types.ObjectId, ref: 'users', },
  description: String,
  ingredients: [String],
  directions: [String],
  image: String,
  createdAt: Date
});
