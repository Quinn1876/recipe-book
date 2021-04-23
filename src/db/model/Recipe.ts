import { ObjectId } from 'mongodb';
import mongoose from 'mongoose';
import { RecipeSchema } from '../schema';

const RecipeModel = mongoose.model<RecipeDocument>('recipes', RecipeSchema);

const getRecipesByUserId: DbMethod<ObjectId, RecipeDocument[]> = (userId) => RecipeModel.find({ owner: userId }).exec();

const getRecipeById: DbMethod<ObjectId, RecipeDocument | null> = (recipeId) => RecipeModel.findById(recipeId).exec();

const createRecipe: DbMethod<NewRecipe, RecipeDocument> = (newRecipe) => new RecipeModel({
  ...newRecipe.recipe,
  createdAt: new Date(),
  owner: newRecipe.owner,
  _id: new ObjectId(),
}).save();

export default {
  getRecipesByUserId,
  getRecipeById,
  createRecipe,
};
