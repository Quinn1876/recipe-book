import { ObjectId } from 'mongodb';
import mongoose from 'mongoose';
import { RecipeSchema } from '../schema';

const RecipeModel = mongoose.model<RecipeDocument>('recipes', RecipeSchema);

const getRecipesByUserId: DbMethod<ObjectId, RecipeDocument[]> = (userId) => RecipeModel.find({ owner: userId }).exec();

const createRecipe: DbMethod<NewRecipe, RecipeDocument> = (newRecipe) => new RecipeModel({
  ...newRecipe.recipe,
  createdAt: new Date(),
  owner: newRecipe.owner,
}).save();

export default {
  getRecipesByUserId,
  createRecipe,
};
