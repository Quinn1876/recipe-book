import mongoose from 'mongoose';
import { RecipeSchema } from '../schema';

const RecipeModel = mongoose.model('recipes', RecipeSchema);
