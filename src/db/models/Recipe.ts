import mongoose from 'mongoose';
import { RecipeSchema } from '../schema';

export const RecipeModel = mongoose.model<RecipeDocument>('recipes', RecipeSchema);
