import { ObjectId } from 'mongodb';
import { RecipeModel } from '../models/Recipe';

const getRecipesByUserId: DbMethod<ObjectId, RecipeDocument[]> = (userId) => RecipeModel.find({ owner: userId }).exec();

const getRecipeById: DbMethod<ObjectId, RecipeDocument | null> = (recipeId) => RecipeModel.findById(recipeId).exec();

const createRecipe: DbMethod<NewRecipe, RecipeDocument> = (newRecipe) => new RecipeModel({
  ...newRecipe.recipe,
  createdAt: new Date(),
  owner: newRecipe.owner,
  _id: new ObjectId(),
}).save();

const updateRecipe: DbMethod<UpdateRecipeRequest, RecipeDocument | null> = (updatedRecipe) => RecipeModel.findByIdAndUpdate(updatedRecipe.id, {
  name: updatedRecipe.name,
  description: updatedRecipe.description,
  ingredients: updatedRecipe.ingredients,
  directions: updatedRecipe.directions,
}).exec();

export default {
  getRecipesByUserId,
  getRecipeById,
  createRecipe,
  updateRecipe,
};
